'use client'
import { useStore } from '@/context/StoreContext';
import ProductCard from '../components/ProductCard';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';

const FavoritesPage = () => {
    const {
        favoriteProducts,
        removeFromFavorites,
        addToCart,
        getFavoritesCount
    } = useStore();

    return (
        <div className="max-w-7xl mx-auto p-6">
            <PageHeader
                title="Favorilerim"
                itemCount={getFavoritesCount()}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favoriteProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onRemove={removeFromFavorites}
                        onAddToCart={() => addToCart(product)}
                    />
                ))}
            </div>
            {favoriteProducts.length === 0 && (
                <EmptyState
                    title="Henüz favorilere eklenen ürün yok"
                    description="Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca ulaşabilirsiniz."
                />
            )}
        </div>
    );
};

export default FavoritesPage;