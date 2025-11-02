'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseAnimationTriggerOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number;
}

export const useAnimationTrigger = (options: UseAnimationTriggerOptions = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px',
    delay = 0,
  } = options;

  const [hasTriggered, setHasTriggered] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
  });

  useEffect(() => {
    if (inView && !hasTriggered) {
      if (delay > 0) {
        const timer = setTimeout(() => {
          setHasTriggered(true);
        }, delay);
        return () => clearTimeout(timer);
      } else {
        setHasTriggered(true);
      }
    }
  }, [inView, hasTriggered, delay]);

  return {
    ref,
    inView,
    hasTriggered,
    shouldAnimate: hasTriggered || inView,
  };
};
