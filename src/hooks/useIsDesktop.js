import { useState, useEffect } from 'react';

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  const checkWidth = () => {
    setIsDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener('resize', checkWidth);

    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  }, []);

  return isDesktop;
};

export default useIsDesktop;
