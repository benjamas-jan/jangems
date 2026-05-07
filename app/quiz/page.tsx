import type { Metadata } from 'next';
import QuizApp from './QuizApp';

export const metadata: Metadata = {
  title: 'Quiz · JanGems',
  description: 'ตอบ 3 คำถามเพื่อค้นหาพลอยมงคลของคุณตามตำราโหราศาสตร์ไทย',
};

export default function QuizPage() {
  return <QuizApp />;
}
