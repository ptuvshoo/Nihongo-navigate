import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenCheck } from "lucide-react";
import Link from "next/link";

const levels = ["N1", "N2", "N3", "N4", "N5"];

export default function ChallengePage() {
  return (
    <div className="flex items-center justify-center w-full">
        <Card className="w-full max-w-md shadow-lg rounded-xl">
          <CardHeader className="text-center p-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mb-4">
               <BookOpenCheck className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl">My Tests</CardTitle>
            <CardDescription className="font-body pt-2 text-base">
              Test your Japanese knowledge with AI-generated JLPT questions.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-6 pt-0">
            <p className="text-center font-body text-sm text-muted-foreground">Choose your level to begin:</p>
            <div className="grid grid-cols-1 gap-3">
              {levels.map((level) => (
                <Button key={level} asChild size="lg" className="font-headline py-6 text-lg transition-transform hover:scale-105">
                  <Link href={`/test?level=${level}`}>{level}</Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
