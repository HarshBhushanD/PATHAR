import { Dimensions, PixelRatio } from 'react-native';

// Get device dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Define breakpoints
export const BREAKPOINTS = {
  small: 360,    // Small phones
  medium: 400,   // Medium phones
  large: 500,    // Large phones
  tablet: 768,   // Tablets
  desktop: 1024, // Desktop/Web
};

// Responsive width function
export const wp = (percentage) => {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Responsive height function
export const hp = (percentage) => {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Responsive font scaling
export const responsiveFont = (size) => {
  const scale = SCREEN_WIDTH / 375; // Base width (iPhone X)
  const newSize = size * scale;
  
  if (newSize < 12) return 12; // Minimum font size
  if (newSize > 30) return 30; // Maximum font size
  
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Device type detection
export const isTablet = () => SCREEN_WIDTH >= BREAKPOINTS.tablet;
export const isLargePhone = () => SCREEN_WIDTH >= BREAKPOINTS.large && SCREEN_WIDTH < BREAKPOINTS.tablet;
export const isMediumPhone = () => SCREEN_WIDTH >= BREAKPOINTS.medium && SCREEN_WIDTH < BREAKPOINTS.large;
export const isSmallPhone = () => SCREEN_WIDTH < BREAKPOINTS.medium;

// Responsive spacing
export const getSpacing = (base = 16) => {
  if (isTablet()) return base * 1.5;
  if (isLargePhone()) return base * 1.2;
  if (isSmallPhone()) return base * 0.8;
  return base;
};

// Responsive padding for containers
export const getContainerPadding = () => {
  if (isTablet()) return 32;
  if (isLargePhone()) return 24;
  return 16;
};

// Responsive grid columns
export const getGridColumns = () => {
  if (isTablet()) return 3;
  if (isLargePhone()) return 2;
  return 2;
};

// Responsive card width
export const getCardWidth = (columns = 2, padding = 16, gap = 8) => {
  const totalPadding = padding * 2;
  const totalGap = gap * (columns - 1);
  return (SCREEN_WIDTH - totalPadding - totalGap) / columns;
};

// Responsive hero height
export const getHeroHeight = () => {
  if (isTablet()) return hp(40);
  if (isLargePhone()) return hp(35);
  return hp(32);
};

// Responsive modal width
export const getModalWidth = () => {
  if (isTablet()) return wp(60);
  if (isLargePhone()) return wp(85);
  return wp(90);
};

// Responsive button height
export const getButtonHeight = () => {
  if (isTablet()) return 56;
  if (isLargePhone()) return 52;
  if (isSmallPhone()) return 44;
  return 48;
};

// Screen dimensions
export const SCREEN_DIMENSIONS = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
};

// Responsive utility classes generator
export const getResponsiveClasses = () => {
  const base = 'px-4';
  if (isTablet()) return `${base} px-8`;
  if (isLargePhone()) return `${base} px-6`;
  return base;
};

// Update dimensions on orientation change
let dimensionSubscription = null;

export const subscribeToOrientationChange = (callback) => {
  dimensionSubscription = Dimensions.addEventListener('change', ({ window }) => {
    const { width, height } = window;
    callback({ width, height });
  });
  return dimensionSubscription;
};

export const unsubscribeFromOrientationChange = () => {
  if (dimensionSubscription) {
    dimensionSubscription?.remove();
    dimensionSubscription = null;
  }
}; 