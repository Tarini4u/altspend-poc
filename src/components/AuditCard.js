window.AuditCardComponent = {
    renderRow: function(option, index, isBestDeal, safetyBadgeHtml) {
        const rowBackground = isBestDeal ? "bg-emerald-50/50 border-emerald-300 animate-fadeIn" : "bg-white border-slate-150";
        const bestDealBadge = isBestDeal ? `<span class="text-[9px] bg-emerald-500 text-white font-black px-1.5 py-0.5 rounded shadow-xs">OPTIMAL</span>` : '';
        const shortBankBrand = option.bank.split(' ')[0] || option.bank;

        
        const logoSlug = shortBankBrand.toLowerCase().replace(/[^a-z0-9]/g, '');
        const targetLocalAssetUrl = `./public/${logoSlug}.png`; 

        return `
            <div class="${rowBackground} border rounded-xl px-3 py-3 flex items-center justify-between gap-2 shadow-xs transition-all hover:border-blue-400">
                <div class="flex items-center gap-2 min-w-0">
                    
                    <!-- Local asset loading container layout -->
                    <div class="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img src="${targetLocalAssetUrl}" alt="${shortBankBrand}" 
                             onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\\'font-black text-[10px] text-slate-700\\'>${shortBankBrand.substring(0, 3).toUpperCase()}</span>';" 
                             class="w-full h-full object-contain p-1">
                    </div>

                    <div class="min-w-0">
                        <div class="flex items-center gap-1.5 flex-wrap">
                            <h5 class="text-xs font-black text-slate-900 truncate max-w-[100px] sm:max-w-xs">${option.bank}</h5>
                            ${bestDealBadge}
                        </div>
                        <p class="text-[10px] font-bold text-slate-500">Starting from ${option.tenure_months} Months Term</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-2.5 flex-shrink-0">
                    <div class="hidden sm:block text-right">${safetyBadgeHtml}</div>
                    <div class="text-right">
                        <a href="javascript:void(0)" onclick="window.openPricingProfile('${option.bank.replace(/'/g, "\\'")}')" class="text-xs font-black text-blue-600 underline hover:text-blue-800 block">
                            ₹${Math.round(option.nominal_monthly_emi).toLocaleString('en-IN')}<span class="text-[9px] text-slate-400 font-medium">/mo</span>
                        </a>
                        <span class="text-[9px] text-slate-400 block font-medium">Compare terms</span>
                    </div>
                </div>
            </div>
        `;
    }
};