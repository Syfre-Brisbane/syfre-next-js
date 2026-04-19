import Link from 'next/link';
import Logo from './Header/Logo';
import Menu from './Header/Menu';
import MobileMenu from './Header/MobileMenu';
import Button from './Button';

export default function Header() {
  return (
    <header className="px-6 py-6 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        <div className="hidden md:block">
          <Menu />
        </div>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden md:block">
            <Button variant="secondary">
              Contact us
            </Button>
          </Link>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
