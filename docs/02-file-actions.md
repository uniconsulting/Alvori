# Список файлов: удалить / перенести / переименовать

## Удаляем как устаревшие секции
- `src/components/sections/Advantages.tsx`
- `src/components/sections/FaqPreview.tsx`
- `src/components/sections/PricingIntro.tsx`
- `src/components/sections/Process.tsx`
- `src/components/sections/SectionPlaceholder.tsx`
- `src/components/sections/Services.tsx`
- `src/components/sections/Hero.tsx`

## Удаляем как устаревшие content-файлы после cleanup
- `src/content/advantages.ts`
- `src/content/process.ts`
- `src/content/navigation.ts`

## Переносим в целевую feature-структуру
- `src/components/scroll/HeroServicesStage.tsx` → `src/features/home/sections/hero/HeroServicesStage.tsx`
- `src/components/sections/hero/HeroLeftScene.tsx` → `src/features/home/sections/hero/HeroLeftScene.tsx`
- `src/components/sections/hero/HeroRightScene.tsx` → `src/features/home/sections/hero/HeroRightScene.tsx`
- `src/components/sections/hero/hero-data.ts` → `src/features/home/sections/hero/hero-data.ts`
- `src/components/sections/ServicesSection.tsx` → `src/features/home/sections/services/ServicesSection.tsx`
- `src/components/sections/About.tsx` → `src/features/home/sections/about/AboutSection.tsx`
- `src/components/sections/GeographySection.tsx` → `src/features/home/sections/geography/GeographySection.tsx`
- `src/components/sections/GeographyGlobe.tsx` → `src/features/home/sections/geography/GeographyGlobe.tsx`
- `src/components/sections/geography-data.ts` → `src/features/home/sections/geography/geography-data.ts`
- `src/components/sections/WhyChooseUsSection.tsx` → `src/features/home/sections/why-choose-us/WhyChooseUsSection.tsx`
- `src/components/sections/AutoParkSection.tsx` → `src/features/home/sections/fleet/AutoParkSection.tsx`
- `src/components/sections/AutoParkGallery.tsx` → `src/features/home/sections/fleet/AutoParkGallery.tsx`
- `src/components/sections/ContactsSection.tsx` → `src/features/home/sections/contacts/ContactsSection.tsx`

## Выносим в config
- `src/content/navigation.ts` → `src/config/anchors.ts`
- карта маршрутов → `src/config/routes.ts`
