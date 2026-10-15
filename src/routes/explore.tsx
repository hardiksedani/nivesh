import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { InvestmentCard } from '@/components/investment-card';
import { investments } from '@/lib/learning';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/explore')({head:()=>pageHead('Explore your investment options','Understand fixed deposits, index funds, gold, stocks, savings accounts and bonds. Compare risk, liquidity and charges.'),component:Explore});
function Explore() {
 const [search,setSearch]=useState('');
 useEffect(()=>{setSearch(new URLSearchParams(window.location.search).get('q')??'')},[]);
 const filtered=investments.filter(i=>`${i.name} ${i.simple}`.toLowerCase().includes(search.toLowerCase()));
 return <main className="content-page"><span className="eyebrow">EXPLORE OPTIONS</span><h1>A little understanding.<br/>A lot more confidence.</h1><p className="lede">There's no single “best” investment for everyone. Start with what each option does, when you can access your money and what could go wrong.</p><div className="flex gap-3 mb-7 max-w-xl"><div className="relative flex-1"><Search className="absolute left-3 top-3 text-muted-foreground" size={16}/><Input aria-label="Search options" placeholder="Find an investment..." className="pl-9" value={search} onChange={e=>setSearch(e.target.value)}/></div><Button variant="premium" asChild><Link to="/compare">Compare <ArrowRight/></Link></Button></div><div className="content-grid">{filtered.map(item=><InvestmentCard item={item} key={item.id}/>)}</div>{!filtered.length&&<p>No matches yet. Try “gold”, “index” or “savings”.</p>}</main>;
}