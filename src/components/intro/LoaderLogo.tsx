'use client';

type LoaderLogoProps = {
  src: string;
  alt?: string;
  isExiting?: boolean;
  isVisible?: boolean;
};

export function LoaderLogo({
  src,
  alt = 'Алвори',
  isExiting = false,
  isVisible = true,
}: LoaderLogoProps) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        opacity: isVisible ? (isExiting ? 0 : 1) : 0,
        transform: isVisible
          ? isExiting
            ? 'translateY(-8px) scale(0.985)'
            : 'translateY(0) scale(1)'
          : 'translateY(12px) scale(0.94)',
        filter: isVisible ? (isExiting ? 'blur(6px)' : 'blur(0px)') : 'blur(18px)',
        transition:
          'opacity 900ms cubic-bezier(0.22,1,0.36,1), transform 1100ms cubic-bezier(0.22,1,0.36,1), filter 1100ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="relative flex h-[104px] w-[240px] items-center justify-center md:h-[116px] md:w-[272px]">
        <img
          src={src}
          alt={alt}
          className="block h-full w-full object-contain object-center"
          draggable={false}
        />
      </div>
    </div>
  );
}
