import { BookCopy, Compass, Dumbbell, FileText, Landmark, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col">
        <div className="h-16 flex items-center px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
             <Compass className="h-6 w-6 text-primary" />
            <span className="font-headline">JLPT Navigator</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          <Button variant="secondary" className="w-full justify-start text-base py-6 bg-accent text-primary hover:bg-accent/80">
            <BookCopy className="mr-3" />
            My Tests
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base py-6 text-slate-600 hover:text-primary">
            <Dumbbell className="mr-3" />
            Practice
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base py-6 text-slate-600 hover:text-primary">
            <FileText className="mr-3" />
            Test Info
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base py-6 text-slate-600 hover:text-primary">
            <Landmark className="mr-3" />
            Institutions
          </Button>
        </nav>
        <div className="px-4 py-4 border-t border-slate-200">
          <Button variant="ghost" className="w-full justify-start text-base py-6 text-slate-600 hover:text-primary">
            <User className="mr-3" />
            My Account
          </Button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
          {children}
        </div>
        <footer className="px-12 py-6 border-t border-slate-200 bg-white">
            <div className="text-center text-sm text-slate-500">
              <p>&copy; {new Date().getFullYear()} JLPT Navigator. All rights reserved.</p>
            </div>
        </footer>
      </main>
    </div>
  );
}
