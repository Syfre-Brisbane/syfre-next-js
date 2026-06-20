import Links from './Footer/Links';
import { NavigationCol1, NavigationCol2 } from './Footer/Navigation';
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
          <NavigationCol1 />
          <NavigationCol2 />
          <div className="flex flex-col gap-8">
            <Connect />
            <Legal />
          </div>
        </div>

        {/* Desktop: Horizontal layout */}
        <div className="hidden sm:flex justify-between gap-8 lg:gap-16 xl:gap-40 mb-10">
          <Links />
          <NavigationCol1 />
          <NavigationCol2 />
          <Legal />
          <Connect />
        </div>

        <Copyright />
      </div>
    </footer>
  );
}
