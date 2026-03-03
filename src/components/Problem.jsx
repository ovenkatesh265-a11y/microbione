import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Users, Activity } from 'lucide-react';

const Problem = () => {
    const stats = [
        {
            icon: <Users size={32} color="#ff4d4d" />,
            value: "3.5 Billion",
            label: "People suffering from oral diseases globally"
        },
        {
            icon: <AlertTriangle size={32} color="#ff4d4d" />,
            value: "514 Million",
            label: "Children suffering from dental caries"
        },
        {
            icon: <Activity size={32} color="#ff4d4d" />,
            value: "48%",
            label: "Of Indian population affected by periodontal problems"
        }
    ];

    return (
        <section className="section" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>The Global <span style={{ color: '#ff4d4d' }}>Crisis</span></h2>
                    <p style={{ fontSize: '1.2rem', maxWidth: '800px', marginBottom: '3rem', opacity: 0.9 }}>
                        Dental caries and periodontal diseases are the most prevalent bacterial diseases worldwide.
                        Current toothpastes are loaded with harsh chemicals that kill symbiotic oral microbiota,
                        disrupting the delicate balance of your oral ecosystem and leading to systemic toxicity.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            className="glass-card"
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ marginBottom: '1rem' }}>{stat.icon}</div>
                            <h3 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem', color: '#fff' }}>{stat.value}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)' }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Problem;
