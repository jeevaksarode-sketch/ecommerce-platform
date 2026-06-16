// @ts-ignore: allow global CSS import in layout
import './globals.css';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Horizon E-Market',
  description: 'Modern full-stack e-commerce experience',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600">
              🛒 Horizon E-Market
            </Link>
            <nav className="flex space-x-6 items-center">
              <Link href="/" className="hover:text-blue-600 font-medium text-sm">Storefront</Link>
              <Link href="/admin" className="flex items-center space-x-1 hover:text-red-500 font-medium text-sm text-gray-600">
                <ShieldAlert className="w-4 h-4" />
                <span>Admin Panel</span>
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="border-t bg-white py-6 text-center text-sm text-gray-500">
          &copy; 2026 Horizon E-Market. Built for E-CELL Technical Assessment.
        </footer>
      </body>
    </html>
  );
}