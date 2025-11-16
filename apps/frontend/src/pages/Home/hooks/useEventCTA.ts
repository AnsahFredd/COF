import { useState } from 'react';

export const useEventCTA = () => {
  const [activeTab, setActiveTab] = useState<string | null>('mission');

  return {
    activeTab,
    setActiveTab,
  };
};
