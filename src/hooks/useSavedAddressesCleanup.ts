import { useEffect } from 'react';
import { useSavedAddressesStore } from '@/stores/saved-addresses-store';

export function useSavedAddressesCleanup() {
  const clearExpiredAddresses = useSavedAddressesStore(state => state.clearExpiredAddresses);

  useEffect(() => {
    // Clean up expired addresses on mount
    clearExpiredAddresses();

    // Set up interval to clean up expired addresses every hour
    const intervalId = setInterval(() => {
      clearExpiredAddresses();
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(intervalId);
  }, [clearExpiredAddresses]);
}