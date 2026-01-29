"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { collection, addDoc, serverTimestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FB_DB, FB_STORAGE } from '@/lib/fbClient';
import { useUser } from '@/components/user-context';
import { NavbarDemo } from '@/components/TopNavbar';
import RichTextEditor from '@/components/articles/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowLeft, Image as ImageIcon, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

function NewArticleContent() {
    const { user, userData } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams?.get('id');

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (editId && user) {
            const fetchArticle = async () => {
                setFetching(true);
                try {
                    const docSnap = await getDoc(doc(FB_DB, "articles", editId));
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        // Security check: only author can edit
                        if (data.authorId !== user.uid) {
                            alert("You are not authorized to edit this article.");
                            router.push('/articles');
                            return;
                        }
                        setTitle(data.title || '');
                        setContent(data.content || '');
                        setThumbnail(data.thumbnail || '');
                    } else {
                        alert("Article not found.");
                        router.push('/articles');
                    }
                } catch (error) {
                    console.error("Error fetching article for edit:", error);
                    alert("Failed to load article for editing.");
                    router.push('/articles');
                } finally {
                    setFetching(false);
                }
            };
            fetchArticle();
        }
    }, [editId, user, router]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // File size limit: 5MB
        if (file.size > 5 * 1024 * 1024) {
            alert("File is too large. Max size is 5MB.");
            return;
        }

        console.log("Starting upload for:", file.name, "Size:", file.size);
        setImageFile(file);
        setUploading(true);
        setUploadProgress(0);

        try {
            const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
            const storageRef = ref(FB_STORAGE, `articles/thumbnails/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + Math.round(progress) + '% done');
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("Upload failed details:", error);
                    alert(`Upload failed: ${error.message} (Code: ${error.code})`);
                    setUploading(false);
                    setUploadProgress(0);
                },
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("Upload successful, URL:", url);
                    setThumbnail(url);
                    setUploading(false);
                    setUploadProgress(0);
                }
            );
        } catch (error: any) {
            console.error("Error setting up upload:", error);
            alert(`Failed to start upload: ${error.message}`);
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return alert('Please login first');
        if (!title.trim() || !content.trim()) return alert('Title and content are required');

        setLoading(true);
        try {
            if (editId) {
                // Update existing article
                await updateDoc(doc(FB_DB, "articles", editId), {
                    title,
                    content,
                    thumbnail,
                    updatedAt: serverTimestamp(),
                });
                router.push(`/articles/${editId}`);
            } else {
                // Create new article
                await addDoc(collection(FB_DB, "articles"), {
                    title,
                    content,
                    thumbnail,
                    authorId: user.uid,
                    authorName: user.displayName || userData?.email?.split('@')[0] || 'Anonymous',
                    authorPhoto: user.photoURL || '',
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                    creditsReceived: 0,
                    commentsCount: 0
                });
                router.push('/articles');
            }
        } catch (error) {
            console.error("Error saving article:", error);
            alert("Failed to save article. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="w-full min-h-screen bg-black">
                <NavbarDemo />
                <div className="pt-40 flex flex-col items-center justify-center px-4">
                    <h1 className="text-3xl font-bold text-white mb-4 text-center">Please login to post an article</h1>
                    <Link href="/">
                        <Button className="bg-primary text-black font-bold">Back to Home</Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (fetching) {
        return (
            <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-white/60 font-medium">Loading article data...</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-black pb-20">
            <NavbarDemo />

            <div className="pt-32 max-w-4xl mx-auto px-4 md:px-8">
                <Link href={editId ? `/articles/${editId}` : "/articles"} className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to {editId ? 'Article' : 'Articles'}
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold text-white mb-8">{editId ? 'Edit Article' : 'Post New Article'}</h1>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/60">Article Title</label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a catchy title..."
                                className="bg-white/5 border-white/10 text-white text-lg py-6 focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium text-white/60">Thumbnail Image</label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Upload Option */}
                                <div className="space-y-3">
                                    <div
                                        className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${thumbnail && !uploading ? 'border-primary/50 bg-primary/5' : 'border-white/10 hover:border-white/20 hover:bg-white/5'}`}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            disabled={uploading}
                                        />

                                        {uploading ? (
                                            <>
                                                <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                                                <p className="text-white/60 text-sm">Uploading: {Math.round(uploadProgress)}%</p>
                                                <div className="w-full max-w-[150px] bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                                                    <div
                                                        className="bg-primary h-full transition-all duration-300"
                                                        style={{ width: `${uploadProgress}%` }}
                                                    />
                                                </div>
                                            </>
                                        ) : thumbnail ? (
                                            <>
                                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                                                    <Upload className="w-6 h-6 text-primary" />
                                                </div>
                                                <p className="text-primary font-medium text-sm">Image Uploaded</p>
                                                <p className="text-white/40 text-xs mt-1">Click to change</p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                                                    <Upload className="w-6 h-6 text-white/40" />
                                                </div>
                                                <p className="text-white font-medium text-sm">Upload Image</p>
                                                <p className="text-white/40 text-xs mt-1">Max size 5MB</p>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-white/20 text-center uppercase tracking-widest font-bold">OR</p>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <Input
                                            value={thumbnail}
                                            onChange={(e) => setThumbnail(e.target.value)}
                                            placeholder="Paste image URL..."
                                            className="bg-white/5 border-white/10 text-white pl-10 h-12 focus:ring-primary focus:border-primary"
                                        />
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video bg-white/5 relative group">
                                    {thumbnail ? (
                                        <>
                                            <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setThumbnail('')}
                                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <p className="text-white/20 text-sm italic">Image preview will appear here</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/60">Content</label>
                            <RichTextEditor content={content} onChange={setContent} />
                        </div>

                        <div className="pt-6">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full py-7 bg-primary hover:bg-primary/90 text-black font-bold text-lg rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.01]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Saving...
                                    </>
                                ) : (
                                    editId ? 'Save Changes' : 'Publish Article'
                                )}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
export default function NewArticlePage() {
    return (
        <Suspense fallback={
            <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                <p className="text-white/60 font-medium">Initializing...</p>
            </div>
        }>
            <NewArticleContent />
        </Suspense>
    );
}
