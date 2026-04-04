'use client';

type LoaderLogoProps = {
  src: string;
  alt?: string;
  isExiting?: boolean;
};

export function LoaderLogo({
  src,
  alt = 'Алвори',
  isExiting = false,
}: LoaderLogoProps) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'translateY(-8px) scale(0.985)' : 'translateY(0) scale(1)',
        transition:
          'opacity 520ms cubic-bezier(0.22,1,0.36,1), transform 520ms cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="absolute h-[148px] w-[148px] rounded-full bg-[rgba(250,176,33,0.11)] blur-[42px]" />
      <div className="absolute h-[186px] w-[186px] rounded-full border border-[rgba(38,41,46,0.06)]" />

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
