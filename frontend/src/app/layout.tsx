import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Header from '../components/Header/index';
import Footer from '../components/Footer/index';
import './globals.css';
import ClientProvider from '../components/ClientProvider/ClientProvider';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '-font-open-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Be Kind App',
  description:
    'A platform to manage and share your good deeds with friends. Join the community and spread kindness!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} flex flex-col min-h-screen bg-cover bg-no-repeat bg-fixed`}
      >
        <div className="fixed inset-0 bg-pink-400 opacity-50"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <ClientProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ClientProvider>
        </div>
      </body>
    </html>
  );
}
