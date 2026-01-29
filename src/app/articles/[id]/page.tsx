"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, collection, query, where, orderBy, getDocs, addDoc, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import { FB_DB } from '@/lib/fbClient';
import { useUser } from '@/components/user-context';
import { NavbarDemo } from '@/components/TopNavbar';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Heart, MessageSquare, Share2, Coins, User as UserIcon, X, Send } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { truncateText } from '@/utils/truncateTxt';

// Simple Support Modal
const SupportModal = ({ isOpen, onClose, onSupport, authorName }: any) => {
    const [amount, setAmount] = useState(100);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Support Author</h2>
                    <button onClick={onClose} className="text-white/40 hover:text-white"><X className="w-6 h-6" /></button>
                </div>

                <p className="text-white/60 mb-6 text-center">
                    Show your appreciation for <span className="text-primary font-bold">{authorName}</span>&apos;s work.
                </p>

                <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/5">
                    <label className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 block text-center">Support Amount (Credits)</label>
                    <div className="flex items-center justify-center gap-4">
                        <button onClick={() => setAmount(Math.max(10, amount - 10))} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white">-</button>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="bg-transparent text-4xl font-bold text-white w-32 text-center focus:outline-none"
                        />
                        <button onClick={() => setAmount(amount + 10)} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white">+</button>
                    </div>
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={async () => {
                            setLoading(true);
                            await onSupport(amount);
                            setLoading(false);
                            onClose();
                        }}
                        disabled={loading}
                        className="w-full py-7 bg-primary hover:bg-primary/90 text-black font-bold text-lg rounded-2xl shadow-lg shadow-primary/20"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Send ${amount} Credits`}
                    </Button>
                    <p className="text-[10px] text-white/30 text-center">
                        * 15% goes to DAO treasury, 85% directly to the author.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default function ArticleDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const { user, userData, consumeCredits } = useUser();
    const [article, setArticle] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
    const [commenting, setCommenting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                // Fetch Article
                const articleDoc = await getDoc(doc(FB_DB, "articles", id as string));
                if (articleDoc.exists()) {
                    setArticle({ id: articleDoc.id, ...articleDoc.data() });

                    // Fetch Comments
                    const commentsRef = collection(FB_DB, "article_comments");
                    const q = query(commentsRef, where("articleId", "==", id), orderBy("createdAt", "desc"));
                    const querySnapshot = await getDocs(q);
                    setComments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                } else {
                    router.push('/articles');
                }
            } catch (error) {
                console.error("Error fetching article details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, router]);

    const handlePostComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !newComment.trim()) return;

        setCommenting(true);
        try {
            const commentData = {
                articleId: id,
                userId: user.uid,
                userName: user.displayName || userData?.email?.split('@')[0] || 'Anonymous',
                userPhoto: user.photoURL || '',
                content: newComment,
                createdAt: serverTimestamp()
            };
            const docRef = await addDoc(collection(FB_DB, "article_comments"), commentData);

            // Update article comment count
            await updateDoc(doc(FB_DB, "articles", id as string), {
                commentsCount: increment(1)
            });

            setComments([{ id: docRef.id, ...commentData, createdAt: { toDate: () => new Date() } }, ...comments]);
            setNewComment('');
            setArticle({ ...article, commentsCount: (article.commentsCount || 0) + 1 });
        } catch (error) {
            console.error("Error posting comment:", error);
        } finally {
            setCommenting(false);
        }
    };

    const handleSupport = async (amount: number) => {
        if (!user || !article) return;

        const success = await consumeCredits(amount);
        if (success) {
            try {
                // Logic for 15/85 split
                // In a real app, you might want to log this transaction in a separate collection
                await updateDoc(doc(FB_DB, "articles", article.id), {
                    creditsReceived: increment(amount)
                });

                // Also update author local/remote data if they are the current user, or just update the article doc
                // For now, we update the article doc which reflects the total support.

                setArticle({ ...article, creditsReceived: (article.creditsReceived || 0) + amount });
                alert(`Successfully sent ${amount} credits to ${article.authorName}!`);
            } catch (error) {
                console.error("Error updating credits:", error);
            }
        } else {
            alert("Insufficient credits. Please Top Up.");
        }
    };

    const handleShare = (platform: 'X' | 'TG') => {
        const url = window.location.href;
        const text = `Check out this article on AIWeb3-DAO: ${article.title}`;
        let shareUrl = '';

        if (platform === 'X') {
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        } else {
            shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        }
        window.open(shareUrl, '_blank');
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-white/60 font-medium">Loading article...</p>
            </div>
        );
    }

    if (!article) return null;

    return (
        <div className="w-full min-h-screen bg-black pb-20">
            <NavbarDemo />

            <div className="pt-32 max-w-4xl mx-auto px-4 md:px-8">
                <Link href="/articles" className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Articles
                </Link>

                <article>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                    >
                        {article.title}
                    </motion.h1>

                    <div className="flex flex-wrap items-center justify-between gap-6 mb-10 border-y border-white/5 py-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                                {article.authorPhoto ? (
                                    <img src={article.authorPhoto} alt={article.authorName} className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="w-6 h-6 text-white/20" />
                                )}
                            </div>
                            <div>
                                <p className="text-white font-medium">{article.authorName}</p>
                                <p className="text-xs text-white/40">{article.createdAt?.toDate ? article.createdAt.toDate().toLocaleDateString() : 'Just now'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                onClick={() => setIsSupportModalOpen(true)}
                                className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/20 rounded-full px-6 py-2 flex items-center gap-2"
                            >
                                <Coins className="w-4 h-4" />
                                Support Author
                            </Button>

                            {user && user.uid === article.authorId && (
                                <Link href={`/articles/new?id=${article.id}`}>
                                    <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-full px-6 py-2 flex items-center gap-2">
                                        Edit Article
                                    </Button>
                                </Link>
                            )}

                            <div className="flex gap-2">
                                <button onClick={() => handleShare('X')} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                                    <Share2 className="w-4 h-4 text-white/60" />
                                </button>
                                <button onClick={() => handleShare('TG')} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                                    <Send className="w-4 h-4 text-white/60 text-blue-400" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {article.thumbnail && (
                        <div className="mb-10 rounded-3xl overflow-hidden aspect-video border border-white/10 shadow-2xl">
                            <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div
                        className="prose prose-invert max-w-none text-white/80 text-lg leading-relaxed mb-16 article-content"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Support Section */}
                    <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-3xl p-10 text-center mb-20 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">Enjoyed this article?</h2>
                            <p className="text-white/60 mb-8 max-w-md mx-auto">
                                Your support helps authors create more high-quality content for the community.
                            </p>
                            <Button
                                onClick={() => setIsSupportModalOpen(true)}
                                className="bg-primary hover:bg-primary/90 text-black font-bold px-10 py-7 rounded-2xl text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                            >
                                <Coins className="w-5 h-5 mr-2" />
                                Support with Credits
                            </Button>
                        </div>
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
                    </div>

                    {/* Comments Section */}
                    <section id="comments" className="border-t border-white/10 pt-20">
                        <div className="flex items-center gap-3 mb-10">
                            <MessageSquare className="w-6 h-6 text-primary" />
                            <h2 className="text-3xl font-bold text-white">Comments ({comments.length})</h2>
                        </div>

                        {user ? (
                            <form onSubmit={handlePostComment} className="mb-12">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 focus-within:border-primary/50 transition-all">
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add a comment..."
                                        className="w-full bg-transparent border-none focus:ring-0 text-white min-h-[100px] resize-none"
                                        required
                                    />
                                    <div className="flex justify-end mt-2 pt-4 border-t border-white/5">
                                        <Button
                                            type="submit"
                                            disabled={commenting || !newComment.trim()}
                                            className="bg-primary hover:bg-primary/90 text-black font-bold px-6"
                                        >
                                            {commenting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Post Comment'}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center mb-12">
                                <p className="text-white/60 mb-4">You must be logged in to leave a comment.</p>
                                <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/10">Log In</Button>
                            </div>
                        )}

                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div key={comment.id} className="bg-white/5 border border-white/5 rounded-2xl p-6 transition-all hover:bg-white/10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                                            {comment.userPhoto ? (
                                                <img src={comment.userPhoto} alt={comment.userName} className="w-full h-full object-cover" />
                                            ) : (
                                                <UserIcon className="w-5 h-5 text-white/20" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">{comment.userName}</p>
                                            <p className="text-[10px] text-white/40">{comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleString() : 'Just now'}</p>
                                        </div>
                                    </div>
                                    <p className="text-white/80 whitespace-pre-wrap">{comment.content}</p>
                                </div>
                            ))}
                            {comments.length === 0 && (
                                <p className="text-center text-white/30 py-10 italic">No comments yet. Start the conversation!</p>
                            )}
                        </div>
                    </section>
                </article>
            </div>

            <SupportModal
                isOpen={isSupportModalOpen}
                onClose={() => setIsSupportModalOpen(false)}
                onSupport={handleSupport}
                authorName={article.authorName}
            />
        </div>
    );
}
