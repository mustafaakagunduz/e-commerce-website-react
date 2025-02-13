import Product from '@/types/product';

interface CartItem extends Product {
    quantity: number;
}

export default CartItem;