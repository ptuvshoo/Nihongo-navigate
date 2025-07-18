'use client';

import { useState } from 'react';
import type { GenerateTestQuestionsOutput } from '@/ai/flows/generate-test-questions';
import ScoreSummary from './score-summary';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Home, ArrowRight, Lightbulb } from 'lucide-react';
import Link from 'next/link';

type QuizProps = {
  questions: GenerateTestQuestionsOutput['questions'];
  level: string;
};

type Answers = { [questionIndex: number]: string };

export default function Quiz({ questions, level }: QuizProps) {
  const [answers, setAnswers] = useState<Answers>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelect = (questionIndex: number, option: string) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmit = () => {
    setQuizFinished(true);
  };

  if (quizFinished) {
    return <ScoreSummary level={level} questions={questions} answers={answers} />;
  }

  return (
    <Card className="w-full max-w-4xl shadow-lg animate-fade-in bg-white">
      <CardHeader className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="font-headline text-2xl">Japanese Language Proficiency Test</CardTitle>
            <CardDescription>Level {level}</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/"><Home className="mr-2 h-4 w-4"/> Home</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {questions.map((q, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold border-2 border-gray-400 rounded-sm">
                {index + 1}
              </div>
              <p className="font-body text-lg flex-grow pt-1">{q.question}</p>
            </div>
            <div className="pl-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2">
              {q.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center gap-2">
                  <span className="font-bold">{optIndex + 1}.</span>
                  <Button
                    variant={answers[index] === option ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start text-base py-1 h-auto',
                      answers[index] === option && 'bg-primary/10 text-primary'
                    )}
                    onClick={() => handleAnswerSelect(index, option)}
                  >
                    {option}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-6 bg-gray-50 border-t flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== questions.length}
          className="font-headline text-lg"
          size="lg"
        >
          Finish & See Results
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
