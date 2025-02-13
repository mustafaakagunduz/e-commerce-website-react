'use client'

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { User, Package, MapPin, CreditCard, LogOut } from 'lucide-react';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [user, setUser] = useState({
        name: "Ahmet Yılmaz",
        email: "ahmet@example.com",
        phone: "0532 123 45 67",
        orders: [
            {
                id: "ORD123",
                date: "2024-02-10",
                total: "1299.90",
                status: "Teslim Edildi",
                items: [
                    { name: "Oversized T-shirt", quantity: 2, price: "199.90" },
                    { name: "Jean Pantolon", quantity: 1, price: "459.90" }
                ]
            },
            {
                id: "ORD122",
                date: "2024-02-05",
                total: "899.90",
                status: "Teslim Edildi",
                items: [
                    { name: "Spor Ayakkabı", quantity: 1, price: "899.90" }
                ]
            }
        ],
        addresses: [
            {
                id: 1,
                title: "Ev",
                address: "Atatürk Cad. No:123 Daire:4",
                city: "İstanbul",
                district: "Kadıköy",
                phone: "0532 123 45 67"
            },
            {
                id: 2,
                title: "İş",
                address: "İnönü Cad. No:45 Kat:3",
                city: "İstanbul",
                district: "Şişli",
                phone: "0532 123 45 67"
            }
        ]
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Profil Bilgileri</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Ad Soyad</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">E-posta</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Telefon</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={user.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-md focus:outline-none focus:border-orange-400"
                                />
                            </div>
                            <button className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500 transition-colors">
                                Bilgileri Güncelle
                            </button>
                        </div>
                    </Card>
                );
            case 'orders':
                return (
                    <div className="space-y-4">
                        {user.orders.map((order) => (
                            <Card key={order.id} className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="font-semibold">Sipariş #{order.id}</h3>
                                        <p className="text-sm text-gray-600">{order.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-orange-400">{order.total} TL</p>
                                        <p className="text-sm text-green-600">{order.status}</p>
                                    </div>
                                </div>
                                <div className="border-t pt-4">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center py-2">
                                            <span className="text-gray-600">
                                                {item.name} x {item.quantity}
                                            </span>
                                            <span>{item.price} TL</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                );
            case 'addresses':
                return (
                    <div className="space-y-4">
                        {user.addresses.map((address) => (
                            <Card key={address.id} className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold">{address.title}</h3>
                                    <div className="space-x-2">
                                        <button className="text-sm text-orange-400 hover:underline">Düzenle</button>
                                        <button className="text-sm text-red-500 hover:underline">Sil</button>
                                    </div>
                                </div>
                                <p className="text-gray-600">{address.address}</p>
                                <p className="text-gray-600">{address.district}/{address.city}</p>
                                <p className="text-gray-600">{address.phone}</p>
                            </Card>
                        ))}
                        <button className="w-full bg-white text-orange-400 py-2 rounded-md hover:bg-orange-500 hover:text-white transition-colors">
                            Yeni Adres Ekle
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-8 text-white">Hesabım</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sol Menü */}
                <div className="md:col-span-1">
                    <Card className="p-4">
                        <div className="space-y-2">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center gap-2 p-2 rounded-md transition-colors ${activeTab === 'profile' ? 'bg-orange-50 text-orange-400' : 'hover:bg-gray-50'}`}
                            >
                                <User size={20} />
                                <span>Profil Bilgileri</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center gap-2 p-2 rounded-md transition-colors ${activeTab === 'orders' ? 'bg-orange-50 text-orange-400' : 'hover:bg-gray-50'}`}
                            >
                                <Package size={20} />
                                <span>Siparişlerim</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('addresses')}
                                className={`w-full flex items-center gap-2 p-2 rounded-md transition-colors ${activeTab === 'addresses' ? 'bg-orange-50 text-orange-400' : 'hover:bg-gray-50'}`}
                            >
                                <MapPin size={20} />
                                <span>Adreslerim</span>
                            </button>
                            <button
                                className="w-full flex items-center gap-2 p-2 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                            >
                                <LogOut size={20} />
                                <span>Çıkış Yap</span>
                            </button>
                        </div>
                    </Card>
                </div>

                {/* Sağ İçerik */}
                <div className="md:col-span-3">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;