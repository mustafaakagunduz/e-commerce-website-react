'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import Product from '@/types/product';
import CartItem from '@/types/cart';

interface StoreContextType {
    favoriteProducts: Product[];
    cartItems: CartItem[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (id: number) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateCartQuantity: (id: number, quantity: number) => void;
    getFavoritesCount: () => number;
    getCartItemsCount: () => number;
}

// Başlangıç verileri
const initialFavorites = [
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

const initialCartItems = [
    {
        id: 1,
        name: "Oversized Pamuklu T-shirt",
        price: "199.90",
        image: "/images/tisort.jpg",
        category: "Kadın Giyim",
        brand: "Urban Style",
        quantity: 2
    },
    {
        id: 2,
        name: "Yüksek Bel Jean Pantolon",
        price: "459.90",
        image: "/images/jean.jpg",
        category: "Kadın Giyim",
        brand: "Denim Life",
        quantity: 1
    }
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
    const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(initialFavorites);
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const addToFavorites = (product: Product) => {
        setFavoriteProducts(prev => [...prev, product]);
    };

    const removeFromFavorites = (id: number) => {
        setFavoriteProducts(prev => prev.filter(product => product.id !== id));
    };

    const addToCart = (product: Product) => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateCartQuantity = (id: number, quantity: number) => {
        if (quantity < 1) return;
        setCartItems(prev =>
            prev.map(item => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const getFavoritesCount = () => favoriteProducts.length;

    const getCartItemsCount = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <StoreContext.Provider value={{
            favoriteProducts,
            cartItems,
            addToFavorites,
            removeFromFavorites,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            getFavoritesCount,
            getCartItemsCount
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}