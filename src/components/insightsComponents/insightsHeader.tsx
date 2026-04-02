'use client';

export function InsightsHeader() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Insights</h1>
          <p className="text-sm text-zinc-500">
            Here is a list of your insights.
          </p>
        </div>
      </div>
    </>
  );
}
