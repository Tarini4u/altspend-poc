window.FinanceFormComponent = {
    render: function() {
        return `
            <div id="dynamicCampaignTicker" class="w-full bg-slate-100 border border-slate-200 text-slate-700 px-4 py-3 rounded-2xl shadow-sm flex items-center gap-3 text-xs sm:text-sm font-bold transition-all duration-300">
                <span id="hotDealsEmoji" class="text-base sm:text-lg">🔥</span>
                <div class="flex-1 truncate">
                    <span id="hotDealsBadge" class="uppercase tracking-wider bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[10px] mr-2 font-black border border-slate-300">Live Offers</span>
                    <span id="campaignMessage" class="text-slate-800">Checking for live marketplace events...</span>
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

                <div id="apiResultWrapper" class="hidden relative min-h-[250px] bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col justify-center transition-all duration-300">
                    
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
                                    
                                    <div class="mt-2 space-y-0.5">
                                        <p id="metaLowestEmi" class="text-sm font-black text-blue-600">₹0/mo</p>
                                        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                                            Sticker Price: <span id="metaStickerPrice" class="text-slate-800 font-black normal-case text-xs">₹0</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <h4 class="text-xs font-bold text-slate-500 uppercase tracking-wide">Best Bank Cards EMI Options</h4>
                            <div id="emiCardsContainer" class="flex flex-col gap-2.5"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="pricingModal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 items-center justify-center p-4 transition-all duration-300">
                <div class="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative space-y-5 border border-slate-100 transform scale-100 transition-all duration-300">
                    
                    <button onclick="window.closePricingModal()" class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-600 font-bold transition-all text-xs">
                        ✕
                    </button>

                    <div class="space-y-1 pr-6">
                        <h3 id="popBankName" class="text-sm font-black text-slate-900">Bank Calculations</h3>
                        <p id="popStrategy" class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Strategy Terms Profile</p>
                    </div>

                    <div id="popBreakdownContent" class="text-xs font-medium overflow-hidden"></div>

                    <div class="grid grid-cols-2 gap-3 pt-2">
                        <a id="affiliateBuyBtn" href="#" target="_blank" class="bg-slate-900 hover:bg-slate-800 text-white font-bold text-center py-3.5 rounded-xl transition-all text-xs shadow-md shadow-slate-900/10 block">
                            🛒 Buy Product
                        </a>
                        <a id="bankApplyCardBtn" href="#" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white font-bold text-center py-3.5 rounded-xl transition-all text-xs shadow-md shadow-blue-600/10 block">
                            💳 Apply for Card
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
};