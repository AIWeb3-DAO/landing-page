import { NavbarDemo } from '@/components/TopNavbar';
import ArticlesHome from '@/components/articles/ArticlesHome';
import React from 'react';

export default function ArticlesPage() {
    return (
        <div className="w-full min-h-screen bg-black">
            <NavbarDemo />
            <ArticlesHome />
        </div>
    );
}
