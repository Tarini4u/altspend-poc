// popup.js
document.getElementById('auditBtn').addEventListener('click', async () => {
  const statusDiv = document.getElementById('status');
  statusDiv.innerText = "Extracting live product context nodes...";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) {
    statusDiv.innerText = "Error: Focus missing on live browser instance.";
    return;
  }

  chrome.tabs.sendMessage(tab.id, { action: "extract_flipkart_emi" }, (data) => {
    if (chrome.runtime.lastError || !data || !data.success) {
      statusDiv.innerText = "Error parsing dynamic fields. Refresh and try again.";
      return;
    }

    const price = data.sticker_price;
    let tableRows = "";

    data.plans.forEach(plan => {
      // Core processing cost algorithms
      const interestSubsidy = price * plan.discountPercent;
      const bankProcessingFee = 199;
      const gstOnInterest = interestSubsidy * 0.18;
      const gstOnFee = bankProcessingFee * 0.18;

      const hiddenLeakageCharges = gstOnInterest + bankProcessingFee + gstOnFee;
      const trueAggregateOutflow = price + hiddenLeakageCharges;

      tableRows += `
        <tr>
          <td class="tenure-cell">
            ${plan.bank}
            <div style="font-size:10px; color:#64748b;">${plan.tenure}</div>
          </td>
          <td>
            <div>Instalment: ₹${plan.monthlyPay.toLocaleString('en-IN')}/m</div>
            <div style="color: #64748b; font-size: 10px;">Subsidy: -₹${Math.round(interestSubsidy).toLocaleString('en-IN')}</div>
          </td>
          <td class="leakage-text">
            +₹${Math.round(hiddenLeakageCharges).toLocaleString('en-IN')}
          </td>
          <td class="effective-price">
            ₹${Math.round(trueAggregateOutflow).toLocaleString('en-IN')}
          </td>
        </tr>
      `;
    });

    statusDiv.innerHTML = `
      <div class="result-box">
        <div class="result-title">Audit Summary</div>
        <div class="price-row">
          <span class="price-label">Live Scraped Price:</span>
          <span class="price-value">₹${price.toLocaleString('en-IN')}</span>
        </div>
        
        <div class="matrix-container">
          <div class="result-title" style="margin-bottom: 4px;">True EMI Cost Matrix</div>
          <table class="emi-table">
            <thead>
              <tr>
                <th>Bank/Tenure</th>
                <th>Payment Loop</th>
                <th>Hidden Cost</th>
                <th>True Price</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>

        <div class="success-msg">
          💡 <b>Audit Insight:</b> Hidden costs include 18% GST on the interest component plus your bank's fixed execution transaction processing fees.
        </div>
      </div>
    `;
  });
});