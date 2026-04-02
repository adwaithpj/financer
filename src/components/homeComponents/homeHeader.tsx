'use client';

import { useCommonStore } from '@/store';
import { useEffect } from 'react';

export function HomeHeader() {
  const welcomeMessage = useCommonStore((state) => state.welcomeMessage);
  const name = useCommonStore((state) => state.name);
  const setWelcomeMessage = useCommonStore((state) => state.setWelcomeMessage);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setWelcomeMessage('Good Morning');
    } else if (hour < 18) {
      setWelcomeMessage('Good Afternoon');
    } else {
      setWelcomeMessage('Good Evening');
    }
  }, [setWelcomeMessage]);

  return (
    <>
      <h1 className="text-4xl font-bold">
        {welcomeMessage}, {name} 👋
      </h1>
      <p className="text-sm text-zinc-500">
        Here is a summary of your finances for the month.
      </p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Overview</h2>
        </div>
      </div>
    </>
  );
}
