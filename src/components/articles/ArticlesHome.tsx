"use client";

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { FB_DB } from '@/lib/fbClient';
import ArticleCard from './ArticleCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ArticlesHome() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesRef = collection(FB_DB, "articles");
                const q = query(articlesRef, orderBy("createdAt", "desc"), limit(20));
                const querySnapshot = await getDocs(q);
                const fetchedArticles = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setArticles(fetchedArticles);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 bg-black">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-white/60 font-medium">Loading articles...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-2"
                        >
                            Articles
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/60 text-lg"
                        >
                            Explore insights and wisdom from the AIWeb3 community.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="/articles/new">
                            <Button className="bg-primary hover:bg-primary/90 text-black font-bold px-6 py-6 rounded-2xl flex items-center gap-2 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                                <Plus className="w-5 h-5" />
                                Post Article
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {articles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ArticleCard article={article} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full py-20 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                            <Plus className="w-10 h-10 text-white/20" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No articles yet</h3>
                        <p className="text-white/40 max-w-md">
                            Be the first to share your thoughts with the community!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
