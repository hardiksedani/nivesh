import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Lightbulb,
  AlertTriangle,
  HelpCircle,
  Award,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { lessons, type Lesson } from '@/lib/learning';
import { pageHead } from '@/lib/page-head';

export const Route = createFileRoute('/learn')({
  head: () =>
    pageHead(
      'Beginner Money Lab',
      'Comprehensive, step-by-step lessons about saving, investing, mutual funds, SIPs, compounding, inflation and risk in India.'
    ),
  component: Learn,
});

type TabType = 'deepdive' | 'example' | 'pitfalls' | 'quiz';

function Learn() {
  const [active, setActive] = useState<number | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const [tab, setTab] = useState<TabType>('deepdive');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const selected: Lesson | undefined = active === null ? undefined : lessons[active];

  const handleOpenLesson = (index: number) => {
    setActive(index);
    setTab('deepdive');
    setSelectedAnswer(null);
  };

  const handleCompleteCurrent = () => {
    if (active !== null) {
      setDone(prev => [...new Set([...prev, active])]);
      if (active < lessons.length - 1) {
        handleOpenLesson(active + 1);
      } else {
        setActive(null);
      }
    }
  };

  return (
    <main className="content-page">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <span className="eyebrow flex items-center gap-1.5">
            <Sparkles size={14} className="text-primary" />
            BEGINNER MONEY LAB
          </span>
          <h1>
            Start curious.
            <br />
            Leave truly confident.
          </h1>
          <p className="lede">
            No jargon, no complex formulas, and no sales pressure. Just the essential principles of money, markets, and investing explained clearly with real numbers.
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="bg-card border border-border rounded-xl p-4 min-w-[260px] shadow-sm">
          <div className="flex justify-between items-center text-sm font-semibold mb-2">
            <span className="flex items-center gap-1.5 text-foreground">
              <Award size={16} className="text-primary" />
              Your Progress
            </span>
            <span className="text-primary font-bold">
              {done.length} of {lessons.length}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden mb-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(done.length / lessons.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {done.length === lessons.length
              ? '🎉 Mastered all 6 core principles!'
              : 'Read and complete quizzes to track learning.'}
          </p>
        </div>
      </div>

      {/* 6 Lesson Cards */}
      <div className="content-grid">
        {lessons.map((lesson, i) => {
          const isDone = done.includes(i);
          return (
            <article
              className={`investment-card flex flex-col justify-between transition-all duration-200 hover:shadow-md ${
                isDone ? 'border-primary/40 bg-primary/[0.02]' : ''
              }`}
              key={lesson.title}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="investment-icon tone-green">
                    <lesson.icon />
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium bg-muted px-2.5 py-1 rounded-full">
                    <Clock size={12} />
                    {lesson.readTime}
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Lesson {i + 1}
                  </span>
                  <h3 className="text-xl font-bold mt-1 text-foreground leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {lesson.subtitle}
                  </p>
                </div>

                <p className="text-sm text-foreground/80 mt-3 line-clamp-3 leading-relaxed">
                  {lesson.text}
                </p>
              </div>

              <div className="pt-4 mt-auto">
                <Button
                  variant={isDone ? 'outline' : 'default'}
                  className={`w-full justify-between font-medium ${
                    !isDone ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''
                  }`}
                  onClick={() => handleOpenLesson(i)}
                >
                  {isDone ? (
                    <>
                      <span className="flex items-center gap-1.5 text-primary">
                        <CheckCircle2 size={16} />
                        Completed (Review)
                      </span>
                      <ChevronRight size={15} />
                    </>
                  ) : (
                    <>
                      <span>Read detailed lesson</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between p-6 bg-secondary rounded-2xl border border-border gap-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Ready to see your numbers?</h3>
          <p className="text-sm text-muted-foreground">
            Apply these 6 principles to simulate your path toward ₹10 lakh.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link to="/explore">Explore options</Link>
          </Button>
          <Button asChild variant="premium">
            <Link to="/planner">
              Build your plan <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>

      {/* Comprehensive Lesson Modal */}
      <Dialog
        open={active !== null}
        onOpenChange={open => {
          if (!open) setActive(null);
        }}
      >
        <DialogContent className="lesson-dialog max-w-2xl max-h-[90vh] overflow-y-auto">
          {selected && active !== null && (
            <div className="space-y-5">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Lesson {active + 1} of {lessons.length}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock size={12} />
                    {selected.readTime}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-extrabold text-foreground tracking-tight">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  {selected.subtitle}
                </DialogDescription>
              </div>

              {/* Navigation Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-muted rounded-lg border border-border text-xs font-medium">
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                    tab === 'deepdive'
                      ? 'bg-background text-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setTab('deepdive')}
                >
                  <BookOpen size={14} />
                  Core Concepts
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                    tab === 'example'
                      ? 'bg-background text-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setTab('example')}
                >
                  <Lightbulb size={14} />
                  Real Example
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                    tab === 'pitfalls'
                      ? 'bg-background text-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setTab('pitfalls')}
                >
                  <AlertTriangle size={14} />
                  Mistakes to Avoid
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                    tab === 'quiz'
                      ? 'bg-background text-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setTab('quiz')}
                >
                  <HelpCircle size={14} />
                  Quick Quiz
                </button>
              </div>

              {/* Tab 1: Deep Dive */}
              {tab === 'deepdive' && (
                <div className="space-y-4 pt-1">
                  <div className="p-3.5 bg-primary/5 rounded-lg border border-primary/15 text-sm text-foreground/90 leading-relaxed">
                    <strong>Quick Summary:</strong> {selected.text}
                  </div>

                  <div className="space-y-4">
                    {selected.sections.map((section, idx) => (
                      <div key={idx} className="bg-card p-4 rounded-xl border border-border">
                        <h4 className="text-base font-bold text-foreground mb-1.5 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          {section.heading}
                        </h4>
                        <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                          {section.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Real-Life Example */}
              {tab === 'example' && (
                <div className="space-y-4 pt-1">
                  <div className="bg-card p-5 rounded-xl border border-border space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Scenario Breakdown
                    </span>
                    <h4 className="text-lg font-bold text-foreground">
                      {selected.example.title}
                    </h4>
                    <p className="text-sm text-foreground/85 leading-relaxed">
                      {selected.example.scenario}
                    </p>
                    <div className="mt-3 p-3 bg-muted rounded-lg border-l-4 border-primary">
                      <p className="text-xs font-semibold text-foreground">Key Takeaway:</p>
                      <p className="text-sm text-foreground/90 mt-0.5">
                        {selected.example.takeaway}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Pitfalls to Avoid */}
              {tab === 'pitfalls' && (
                <div className="space-y-4 pt-1">
                  <div className="bg-destructive/5 border border-destructive/20 p-4 rounded-xl">
                    <h4 className="text-sm font-bold text-destructive flex items-center gap-2 mb-2">
                      <AlertTriangle size={16} />
                      Common Beginner Traps in India
                    </h4>
                    <ul className="space-y-2.5 text-sm text-foreground/85">
                      {selected.pitfalls.map((pitfall, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-destructive font-bold text-base leading-none mt-0.5">•</span>
                          <span>{pitfall}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 4: Interactive Quiz */}
              {tab === 'quiz' && (
                <div className="space-y-4 pt-1">
                  <div className="bg-card p-5 rounded-xl border border-border">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Check Your Understanding
                    </span>
                    <h4 className="text-base font-bold text-foreground mt-1 mb-4">
                      {selected.quiz.question}
                    </h4>

                    <div className="space-y-2.5">
                      {selected.quiz.options.map((option, idx) => {
                        const isChosen = selectedAnswer === idx;
                        const isCorrect = idx === selected.quiz.correct;
                        let btnStyle = 'border-border hover:bg-muted text-foreground';

                        if (selectedAnswer !== null) {
                          if (isCorrect) {
                            btnStyle = 'border-primary bg-primary/10 text-primary font-semibold';
                          } else if (isChosen && !isCorrect) {
                            btnStyle = 'border-destructive bg-destructive/10 text-destructive';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            type="button"
                            className={`w-full text-left p-3.5 rounded-lg border text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                            onClick={() => setSelectedAnswer(idx)}
                          >
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{option}</span>
                          </button>
                        );
                      })}
                    </div>

                    {selectedAnswer !== null && (
                      <div
                        className={`mt-4 p-3.5 rounded-lg text-sm ${
                          selectedAnswer === selected.quiz.correct
                            ? 'bg-primary/10 text-primary border border-primary/30'
                            : 'bg-muted text-foreground border border-border'
                        }`}
                      >
                        <p className="font-bold flex items-center gap-1.5 mb-1">
                          {selectedAnswer === selected.quiz.correct ? (
                            <>
                              <CheckCircle2 size={16} /> Correct!
                            </>
                          ) : (
                            'Not quite yet.'
                          )}
                        </p>
                        <p className="text-xs leading-relaxed">{selected.quiz.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* The Golden Rule Callout */}
              <div className="p-4 bg-muted/80 rounded-xl border border-border flex items-start gap-3">
                <span className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <Sparkles size={18} />
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    The Golden Rule
                  </h4>
                  <p className="text-sm font-semibold text-foreground mt-0.5 italic">
                    "{selected.goldenRule}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (active > 0) handleOpenLesson(active - 1);
                  }}
                  disabled={active === 0}
                  className="w-full sm:w-auto"
                >
                  Previous Lesson
                </Button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="premium"
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5"
                    onClick={handleCompleteCurrent}
                  >
                    <span>
                      {active < lessons.length - 1 ? 'Mark Complete & Next' : 'Finish All Lessons'}
                    </span>
                    <CheckCircle2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}