'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Repeat, Home, BrainCircuit, Loader2 } from "lucide-react";
import Link from "next/link";
import type { GenerateTestQuestionsOutput } from "@/ai/flows/generate-test-questions";
import { useEffect, useState, useMemo } from "react";
import { getTestAnalysis } from "@/app/actions";
import type { AnalyzeTestResultsOutput } from "@/ai/flows/analyze-test-results";

type ScoreSummaryProps = {
  level: string;
  questions: GenerateTestQuestionsOutput['questions'];
  answers: { [questionIndex: number]: string };
};

export default function ScoreSummary({ level, questions, answers }: ScoreSummaryProps) {
  const [analysis, setAnalysis] = useState<AnalyzeTestResultsOutput | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(true);

  const { score, results } = useMemo(() => {
    let currentScore = 0;
    const currentResults = questions.map((q, index) => {
      const userAnswer = answers[index] || "Not Answered";
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) {
        currentScore++;
      }
      return {
        question: q.question,
        category: q.category,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
      };
    });
    return { score: currentScore, results: currentResults };
  }, [questions, answers]);

  useEffect(() => {
    async function fetchAnalysis() {
      setIsLoadingAnalysis(true);
      const result = await getTestAnalysis({ level, results });
      if (result.success) {
        setAnalysis(result.data);
      } else {
        // Handle error case if needed
        console.error(result.error);
        setAnalysis({ feedback: "Could not analyze results.", weakAreas: [] });
      }
      setIsLoadingAnalysis(false);
    }
    fetchAnalysis();
  }, [level, results]);


  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg animate-fade-in rounded-xl">
      <CardHeader className="items-center text-center p-6">
        <Award className="h-16 w-16 text-yellow-500 mb-4" />
        <CardTitle className="font-headline text-3xl">Test Complete!</CardTitle>
        <CardDescription className="font-body text-lg pt-2">
          Here is your result for the {level} level test.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="text-center">
            <p className="font-body text-xl">Your Score:</p>
            <p className="font-headline text-6xl font-bold text-primary my-2">
                {score} <span className="text-3xl font-medium text-muted-foreground">/ {totalQuestions}</span>
            </p>
             <p className="font-headline text-2xl text-muted-foreground">({percentage}%)</p>
        </div>

        <Card className="bg-muted/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-xl">
                    <BrainCircuit className="h-6 w-6 text-primary" />
                    AI Analysis & Feedback
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isLoadingAnalysis ? (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Analyzing your results...</span>
                    </div>
                ) : analysis ? (
                    <div className="space-y-4">
                        <p className="font-body text-base">{analysis.feedback}</p>
                        {analysis.weakAreas && analysis.weakAreas.length > 0 && (
                             <div>
                                <h4 className="font-bold font-headline">Areas to improve:</h4>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    {analysis.weakAreas.map((area, i) => (
                                        <li key={i} className="font-body">{area}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-destructive">Could not load analysis.</p>
                )}
            </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button onClick={handleRetry} className="font-headline" size="lg">
            <Repeat className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="secondary" className="font-headline" size="lg">
            <Link href="/challenge">
              <Home className="mr-2 h-4 w-4" />
              Choose Another Level
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}