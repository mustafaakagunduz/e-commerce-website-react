import { Card, CardContent } from '@/components/ui/card';
import CartItem from '@/types/cart';
import Link from 'next/link';

interface CartSummaryProps {
    items: CartItem[];
    onCheckout?: () => void;
}

export const CartSummary = ({ items, onCheckout }: CartSummaryProps) => {
    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 29.90;
    const total = subtotal + shipping;

    return (
        <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-600">Ara Toplam</span>
                    <span>{subtotal.toFixed(2)} TL</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Kargo</span>
                    <span>{shipping === 0 ? 'Ücretsiz' : `${shipping.toFixed(2)} TL`}</span>
                </div>
                <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold">
                        <span>Toplam</span>
                        <span className="text-orange-400">{total.toFixed(2)} TL</span>
                    </div>
                </div>
                <Link href="/checkout">
                    <button
                        onClick={onCheckout}
                        className="w-full mt-4 bg-orange-400 text-white py-3 rounded-md hover:bg-orange-500 transition-colors"
                    >
                        Alışverişi Tamamla
                    </button>
                </Link>

                <p className="text-sm text-gray-500 text-center mt-2">
                    500 TL üzeri alışverişlerde kargo ücretsiz!
                </p>
            </div>
        </Card>
    );
};