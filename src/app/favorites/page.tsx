import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Heart, Trash2 } from 'lucide-react';

const FavoritesPage = () => {
    // Örnek ürün verileri
    const favoriteProducts = [
        {
            id: 1,
            name: "Oversized Pamuklu T-shirt",
            price: "199.90",
            image: "/images/tisort.jpg",
            category: "Kadın Giyim",
            brand: "Urban Style"
        },
        {
            id: 2,
            name: "Yüksek Bel Jean Pantolon",
            price: "459.90",
            image: "/images/jean.jpg",
            category: "Kadın Giyim",
            brand: "Denim Life"
        },
        {
            id: 3,
            name: "Bağcıklı Spor Ayakkabı",
            price: "899.90",
            image: "/images/ayakkabi.jpg",
            category: "Ayakkabı",
            brand: "SportMax"
        },
        {
            id: 4,
            name: "Deri Crossbody Çanta",
            price: "559.90",
            image: "/images/canta.jpg",
            category: "Aksesuar",
            brand: "Leather Co"
        },
        {
            id: 5,
            name: "Uzun Kollu Gömlek",
            price: "329.90",
            image: "/images/gomlek.jpg",
            category: "Kadın Giyim",
            brand: "Classic Wear"
        },
        {
            id: 6,
            name: "Midi Boy Elbise",
            price: "679.90",
            image: "/images/elbise.jpg",
            category: "Kadın Giyim",
            brand: "Elegant"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-white">Favorilerim</h1>
                <div className="flex items-center gap-2">
                    <Heart className="text-orange-400" size={20} />
                    <span className="text-gray-600">{favoriteProducts.length} ürün</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteProducts.map((product) => (
                    <Card key={product.id} className="group">
                        <CardHeader className="relative p-0">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-96 object-cover rounded-t-lg"
                            />
                            <button
                                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-orange-50 transition-colors"
                                aria-label="Remove from favorites"
                            >
                                <Trash2 className="h-5 w-5 text-orange-400" />
                            </button>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                            <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">
                                {product.name}
                            </h3>
                            <div className="text-sm text-gray-500 mb-2">{product.category}</div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                            <div className="text-lg font-semibold text-orange-400">
                                {product.price} TL
                            </div>
                            <button className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors">
                                Sepete Ekle
                            </button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {favoriteProducts.length === 0 && (
                <div className="text-center py-16">
                    <Heart className="mx-auto text-gray-300 mb-4" size={48} />
                    <h2 className="text-xl font-medium text-gray-800 mb-2">
                        Henüz favorilere eklenen ürün yok
                    </h2>
                    <p className="text-gray-500">
                        Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca ulaşabilirsiniz.
                    </p>
                </div>
            )}
        </div>
    );
};

export default FavoritesPage;