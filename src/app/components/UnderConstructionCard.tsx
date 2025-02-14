'use client'
import { Card } from '@/components/ui/card';
import { Construction, ShoppingCart, Heart, User } from 'lucide-react';
import Link from 'next/link';

const UnderConstructionCard = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full p-8 text-center space-y-6">
                <div className="flex justify-center">
                    <Construction className="w-16 h-16 text-orange-400 animate-bounce" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900">
                    Ana Sayfa Yapım Aşamasında
                </h1>

                <p className="text-gray-600 text-lg">
                    Ana sayfamız şu anda geliştirme aşamasındadır. Bu süreçte diğer sayfalarımızı
                    ziyaret edebilirsiniz.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <Link href="/favorites"
                        className="flex items-center justify-center gap-2 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
                        <Heart className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-gray-800">Favorilerim</span>
                    </Link>

                    <Link href="/cart"
                        className="flex items-center justify-center gap-2 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
                        <ShoppingCart className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-gray-800">Sepetim</span>
                    </Link>

                    <Link href="/profile"
                        className="flex items-center justify-center gap-2 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
                        <User className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-gray-800">Profilim</span>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default UnderConstructionCard;