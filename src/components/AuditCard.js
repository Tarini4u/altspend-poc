window.AuditCardComponent = {
    // Point 6: Refactored Row Item Render Function
    renderRow: function(option, index, isBestDeal, safetyBadgeHtml) {
        const rowBackground = isBestDeal ? "bg-emerald-50/50 border-emerald-300 animate-fadeIn" : "bg-white border-slate-150";
        const bestDealBadge = isBestDeal ? `<span class="text-[9px] bg-emerald-500 text-white font-black px-1.5 py-0.5 rounded shadow-xs">OPTIMAL</span>` : '';
        const shortBankBrand = option.bank.split(' ')[0] || option.bank;

        return `
            <div class="${rowBackground} border rounded-xl px-3 py-3 flex items-center justify-between gap-2 shadow-xs transition-all hover:border-blue-400">
                <div class="flex items-center gap-2 min-w-0">
                    <div class="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-[10px] text-slate-700 flex-shrink-0">
                        ${shortBankBrand.substring(0, 3).toUpperCase()}
                    </div>
                    <div class="min-w-0">
                        <div class="flex items-center gap-1.5 flex-wrap">
                            <h5 class="text-xs font-black text-slate-900 truncate max-w-[100px] sm:max-w-xs">${option.bank}</h5>
                            ${bestDealBadge}
                        </div>
                        <p class="text-[10px] font-bold text-slate-500">${option.tenure_months} Months Term</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-2.5 flex-shrink-0">
                    <div class="hidden sm:block text-right">${safetyBadgeHtml}</div>
                    <div class="text-right">
                        <a href="javascript:void(0)" onclick="window.openPricingProfile(${index})" class="text-xs font-black text-blue-600 underline hover:text-blue-800 block">
                            ₹${Math.round(option.nominal_monthly_emi).toLocaleString('en-IN')}<span class="text-[9px] text-slate-400 font-medium">/mo</span>
                        </a>
                        <span class="text-[9px] text-slate-400 block font-medium">Click to audit</span>
                    </div>
                </div>
            </div>
        `;
    }
};