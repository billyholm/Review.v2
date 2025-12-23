"use client";

export function BarChart() {
  const todayValue = 150;
  const reviewpeakValue = 975;
  const maxValue = 1000;
  const chartHeight = 300;

  const todayHeight = (todayValue / maxValue) * chartHeight;
  const reviewpeakHeight = (reviewpeakValue / maxValue) * chartHeight;

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-8 items-end justify-center">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between text-xs md:text-sm text-slate-600 shrink-0" style={{ height: `${chartHeight}px` }}>
          <span className="hidden md:inline">Klick per mån</span>
          <div className="flex-1 flex flex-col justify-between">
            <span>1000</span>
            <span>750</span>
            <span>500</span>
            <span>250</span>
            <span>0</span>
          </div>
        </div>

        {/* Bars */}
        <div className="flex-1 flex items-end gap-8 md:gap-12 max-w-lg">
          {/* Today bar */}
          <div className="flex-1 flex flex-col items-center max-w-[120px]">
            <div className="relative w-full" style={{ height: `${chartHeight}px` }}>
              <div
                className="absolute bottom-0 w-full bg-slate-300 rounded-t transition-all duration-500"
                style={{ height: `${todayHeight}px` }}
              ></div>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-700 text-center">Ditt företag idag</p>
          </div>

          {/* ReviewPeak bar */}
          <div className="flex-1 flex flex-col items-center max-w-[120px]">
            <div className="relative w-full" style={{ height: `${chartHeight}px` }}>
              <div
                className="absolute bottom-0 w-full bg-primary-500 rounded-t transition-all duration-500"
                style={{ height: `${reviewpeakHeight}px` }}
              ></div>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-700 text-center">Med ReviewPeak</p>
          </div>
        </div>
      </div>
    </div>
  );
}

