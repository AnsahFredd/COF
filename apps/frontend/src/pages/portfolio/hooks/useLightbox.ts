// src/pages/Portfolio/hooks/useLightbox.ts
import { useState } from 'react';

export const useLightbox = () => {
  const [index, setIndex] = useState<number>(-1);

  const open = (i: number) => setIndex(i);
  const close = () => setIndex(-1);

  return { index, open, close };
};
