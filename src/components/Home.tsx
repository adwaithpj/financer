'use client';

import { HomeHeader, HomeFirstBox, HomeSecondBox } from './homeComponents';

export function HomePlaceholder() {
  return (
    <div className="flex w-full flex-col gap-4">
      <HomeHeader />
      <HomeFirstBox />
      <HomeSecondBox />
    </div>
  );
}
