import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Container } from '@/components/layout/Container';
import { SectionPlaceholder } from '@/components/sections/SectionPlaceholder';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <Hero />
      <main className="pt-8 md:pt-12">
        <Container>
          <SectionPlaceholder title="услуги" description="Заглушка. Здесь позже появятся карточки услуг и логика подачи." />
          <SectionPlaceholder title="расчёт стоимости" description="Заглушка. Блок будет реализован после этапа hero / trust / services." />
          <SectionPlaceholder title="о компании" description="Заглушка. Контент и композиция будут собираться поэтапно." />
          <SectionPlaceholder title="преимущества" description="Заглушка. Финальная Bento-сетка пока не собирается." />
          <SectionPlaceholder title="как мы работаем" description="Заглушка. Процесс будет добавлен отдельной итерацией." />
          <SectionPlaceholder title="география" description="Заглушка. География будет реализована отдельно." />
          <SectionPlaceholder title="автопарк" description="Заглушка. Техническая подача автопарка будет добавлена позже." />
          <SectionPlaceholder title="faq" description="Заглушка. Аккордеоны будут собраны отдельным этапом." />
          <SectionPlaceholder title="контакты" description="Заглушка. Контактный блок и карта будут реализованы отдельно." />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
