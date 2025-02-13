import { Heart } from 'lucide-react';

interface EmptyStateProps {
    title: string;
    description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
    return (
        <div className="text-center py-16">
            <Heart className="mx-auto text-gray-300 mb-4" size={48} />
            <h2 className="text-xl font-medium text-gray-800 mb-2">
                {title}
            </h2>
            <p className="text-gray-500">
                {description}
            </p>
        </div>
    );
};

export default EmptyState;