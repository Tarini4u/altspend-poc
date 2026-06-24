/**
 * AltSpend — Production UI Controller Bridge
 */

window.activeLoadingInterval = null;
window.cachedEmiOptions = [];
window.currentProductUrl = "";

// Campaign alerts tracker configuration arrays
const campaignAlerts = [
    {
        text: "Prime Day coming on 25 June! Check your EMI options now.",
        bgClass: ["bg-gradient-to-r", "from-amber-500", "to-orange-600", "text-white"],
        badgeClass: ["text-[10px]", "uppercase", "tracking-wider", "bg-white/20", "text-white", "px-2", "py-0.5", "rounded", "mr-2"],
        emoji: "⏰"
    },
    {
        text: "Flipkart Big Billion Days coming on 2-Oct! Uncover hidden interest rates early.",
        bgClass: ["bg-gradient-to-r", "from-blue-600", "to-blue-800", "text-white"],
        badgeClass: ["text-[10px]", "uppercase", "tracking-wider", "bg-yellow-400", "text-blue-900", "px-2", "py-0.5", "rounded", "mr-2", "font-black"],
        emoji: "🛍️"
    }
];
let currentCampaignIndex = 0;

function updateCampaignTicker() {
    const container = document.getElementById('hotDealsContainer');
    const bar = document.getElementById('hotDealsBar');
    const badge = document.getElementById('hotDealsBadge');
    const msg = document.getElementById('campaignMessage');
    const emoji = document.getElementById('hotDealsEmoji');

    if (!container || !bar || !badge || !msg) return;

    const active = campaignAlerts[currentCampaignIndex];
    container.className = `bg-white border ${active.borderClass} rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm relative overflow-hidden`;
    bar.className = `absolute top-0 left-0 w-full h-1 ${active.barClass.join(' ')}`;
    badge.className = `text-[10px] font-bold px-2 py-0.5 rounded border ${active.badgeClass.join(' ')}`;

    msg.innerText = active.text;
    if (emoji) emoji.innerText = active.emoji;

    currentCampaignIndex = (currentCampaignIndex + 1) % campaignAlerts.length;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('financeFormContainer').innerHTML = window.FinanceFormComponent.render();
    updateCampaignTicker();
    setInterval(updateCampaignTicker, 6000);
});

window.toggleAuthModal = function () {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
};

window.resetInterfaceState = function () {
    if (window.activeLoadingInterval) {
        clearInterval(window.activeLoadingInterval);
        window.activeLoadingInterval = null;
    }
    document.getElementById('stateLoading').classList.add('hidden');
    document.getElementById('stateData').classList.add('hidden');
    document.getElementById('apiResultWrapper').classList.add('hidden');
};

function runBufferingMessageLoop() {
    const steps = [
        { h: "Connecting to Marketplace...", s: "Reading structural price parameters..." },
        { h: "Scraping Listing Elements...", s: "Extracting checkout matrix indices..." },
        { h: "Parsing Live Vendor Tables...", s: "Isolating upfront merchant cashbacks..." },
        { h: "Compounding Local GST Layouts...", s: "Exposing hidden bank interest calculations..." },
        { h: "Finalizing Optimal Options...", s: "Arranging lowest out-of-pocket metrics..." }
    ];
    let index = 0;
    const hNode = document.getElementById('loadingHeader');
    const sNode = document.getElementById('loadingSubtext');

    window.activeLoadingInterval = setInterval(() => {
        index = (index + 1) % steps.length;
        if (hNode) hNode.innerText = steps[index].h;
        if (sNode) sNode.innerText = steps[index].s;
    }, 1500);
}

window.triggerUrlAudit = async function () {
    const urlInput = document.getElementById('productUrlInput').value.trim();
    if (!urlInput) {
        alert('Please paste a valid product link address first.');
        return;
    }

    window.currentProductUrl = urlInput;
    const emiCardsContainer = document.getElementById('emiCardsContainer');

    document.getElementById('apiResultWrapper').classList.remove('hidden');
    document.getElementById('stateData').classList.add('hidden');
    document.getElementById('stateLoading').classList.remove('hidden');

    runBufferingMessageLoop();

    try {
        const payload = await window.ApiService.fetchAudit(urlInput);
        if (window.activeLoadingInterval) clearInterval(window.activeLoadingInterval);

        if (payload.success && payload.audited_emi_options && payload.audited_emi_options.length > 0) {
            window.cachedEmiOptions = payload.audited_emi_options;

            // 🌟 POINT 4: Extract structural extremes from entire array dataset
            const absoluteLowestEmi = Math.min(...payload.audited_emi_options.map(o => o.nominal_monthly_emi));
            const globalOptimalPremium = Math.min(...payload.audited_emi_options.map(o => o.real_premium_over_sticker));

            document.getElementById('metaStickerPrice').innerText = `₹${payload.sticker_price.toLocaleString('en-IN')}`;
            document.getElementById('metaLowestEmi').innerText = `Lowest EMI: ₹${Math.round(absoluteLowestEmi).toLocaleString('en-IN')}/mo`;
            
            const fullTitle = payload.title || "Marketplace Product Item Block";
            document.getElementById('metaProductName').innerText = fullTitle.length > 30 ? fullTitle.substring(0, 30) + "..." : fullTitle; 
            document.getElementById('metaProductPhoto').src = payload.product_image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120";

            emiCardsContainer.innerHTML = '';

            // 🌟 POINT 1: Filter unique banks, retaining the variation that contains the absolute lowest emi profile row
            const uniqueBankMap = {};
            payload.audited_emi_options.forEach(option => {
                if (!uniqueBankMap[option.bank] || option.nominal_monthly_emi < uniqueBankMap[option.bank].nominal_monthly_emi) {
                    uniqueBankMap[option.bank] = option;
                }
            });
            let processedUniqueOptions = Object.values(uniqueBankMap);

            // 🌟 POINT 2: Order layout items sequentially from Low to High EMI amounts
            processedUniqueOptions.sort((a, b) => a.nominal_monthly_emi - b.nominal_monthly_emi);

            processedUniqueOptions.forEach((option, index) => {
                const incomeNode = document.getElementById('userIncome');
                const emiNode = document.getElementById('userCurrentEmi');
                const incomeVal = incomeNode ? parseFloat(incomeNode.value) || 0 : 0;
                const activeEmiVal = emiNode ? parseFloat(emiNode.value) || 0 : 0;

                let safetyBadgeHtml = '';
                if (incomeVal > 0) {
                    const combinedCommitment = activeEmiVal + option.nominal_monthly_emi;
                    const dtiRatio = (combinedCommitment / incomeVal) * 100;
                    safetyBadgeHtml = dtiRatio > 35
                        ? `<span class="text-[9px] bg-rose-100 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded font-black">⚠️ DTI RISK</span>`
                        : `<span class="text-[9px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-black">✓ SAFE RATE</span>`;
                }

                // A target unique entry maintains highlight if it or any sister option maps to our global optimal marker index
                const representsBestDeal = option.real_premium_over_sticker === globalOptimalPremium;

                const rowHtml = window.AuditCardComponent.renderRow(option, index, representsBestDeal, safetyBadgeHtml);
                emiCardsContainer.insertAdjacentHTML('beforeend', rowHtml);
            });

            document.getElementById('stateLoading').classList.add('hidden');
            document.getElementById('stateData').classList.remove('hidden');
        } else {
            alert('The execution worker returned an invalid payload.');
            window.resetInterfaceState();
        }
    } catch (err) {
        alert(`Scraper Node Communication Exception: ${err.message}`);
        window.resetInterfaceState();
    }
};

// 🌟 POINT 3: Multi-Tenure Audit Modal Grid Template Builder
window.openPricingProfile = function (bankName) {
    const multiTenureOptions = window.cachedEmiOptions.filter(o => o.bank === bankName);
    if (!multiTenureOptions.length) return;

    // Ascending structural order sorting (3 Months -> 6 Months -> 9 Months, etc.)
    multiTenureOptions.sort((a, b) => a.tenure_months - b.tenure_months);

    document.getElementById('popBankName').innerText = `${bankName} Matrix Analysis`;
    document.getElementById('popStrategy').innerText = `Comparison overview of accessible card terms`;

    let dataTableHtml = `
        <div class="overflow-x-auto border border-slate-200/60 rounded-xl bg-white shadow-xs">
            <table class="w-full text-left border-collapse min-w-[540px]">
                <thead>
                    <tr class="border-b border-slate-200 bg-slate-50 text-[10px] text-slate-500 uppercase tracking-wider font-black">
                        <th class="p-2.5">Term</th>
                        <th class="p-2.5">Monthly EMI</th>
                        <th class="p-2.5 text-emerald-600">Merchant Disc.</th>
                        <th class="p-2.5 text-rose-500">Interest GST</th>
                        <th class="p-2.5 text-rose-500">Proc. Fee</th>
                        <th class="p-2.5 bg-blue-50/50 text-slate-800">Net Cost</th>
                        <th class="p-2.5 text-orange-600">Premium Over Sticker</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-150 text-[11px] font-bold text-slate-700">
    `;

    multiTenureOptions.forEach(opt => {
        dataTableHtml += `
            <tr class="hover:bg-slate-50/80 transition-all">
                <td class="p-2.5 text-slate-900 font-black">${opt.tenure_months} Mo</td>
                <td class="p-2.5 text-blue-600 font-black">₹${Math.round(opt.nominal_monthly_emi).toLocaleString('en-IN')}/mo</td>
                <td class="p-2.5 text-emerald-600 font-black">-₹${Math.round(Math.abs(opt.upfront_marketplace_discount)).toLocaleString('en-IN')}</td>
                <td class="p-2.5 text-rose-500">+₹${Math.round(opt.hidden_bank_interest_gst).toLocaleString('en-IN')}</td>
                <td class="p-2.5 text-rose-500">+₹${Math.round(opt.processing_fee_inclusive_gst).toLocaleString('en-IN')}</td>
                <td class="p-2.5 bg-blue-50/30 text-slate-900 font-black">₹${Math.round(opt.true_net_out_of_pocket).toLocaleString('en-IN')}</td>
                <td class="p-2.5 text-orange-600 font-black">₹${Math.round(opt.real_premium_over_sticker).toLocaleString('en-IN')}</td>
            </tr>
        `;
    });

    dataTableHtml += `
                </tbody>
            </table>
        </div>
    `;
    
    document.getElementById('popBreakdownContent').innerHTML = dataTableHtml;

    const baseReference = multiTenureOptions[0];
    const platform = window.currentProductUrl.includes('flipkart') ? 'Flipkart' : 'Amazon';
    
    const buyBtn = document.getElementById('affiliateBuyBtn');
    buyBtn.href = `https://www.anrdoezrs.net/click?sid=altspend-affiliate&url=${encodeURIComponent(window.currentProductUrl)}`;
    buyBtn.innerText = `🛒 Buy on ${platform}`;

    const bankBtn = document.getElementById('bankApplyCardBtn');
    bankBtn.href = `https://www.cardexpert.in/apply-${baseReference.bank.toLowerCase().split(' ')[0]}-credit-card/`;
    bankBtn.innerText = `💳 Apply ${baseReference.bank.split(' ')[0]} Card`;

    const modal = document.getElementById('pricingModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closePricingModal = function () {
    const modal = document.getElementById('pricingModal');
    if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }
};