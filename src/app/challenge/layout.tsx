import { BookCopy, Dumbbell, FileText, Landmark, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
             <span className="text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1.29 15.29c-1.39-1.39-2.29-3.27-2.29-5.29s.9-3.9 2.29-5.29c1.39-1.39 3.27-2.29 5.29-2.29c.14 0 .28.01.41.02c-2.33 1.03-3.95 3.3-3.95 5.95s1.62 4.92 3.95 5.95c-.13.01-.27.02-.41.02c-2.02 0-3.9-.9-5.29-2.29z"/></svg>
            </span>
            <span className="text-gray-800">Nihongo Challenge</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          <Button variant="secondary" className="w-full justify-start text-base py-6">
            <BookCopy className="mr-3" />
            My Tests
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base py-6 text-gray-600">
            <Dumbbell className="mr-3" />
            Practice
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base py-6 text-gray-600">
            <FileText className="mr-3" />
            Test Info
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base py-6 text-gray-600">
            <Landmark className="mr-3" />
            Institutions
          </Button>
        </nav>
        <div className="px-4 py-4 border-t border-gray-200">
          <Button variant="ghost" className="w-full justify-start text-base py-6 text-gray-600">
            <User className="mr-3" />
            My Account
          </Button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
          {children}
        </div>
        <footer className="px-12 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-500">
                 <div className="flex gap-4">
                    <Link href="#" className="hover:text-gray-800">Website</Link>
                    <Link href="#" className="hover:text-gray-800">Privacy Policy</Link>
                    <Link href="#" className="hover:text-gray-800">Terms of Use</Link>
                    <span>© Duolingo</span>
                </div>
                <Button variant="outline" className="border-orange-400 text-orange-500 hover:bg-orange-50 hover:text-orange-600">
                  HELP
                </Button>
            </div>
        </footer>
      </main>
    </div>
  );
}