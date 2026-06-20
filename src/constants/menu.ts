export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

export const HEADER_MENU: MenuItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Governance',
    href: '/governance',
  },
  {
    label: 'Insights',
    href: '/insights',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];