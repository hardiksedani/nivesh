import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Mesh, SRGBColorSpace } from 'three';
import journeyImage from '@/assets/journey.jpg';

// A reference-faithful editorial plate, with true WebGL perspective parallax.
// Baked lighting preserves the detailed plants and student instead of replacing them with primitives.
function Landscape({pointer, ready}:{pointer:React.RefObject<{x:number;y:number}>,ready:()=>void}) {
  const texture=useTexture(journeyImage);
  texture.colorSpace=SRGBColorSpace;
  const mesh=useRef<Mesh>(null);
  const {viewport}=useThree();
  const ratio=1376/768;
  const width=Math.max(viewport.width,viewport.height*ratio)*1.025;
  useEffect(()=>{ready()},[ready]);
  useFrame((_,delta)=>{
    if(!mesh.current) return;
    const blend=1-Math.exp(-3*Math.min(delta,.05));
    mesh.current.rotation.y+=(pointer.current.x*.008-mesh.current.rotation.y)*blend;
    mesh.current.rotation.x+=(-pointer.current.y*.005-mesh.current.rotation.x)*blend;
    mesh.current.position.x+=(pointer.current.x*.026-mesh.current.position.x)*blend;
  });
  return <mesh ref={mesh}><planeGeometry args={[width,width/ratio]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>;
}
export function JourneyScene() {
  const pointer=useRef({x:0,y:0});
  const [animate,setAnimate]=useState(false);
  const [visible,setVisible]=useState(false);
  const [ready,setReady]=useState(false);
  const host=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    const canvas=document.createElement('canvas');
    const supported=Boolean(canvas.getContext('webgl2')||canvas.getContext('webgl'));
    setAnimate(supported&&!media.matches);
    const change=()=>setAnimate(supported&&!media.matches);
    media.addEventListener('change',change);
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));
    if(host.current) observer.observe(host.current);
    return ()=>{observer.disconnect();media.removeEventListener('change',change)};
  },[]);
  return <div ref={host} className="journey-canvas" onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();pointer.current={x:(e.clientX-r.left)/r.width*2-1,y:(e.clientY-r.top)/r.height*2-1}}} onPointerLeave={()=>{pointer.current={x:0,y:0}}} aria-hidden="true">{animate&&<Canvas dpr={1} camera={{position:[0,0,5],fov:40}} frameloop={visible?'always':'never'} style={{opacity:ready?1:0}}><Suspense fallback={null}><Landscape pointer={pointer} ready={()=>setReady(true)}/></Suspense></Canvas>}</div>;
}