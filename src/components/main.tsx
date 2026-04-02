'use client';

import { useState } from 'react';
import { Button, Input } from '@cloudflare/kumo';
import { useRouter } from 'next/navigation';
import { useCommonStore } from '@/store';

export default function Main() {
  const router = useRouter();
  const setName = useCommonStore((state) => state.setName);
  const [userName, setUserName] = useState('');

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex w-full max-w-xl flex-col gap-4 px-16">
        <h1 className="text-4xl font-bold">Hi, </h1>
        <Input
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="h-16 rounded-none border border-zinc-800 bg-transparent text-xl text-black dark:border-white dark:text-white"
        />
        <div className="flex justify-end">
          <Button
            type="button"
            variant="secondary"
            className="h-12 w-full justify-center rounded-none !bg-zinc-800 !text-white !ring-0 transition-colors hover:!bg-zinc-700 hover:!text-white focus-visible:!ring-2 focus-visible:!ring-zinc-500 focus-visible:!ring-offset-2 dark:!bg-white dark:!text-black dark:hover:!bg-zinc-200 dark:hover:!text-black dark:focus-visible:!ring-zinc-400"
            onClick={() => {
              setName(userName);
              router.push('/home');
            }}
          >
            <span className="text-lg">Submit</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
