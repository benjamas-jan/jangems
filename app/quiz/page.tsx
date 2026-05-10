import type { Metadata } from 'next';
import { days, desires } from './data';
import { getSession } from '../lib/auth';
import QuizApp from './QuizApp';

const TITLE = 'Quiz · JanGems';
const DESCRIPTION = 'ตอบ 3 คำถามเพื่อค้นหาพลอยมงคลของคุณตามตำราโหราศาสตร์ไทย';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ d?: string; a?: string; w?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const d = params.d;
  const w = params.w;

  // Only switch to a personalised image when the URL has a valid combo.
  const validDay = !!d && days.some((x) => x.id === d);
  const validDesire = !!w && desires.some((x) => x.id === w);

  if (validDay && validDesire) {
    const day = days.find((x) => x.id === d)!;
    const desire = desires.find((x) => x.id === w)!;
    const ogPath = `/api/og-image?day=${d}&desire=${w}`;

    return {
      title: `${day.gems[0]} · พลอยมงคลของคุณ`,
      description: `ผู้เกิดวัน${day.th} · ${day.porn} · พลอยเสริม${desire.th.split(' ')[0]}: ${desire.gem}`,
      openGraph: {
        title: `${day.gems[0]} · พลอยมงคลของคุณ`,
        description: `ผู้เกิดวัน${day.th} · ${day.porn} · พลอยเสริม${desire.th.split(' ')[0]}: ${desire.gem}`,
        images: [
          {
            url: ogPath,
            width: 1200,
            height: 630,
            type: 'image/png',
            alt: `${day.gems[0]} — พลอยประจำวัน${day.th}`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${day.gems[0]} · พลอยมงคลของคุณ`,
        description: `ผู้เกิดวัน${day.th} · ${day.porn}`,
        images: [ogPath],
      },
    };
  }

  return {
    title: TITLE,
    description: DESCRIPTION,
  };
}

export default async function QuizPage() {
  const session = await getSession();
  return <QuizApp session={session} />;
}
