window.ApiService = {
    fetchAudit: async function(urlInput) {
        const response = await fetch('https://altspend-backend.onrender.com/api/v1/audit', {
            method: 'POST',
            headers: { 
                'accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ url: urlInput })
        });
        if (!response.ok) throw new Error(`API Transaction Failed (Status: ${response.status})`);
        return await response.json();
    }
};