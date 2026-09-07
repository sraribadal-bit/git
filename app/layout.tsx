import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'TechPunjab | Smart Freelance & MSME Platform (Govt. of Punjab)',
  description: 'Next-generation freelance platform connecting PSDM-certified vocational trainees and skilled developers directly with MSMEs. Powered by TechPunjab, Govt. of Punjab.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-canvas text-charcoal flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
