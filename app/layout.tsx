import type { Metadata } from 'next';
import './globals.css';

const TITLE = 'JanGems — พลอยมงคลของคุณ';
const DESCRIPTION =
  'ค้นพบพลอยมงคลที่เป็นของคุณ ตามตำราโหราศาสตร์ไทย จากเครื่องประดับงานช่างจันทบุรี';

export const metadata: Metadata = {
  metadataBase: new URL('https://jangems.com'),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'JanGems',
    type: 'website',
    locale: 'th_TH',
    url: 'https://jangems.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
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
