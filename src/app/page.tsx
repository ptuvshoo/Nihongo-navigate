import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Compass, Cpu, Target } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 md:px-8 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <Compass className="h-6 w-6 text-purple-600" />
          <span>JLPT Navigator</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="#" className="hover:text-purple-600">Features</Link>
          <Link href="#" className="hover:text-purple-600">JLPT Levels</Link>
          <Link href="#" className="hover:text-purple-600">AI Tools</Link>
          <Link href="#" className="hover:text-purple-600">Dashboard</Link>
        </nav>
        <Button asChild style={{ backgroundColor: '#8B5CF6', color: 'white' }}>
          <Link href="/challenge">Get Started</Link>
        </Button>
      </header>

      <main className="flex-grow pt-16">
        <section className="relative text-center py-20 md:py-32 bg-white overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-purple-100 to-white opacity-50 -z-10"></div>
            <div className="container mx-auto px-4 z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4">Master the JLPT with AI</h1>
                <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-8">
                    JLPT Navigator is your personal AI-powered study partner, designed to help you conquer the Japanese-Language Proficiency Test with confidence.
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild size="lg" style={{ backgroundColor: '#8B5CF6', color: 'white' }}>
                        <Link href="/challenge">Start Learning Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="#">Learn More</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section className="py-20 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-sm font-semibold uppercase text-purple-600 tracking-wider mb-2">Key Features</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Learn Smarter, Not Harder</h2>
            <p className="max-w-3xl mx-auto text-slate-600 mb-12">
              Our platform is packed with features designed to make your Japanese studies more effective and engaging.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="text-left shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Cpu className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Personalized Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    AI-powered vocabulary and grammar lessons tailored to your specific JLPT level and learning goals.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-left shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Adaptive Practice Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    AI analyzes your past results to generate practice tests that target your weaknesses, adjusting as you improve.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200">
        <div className="container mx-auto px-8 py-6 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} JLPT Navigator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
