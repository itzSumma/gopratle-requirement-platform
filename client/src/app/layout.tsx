import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-urbanist',
});

export const metadata: Metadata = {
  title: 'GoPratle - Plan your Event',
  description: 'Connect with verified event planners, artists, and crew.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className={`${urbanist.className} antialiased bg-[#FFFBF8] text-[#1E2024]`}>
        {children}
      </body>
    </html>
  );
}