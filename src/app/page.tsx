import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { HeroServicesStage } from '@/components/scroll/HeroServicesStage';
import { ServicesSection } from '@/components/sections/ServicesSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main>
        <HeroServicesStage />
        <div className="-mt-[56px] pb-20 pt-0 md:-mt-[64px] md:pb-24 xl:-mt-[72px] xl:pb-28">
          <ServicesSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}

