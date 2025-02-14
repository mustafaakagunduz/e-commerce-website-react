import React, { useState, useEffect } from 'react';
import { MessageCircle, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type Product from '@/types/product';

// Types for our data structures
interface Comment {
    id: string;
    productId: number;
    userId?: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

interface Question {
    id: string;
    productId: number;
    userId?: string;
    userName: string;
    question: string;
    answer: string | null;
    date: string;
}

interface ProductInteractionsProps {
    productId: number;
    initialReviews: Product['reviews'];
    initialQuestions: Product['questions'];
}

// Adapter functions to convert types
const convertReviewToComment = (review: Product['reviews'][0], productId: number): Comment => ({
    id: review.id.toString(),
    productId,
    userId: review.userId,
    userName: review.userName,
    rating: review.rating,
    comment: review.comment,
    date: review.date
});

const convertQuestionToLocalFormat = (question: Product['questions'][0], productId: number): Question => ({
    id: question.id.toString(),
    productId,
    userId: question.userId,
    userName: question.userName,
    question: question.question,
    answer: question.answer || null,
    date: question.date
});

const ProductInteractions = ({ productId, initialReviews, initialQuestions }: ProductInteractionsProps) => {
    const [reviews, setReviews] = useState<Comment[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [newComment, setNewComment] = useState({ userName: '', rating: 5, comment: '' });
    const [newQuestion, setNewQuestion] = useState({ userName: '', question: '' });
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showQuestionForm, setShowQuestionForm] = useState(false);

    // Load data from localStorage on component mount
    useEffect(() => {
        const storedReviews = localStorage.getItem(`product_reviews_${productId}`);
        const storedQuestions = localStorage.getItem(`product_questions_${productId}`);

        if (storedReviews) {
            setReviews(JSON.parse(storedReviews));
        } else {
            // Convert initial reviews to the correct format
            const convertedReviews = initialReviews.map(review =>
                convertReviewToComment(review, productId)
            );
            setReviews(convertedReviews);
        }

        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions));
        } else {
            // Convert initial questions to the correct format
            const convertedQuestions = initialQuestions.map(question =>
                convertQuestionToLocalFormat(question, productId)
            );
            setQuestions(convertedQuestions);
        }
    }, [productId, initialReviews, initialQuestions]);

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem(`product_reviews_${productId}`, JSON.stringify(reviews));
    }, [reviews, productId]);

    useEffect(() => {
        localStorage.setItem(`product_questions_${productId}`, JSON.stringify(questions));
    }, [questions, productId]);

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        const newReview: Comment = {
            id: Date.now().toString(),
            productId,
            userName: newComment.userName,
            rating: newComment.rating,
            comment: newComment.comment,
            date: new Date().toLocaleDateString('tr-TR')
        };

        setReviews(prev => [...prev, newReview]);
        setNewComment({ userName: '', rating: 5, comment: '' });
        setShowCommentForm(false);
    };

    const handleAddQuestion = (e: React.FormEvent) => {
        e.preventDefault();
        const newQuestionItem: Question = {
            id: Date.now().toString(),
            productId,
            userName: newQuestion.userName,
            question: newQuestion.question,
            answer: null,
            date: new Date().toLocaleDateString('tr-TR')
        };

        setQuestions(prev => [...prev, newQuestionItem]);
        setNewQuestion({ userName: '', question: '' });
        setShowQuestionForm(false);
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setNewComment({ ...newComment, rating: star })}
                        className={`w-6 h-6 ${star <= newComment.rating ? 'text-orange-400' : 'text-gray-300'
                            }`}
                    >
                        ★
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Questions Section */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Soru & Cevap</h2>
                    <button
                        onClick={() => setShowQuestionForm(!showQuestionForm)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Soru Sor
                    </button>
                </div>

                {showQuestionForm && (
                    <form onSubmit={handleAddQuestion} className="mb-6 space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Adınız"
                                value={newQuestion.userName}
                                onChange={(e) => setNewQuestion({ ...newQuestion, userName: e.target.value })}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Sorunuz"
                                value={newQuestion.question}
                                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                                className="w-full p-2 border rounded-md"
                                required
                                rows={3}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
                        >
                            Gönder
                        </button>
                    </form>
                )}

                <div className="space-y-6">
                    {questions.map((question) => (
                        <div key={question.id} className="border-b last:border-b-0 pb-4">
                            <div className="flex items-start gap-4 mb-3">
                                <MessageSquare className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{question.question}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {question.userName} - {question.date}
                                    </p>
                                </div>
                            </div>
                            {question.answer && (
                                <div className="ml-9 pl-4 border-l-2 border-orange-200">
                                    <p className="text-gray-700">{question.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>

            {/* Reviews Section */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Yorumlar</h2>
                    <button
                        onClick={() => setShowCommentForm(!showCommentForm)}
                        className="flex items-center gap-2 px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
                    >
                        Yorum Yap
                    </button>
                </div>

                {showCommentForm && (
                    <form onSubmit={handleAddComment} className="mb-6 space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Adınız"
                                value={newComment.userName}
                                onChange={(e) => setNewComment({ ...newComment, userName: e.target.value })}
                                className="w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Puanınız</label>
                            {renderStars(newComment.rating)}
                        </div>
                        <div>
                            <textarea
                                placeholder="Yorumunuz"
                                value={newComment.comment}
                                onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                                className="w-full p-2 border rounded-md"
                                required
                                rows={3}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
                        >
                            Gönder
                        </button>
                    </form>
                )}

                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b last:border-b-0 pb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, index) => (
                                        <span
                                            key={index}
                                            className={`text-lg ${index < review.rating ? 'text-orange-400' : 'text-gray-300'
                                                }`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="font-medium text-gray-800 mb-1">{review.userName}</p>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default ProductInteractions;