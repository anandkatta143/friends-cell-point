import React from 'react';
import { X, Trash2 } from 'lucide-react';
import {
  SmartphoneProduct,
  formatStockStatusBadge,
  formatPublicMopPrice,
  buildPriceListWhatsAppMessage,
  PRICE_CHANGE_DISCLAIMER,
} from '../../utils/storeLogic';
import { OriginalProductImageFrame } from './OriginalProductImageFrame';
import { WhatsAppButton } from './WhatsAppButton';

interface ComparePanelProps {
  isOpen: boolean;
  onClose: () => void;
  items: SmartphoneProduct[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const ComparePanel: React.FC<ComparePanelProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
}) => {
  if (!isOpen || items.length === 0) return null;

  const comparisonRows: Array<{
    label: string;
    render: (phone: SmartphoneProduct) => string;
  }> = [
    {
      label: 'Brand & Series',
      render: (phone) => `${phone.brand} · ${phone.series}`,
    },
    {
      label: 'Model Name',
      render: (phone) => phone.model || phone.modelName,
    },
    {
      label: 'RAM + Storage Variant',
      render: (phone) => phone.variant || 'Check with store',
    },
    {
      label: 'MOP / Retail Price',
      render: (phone) => formatPublicMopPrice(phone.mopPrice, phone.price),
    },
    {
      label: 'Effective Price',
      render: (phone) => phone.effectivePrice || '—',
    },
    {
      label: 'Available Colours',
      render: (phone) =>
        phone.colors && phone.colors.length > 0 ? phone.colors.join(', ') : '—',
    },
    {
      label: '5G / Network',
      render: (phone) => phone.network || 'Check with store',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-2 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-panel-title"
    >
      <div className="relative w-full max-w-6xl my-4 rounded-3xl bg-[#12141C] border border-white/15 text-zinc-100 shadow-2xl overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-[#0B0C0E] border-b border-white/10">
          <div>
            <h3 id="compare-panel-title" className="font-display text-lg font-bold text-white">
              Compare Smartphones ({items.length} of 3 selected)
            </h3>
            <p className="text-xs text-zinc-400">
              {PRICE_CHANGE_DISCLAIMER}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClearAll}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-zinc-300 cursor-pointer"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close comparison table"
              className="p-2 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clean Responsive Comparison Table */}
        <div className="p-4 sm:p-6 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-white/10">
                <th className="w-36 sm:w-44 py-4 px-3 font-semibold text-zinc-400 align-top">
                  Model Overview
                </th>
                {items.map((phone) => (
                  <th key={phone.id} className="py-4 px-3 align-top">
                    <div className="rounded-2xl bg-[#0B0C0E] border border-white/10 overflow-hidden">
                      <div className="relative">
                        <OriginalProductImageFrame
                          imageSrc={phone.productImage || phone.galleryImages?.front}
                          altText={phone.modelName}
                          brandLabel={phone.brand}
                          modelOrCategoryLabel={phone.model || phone.modelName}
                          theme="dark"
                          showViewDetailsHint={false}
                        />
                        <button
                          type="button"
                          onClick={() => onRemoveItem(phone.id)}
                          aria-label={`Remove ${phone.modelName} from comparison`}
                          className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/70 text-zinc-300 hover:text-white cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="p-3.5">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold uppercase text-amber-400">
                            {phone.brand}
                          </span>
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/10 text-zinc-200">
                            {formatStockStatusBadge(phone.availability)}
                          </span>
                        </div>
                        <p className="mt-1 font-display text-sm font-bold text-white">
                          {phone.model || phone.modelName}
                        </p>
                        {phone.variant && (
                          <p className="mt-0.5 text-[11px] font-mono text-amber-300">
                            {phone.variant}
                          </p>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {comparisonRows.map((row) => (
                <tr key={row.label} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-3 font-semibold text-zinc-400">{row.label}</td>
                  {items.map((phone) => {
                    const value = row.render(phone);
                    return (
                      <td
                        key={`${phone.id}-${row.label}`}
                        className={`py-3.5 px-3 font-medium ${
                          value === 'Check with store' || value === '—'
                            ? 'text-zinc-400'
                            : 'text-zinc-100'
                        }`}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="py-4 px-3 font-semibold text-zinc-400">Enquire Now</td>
                {items.map((phone) => {
                  const whatsappMsg = buildPriceListWhatsAppMessage({
                    brand: phone.brand,
                    model: phone.model || phone.modelName,
                    variant: phone.variant || 'Standard',
                    price: formatPublicMopPrice(phone.mopPrice, phone.price),
                  });
                  return (
                    <td key={`${phone.id}-cta`} className="py-4 px-3">
                      <WhatsAppButton
                        customMessage={whatsappMsg}
                        label="Enquire on WhatsApp"
                        size="sm"
                        variant="amber"
                        className="w-full"
                      />
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
