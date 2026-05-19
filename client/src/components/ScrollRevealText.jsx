import React, { useRef, useEffect, useState } from 'react';

const ScrollRevealText = ({ text }) => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start revealing when the element enters from the bottom (90% of screen height)
      // Fully revealed when the element is 25% from the top of the screen
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.25;

      const currentProgress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const words = text.split(' ');
  const totalWords = words.length;

  return (
    <span ref={containerRef} className="inline-block">
      {words.map((word, idx) => {
        // Calculate relative progress for each word
        const startThreshold = idx / totalWords;
        // Extend end threshold slightly so transition is smooth and overlaps
        const endThreshold = Math.min(1, (idx + 2) / totalWords);
        
        let wordProgress = 0;
        if (progress > startThreshold) {
          wordProgress = (progress - startThreshold) / (endThreshold - startThreshold);
          wordProgress = Math.max(0, Math.min(1, wordProgress));
        }

        // Interpolate opacity from 0.15 (muted) to 1.0 (fully active)
        const opacity = 0.15 + wordProgress * 0.85;

        return (
          <span 
            key={idx} 
            className="inline-block mr-[0.25em] transition-opacity duration-75 ease-out"
            style={{ 
              opacity,
              // Apply orange color to the first 7 words ("We've helped businesses eliminate critical vulnerabilities,")
              color: idx < 7 ? 'var(--brand-primary)' : 'var(--text-main)',
              fontWeight: idx < 7 ? '700' : '300'
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};

export default ScrollRevealText;
