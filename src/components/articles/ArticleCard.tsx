"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { truncateText } from '@/utils/truncateTxt';
import { Calendar, MessageSquare, Heart, Coins } from 'lucide-react';

interface ArticleCardProps {
    article: {
        id: string;
        title: string;
        authorName: string;
        thumbnail?: string;
        createdAt: any;
        creditsReceived?: number;
        commentsCount?: number;
    };
}

export default function ArticleCard({ article }: ArticleCardProps) {
    const date = article.createdAt?.toDate ? article.createdAt.toDate() : new Date();

    return (
        <Link href={`/articles/${article.id}`} className="group h-full">
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] flex flex-col h-full shadow-lg hover:shadow-primary/10">
                <div className="relative aspect-video w-full overflow-hidden">
                    {article.thumbnail ? (
                        <Image
                            src={article.thumbnail}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <span className="text-white/20 font-bold text-4xl">AI | W3</span>
                        </div>
                    )}
                    <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {date.toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                        {truncateText(article.title, 60)}
                    </h3>

                    <p className="text-sm text-white/60 mb-4">
                        By <span className="text-white/80 font-medium">{article.authorName}</span>
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-[12px] text-white/40">
                                <MessageSquare className="w-3 h-3" />
                                {article.commentsCount || 0}
                            </span>
                            <span className="flex items-center gap-1 text-[12px] text-white/40">
                                <Coins className="w-3 h-3" />
                                {article.creditsReceived || 0}
                            </span>
                        </div>
                        <span className="text-xs font-semibold text-primary/80 group-hover:text-primary flex items-center gap-1">
                            Read More →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
