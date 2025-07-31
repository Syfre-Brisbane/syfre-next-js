import Links from './Footer/Links';
import Navigation from './Footer/Navigation';
import Legal from './Footer/Legal';
import Connect from './Footer/Connect';
import Copyright from './Footer/Copyright';
import SyfreWordmark from './Footer/SyfreWordmark';

export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-white py-12 sm:py-20">
      <SyfreWordmark />
      {/* Footer Links */}
      <div className="px-4 sm:px-10">
        {/* Mobile: 2x2 Grid layout */}
        <div className="grid grid-cols-2 gap-8 mb-10 sm:hidden">
          <Links />
          <Navigation />
          <Connect />
          <Legal />
        </div>
        
        {/* Desktop: Horizontal layout */}
        <div className="hidden sm:flex justify-between gap-8 lg:gap-16 xl:gap-64 mb-10">
          <Links />
          <Navigation />
          <Legal />
          <Connect />
        </div>
        
        <Copyright />
      </div>
    </footer>
  );
}