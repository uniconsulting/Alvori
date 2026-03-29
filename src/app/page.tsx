import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { HeroServicesStage } from '@/components/scroll/HeroServicesStage';
import { GeographySection } from '@/components/sections/GeographySection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main>
        <HeroServicesStage />

        <section className="pb-20 pt-8 md:pb-24 md:pt-10 xl:pb-28 xl:pt-12">
          <GeographySection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
