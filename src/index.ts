import { useState, useEffect } from 'react';

interface useInfiniteScrollProps {
  targetRef: React.RefObject<HTMLElement>;
  onLoadMore: () => void;
  options?: IntersectionObserverInit;
}

const defaultOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.25,
};

const useInfiniteScroll = ({
  targetRef,
  onLoadMore,
  options = defaultOptions,
}: useInfiniteScrollProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(entries => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        onLoadMore();
      } else {
        setIsVisible(false);
      }
    }, options);

    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
      observer.disconnect();
    };
  }, [targetRef, options, onLoadMore]);

  return [isVisible];
};

export default useInfiniteScroll;
