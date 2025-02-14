'use client'

import { useStore } from '@/context/StoreContext';
import { Heart, ShoppingCart, Star, StarHalf, MessageCircle, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import Product from '@/types/product';

interface PageProps {
    params: {
        id: string;
    };
    searchParams?: { [key: string]: string | string[] | undefined };
}

const ProductDetailPage = ({ params, searchParams }: PageProps) => {
    const {
        products,
        favoriteProducts,
        addToFavorites,
        removeFromFavorites,
        addToCart
    } = useStore();

    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const productId = parseInt(params.id);
        const foundProduct = products.find(p => p.id === productId);
        setProduct(foundProduct || null);
        setIsLoading(false);
    }, [params.id, products]);

    // Rest of your component code remains the same...
    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalf key="half" className="w-5 h-5 fill-orange-400 text-orange-400" />);
        }

        return stars;
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold text-gray-900">Ürün bulunamadı</h2>
                    <p className="mt-2 text-gray-500">İstediğiniz ürün mevcut değil veya kaldırılmış olabilir.</p>
                </div>
            </div>
        );
    }

    const isInFavorites = favoriteProducts.some(p => p.id === product.id);

    const handleFavoriteToggle = () => {
        if (isInFavorites) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Üst Kısım - Ürün Detayları */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sol Kısım - Ürün Görseli */}
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[600px] object-cover rounded-lg shadow-md"
                    />
                </div>

                {/* Sağ Kısım - Ürün Bilgileri */}
                <Card className="p-6 space-y-6">
                    {/* Ürün Başlık Bilgileri */}
                    <div>
                        <div className="text-lg text-gray-500 mb-2">{product.brand}</div>
                        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                            {product.name}
                        </h1>
                        <div className="text-lg text-gray-500">{product.category}</div>
                    </div>

                    {/* Ürün Değerlendirme Özeti */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center">
                            {renderStars(product.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                            ({product.reviewCount} değerlendirme)
                        </span>
                    </div>

                    {/* Fiyat */}
                    <div className="text-3xl font-bold text-orange-400">
                        {product.price} TL
                    </div>

                    {/* Butonlar */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            Sepete Ekle
                        </button>
                        <button
                            onClick={handleFavoriteToggle}
                            className={`p-3 rounded-md border ${isInFavorites
                                ? 'bg-orange-50 border-orange-400 text-orange-400'
                                : 'border-gray-300 hover:border-orange-400 hover:text-orange-400'
                                } transition-colors`}
                            aria-label={isInFavorites ? "Favorilerden çıkar" : "Favorilere ekle"}
                        >
                            <Heart
                                className="h-6 w-6"
                                fill={isInFavorites ? "currentColor" : "none"}
                            />
                        </button>
                    </div>

                    {/* Ürün Açıklaması */}
                    <div className="pt-6 border-t">
                        <h2 className="text-xl font-semibold mb-4">Ürün Açıklaması</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Bu kısma ürün açıklaması eklenebilir. Şu an için dummy veriler
                            kullandığımızdan içerik eklenmedi.
                        </p>
                    </div>
                </Card>
            </div>

            {/* Alt Kısım - Değerlendirmeler ve Sorular */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sol Kısım - Değerlendirme Özeti */}
                <Card className="p-6 lg:col-span-1">
                    <h2 className="text-xl font-semibold mb-4">Değerlendirme Özeti</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center">
                                {renderStars(product.rating)}
                            </div>
                            <span className="text-lg font-medium">{product.rating}/5</span>
                        </div>
                        <div className="text-sm text-gray-500">
                            Toplam {product.reviewCount} değerlendirme
                        </div>
                    </div>
                </Card>

                {/* Orta Kısım - Soru & Cevaplar */}
                <Card className="p-6 lg:col-span-1">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Soru & Cevap</h2>
                        <button className="flex items-center gap-2 px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            Soru Sor
                        </button>
                    </div>

                    <div className="space-y-6">
                        {product.questions.map((question) => (
                            <div key={question.id} className="border-b last:border-b-0 pb-4">
                                <div className="flex items-start gap-4 mb-3">
                                    <MessageSquare className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">{question.question}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {question.userName} - {question.date}
                                        </p>
                                    </div>
                                </div>
                                {question.answer && (
                                    <div className="ml-9 pl-4 border-l-2 border-orange-200">
                                        <p className="text-gray-700">{question.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Sağ Kısım - Yorumlar */}
                <Card className="p-6 lg:col-span-1">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Yorumlar</h2>
                        <button className="flex items-center gap-2 px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors">
                            Yorum Yap
                        </button>
                    </div>

                    <div className="space-y-6">
                        {product.reviews.map((review) => (
                            <div key={review.id} className="border-b last:border-b-0 pb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex items-center">
                                        {renderStars(review.rating)}
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {review.date}
                                    </span>
                                </div>
                                <p className="font-medium text-gray-800 mb-1">{review.userName}</p>
                                <p className="text-gray-600">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProductDetailPage;