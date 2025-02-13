'use client'

type CategoryData = {
    [key: string]: {
        [key: string]: string[];
    };
};

const CategoryNavbar = () => {
    const categoryData: CategoryData = {
        'Kadın': {
            'Giyim': ['Elbise', 'Tişört', 'Pantolon', 'Etek', 'Ceket'],
            'İç Giyim': ['Pijama', 'Çorap', 'İç Çamaşırı', 'Spor Giyim'],
            'Ayakkabı': ['Topuklu', 'Spor', 'Bot', 'Sandalet'],
            'Aksesuar': ['Çanta', 'Takı', 'Saat', 'Şal'],
            'Kozmetik': ['Makyaj', 'Parfüm', 'Cilt Bakımı', 'Saç Bakımı'],
            'Spor&Outdoor': ['Spor Giyim', 'Spor Ayakkabı', 'Spor Ekipmanları'],
        },
        'Erkek': {
            'Giyim': ['Tişört', 'Pantolon', 'Gömlek', 'Ceket', 'Takım Elbise'],
            'İç Giyim': ['Pijama', 'Çorap', 'İç Çamaşırı', 'Spor Giyim'],
            'Ayakkabı': ['Günlük', 'Spor', 'Bot', 'Klasik'],
            'Aksesuar': ['Çanta', 'Saat', 'Kemer', 'Cüzdan'],
            'Kişisel Bakım': ['Parfüm', 'Cilt Bakımı', 'Saç Bakımı', 'Tıraş Ürünleri'],
            'Spor&Outdoor': ['Spor Giyim', 'Spor Ayakkabı', 'Spor Ekipmanları'],
        },
        'Anne & Çocuk': {
            'Bebek': ['Bebek Bezi', 'Mama', 'Bebek Giyim', 'Bebek Odası'],
            'Kız Çocuk': ['Giyim', 'Ayakkabı', 'Oyuncak', 'Okul'],
            'Erkek Çocuk': ['Giyim', 'Ayakkabı', 'Oyuncak', 'Okul'],
            'Hamile': ['Giyim', 'Bakım', 'Aksesuar', 'Sağlık'],
            'Oyuncak': ['Eğitici', 'Oyun Setleri', 'Figür', 'Bebek'],
            'Bebek Bakım': ['Banyo', 'Sağlık', 'Güvenlik', 'Beslenme'],
        },
        'Ev & Yaşam': {
            'Sofra': ['Yemek Takımı', 'Çatal Bıçak', 'Bardak', 'Kahvaltı'],
            'Banyo': ['Havlu', 'Bornoz', 'Banyo Seti', 'Aksesuar'],
            'Ev Tekstili': ['Nevresim', 'Perde', 'Halı', 'Yastık'],
            'Mobilya': ['Salon', 'Yatak Odası', 'Çalışma', 'Bahçe'],
            'Aydınlatma': ['Avize', 'Lambader', 'Abajur', 'Led'],
            'Ev Dekorasyon': ['Tablo', 'Vazo', 'Ayna', 'Dekoratif'],
        },
        'Süpermarket': {
            'Temel Gıda': ['Bakliyat', 'Un', 'Şeker', 'Yağ'],
            'İçecek': ['Su', 'Meyve Suyu', 'Gazlı', 'Çay'],
            'Atıştırmalık': ['Çikolata', 'Bisküvi', 'Cips', 'Kuruyemiş'],
            'Kahvaltılık': ['Süt', 'Yumurta', 'Peynir', 'Zeytin'],
            'Temizlik': ['Deterjan', 'Temizleyici', 'Kağıt', 'Sabun'],
            'Kişisel Bakım': ['Şampuan', 'Sabun', 'Diş', 'Hijyen'],
        },
        'Kozmetik': {
            'Makyaj': ['Ruj', 'Fondöten', 'Maskara', 'Far'],
            'Parfüm': ['Kadın', 'Erkek', 'Deodorant', 'Set'],
            'Cilt Bakımı': ['Krem', 'Serum', 'Güneş', 'Temizleme'],
            'Saç Bakımı': ['Şampuan', 'Maske', 'Serum', 'Boyalar'],
            'Kişisel Bakım': ['Epilasyon', 'Bakım', 'Ağız', 'Duş'],
            'Sağlık&Medikal': ['Vitamin', 'Medikal', 'Maske', 'Hijyen'],
        },
        'Ayakkabı & Çanta': {
            'Kadın Ayakkabı': ['Topuklu', 'Spor', 'Bot', 'Sandalet'],
            'Erkek Ayakkabı': ['Günlük', 'Spor', 'Bot', 'Klasik'],
            'Çocuk Ayakkabı': ['Spor', 'Bot', 'Sandalet', 'Babet'],
            'Kadın Çanta': ['Omuz', 'Sırt', 'El', 'Cüzdan'],
            'Erkek Çanta': ['Sırt', 'Evrak', 'Postacı', 'Cüzdan'],
            'Valiz': ['Kabin', 'Büyük', 'Orta', 'Set'],
        },
        'Elektronik': {
            'Bilgisayar/Tablet': ['Laptop', 'Tablet', 'Masaüstü', 'Aksesuar'],
            'Yazıcılar & Projeksiyon': ['Yazıcı', 'Kartuş', 'Projeksiyon', 'Tarayıcı'],
            'Telefon & Aksesuarları': ['Telefon', 'Kılıf', 'Şarj', 'Kulaklık'],
            'TV & Ses Sistemleri': ['Televizyon', 'Hoparlör', 'Kulaklık', 'Ev Sinema'],
            'Beyaz Eşya': ['Buzdolabı', 'Çamaşır', 'Bulaşık', 'Fırın'],
            'Klima ve Isıtıcılar': ['Klima', 'Isıtıcı', 'Vantilatör', 'Nem'],
            'Elektrikli Ev Aletleri': ['Robot', 'Süpürge', 'Ütü', 'Kahve'],
            'Foto & Kamera': ['Fotoğraf', 'Video', 'Lens', 'Aksesuar'],
            'Oyun & Konsolları': ['PS5', 'Xbox', 'Nintendo', 'Oyunlar'],
        },
    };

    return (
        <div className="relative bg-white">
            <nav className="border-b w-full">
                <div className="max-w-7xl mx-auto">
                    <ul className="flex px-4 py-3 gap-8">
                        {Object.keys(categoryData).concat(['Çok Satanlar', 'Flaş Ürünler']).map((category, index) => (
                            <li
                                key={index}
                                className="group relative"
                            >
                                <button
                                    className="peer text-gray-600 hover:text-orange-500 transition-colors whitespace-nowrap py-2"
                                >
                                    {category}
                                    {(category === 'Çok Satanlar' || category === 'Flaş Ürünler') && (
                                        <span className="ml-1 text-xs text-orange-500 font-semibold">Yeni</span>
                                    )}
                                </button>

                                {categoryData[category] && (
                                    <div
                                        className="invisible hover:visible peer-hover:visible absolute left-0 top-full bg-white bg-opacity-95 shadow-lg rounded-b-lg p-6 z-50 min-w-[800px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                                    >
                                        <div className="grid grid-cols-3 gap-8">
                                            {Object.entries(categoryData[category]).map(([subCategory, items], idx) => (
                                                <div key={idx} className="space-y-2">
                                                    <h3 className="font-semibold text-gray-800 border-b pb-2">
                                                        {subCategory}
                                                    </h3>
                                                    <ul className="space-y-1">
                                                        {items.map((item, itemIdx) => (
                                                            <li key={itemIdx}>
                                                                <a
                                                                    href="#"
                                                                    className="text-sm text-gray-600 hover:text-orange-500 block py-1"
                                                                >
                                                                    {item}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default CategoryNavbar;