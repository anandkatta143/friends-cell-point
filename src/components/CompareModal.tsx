import React from 'react';
import { X, MessageCircle, Trash2 } from 'lucide-react';
import {
  SmartphoneProduct,
  buildWhatsAppUrl,
  buildPhoneModelWhatsAppMessage,
} from '../utils/storeLogic';
import { ProductPhoneStudioRender } from './StudioVisuals';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: SmartphoneProduct[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
}) => {
  if (!isOpen || items.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
    >
      <div className="relative w-full max-w-5xl my-4 rounded-3xl bg-[#12141C] border border-white/15 text-zinc-100 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#0B0C0E] border-b border-white/10">
          <div>
            <h3 id="compare-modal-title" className="font-display text-lg font-bold text-white">
              Compare Smartphones ({items.length})
            </h3>
            <p className="text-xs text-zinc-400">
              Compare series, specifications and enquire directly on WhatsApp
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
              aria-label="Close comparison view"
              className="p-2 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 min-w-[280px]">
            {items.map((phone) => (
              <div
                key={phone.id}
                className="rounded-2xl bg-[#0B0C0E] border border-white/10 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative">
                    <ProductPhoneStudioRender
                      variant={phone.visualVariant}
                      brand={phone.brand}
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveItem(phone.id)}
                      aria-label={`Remove ${phone.modelName} from comparison`}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-zinc-300 hover:text-white cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-5 space-y-2.5 text-xs">
                    <div>
                      <span className="text-amber-400 font-medium">{phone.brand}</span>
                      <h4 className="font-display text-base font-bold text-white mt-0.5">
                        {phone.modelName}
                      </h4>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between">
                      <span className="text-zinc-500">Series</span>
                      <span className="text-zinc-200 font-medium">{phone.series}</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between">
                      <span className="text-zinc-500">Network</span>
                      <span className="text-zinc-200 font-medium">{phone.network}</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between">
                      <span className="text-zinc-500">OS</span>
                      <span className="text-zinc-200 font-medium">{phone.os}</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between">
                      <span className="text-zinc-500">Price</span>
                      <span className="text-amber-400 font-semibold">
                        {phone.price ? `₹${phone.price.toLocaleString('en-IN')}` : 'Check Price'}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between">
                      <span className="text-zinc-500">Status</span>
                      <span className="text-zinc-200">{phone.availability}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-white/10">
                  <a
                    href={buildWhatsAppUrl(
                      buildPhoneModelWhatsAppMessage(phone.brand, phone.modelName)
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Check Price on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
