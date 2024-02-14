
import { useEffect, useRef } from 'react';

const useCustomEffect = (effect, deps) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return effect();
  }, deps);
};

export default useCustomEffect;
