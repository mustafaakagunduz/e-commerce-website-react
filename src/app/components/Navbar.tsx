'use client'
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search, User, Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getFavoritesCount, getCartItemsCount } = useStore();

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo & Brand */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold text-orange-500">
                            SHOPSMART
                        </Link>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 justify-center px-16">
                        <div className="relative w-full max-w-xl">
                            <input
                                type="text"
                                placeholder="Ürün ara..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-400 text-orange-400 placeholder-gray-400"
                            />
                            <button className="absolute right-3 top-2">
                                <Search className="h-5 w-5 text-orange-400" />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Right Icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/profile">
                            <button className="p-2 hover:bg-orange-50 rounded-full">
                                <User className="h-5 w-5 text-gray-600" />
                            </button>
                        </Link>

                        <Link href="/favorites">
                            <button className="p-2 hover:bg-orange-50 rounded-full relative">
                                <Heart className="h-5 w-5 text-gray-600" />
                                <span className="absolute top-0 right-0 h-4 w-4 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center">
                                    {getFavoritesCount()}
                                </span>
                            </button>
                        </Link>
                        <Link href="/cart">
                            <button className="p-2 hover:bg-orange-50 rounded-full relative">
                                <ShoppingCart className="h-5 w-5 text-gray-600" />
                                <span className="absolute top-0 right-0 h-4 w-4 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center">
                                    {getCartItemsCount()}
                                </span>
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-600 hover:bg-orange-50"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-4 py-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ürün ara..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
                            />
                            <button className="absolute right-3 top-2">
                                <Search className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                    </div>
                    <div className="px-4 py-3 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-orange-50 rounded-full">
                                <User className="h-5 w-5 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-orange-50 rounded-full relative">
                                <Heart className="h-5 w-5 text-gray-600" />
                                <span className="absolute top-0 right-0 h-4 w-4 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center">
                                    0
                                </span>
                            </button>
                            <button className="p-2 hover:bg-orange-50 rounded-full relative">
                                <ShoppingCart className="h-5 w-5 text-gray-600" />
                                <span className="absolute top-0 right-0 h-4 w-4 bg-orange-500 rounded-full text-xs text-white flex items-center justify-center">
                                    0
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;