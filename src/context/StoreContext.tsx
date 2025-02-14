'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Product from '@/types/product';
import CartItem from '@/types/cart';

interface StoreContextType {
    products: Product[];
    favoriteProducts: Product[];
    cartItems: CartItem[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (id: number) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateCartQuantity: (id: number, quantity: number) => void;
    getFavoritesCount: () => number;
    getCartItemsCount: () => number;
    getProductById: (id: number) => Product | undefined;
}

// Tüm ürünlerin listesi
const initialProducts = [
    {
        id: 1,
        name: "Oversized Pamuklu T-shirt",
        price: "199.90",
        image: "/images/tisort.jpg",
        category: "Kadın Giyim",
        brand: "Urban Style",
        rating: 4.5,
        reviewCount: 128,
        description: "Description of the product........",
        questions: [
            {
                id: 1,
                userId: "user1",
                userName: "Ayşe K.",
                question: "Bu ürün yıkamada çekme yapar mı?",
                answer: "Soğuk suda yıkandığında herhangi bir çekme yapmaz.",
                date: "2024-02-10"
            },
            {
                id: 2,
                userName: "Zeynep M.",
                userId: "user2",
                question: "S beden ölçüleri nedir?",
                answer: "S beden: Göğüs 98cm, Boy 68cm",
                date: "2024-02-08"
            }
        ],
        reviews: [
            {
                id: 1,
                userId: "user3",
                userName: "Mehmet A.",
                rating: 5,
                comment: "Kaliteli kumaş, rahat bir ürün. Tam beklediğim gibi.",
                date: "2024-02-12"
            },
            {
                id: 2,
                userId: "user4",
                userName: "Elif Y.",
                rating: 4,
                comment: "Güzel ürün fakat biraz bol kalıyor, bir beden küçük alınabilir.",
                date: "2024-02-01"
            }
        ]
    },
    {
        id: 2,
        name: "Yüksek Bel Jean Pantolon",
        price: "459.90",
        image: "/images/jean.jpg",
        category: "Kadın Giyim",
        brand: "Denim Life",
        rating: 4.8,
        reviewCount: 256,
        description: "Description of the product........",
        questions: [
            {
                id: 1,
                userId: "user5",
                userName: "Selin B.",
                question: "34 beden stoka gelecek mi?",
                answer: "Önümüzdeki hafta 34 beden stoklarımız yenilenecek.",
                date: "2024-02-05"
            },
            {
                id: 2,
                userId: "user6",
                userName: "Merve D.",
                question: "Kumaşı esniyor mu?",
                answer: "Evet, %2 elastan içeriyor ve rahatlıkla esneme sağlıyor.",
                date: "2024-01-28"
            }
        ],
        reviews: [
            {
                id: 1,
                userId: "user7",
                userName: "Büşra K.",
                rating: 5,
                comment: "Tam kalıp, çok rahat. Günlük kullanım için ideal.",
                date: "2024-02-15"
            },
            {
                id: 2,
                userId: "user8",
                userName: "Cansu M.",
                rating: 5,
                comment: "Kaliteli bir ürün, kesinlikle tavsiye ederim.",
                date: "2024-02-10"
            }
        ]
    },
    {
        id: 3,
        name: "Bağcıklı Spor Ayakkabı",
        price: "899.90",
        image: "/images/ayakkabi.jpg",
        category: "Ayakkabı",
        brand: "SportMax",
        rating: 4.2,
        reviewCount: 89,
        description: "Description of the product........",
        questions: [
            {
                id: 1,
                userId: "user9",
                userName: "Ali R.",
                question: "Numarası normal mi yoksa küçük mü kalıyor?",
                answer: "Normal kalıp, kendi numaranızı alabilirsiniz.",
                date: "2024-02-01"
            }
        ],
        reviews: [
            {
                id: 1,
                userId: "user10",
                userName: "Emre S.",
                rating: 4,
                comment: "Çok rahat, günlük kullanım için ideal. Tek eksisi biraz ağır.",
                date: "2024-02-08"
            },
            {
                id: 2,
                userId: "user11",
                userName: "Kaan Y.",
                rating: 5,
                comment: "Uzun süre kullanımda bile ayak yormuyor.",
                date: "2024-01-25"
            }
        ]
    },
    {
        id: 4,
        name: "Deri Crossbody Çanta",
        price: "559.90",
        image: "/images/canta.jpg",
        category: "Aksesuar",
        brand: "Leather Co",
        rating: 4.6,
        reviewCount: 167,
        description: "Description of the product........",
        questions: [
            {
                id: 1,
                userId: "user12",
                userName: "Deniz A.",
                question: "Laptop sığıyor mu?",
                answer: "13 inç laptop rahatlıkla sığıyor.",
                date: "2024-02-03"
            },
            {
                id: 2,
                userId: "user13",
                userName: "İrem K.",
                question: "Su geçiriyor mu?",
                answer: "Özel su geçirmez kaplama yapılmıştır.",
                date: "2024-01-30"
            }
        ],
        reviews: [
            {
                id: 1,
                userId: "user14",
                userName: "Sevgi B.",
                rating: 5,
                comment: "Deri kalitesi çok iyi, dikişleri sağlam.",
                date: "2024-02-14"
            }
        ]
    },
    {
        id: 5,
        name: "Uzun Kollu Gömlek",
        price: "329.90",
        image: "/images/gomlek.jpg",
        category: "Erkek Giyim",
        brand: "Classic Wear",
        rating: 4.3,
        reviewCount: 142,
        description: "Description of the product........",
        questions: [
            {
                id: 1,
                userId: "user15",
                userName: "Burak Ç.",
                question: "Ütü gerektirir mi?",
                answer: "Hafif ütü gerektiren bir kumaşı var.",
                date: "2024-02-07"
            }
        ],
        reviews: [
            {
                id: 1,
                userId: "user16",
                userName: "Murat K.",
                rating: 4,
                comment: "İş için ideal, kumaşı kaliteli.",
                date: "2024-02-11"
            },
            {
                id: 2,
                userId: "user17",
                userName: "Serkan T.",
                rating: 5,
                comment: "Tam kalıp, rahatsız etmiyor.",
                date: "2024-02-05"
            }
        ]
    },
    {
        id: 6,
        name: "Midi Boy Elbise",
        price: "679.90",
        image: "/images/elbise.jpg",
        category: "Kadın Giyim",
        brand: "Elegant",
        rating: 4.7,
        reviewCount: 198,
        description: "Description of the product........",
        questions: [
            {
                id: 1,
                userId: "user18",
                userName: "Gizem Y.",
                question: "Kumaşı kalın mı?",
                answer: "Orta kalınlıkta, 4 mevsim giyilebilir.",
                date: "2024-02-09"
            },
            {
                id: 2,
                userId: "user19",
                userName: "Pınar S.",
                question: "38 beden ölçüleri nedir?",
                answer: "38 beden: Göğüs 88cm, Bel 70cm, Boy 110cm",
                date: "2024-02-02"
            }
        ],
        reviews: [
            {
                id: 1,
                userId: "user20",
                userName: "Yasemin K.",
                rating: 5,
                comment: "Harika bir elbise, kumaşı çok şık duruyor.",
                date: "2024-02-13"
            },
            {
                id: 2,
                userId: "user21",
                userName: "Aslı M.",
                rating: 4,
                comment: "Kalıbı güzel ama biraz uzun geldi.",
                date: "2024-02-06"
            }
        ]
    }
];

// İlk 3 ürünü favorilere ekleyelim
const initialFavoriteProducts = initialProducts.slice(0, 6);

// İlk 2 ürünü sepete ekleyelim
const initialCartItems = [
    {
        ...initialProducts[0],
        quantity: 2
    },
    {
        ...initialProducts[1],
        quantity: 1
    }
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    const [products] = useState<Product[]>(initialProducts);
    const [favoriteProducts, setFavoriteProducts] = useState<Product[]>(initialFavoriteProducts);
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // veya loading göstergesi
    }

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

    const getProductById = (id: number) => {
        return products.find(product => product.id === id);
    };

    return (
        <StoreContext.Provider value={{
            products,
            favoriteProducts,
            cartItems,
            addToFavorites,
            removeFromFavorites,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            getFavoritesCount,
            getCartItemsCount,
            getProductById
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