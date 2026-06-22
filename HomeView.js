/**
 * AltSpend — Production UI Controller Bridge
 * Core logic and calculations preserved completely. Explicitly bound to the Window 
 * context to prevent scoping loss across mobile/desktop layout boundaries.
 */

// 1. Auth Modal Controller
window.toggleAuthModal = function() {
    const modal = document.getElementById('authModal');
    if (!modal) return;
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
};

// 2. Interface Reset Utility
window.resetInterfaceState = function() {
    document.getElementById('stateLoading').classList.add('hidden');
    document.getElementById('stateData').classList.add('hidden');
    document.getElementById('stateEmpty').classList.remove('hidden');
};

// 3. Core API Caller and DOM Injector
window.triggerUrlAudit = async function() {
    const urlInput = document.getElementById('productUrlInput').value.trim();
    if (!urlInput) {
        alert('Please paste a valid product link address first.');
        return;
    }

    const stateEmpty = document.getElementById('stateEmpty');
    const stateLoading = document.getElementById('stateLoading');
    const stateData = document.getElementById('stateData');
    const emiCardsContainer = document.getElementById('emiCardsContainer');

    stateEmpty.classList.add('hidden');
    stateData.classList.add('hidden');
    stateLoading.classList.remove('hidden');

    try {
        const response = await fetch('https://altspend-backend.onrender.com/api/v1/audit', {
            method: 'POST',
            headers: { 
                'accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ url: urlInput })
        });

        if (!response.ok) throw new Error(`API Transaction Failed (Status: ${response.status})`);
        const payload = await response.json();

        if (payload.success && payload.audited_emi_options && payload.audited_emi_options.length > 0) {
            document.getElementById('metaStickerPrice').innerText = `₹${payload.sticker_price.toLocaleString('en-IN')}`;
            emiCardsContainer.innerHTML = '';

            const lowestPremium = Math.min(...payload.audited_emi_options.map(o => o.real_premium_over_sticker));

            payload.audited_emi_options.forEach(option => {
                const incomeVal = parseFloat(document.getElementById('userIncome').value) || 0;
                const activeEmiVal = parseFloat(document.getElementById('userCurrentEmi').value) || 0;

                let safetyBadgeHtml = '';
                if (incomeVal > 0) {
                    const combinedCommitment = activeEmiVal + option.nominal_monthly_emi;
                    const dtiRatio = (combinedCommitment / incomeVal) * 100;
                    if (dtiRatio > 35) {
                        safetyBadgeHtml = `<span class="text-[10px] bg-rose-100 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded font-bold">⚠️ DTI: ${dtiRatio.toFixed(0)}%</span>`;
                    } else {
                        safetyBadgeHtml = `<span class="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">✓ Safe</span>`;
                    }
                }

                // Light Mode E-commerce Card UI logic
                const isBestDeal = option.real_premium_over_sticker === lowestPremium;
                const borderStyle = isBestDeal 
                    ? "border-emerald-400 bg-emerald-50/30 shadow-md shadow-emerald-100" 
                    : "border-slate-200 bg-white";
                
                const bestDealBadge = isBestDeal 
                    ? `<span class="text-[9px] bg-emerald-500 text-white font-black px-1.5 py-0.5 rounded shadow-sm">★ OPTIMAL</span>` 
                    : '';
                const approximateIrr = option.bank.includes("HDFC") ? "16% p.a." : "13.5% p.a.";

                const cardElement = document.createElement('div');
                cardElement.className = `${borderStyle} border rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all`;
                cardElement.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="flex items-center gap-1.5 mb-1">
                                <h5 class="text-sm font-black text-slate-900">${option.bank}</h5>
                                ${bestDealBadge}
                            </div>
                            <p class="text-[11px] font-bold text-slate-600">${option.tenure_months}-Month Strategy <span class="text-slate-400">@ ${approximateIrr}</span></p>
                        </div>
                        <div class="flex flex-col items-end gap-1.5">
                            <p class="text-sm font-black text-blue-600">₹${Math.round(option.nominal_monthly_emi).toLocaleString('en-IN')}<span class="text-[10px] text-slate-500 font-medium">/mo</span></p>
                            ${safetyBadgeHtml}
                        </div>
                    </div>
                    
                    <div class="border-t border-slate-100 pt-3 space-y-1.5 text-[11px] font-medium">
                        <div class="flex justify-between"><span class="text-slate-500">Upfront Discount:</span><span class="text-emerald-600 font-bold">-₹${Math.round(Math.abs(option.upfront_marketplace_discount)).toLocaleString('en-IN')}</span></div>
                        <div class="flex justify-between"><span class="text-slate-500">Hidden Interest GST:</span><span class="text-rose-500">+₹${Math.round(option.hidden_bank_interest_gst).toLocaleString('en-IN')}</span></div>
                        <div class="flex justify-between"><span class="text-slate-500">Processing Fee:</span><span class="text-rose-500">+₹${Math.round(option.processing_fee_inclusive_gst).toLocaleString('en-IN')}</span></div>
                        <div class="flex justify-between border-t border-slate-100 mt-2 pt-2"><span class="text-slate-700 font-bold">Net Out-Of-Pocket:</span><span class="text-slate-900 font-black">₹${Math.round(option.true_net_out_of_pocket).toLocaleString('en-IN')}</span></div>
                    </div>
                    
                    <div class="text-[10px] ${isBestDeal ? 'bg-emerald-100 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'} px-2 py-2 rounded text-center font-bold border mt-1">
                        Real Premium Over Sticker: <span>₹${Math.round(option.real_premium_over_sticker).toLocaleString('en-IN')}</span>
                    </div>
                `;
                emiCardsContainer.appendChild(cardElement);
            });

            stateLoading.classList.add('hidden');
            stateData.classList.remove('hidden');
        } else {
            alert('The execution worker returned an invalid payload.');
            window.resetInterfaceState();
        }

    } catch (err) {
        alert(`Scraper Node Communication Exception: ${err.message}`);
        window.resetInterfaceState();
    }
};