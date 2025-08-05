// WordPress REST API response types
export interface WordPressPage {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: unknown[];
  acf: Record<string, unknown>; // ACF fields will be here
  _links: unknown;
}

export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  acf: Record<string, unknown>; // ACF fields will be here
  _links: unknown;
}

export interface WordPressMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  description: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: Record<string, {
      file: string;
      width: number;
      height: number;
      mime_type: string;
      source_url: string;
    }>;
  };
  source_url: string;
  _links: unknown;
}

// Hero title structure
export interface HeroTitle {
  part_1?: string;
  part_2?: string;
  highlight?: string;
  part_3?: string;
}

// Positioning text structure
export interface PositioningText {
  part1?: string;
  highlight?: string;
  part2?: string;
}

// Positioning object structure
export interface Positioning {
  part_1?: string;
  highlight?: string;
  part_2?: string;
}

// ACF Image field types (based on return format setting)
export interface ACFImage {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to_this_post: boolean;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: {
    thumbnail: string;
    'thumbnail-width': number;
    'thumbnail-height': number;
    medium: string;
    'medium-width': number;
    'medium-height': number;
    medium_large: string;
    'medium_large-width': number;
    'medium_large-height': number;
    large: string;
    'large-width': number;
    'large-height': number;
    [key: string]: string | number;
  };
}

// Service tile type for new ACF structure
export interface ServiceTile {
  service_image?: number | string | ACFImage;
  service_label?: string;
}

// Logo type for new ACF structure
export interface LogoItem {
  logo?: number | string | ACFImage;
}

// What We Do item type for new ACF structure
export interface WhatWeDoItem {
  image?: number | string | ACFImage;
  title?: string;
  description?: string;
}

// Example ACF field types - customize based on your fields
export interface HomepageACF extends Record<string, unknown> {
  hero_title?: HeroTitle;
  hero_image?: number | string | ACFImage; // Can be ID, URL, or full array depending on ACF return format
  positioning?: Positioning;
  service_tiles?: ServiceTile[];
  logos?: LogoItem[];
  wwd?: WhatWeDoItem[];
  team_image?: number | string | ACFImage;
  services?: Array<{
    title: string;
    description: string;
    icon?: number | string | ACFImage;
  }>;
  testimonials?: Array<{
    name: string;
    company: string;
    quote: string;
    image?: number | string | ACFImage;
  }>;
  // Add more fields as needed
}

export interface HomepageData extends WordPressPage {
  acf: HomepageACF;
}