import React, { useState } from 'react';
import { X, MapPin, ExternalLink, Check, Settings2 } from 'lucide-react';
import { STORE_INFO, validateMapsConfigUrl } from '../utils/storeLogic';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  configuredMapsUrl: string;
  onSaveMapsUrl: (newUrl: string) => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  isOpen,
  onClose,
  configuredMapsUrl,
  onSaveMapsUrl,
}) => {
  const [urlDraft, setUrlDraft] = useState(configuredMapsUrl);
  const [error, setError] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateMapsConfigUrl(urlDraft);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setError('');
    onSaveMapsUrl(res.url);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${STORE_INFO.name}, ${STORE_INFO.fullAddress}`);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="directions-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-[#14161B] border border-white/15 p-6 sm:p-8 text-zinc-100 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-amber-400 font-medium">
              Store Location & Google Maps Configuration
            </p>
            <h3 id="directions-modal-title" className="mt-1 text-xl font-semibold text-white">
              Visit {STORE_INFO.displayName}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close directions modal"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verified Store Address Box */}
        <div className="mt-5 p-4 rounded-xl bg-[#0B0C0E] border border-white/10">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">{STORE_INFO.name}</p>
              <p className="mt-1 text-sm text-zinc-300">{STORE_INFO.street}</p>
              <p className="text-sm text-zinc-300">
                {STORE_INFO.city}, {STORE_INFO.state} {STORE_INFO.postalCode}
              </p>
              <p className="text-sm text-zinc-400">{STORE_INFO.country}</p>
              <p className="mt-2 text-xs font-mono-num text-amber-400">
                Phone: {STORE_INFO.phoneDisplay}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyAddress}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {copiedAddress ? 'Address Copied' : 'Copy Address'}
            </button>
          </div>
        </div>

        {/* Status of Exact Google Maps Business Listing URL */}
        <div className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
            <Settings2 className="w-4 h-4 shrink-0" />
            <span>
              {configuredMapsUrl
                ? 'Custom Google Maps Business URL Active'
                : 'Google Maps Listing Placeholder Configuration'}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-zinc-300 leading-relaxed">
            {configuredMapsUrl
              ? 'Your verified Google Maps business link is configured below and ready to open.'
              : 'An exact Google Maps business pin URL has not been supplied yet. Store owners can paste their official Google Maps listing link below, or call the store directly for landmark guidance on Tiruvuru Road.'}
          </p>

          {configuredMapsUrl && (
            <div className="mt-3">
              <a
                href={configuredMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-semibold transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                Open Configured Google Maps Listing
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="mt-5">
          <label
            htmlFor="maps-url-config-input"
            className="block text-xs font-medium text-zinc-300 mb-1.5"
          >
            Store Owner Configuration: Official Google Maps URL
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="maps-url-config-input"
              type="text"
              value={urlDraft}
              onChange={(e) => {
                setUrlDraft(e.target.value);
                setError('');
              }}
              placeholder="Paste verified Google Maps URL (https://maps.app.goo.gl/...)"
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#0B0C0E] border border-white/15 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Save Maps Link
            </button>
          </div>
          {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
          {savedNotice && (
            <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-emerald-400">
              <Check className="w-3.5 h-3.5" />
              Google Maps configuration updated.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
