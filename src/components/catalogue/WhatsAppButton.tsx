import React from 'react';
import { MessageCircle } from 'lucide-react';
import {
  buildWhatsAppUrl,
  buildProductEnquiryWhatsAppMessage,
} from '../../utils/storeLogic';

interface WhatsAppButtonProps {
  productName?: string;
  variantNote?: string;
  customMessage?: string;
  label?: string;
  className?: string;
  variant?: 'amber' | 'dark' | 'outline' | 'emerald';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  productName,
  variantNote,
  customMessage,
  label = 'WhatsApp Enquiry',
  className = '',
  variant = 'amber',
  size = 'md',
  ariaLabel,
}) => {
  const message =
    customMessage ||
    (productName
      ? buildProductEnquiryWhatsAppMessage(productName, variantNote)
      : undefined);

  const href = buildWhatsAppUrl(message);

  const variantClasses: Record<NonNullable<WhatsAppButtonProps['variant']>, string> = {
    amber: 'bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold',
    dark: 'bg-zinc-950 hover:bg-zinc-800 text-white font-semibold',
    outline:
      'bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold',
    emerald: 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold',
  };

  const sizeClasses: Record<NonNullable<WhatsAppButtonProps['size']>, string> = {
    sm: 'px-3 py-2 text-xs rounded-xl gap-1.5',
    md: 'px-4 py-2.5 text-xs sm:text-sm rounded-xl gap-2',
    lg: 'px-6 py-3.5 text-xs sm:text-sm rounded-xl gap-2',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel || (productName ? `WhatsApp Enquiry for ${productName}` : label)}
      className={`inline-flex items-center justify-center transition-colors whitespace-nowrap shrink-0 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      <MessageCircle className="w-3.5 h-3.5 shrink-0" />
      <span>{label}</span>
    </a>
  );
};
