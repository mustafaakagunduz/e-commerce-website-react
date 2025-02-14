// types/product.ts
interface ProductQuestion {
    id: number;
    userId: string;
    userName: string;
    question: string;
    answer?: string;
    date: string;
}

interface ProductReview {
    id: number;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    category: string;
    brand: string;
    rating: number;
    reviewCount: number;
    questions: ProductQuestion[];
    reviews: ProductReview[];
}

export default Product;