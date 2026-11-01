import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Phone, Check, Copy } from 'lucide-react';
import { STORE_INFO, buildWhatsAppUrl } from '../utils/storeLogic';

export interface EnquiryTarget {
  kind: 'mobile' | 'accessory' | 'product';
  title: string;
  subtitle: string;
  defaultMessage: string;
}

interface EnquiryModalProps {
  target: EnquiryTarget | null;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ target, onClose }) => {
  const [customNote, setCustomNote] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCustomNote('');
    setCopied(false);
  }, [target]);

  if (!target) return null;

  const finalMessage = customNote.trim()
    ? `${target.defaultMessage} (Model / Details: ${customNote.trim()})`
    : target.defaultMessage;

  const whatsappHref = buildWhatsAppUrl(finalMessage);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(finalMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-[#14161B] border border-white/15 p-6 sm:p-8 text-zinc-100 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-amber-400 font-medium">{target.subtitle}</p>
            <h3 id="enquiry-modal-title" className="mt-1 text-xl font-semibold text-white">
              {target.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close price enquiry modal"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/10">
          <p className="text-xs text-zinc-300 leading-relaxed">
            Price on Enquiry · Connect directly with{' '}
            <strong className="text-white">{STORE_INFO.displayName}</strong> on WhatsApp or call{' '}
            <span className="font-mono-num text-amber-400">{STORE_INFO.phoneDisplay}</span> for
            current stock and pricing.
          </p>
        </div>

        <div className="mt-5">
          <label
            htmlFor="enquiry-variant-input"
            className="block text-xs font-medium text-zinc-300 mb-2"
          >
            Optional: Add your phone model, storage, colour or accessory preference
          </label>
          <input
            id="enquiry-variant-input"
            type="text"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="e.g., Model name, 128GB / 256GB, Type-C charger, or case colour"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0C0E] border border-white/15 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <span>WhatsApp Enquiry Message</span>
            <button
              type="button"
              onClick={handleCopyMessage}
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy text'}
            </button>
          </div>
          <div className="p-3 rounded-xl bg-[#0B0C0E] border border-white/10 text-xs text-zinc-200 leading-relaxed">
            {finalMessage}
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            Enquire on WhatsApp
          </a>
          <a
            href={STORE_INFO.telHref}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-colors whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            Call {STORE_INFO.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
};
