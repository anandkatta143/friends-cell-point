import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { SeriesCatalogueSummary } from '../../utils/storeLogic';
import { OriginalProductImageFrame } from './OriginalProductImageFrame';

interface SeriesCardProps {
  series: SeriesCatalogueSummary;
  onSelectSeries: (seriesName: string) => void;
}

export const SeriesCard: React.FC<SeriesCardProps> = ({ series, onSelectSeries }) => {
  return (
    <div
      onClick={() => onSelectSeries(series.seriesName)}
      className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/50 hover:shadow-xl cursor-pointer"
    >
      <div>
        <OriginalProductImageFrame
          imageSrc={series.representativeImage}
          altText={
            series.representativeModel
              ? `${series.seriesName} - ${series.representativeModel}`
              : series.seriesName
          }
          brandLabel={series.brandName}
          modelOrCategoryLabel={series.seriesName}
          theme="light"
          showViewDetailsHint={false}
        />

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-zinc-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-700">
              <Layers className="h-3 w-3 text-amber-600" />
              {series.brandName} Series
            </span>
            {series.modelCount > 0 && (
              <span className="rounded-md border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                {series.modelCount} {series.modelCount === 1 ? 'Model' : 'Models'}
              </span>
            )}
          </div>

          <h3 className="mt-3 font-display text-base sm:text-lg font-bold tracking-tight text-zinc-950 group-hover:text-amber-700 transition-colors">
            {series.seriesName}
          </h3>

          {series.representativeModel && (
            <p className="mt-1 text-xs text-zinc-500 truncate">
              Includes {series.representativeModel} & more
            </p>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
            {series.currentModelCount > 0 && (
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/70 font-semibold">
                {series.currentModelCount} Current
              </span>
            )}
            {series.previousModelCount > 0 && (
              <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/80 font-medium">
                {series.previousModelCount} Previous Models
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-zinc-100">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectSeries(series.seriesName);
          }}
          className="inline-flex w-full items-center justify-between rounded-xl bg-zinc-950 hover:bg-zinc-800 px-4 py-2.5 text-xs font-semibold text-white transition-colors cursor-pointer"
        >
          <span>View All Models</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
