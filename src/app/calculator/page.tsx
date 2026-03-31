import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <main className="py-6 md:py-8">
        <Container>
          <Card className="p-6 md:p-8">
            <SectionHeading title="calculator" description="Страница-заглушка для расширенного калькулятора грузоперевозки в проекте «Алвори»." />
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
