import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, Minus } from 'lucide-react';
import type CartItem from '@/types/cart';

interface CartItemProps {
    item: CartItem;
    onRemove?: (id: number) => void;
    onUpdateQuantity?: (id: number, quantity: number) => void;
}

export const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
    return (
        <Card className="flex flex-col md:flex-row gap-4 p-4">
            <div className="relative w-full md:w-48 h-48">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="text-sm text-gray-500">{item.brand}</div>
                    <h3 className="font-medium text-gray-800 mb-1">
                        {item.name}
                    </h3>
                    <div className="text-sm text-gray-500 mb-4">{item.category}</div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-md">
                            <button
                                onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-2 hover:bg-gray-100 disabled:opacity-50"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2">{item.quantity}</span>
                            <button
                                onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                        <button
                            onClick={() => onRemove?.(item.id)}
                            className="p-2 hover:text-red-500"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="text-lg font-semibold text-orange-400">
                        {(parseFloat(item.price) * item.quantity).toFixed(2)} TL
                    </div>
                </div>
            </div>
        </Card>
    );
};