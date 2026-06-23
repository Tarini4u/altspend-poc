window.FinanceFormComponent = {
    render: function() {
        return `
            <div id="dynamicCampaignTicker" class="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-3 rounded-2xl shadow-md flex items-center gap-3 text-xs sm:text-sm font-bold animate-pulse">
                <span class="text-base sm:text-lg">⏰</span>
                <div class="flex-1 truncate">
                    <span class="uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-[10px] mr-2">Hot Deal Event</span>
                    <span id="campaignMessage">Amazon Prime Day starts in 2 Days! Check your EMI options now.</span>
                </div>
            </div>

            <div class="bg-white border border-slate-200 p-4 sm:p-6 rounded-3xl shadow-lg space-y-6">
                <div class="space-y-3">
                    <label class="block text-xs uppercase tracking-wider text-blue-600 font-black">Smart Offer Price Checker</label>
                    <div class="flex flex-col sm:flex-row gap-2">
                        <input id="productUrlInput" type="text" placeholder="Paste your Amazon or Flipkart product link here..." class="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 flex-1 transition-all font-medium">
                        <button onclick="window.triggerUrlAudit()" class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md shadow-emerald-500/20 text-sm whitespace-nowrap">
                            Reveal True Pricing
                        </button>
                    </div>
                </div>

                <div id="apiResultWrapper" class="relative min-h-[300px] bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col justify-center">
                    
                    <div id="stateEmpty" class="text-center py-8 space-y-3">
                        <div class="mx-auto w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-sm text-slate-400">🔍</div>
                        <div class="space-y-1">
                            <h4 class="text-sm font-bold text-slate-800">Awaiting Product Link</h4>
                            <p class="text-xs text-slate-500 max-w-sm mx-auto font-medium leading-relaxed">Paste a product shopping link above to uncover processing fees, hidden interest, and real cash discounts.</p>
                        </div>
                    </div>

                    <div id="stateLoading" class="hidden text-center py-12 space-y-4">
                        <div class="mx-auto w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                        <div class="space-y-1">
                            <h4 id="loadingHeader" class="text-sm font-bold text-slate-800">Connecting to Marketplace...</h4>
                            <p id="loadingSubtext" class="text-xs text-slate-500 font-medium animate-pulse">Reading product data matrix...</p>
                        </div>
                    </div>

                    <div id="stateData" class="hidden space-y-6">
                        <div class="border-b border-slate-200 pb-4 flex flex-col gap-3">
                            <div class="flex items-center gap-2">
                                <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">Analysis Found</span>
                            </div>
                            <div class="flex items-start gap-3 w-full bg-white p-3 rounded-xl border border-slate-100">
                                <img id="metaProductPhoto" src="" alt="Product Photo Asset" class="w-16 h-16 object-contain rounded-lg bg-slate-50 border border-slate-150 flex-shrink-0">
                                <div class="flex-1 min-w-0">
                                    <h3 id="metaProductName" class="text-sm font-bold text-slate-900 line-clamp-2 leading-tight">Loading Title Matrix...</h3>
                                    <div class="mt-1">
                                        <span class="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Sticker Price</span>
                                        <p id="metaStickerPrice" class="text-base font-black text-slate-900">₹0</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wide">Best EMI options</h4>
                            <div id="emiCardsContainer" class="flex flex-col gap-2.5">
                                </div>
                        </div>
                    </div>

                </div>
            </div>
        `;
    }
};