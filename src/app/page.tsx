import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { HeroServicesStage } from '@/components/scroll/HeroServicesStage';
import { GeographySection } from '@/components/sections/GeographySection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import { AutoParkSection } from '@/components/sections/AutoParkSection';
import { ContactsSection } from '@/components/sections/ContactsSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main>
        <HeroServicesStage />

        <section className="hidden xl:block xl:pb-28 xl:pt-12">
          <GeographySection />
        </section>

        <section className="pb-6 pt-18 md:pb-24 md:pt-10 xl:pb-24 xl:pt-10">
          <WhyChooseUsSection />
        </section>

        <section className="pb-6 pt-8 md:pb-8 md:pt-10 xl:pb-8 xl:pt-10">
          <AutoParkSection />
        </section>

        <section className="pb-20 pt-0 md:pb-24 md:pt-0 xl:pb-24 xl:pt-0">
          <ContactsSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
