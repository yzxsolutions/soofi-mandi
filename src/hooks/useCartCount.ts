import { useEffect, useState } from 'react';
import { useCartStore } from '@/stores/cart-store';

export function useCartCount() {
  const [isHydrated, setIsHydrated] = useState(false);
  const itemCount = useCartStore((state) => state.itemCount);
  const hasHydrated = useCartStore((state) => state._hasHydrated);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Return 0 during SSR and before hydration to prevent mismatches
  if (!isHydrated || !hasHydrated) {
    return 0;
  }

  return itemCount;
}