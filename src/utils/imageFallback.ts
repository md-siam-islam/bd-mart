import React from 'react';

/**
 * High-reliability default product fallback image
 */
export const DEFAULT_PRODUCT_IMAGE =
  'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&q=80';

/**
 * 100% Offline SVG fallback that never fails or makes network requests
 */
export const FALLBACK_PRODUCT_IMAGE =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22600%22%20viewBox%3D%220%200%20600%20600%22%3E%3Crect%20width%3D%22600%22%20height%3D%22600%22%20fill%3D%22%23f1f5f9%22%2F%3E%3Cg%20transform%3D%22translate(250%2C%20220)%20scale(4)%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%202%203%206v14a2%202%200%200%200%202%202h14a2%202%200%200%200%202-2V6l-3-4z%22%2F%3E%3Cline%20x1%3D%223%22%20y1%3D%226%22%20x2%3D%2221%22%20y2%3D%226%22%2F%3E%3Cpath%20d%3D%22M16%2010a4%204%200%200%201-8%200%22%2F%3E%3C%2Fg%3E%3Ctext%20x%3D%22300%22%20y%3D%22370%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20BlinkMacSystemFont%2C%20sans-serif%22%20font-size%3D%2220%22%20font-weight%3D%22600%22%20fill%3D%22%2364748b%22%20text-anchor%3D%22middle%22%3EBD-Mart%20Product%3C%2Ftext%3E%3C%2Fsvg%3E';

/**
 * Default fallback user avatar
 */
export const DEFAULT_AVATAR_IMAGE =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80';

/**
 * Handle broken image loading gracefully by cascading to fallback image,
 * and if that fails, to inline SVG data URL so it never displays a broken icon.
 */
export const handleProductImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  customFallback: string = DEFAULT_PRODUCT_IMAGE
) => {
  const target = e.currentTarget;
  if (target.dataset.hasFailedSecondTime) {
    target.src = FALLBACK_PRODUCT_IMAGE;
    return;
  }
  if (!target.dataset.hasFailedFirstTime) {
    target.dataset.hasFailedFirstTime = 'true';
    target.src = customFallback;
  } else {
    target.dataset.hasFailedSecondTime = 'true';
    target.src = FALLBACK_PRODUCT_IMAGE;
  }
};

/**
 * Handle broken avatar image loading gracefully
 */
export const handleAvatarError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  const target = e.currentTarget;
  if (!target.dataset.fallbackTried) {
    target.dataset.fallbackTried = 'true';
    target.src = DEFAULT_AVATAR_IMAGE;
  }
};

/**
 * Helper to safely extract a product's primary or secondary image with a default fallback
 */
export const getSafeProductImage = (
  images?: string[],
  index = 0,
  fallback: string = DEFAULT_PRODUCT_IMAGE
): string => {
  if (!images || images.length === 0) return fallback;
  return images[index] || images[0] || fallback;
};
