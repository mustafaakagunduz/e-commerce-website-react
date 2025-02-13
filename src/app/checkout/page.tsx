'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { Card } from '@/components/ui/card';
import { CreditCard, MapPin, Check, CheckCircle2 } from 'lucide-react';

const CheckoutPage = () => {
    const router = useRouter();
    const { cartItems, getCartItemsCount } = useStore();
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState(3);

    const calculateTotal = () => {
        const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
        const shipping = subtotal > 500 ? 0 : 29.90;
        return {
            subtotal,
            shipping,
            total: subtotal + shipping
        };
    };

    const { subtotal, shipping, total } = calculateTotal();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showModal && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            router.push('/');
        }
        return () => clearInterval(timer);
    }, [showModal, countdown, router]);

    const handleOrderSubmit = () => {
        setShowModal(true);
    };

    return (
        <div className="relative">
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-8 text-white">Ödeme</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sol Taraf - Formlar */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Adres Bilgileri */}
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="text-orange-400" />
                                <h2 className="text-lg font-semibold">Teslimat Adresi</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Ad</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Soyad</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-gray-600 mb-1">Adres</label>
                                    <textarea
                                        rows={3}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">İl</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">İlçe</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Telefon</label>
                                    <input
                                        type="tel"
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">E-posta</label>
                                    <input
                                        type="email"
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Ödeme Bilgileri */}
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="text-orange-400" />
                                <h2 className="text-lg font-semibold">Ödeme Bilgileri</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Kart Üzerindeki İsim</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Kart Numarası</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                        placeholder="**** **** **** ****"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Son Kullanma Tarihi</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                            placeholder="AA/YY"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">CVV</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                            placeholder="***"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sağ Taraf - Sipariş Özeti */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-6">
                            <h2 className="text-lg font-semibold mb-4">Sipariş Özeti</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Ürünler ({getCartItemsCount()} adet)</span>
                                    <span>{subtotal.toFixed(2)} TL</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Kargo</span>
                                    <span>{shipping === 0 ? 'Ücretsiz' : `${shipping.toFixed(2)} TL`}</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between font-semibold">
                                        <span>Toplam</span>
                                        <span className="text-orange-400">{total.toFixed(2)} TL</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleOrderSubmit}
                                    className="w-full mt-4 bg-orange-400 text-white py-3 rounded-md hover:bg-orange-500 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Check size={20} />
                                    Siparişi Onayla
                                </button>
                                <p className="text-xs text-gray-500 text-center mt-2">
                                    Siparişi onaylayarak alışveriş sözleşmesini kabul etmiş olursunuz.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Başarılı Ödeme Modalı */}
            {
                showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 shadow-lg text-center max-w-md w-full mx-4">
                            <div className="mb-4 flex justify-center">
                                <CheckCircle2 size={64} className="text-orange-400" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">
                                Ödeme işlemi başarıyla tamamlanmıştır
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {countdown} saniye içinde ana sayfaya yönlendirileceksiniz
                            </p>
                        </div>
                    </div>
                )
            }

            {/* Karartma Overlay */}
            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
                )
            }
        </div >
    );
};

export default CheckoutPage;