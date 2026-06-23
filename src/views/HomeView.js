/**
 * AltSpend — Production UI Controller Bridge
 */

// Core Global Framework Intermediary Scopes Setup Context
window.activeLoadingInterval = null;
window.cachedEmiOptions = [];
window.currentProductUrl = "";

// Dynamic Campaign Ticker Array Phrases Row Hook Configuration
const campaignAlerts = [
    "Amazon Prime Day starts in 2 Days! Check your EMI options now.",
    "Flipkart Big Billion Days approaching! Uncover hidden interest rates early.",
    "Festive offers arriving shortly. Optimize your dynamic card reward metrics!"
];
let currentCampaignIndex = 0;

// Initialize layout elements on view engine boot script step
document.addEventListener("DOMContentLoaded", () => {
    //document.getElementById('globalHeader').innerHTML = window.HeaderComponent.render();
    document.getElementById('financeFormContainer').innerHTML = window.FinanceFormComponent.render();
    
    // Begin background interval banner cycler function routing
    setInterval(() => {
        const banner = document.getElementById('campaignMessage');
        if(banner) {
            currentCampaignIndex = (currentCampaignIndex + 1) % campaignAlerts.length;
            banner.innerText = campaignAlerts[currentCampaignIndex];
        }
    }, 6000);
});

window.toggleAuthModal = function() {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
};

window.resetInterfaceState = function() {
    if (window.activeLoadingInterval) {
        clearInterval(window.activeLoadingInterval);
        window.activeLoadingInterval = null;
    }
    document.getElementById('stateLoading').classList.add('hidden');
    document.getElementById('stateData').classList.add('hidden');
    document.getElementById('stateEmpty').classList.remove('hidden');
};

// Point 3: Status micro-string message rotator function step loop logic
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
        if(hNode) hNode.innerText = steps[index].h;
        if(sNode) sNode.innerText = steps[index].s;
    }, 1500);
}

window.triggerUrlAudit = async function() {
    const urlInput = document.getElementById('productUrlInput').value.trim();
    if (!urlInput) {
        alert('Please paste a valid product link address first.');
        return;
    }

    window.currentProductUrl = urlInput;
    const emiCardsContainer = document.getElementById('emiCardsContainer');

    document.getElementById('stateEmpty').classList.add('hidden');
    document.getElementById('stateData').classList.add('hidden');
    document.getElementById('stateLoading').classList.remove('hidden');

    runBufferingMessageLoop();

    try {
        // Run decoupled API infrastructure service layer logic function
        const payload = await window.ApiService.fetchAudit(urlInput);

        if (window.activeLoadingInterval) clearInterval(window.activeLoadingInterval);

        if (payload.success && payload.audited_emi_options && payload.audited_emi_options.length > 0) {
            window.cachedEmiOptions = payload.audited_emi_options;

            // Point 4: Directly update scraped imagery and item name text nodes
            document.getElementById('metaStickerPrice').innerText = `₹${payload.sticker_price.toLocaleString('en-IN')}`;
            document.getElementById('metaProductName').innerText = payload.product_title || "Marketplace Product Item Block";
            document.getElementById('metaProductPhoto').src = payload.product_image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120";

            emiCardsContainer.innerHTML = '';
            const lowestPremium = Math.min(...payload.audited_emi_options.map(o => o.real_premium_over_sticker));

            payload.audited_emi_options.forEach((option, index) => {
                const incomeVal = parseFloat(document.getElementById('userIncome').value) || 0;
                const activeEmiVal = parseFloat(document.getElementById('userCurrentEmi').value) || 0;

                let safetyBadgeHtml = '';
                if (incomeVal > 0) {
                    const combinedCommitment = activeEmiVal + option.nominal_monthly_emi;
                    const dtiRatio = (combinedCommitment / incomeVal) * 100;
                    safetyBadgeHtml = dtiRatio > 35 
                        ? `<span class="text-[9px] bg-rose-100 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded font-black">⚠️ DTI RISK</span>`
                        : `<span class="text-[9px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-black">✓ SAFE RATE</span>`;
                }

                const isBestDeal = option.real_premium_over_sticker === lowestPremium;
                
                // Inject via modular list component architecture layout frame string definition block
                const rowHtml = window.AuditCardComponent.renderRow(option, index, isBestDeal, safetyBadgeHtml);
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

// Point 7: Modal pop-up initialization and parameter parsing method setup
window.openPricingProfile = function(index) {
    const option = window.cachedEmiOptions[index];
    if(!option) return;

    document.getElementById('popBankName').innerText = `${option.bank} Smart Calculations`;
    document.getElementById('popStrategy').innerText = `${option.tenure_months}-Month Strategy Terms Profile Configuration`;

    const breakdownHtml = `
        <div class="flex justify-between border-b border-slate-200/60 pb-1.5"><span class="text-slate-500">Stated Monthly EMI:</span><span class="text-slate-900 font-bold">₹${Math.round(option.nominal_monthly_emi).toLocaleString('en-IN')}/mo</span></div>
        <div class="flex justify-between border-b border-slate-200/60 pb-1.5"><span class="text-slate-500">Upfront Merchant Discount:</span><span class="text-emerald-600 font-bold">-₹${Math.round(Math.abs(option.upfront_marketplace_discount)).toLocaleString('en-IN')}</span></div>
        <div class="flex justify-between border-b border-slate-200/60 pb-1.5"><span class="text-slate-500">Hidden Interest GST:</span><span class="text-rose-500 font-bold">+₹${Math.round(option.hidden_bank_interest_gst).toLocaleString('en-IN')}</span></div>
        <div class="flex justify-between border-b border-slate-200/60 pb-1.5"><span class="text-slate-500">Processing Fee (with GST):</span><span class="text-rose-500 font-bold">+₹${Math.round(option.processing_fee_inclusive_gst).toLocaleString('en-IN')}</span></div>
        <div class="flex justify-between border-b border-slate-200/60 pb-1.5 bg-blue-50/50 p-1 rounded"><span class="text-slate-800 font-bold">Net Out-Of-Pocket:</span><span class="text-slate-900 font-black">₹${Math.round(option.true_net_out_of_pocket).toLocaleString('en-IN')}</span></div>
        <div class="flex justify-between pt-1"><span class="text-slate-600 font-bold">Real Extra Premium Over Sticker:</span><span class="text-orange-600 font-black">₹${Math.round(option.real_premium_over_sticker).toLocaleString('en-IN')}</span></div>
    `;
    document.getElementById('popBreakdownContent').innerHTML = breakdownHtml;

    const platform = window.currentProductUrl.includes('flipkart') ? 'Flipkart' : 'Amazon';
    const affiliateUrl = `https://www.anrdoezrs.net/click?sid=altspend-affiliate&url=${encodeURIComponent(window.currentProductUrl)}`;
    const bankUrl = `https://www.cardexpert.in/apply-${option.bank.toLowerCase().split(' ')[0]}-credit-card/`;

    const buyBtn = document.getElementById('affiliateBuyBtn');
    buyBtn.href = affiliateUrl;
    buyBtn.innerText = `🛒 Buy on ${platform}`;
    
    const bankBtn = document.getElementById('bankApplyCardBtn');
    bankBtn.href = bankUrl;
    bankBtn.innerText = `💳 Apply for ${option.bank.split(' ')[0]} Card`;

    const modal = document.getElementById('pricingModal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closePricingModal = function() {
    const modal = document.getElementById('pricingModal');
    if(modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }
};