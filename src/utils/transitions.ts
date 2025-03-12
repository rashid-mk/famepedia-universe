
import { useEffect } from 'react';

// Spring animation parameters
export const springConfig = {
  stiffness: 300,
  damping: 30,
  mass: 1
};

// Animation variants for elements
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.250, 0.460, 0.450, 0.940] 
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Hook for scroll animations
export function useScrollAnimation() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    const targets = document.querySelectorAll('.scroll-animate');
    targets.forEach(target => observer.observe(target));
    
    return () => {
      targets.forEach(target => observer.unobserve(target));
    };
  }, []);
}

// Function to handle image loading with blur effect
export const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.classList.add('loaded');
};
