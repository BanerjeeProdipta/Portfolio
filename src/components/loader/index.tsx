'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  // Clear lettersRef on every render to avoid duplication
  lettersRef.current = [];

  // Helper to add letters to lettersRef array, typed with HTMLSpanElement | null
  const addToLettersRef = (el: HTMLSpanElement | null) => {
    if (el && !lettersRef.current.includes(el)) {
      lettersRef.current.push(el);
    }
  };

  useEffect(() => {
    // GSAP context scoped to loaderRef
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Letters appear animation
      tl.fromTo(
        lettersRef.current,
        {
          y: 50,
          scale: 0.8,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: 'elastic.out(1, 0.4)', // first number controls bounciness (bigger = more bounce), second number controls how quickly it settles (smaller = faster).
          stagger: 0.1,
        }
      )
        // Letters disappear animation
        .to(
          lettersRef.current,
          {
            y: 50,
            scale: 0.5,
            opacity: 0,
            duration: 1,
            ease: 'elastic.in(1, 0.4)',
            stagger: 0.1,
          },
          '+=0.6'
        )
        // Hide loader container animation
        .to(
          loaderRef.current,
          {
            autoAlpha: 0,
            duration: 1,
            ease: 'power1.inOut',
            pointerEvents: 'none',
          },
          '-=0.4'
        );
    }, loaderRef);

    // Cleanup
    return () => ctx.revert();
  }, []);

  const text = 'Prodipta';

  return (
    <div
      ref={loaderRef}
      className="
    fixed inset-0
    flex justify-center items-center 
    bg-[#111] text-white
    text-3xl lg:text-6xl font-bold
    leading-loose
    select-none
    z-50
  "
    >
      {text.split('').map((letter, index) => (
        <span className="uppercase" key={index} ref={addToLettersRef}>
          {letter}
        </span>
      ))}
    </div>
  );
};

export default Loader;
