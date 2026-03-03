import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';

const FeedbackSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        rating: '',
        suggestions: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        setSubmitted(false);
        setError(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRatingClick = (rating) => {
        setFormData((prev) => ({ ...prev, rating }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // use Vite environment variable or fallback to localhost for development
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit feedback');
            }

            setSubmitted(true);
            setFormData({ name: '', age: '', rating: '', suggestions: '' });
        } catch (err) {
            console.error('Error submitting feedback:', err);
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <style>
                {`
                    @keyframes pulse-glow {
                        0% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7); }
                        50% { box-shadow: 0 0 0 15px rgba(139, 92, 246, 0); }
                        100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
                    }
                `}
            </style>

            {/* Floating Toggle Button */}
            <motion.button
                onClick={toggleSidebar}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    height: '50px',
                    padding: '0 20px',
                    borderRadius: '25px',
                    backgroundColor: '#8b5cf6', // Indigo/Purple to match theme
                    color: 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    zIndex: 50,
                    animation: 'pulse-glow 2s infinite',
                }}
            >
                <MessageSquare size={20} />
                Feedback
            </motion.button>

            {/* Sidebar Overlay and Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleSidebar}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(4px)',
                                zIndex: 40,
                            }}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                height: '100vh',
                                width: '100%',
                                maxWidth: '400px',
                                backgroundColor: '#0f0f15', // Dark background matching theme
                                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
                                zIndex: 51,
                                padding: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                overflowY: 'auto',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Product Feedback</h2>
                                <button
                                    onClick={toggleSidebar}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        cursor: 'pointer',
                                        padding: '0.5rem',
                                    }}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {submitted ? (
                                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        style={{ fontSize: '3rem', marginBottom: '1rem' }}
                                    >
                                        🎉
                                    </motion.div>
                                    <h3 style={{ color: '#a78bfa', marginBottom: '1rem' }}>Thank You!</h3>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Your feedback helps us improve the oral microbiome experience.</p>
                                    <button
                                        onClick={toggleSidebar}
                                        style={{
                                            marginTop: '2rem',
                                            padding: '0.75rem 2rem',
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            color: 'white',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {error && (
                                        <div style={{ padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.5)' }}>
                                            {error}
                                        </div>
                                    )}

                                    {/* Name field */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label htmlFor="name" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            style={{
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                color: 'white',
                                                outline: 'none',
                                            }}
                                            placeholder="Your name"
                                        />
                                    </div>

                                    {/* Age field */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label htmlFor="age" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Age</label>
                                        <input
                                            type="number"
                                            id="age"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            required
                                            min="1"
                                            max="120"
                                            style={{
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                color: 'white',
                                                outline: 'none',
                                            }}
                                            placeholder="Your age"
                                        />
                                    </div>

                                    {/* Rating Field */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>How would you rate our product?</label>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {['Bad', 'Average', 'Good'].map((ratingOption) => (
                                                <button
                                                    key={ratingOption}
                                                    type="button"
                                                    onClick={() => handleRatingClick(ratingOption)}
                                                    style={{
                                                        flex: 1,
                                                        padding: '0.75rem',
                                                        borderRadius: '8px',
                                                        backgroundColor: formData.rating === ratingOption ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                                                        border: `1px solid ${formData.rating === ratingOption ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)'}`,
                                                        color: formData.rating === ratingOption ? 'white' : 'rgba(255,255,255,0.6)',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                    }}
                                                >
                                                    {ratingOption}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Suggestions Field */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <label htmlFor="suggestions" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>Suggestions</label>
                                        <textarea
                                            id="suggestions"
                                            name="suggestions"
                                            value={formData.suggestions}
                                            onChange={handleInputChange}
                                            rows="4"
                                            style={{
                                                padding: '0.75rem',
                                                borderRadius: '8px',
                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                color: 'white',
                                                outline: 'none',
                                                resize: 'vertical',
                                            }}
                                            placeholder="How can we improve?"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={!formData.name || !formData.age || !formData.rating || isLoading}
                                        style={{
                                            marginTop: '1rem',
                                            padding: '1rem',
                                            borderRadius: '8px',
                                            backgroundColor: formData.name && formData.age && formData.rating && !isLoading ? '#8b5cf6' : 'rgba(139, 92, 246, 0.2)',
                                            color: 'white',
                                            border: 'none',
                                            fontWeight: 'bold',
                                            cursor: formData.name && formData.age && formData.rating && !isLoading ? 'pointer' : 'not-allowed',
                                            transition: 'background-color 0.2s',
                                        }}
                                    >
                                        {isLoading ? 'Submitting...' : 'Submit Feedback'}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default FeedbackSidebar;
