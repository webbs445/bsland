export default function PartnerGrid() {
    const partners = [
        'DED Dubai', 'DMCC', 'IFZA', 'RAKEZ', 'Meydan',
        'JAFZA', 'DAFZA', 'SHAMS', 'SPC', 'Hamriyah'
    ];

    return (
        <section className="bg-white py-16 px-8 border-b border-brand-navy/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex-shrink-0">
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-navy/40 mb-2">Authorized Partners</div>
                        <div className="h-px bg-brand-copper/30 w-12"></div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-12 gap-y-8 w-full">
                        {partners.map((partner) => (
                            <div key={partner} className="flex items-center justify-center p-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group">
                                <span className="text-sm font-header font-black tracking-tight text-brand-navy group-hover:text-brand-copper transition-colors">{partner}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
