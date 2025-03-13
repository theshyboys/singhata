import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'สิงห์ท่า ค้าขาย',
  description: 'Scan QR codes to shop products quickly',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="py-4 text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} QR Shop. All rights reserved.
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
