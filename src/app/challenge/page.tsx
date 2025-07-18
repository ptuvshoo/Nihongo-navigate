import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ChallengeDashboard() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        <div className="text-left md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Start your testing journey today!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Join millions of students who have taken the Duolingo English Test.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">BUY NOW</Button>
        </div>
        <div className="md:w-1/2">
          <Image 
            src="https://placehold.co/400x300.png"
            data-ai-hint="boy walking sign"
            alt="Illustration of a student walking towards a sign" 
            width={400} 
            height={300} 
            className="w-full h-auto"
          />
        </div>
      </section>

      <div className="border-t border-gray-200 my-16"></div>

      <section className="text-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Not quite ready?</h2>
        <p className="text-lg text-gray-600 mb-8">
          No problem! Prepare with our collection of reference materials and practice exercises.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 flex items-center gap-6 hover:shadow-lg transition-shadow border-gray-300">
            <div className="p-4 bg-orange-100 rounded-lg">
                <Dumbbell className="h-8 w-8 text-orange-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Take a practice test</h3>
              <Link href="/challenge/practice" className="text-blue-600 font-bold hover:underline">
                PRACTICE FREE >
              </Link>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-6 hover:shadow-lg transition-shadow border-gray-300">
            <div className="p-4 bg-orange-100 rounded-lg">
                <Search className="h-8 w-8 text-orange-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Learn about the test</h3>
              <Link href="#" className="text-blue-600 font-bold hover:underline">
                LEARN MORE >
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}