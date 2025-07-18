import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Repeat, Home } from "lucide-react";
import Link from "next/link";

type ScoreSummaryProps = {
  score: number;
  totalQuestions: number;
  level: string;
  onRetry: () => void;
};

export default function ScoreSummary({ score, totalQuestions, level, onRetry }: ScoreSummaryProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  let feedback = "";
  if (percentage === 100) {
    feedback = "Perfect score! You're a master!";
  } else if (percentage >= 80) {
    feedback = "Excellent work! You're almost there!";
  } else if (percentage >= 60) {
    feedback = "Good job! Keep practicing!";
  } else {
    feedback = "Don't give up! Every mistake is a learning opportunity.";
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg animate-fade-in rounded-xl">
      <CardHeader className="items-center text-center p-6">
        <Award className="h-16 w-16 text-yellow-500 mb-4" />
        <CardTitle className="font-headline text-3xl">Test Complete!</CardTitle>
        <CardDescription className="font-body text-lg pt-2">
          You finished the {level} level test.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center p-6">
        <div className="my-6">
          <p className="font-body text-xl">Your Score:</p>
          <p className="font-headline text-6xl font-bold text-primary my-2">
            {score} <span className="text-3xl font-medium text-muted-foreground">/ {totalQuestions}</span>
          </p>
          <p className="font-body text-lg text-muted-foreground">{feedback}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onRetry} className="font-headline" size="lg">
            <Repeat className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="secondary" className="font-headline" size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Choose Another Level
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
