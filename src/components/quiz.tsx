'use client';

import { useState } from 'react';
import type { GenerateTestQuestionsOutput } from '@/ai/flows/generate-test-questions';
import ScoreSummary from './score-summary';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, ArrowRight, Lightbulb, Home } from 'lucide-react';
import Link from 'next/link';

type QuizProps = {
  questions: GenerateTestQuestionsOutput['questions'];
  level: string;
};

export default function Quiz({ questions, level }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (quizFinished) {
    return <ScoreSummary score={score} totalQuestions={totalQuestions} level={level} onRetry={handleRetry} />;
  }

  return (
    <Card className="w-full max-w-3xl shadow-lg animate-fade-in rounded-xl">
       <CardHeader className="p-6">
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="font-headline text-xl text-primary">{level} Level Quiz</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/"><Home className="mr-2 h-4 w-4"/> Home</Link>
          </Button>
        </div>
        <div className="space-y-2">
            <div className="flex justify-between text-sm font-body text-muted-foreground">
                <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                <span>Score: {score}</span>
            </div>
            <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="w-full" />
        </div>
      </CardHeader>
      <CardContent className="px-6 py-8">
        <p className="font-body text-lg md:text-xl text-center min-h-[6rem] flex items-center justify-center">
            {currentQuestion.question}
        </p>

        <RadioGroup
          value={selectedAnswer ?? ''}
          onValueChange={setSelectedAnswer}
          disabled={isAnswered}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {currentQuestion.options.map((option, index) => {
            const isCorrect = option === currentQuestion.correctAnswer;
            const isSelected = option === selectedAnswer;
            return (
              <div key={index}>
                <RadioGroupItem value={option} id={`option-${index}`} className="sr-only" />
                <Label
                  htmlFor={`option-${index}`}
                  className={cn(
                    "flex items-center justify-between w-full p-4 rounded-md border-2 cursor-pointer transition-all font-medium",
                    "text-card-foreground/80",
                    !isAnswered && "hover:border-primary/50 hover:bg-accent/20",
                    isSelected && !isAnswered && "border-primary",
                    isAnswered && isCorrect && "border-green-500 bg-green-500/10 text-green-800",
                    isAnswered && isSelected && !isCorrect && "border-red-500 bg-red-500/10 text-red-800",
                    isAnswered && "cursor-not-allowed opacity-80"
                  )}
                >
                  <span className="font-body">{option}</span>
                  {isAnswered && isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {isAnswered && selectedAnswer !== currentQuestion.correctAnswer && (
            <div className="mt-6 p-4 rounded-md bg-green-500/10 flex items-center gap-3 animate-fade-in">
                <Lightbulb className="h-5 w-5 text-green-600" />
                <p className="font-body text-green-700">The correct answer is: <span className="font-bold">{currentQuestion.correctAnswer}</span></p>
            </div>
        )}
      </CardContent>
      <CardFooter className="p-6 bg-muted/50 border-t rounded-b-xl">
        <Button
          onClick={isAnswered ? handleNextQuestion : handleAnswerSubmit}
          disabled={!selectedAnswer && !isAnswered}
          className="w-full font-headline text-lg"
          size="lg"
        >
          {isAnswered ? (currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question') : 'Check Answer'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
