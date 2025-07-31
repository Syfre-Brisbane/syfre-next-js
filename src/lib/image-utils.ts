import { ACFImage } from '@/types/wordpress';

/**
 * Helper function to extract image URL from various ACF image return formats
 * @param image - Can be ID (number), URL (string), or full ACF image object
 * @returns string URL or empty string if no valid image
 */
export function getImageUrl(image: number | string | ACFImage | undefined): string {
  if (!image) return '';
  
  if (typeof image === 'string') {
    return image;
  }
  
  if (typeof image === 'object' && 'url' in image) {
    return image.url;
  }
  
  return '';
}