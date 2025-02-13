'use client'
import { useStore } from '@/context/StoreContext';
import { CartItem as CartItemComponent } from '../components/CartItem';
import { CartSummary } from '../components/CartSummary';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';

const CartPage = () => {
    const {
        cartItems,
        removeFromCart,
        updateCartQuantity,
        getCartItemsCount
    } = useStore();

    const handleCheckout = () => {
        console.log('Proceeding to checkout...');
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <PageHeader
                title="Sepetim"
                itemCount={getCartItemsCount()}
            />
            {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <CartItemComponent
                                key={item.id}
                                item={item}
                                onRemove={removeFromCart}
                                onUpdateQuantity={updateCartQuantity}
                            />
                        ))}
                    </div>
                    <div className="lg:col-span-1">
                        <CartSummary
                            items={cartItems}
                            onCheckout={handleCheckout}
                        />
                    </div>
                </div>
            ) : (
                <EmptyState
                    title="Sepetiniz boş"
                    description="Sepetinize ürün ekleyerek alışverişe başlayabilirsiniz."
                />
            )}
        </div>
    );
};

export default CartPage;