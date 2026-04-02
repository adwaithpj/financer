'use client';

import { useEffect, useRef } from 'react';
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
} from 'chart.js';

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  labels: string[];
  datasets: ChartData<'line'>['datasets'];
  options?: ChartOptions<'line'>;
  /** Chart canvas wrapper; default fixed height for standalone use */
  className?: string;
}

export function LineChart({
  labels,
  datasets,
  options,
  className = 'relative h-72 w-full',
}: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart<'line'> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { position: 'top' } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.05)' } },
          y: { grid: { color: 'rgba(0,0,0,0.05)' } },
        },
        ...options,
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [labels, datasets, options]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
