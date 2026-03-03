import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChart2, Users, Star, MessageSquare } from 'lucide-react';

const AnalyticsDashboard = ({ isOpen, onClose }) => {
    const [data, setData] = useState([]);
    const [visits, setVisits] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchStats();
        }
    }, [isOpen]);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const [feedbackRes, visitRes] = await Promise.all([
                fetch(`${API_URL}/api/feedback`),
                fetch(`${API_URL}/api/visits`)
            ]);

            const feedbackResult = await feedbackRes.json();
            const visitResult = await visitRes.json();

            if (!feedbackRes.ok) throw new Error(feedbackResult.error || 'Failed to fetch feedback');

            setData(feedbackResult.data || []);
            setVisits(visitResult.count || 0);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Derived Statistics
    const totalFeedbacks = data.length;
    const avgAge = totalFeedbacks > 0 ? Math.round(data.reduce((acc, curr) => acc + curr.age, 0) / totalFeedbacks) : 0;

    const ratingsCount = { 'Bad': 0, 'Average': 0, 'Good': 0 };
    data.forEach(item => {
        if (ratingsCount[item.rating] !== undefined) {
            ratingsCount[item.rating]++;
        }
    });

    const getPercentage = (count) => {
        if (totalFeedbacks === 0) return 0;
        return Math.round((count / totalFeedbacks) * 100);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    {/* Blurred Background Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(12px)',
                            zIndex: 100,
                        }}
                    />

                    {/* Centered Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '850px',
                            maxHeight: '90vh',
                            backgroundColor: 'rgba(15, 15, 21, 0.85)',
                            backdropFilter: 'blur(24px)',
                            border: '1px solid rgba(139, 92, 246, 0.4)',
                            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(139, 92, 246, 0.2)',
                            borderRadius: '24px',
                            zIndex: 101,
                            overflowY: 'auto',
                            padding: '2.5rem',
                            color: 'white'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <BarChart2 size={32} color="#8b5cf6" />
                                Analytics Dashboard
                            </h2>
                            <button
                                onClick={onClose}
                                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '3rem', color: '#8b5cf6' }}>Loading data from MongoDB...</div>
                        ) : error ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px' }}>
                                Error: {error}
                            </div>
                        ) : totalFeedbacks === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.6)' }}>
                                No feedback data available yet.
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '2rem' }}>
                                {/* Top Stats Cards */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>

                                    {/* New Total Views Card */}
                                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                                            <Users size={18} /> Total Page Views
                                        </div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#38bdf8', textShadow: '0 4px 15px rgba(56,189,248,0.3)' }}>{visits}</div>
                                    </div>

                                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                                            <MessageSquare size={18} /> Total Submissions
                                        </div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#8b5cf6', textShadow: '0 4px 15px rgba(139,92,246,0.3)' }}>{totalFeedbacks}</div>
                                    </div>
                                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                                            <Users size={18} /> Average Age
                                        </div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ec4899', textShadow: '0 4px 15px rgba(236,72,153,0.3)' }}>{avgAge} yrs</div>
                                    </div>
                                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                                            <Star size={18} /> Top Rating
                                        </div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', textShadow: '0 4px 15px rgba(16,185,129,0.3)' }}>
                                            {Object.keys(ratingsCount).reduce((a, b) => ratingsCount[a] > ratingsCount[b] ? a : b)}
                                        </div>
                                    </div>
                                </div>

                                {/* Rating Distribution */}
                                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <h3 style={{ margin: '0 0 1.5rem 0', color: 'rgba(255,255,255,0.9)' }}>Rating Distribution</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {['Good', 'Average', 'Bad'].map(rating => (
                                            <div key={rating}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                                    <span>{rating}</span>
                                                    <span>{ratingsCount[rating]} ({getPercentage(ratingsCount[rating])}%)</span>
                                                </div>
                                                <div style={{ width: '100%', height: '12px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${getPercentage(ratingsCount[rating])}%` }}
                                                        transition={{ duration: 1, ease: 'easeOut' }}
                                                        style={{
                                                            height: '100%',
                                                            backgroundColor: rating === 'Good' ? '#10b981' : rating === 'Average' ? '#f59e0b' : '#ef4444',
                                                            borderRadius: '6px'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Feedback */}
                                <div>
                                    <h3 style={{ margin: '0 0 1rem 0', color: 'rgba(255,255,255,0.9)' }}>Recent Feedback</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {data.slice(0, 5).map((item, idx) => (
                                            <div key={idx} style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                        {item.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 'bold' }}>{item.name} <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 'normal' }}>({item.age})</span></div>
                                                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                                                            {new Date(item.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        marginLeft: 'auto', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', height: 'max-content',
                                                        backgroundColor: item.rating === 'Good' ? 'rgba(16, 185, 129, 0.2)' : item.rating === 'Average' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                                        color: item.rating === 'Good' ? '#10b981' : item.rating === 'Average' ? '#f59e0b' : '#ef4444'
                                                    }}>
                                                        {item.rating}
                                                    </div>
                                                </div>
                                                {item.suggestions && (
                                                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', fontStyle: 'italic', paddingLeft: '1rem', borderLeft: '2px solid rgba(255,255,255,0.2)' }}>
                                                        "{item.suggestions}"
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AnalyticsDashboard;
