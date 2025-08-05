import Link from 'next/link';
import Logo from './Header/Logo';

import Button from './Button';

export default function Header() {
  return (
    <header className="px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        {/* <div className="hidden md:block">
          <Menu />
        </div> */}
        <div className="flex items-center">
          <Link href="/contact">
            <Button variant="secondary">
              Contact us
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}