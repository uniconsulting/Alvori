import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import RequestPageClient from './RequestPageClient';

export default function RequestPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />

      <main>
        <Suspense fallback={null}>
          <RequestPageClient />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

