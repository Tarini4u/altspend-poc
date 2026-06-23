window.HeaderComponent = {
    render: function() {
        return `
            <div class="max-w-6xl mx-auto flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <img src="./public/logo-laser.png" alt="AltSpend Logo Mark" class="h-9 w-9 object-contain rounded-xl shadow-sm border border-slate-100">
                    <span class="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        AltSpend<span class="text-blue-600">.com</span>
                    </span>
                </div>
                <div class="flex items-center gap-3">
                    <span class="hidden sm:inline-flex text-xs bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full font-medium items-center gap-2">
                        <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> Mobile Ready Core
                    </span>
                    <button onclick="window.toggleAuthModal()" class="text-xs bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20">
                        Sign In
                    </button>
                </div>
            </div>
        `;
    }
};