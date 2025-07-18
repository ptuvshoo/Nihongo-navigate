'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { getTestQuestions } from '@/app/actions';
import type { GenerateTestQuestionsOutput } from '@/ai/flows/generate-test-questions';
import Quiz from '@/components/quiz';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function TestPageContent() {
  const searchParams = useSearchParams();
  const level = searchParams.get('level');

  const [questions, setQuestions] = useState<GenerateTestQuestionsOutput['questions'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (level) {
      const fetchQuestions = async () => {
        setIsLoading(true);
        setError(null);
        const result = await getTestQuestions(level);
        if (result.success) {
          setQuestions(result.data.questions);
        } else {
          setError(result.error);
        }
        setIsLoading(false);
      };
      fetchQuestions();
    } else {
      setError('No level selected.');
      setIsLoading(false);
    }
  }, [level]);

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
            <h1 className="font-headline text-2xl">Japanese Language Proficiency Test</h1>
            <p className="text-muted-foreground font-body">Level {level}</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center min-h-96">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="font-body text-lg text-muted-foreground">Generating your {level} test...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="font-headline text-2xl text-destructive mb-2">Error</h2>
        <p className="font-body text-muted-foreground mb-6">{error}</p>
        <Button asChild>
          <Link href="/challenge"><ArrowLeft className="mr-2 h-4 w-4" />Back to Home</Link>
        </Button>
      </div>
    );
  }

  if (questions) {
    return <Quiz questions={questions} level={level!} />;
  }
  
  return null;
}

export default function TestPage() {
    return (
        <main className="flex min-h-screen w-full items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 font-serif">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="font-body text-lg text-muted-foreground">Loading...</p>
              </div>
            }>
                <TestPageContent />
            </Suspense>
        </main>
    );
}
