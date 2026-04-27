import Image from 'next/image';

export default function SyfreWordmark() {
  return (
    <div className="flex items-center justify-center mb-20">
      <Image
        src="/footerwordmark.svg"
        alt="syfre wordmark"
        width={1152}
        height={200}
        className="w-full max-w-6xl h-auto"
      />
    </div>
  );
}
