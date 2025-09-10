import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { 
  isTablet, 
  isLargePhone, 
  isMediumPhone, 
  isSmallPhone,
  getContainerPadding,
  getSpacing,
  getButtonHeight,
  getHeroHeight,
  responsiveFont
} from '../utils/responsive';

export const useResponsive = () => {
  const [screenData, setScreenData] = useState(() => ({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription?.remove();
  }, []);

  const deviceType = {
    isTablet: isTablet(),
    isLargePhone: isLargePhone(),
    isMediumPhone: isMediumPhone(),
    isSmallPhone: isSmallPhone(),
  };

  const spacing = {
    container: getContainerPadding(),
    base: getSpacing(),
    small: getSpacing(8),
    medium: getSpacing(16),
    large: getSpacing(24),
  };

  const sizes = {
    buttonHeight: getButtonHeight(),
    heroHeight: getHeroHeight(),
  };

  const typography = {
    title: responsiveFont(28),
    heading: responsiveFont(24),
    subheading: responsiveFont(20),
    body: responsiveFont(16),
    caption: responsiveFont(14),
    small: responsiveFont(12),
  };

  return {
    ...screenData,
    ...deviceType,
    spacing,
    sizes,
    typography,
  };
};

export default useResponsive; 