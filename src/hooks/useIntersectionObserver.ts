import { useCallback, useRef } from 'react';

interface IntersectionObserverProps {
  onIntersect?: () => void;
  onLeave?: () => void;
}

export default function useIntersectionObserver({
  onIntersect,
  onLeave,
}: IntersectionObserverProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const targetRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      if (node) {
        observer.current = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              onIntersect?.();
            } else {
              onLeave?.();
            }
          });
        });

        observer.current.observe(node);
      }
    },
    [onIntersect, onLeave]
  );

  return targetRef;
}
