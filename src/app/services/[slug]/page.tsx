import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

const titles: Record<string, string> = {
  intercity: 'междугородние перевозки',
  interterminal: 'межтерминальные перевозки',
  expedition: 'экспедиционное направление',
  project: 'проектные перевозки',
  adr: 'опасные грузы',
};

export function generateStaticParams() {
  return Object.keys(titles).map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = titles[slug];

  if (!title) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <main className="py-6 md:py-8">
        <Container>
          <Card className="p-6 md:p-8">
            <SectionHeading
              title={title}
              description="Страница-заглушка для дальнейшего наполнения по направлению в проекте «Алвори»."
            />
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
