import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

import Product from '@/types/product';

interface ProductCardProps {
    product: Product;
    onRemove?: (id: number) => void;
    onAddToCart?: (id: number) => void;
}

const ProductCard = ({ product, onRemove, onAddToCart }: ProductCardProps) => {
    return (
        <Card className="group">
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                />
                <button
                    onClick={() => onRemove?.(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-orange-50 transition-colors"
                    aria-label="Remove from favorites"
                >
                    <Trash2 className="h-4 w-4 text-orange-400" />
                </button>
            </div>
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
                <button
                    onClick={() => onAddToCart?.(product.id)}
                    className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
                >
                    Sepete Ekle
                </button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;