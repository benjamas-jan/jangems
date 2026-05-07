import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JanGems — พลอยมงคลของคุณ',
  description: 'ค้นพบพลอยมงคลที่เป็นของคุณ ตามตำราโหราศาสตร์ไทย จากเครื่องประดับงานช่างจันทบุรี',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Trirong:wght@300;400;500;600&family=IBM+Plex+Sans+Thai:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="app">{children}</div>
      </body>
    </html>
  );
}
