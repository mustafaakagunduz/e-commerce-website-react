import { Heart } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    itemCount: number;
}

const PageHeader = ({ title, itemCount }: PageHeaderProps) => {
    return (
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            <div className="flex items-center gap-2">

                <span className="text-2xl text-white">{itemCount} ürün</span>
            </div>
        </div>
    );
};

export default PageHeader;