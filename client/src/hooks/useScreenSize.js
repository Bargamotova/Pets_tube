import { useState, useEffect } from 'react';
const useScreenWidth = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth })
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []);
  return screenSize;
};
export default useScreenWidth;
