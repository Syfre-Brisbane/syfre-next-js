export interface MenuItem {
  label: string;
  href: string;
}

export const HEADER_MENU: MenuItem[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Services',
    href: '/services'
  },
  {
    label: 'Insights',
    href: '/insights'
  },
  {
    label: 'Contact',
    href: '/contact'
  }
];