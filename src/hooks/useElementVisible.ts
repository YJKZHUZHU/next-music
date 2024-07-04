import { useState, useEffect, useRef } from 'react';

// useIsVisible Hook
function useElementVisible<T extends HTMLElement>(): [boolean, React.RefObject<T>] {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (elementRef.current) {
      const checkVisibility = () => {
        const rect = elementRef.current?.getBoundingClientRect()!;
        const isVisibile = rect.top >= 0 &&
                           rect.left >= 0 &&
                           rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                           rect.right <= (window.innerWidth || document.documentElement.clientWidth);
        setIsVisible(isVisibile);
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting);
        });
      }, {
        root: null, // 相对于浏览器窗口进行检测
        rootMargin: '0px',
        threshold: 0.1 // 10% 可见时触发
      });

      observer.observe(elementRef.current);
      
      return () => {
        observer.disconnect();
      };
    }
  }, []); // Empty dependency array to ensure this effect runs only on mount

  return [isVisible, elementRef];
}

export default useElementVisible;