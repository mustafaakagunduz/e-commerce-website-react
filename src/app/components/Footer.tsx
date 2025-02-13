'use client'

import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-wrap justify-between items-center text-sm">
                    {/* İletişim Bilgileri */}
                    <div className="flex items-center space-x-4 text-gray-600">
                        <span>İstanbul, Türkiye</span>
                        <span>•</span>
                        <span>+90 (212) 123 45 67</span>
                        <span>•</span>
                        <span>info@shopsmart.com</span>
                    </div>

                    {/* Sosyal Medya İkonları */}
                    <div className="flex items-center space-x-6 text-gray-600">
                        <a href="#" className="hover:text-orange-500 transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="hover:text-orange-500 transition-colors">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="hover:text-orange-500 transition-colors">
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>

                <div className="mt-4 text-center text-xs text-gray-500">
                    <p>&copy; 2025 Shopsmart. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;