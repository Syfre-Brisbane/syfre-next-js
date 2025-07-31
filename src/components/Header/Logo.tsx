import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image 
        src="/logo.svg" 
        alt="syfre logo" 
        width={120} 
        height={32} 
        className="h-8 w-auto"
      />
    </Link>
  );
}