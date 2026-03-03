import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Leaf, Heart } from 'lucide-react';

const Benefits = () => {
    const benefits = [
        "Swallowable & Safe",
        "Reduces Sensitivity",
        "Anti-Inflammatory",
        "Long Duration Action",
        "Environment Friendly",
        "Gut Health Support"
    ];

    return (
        <section className="section">
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '3rem' }}>Why Choose <span className="text-gradient">Microbiome?</span></h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card"
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}
                        >
                            <div style={{ marginBottom: '1rem', color: '#00f2fe' }}>
                                {index % 3 === 0 ? <Heart size={40} /> : index % 3 === 1 ? <Leaf size={40} /> : <CheckCircle size={40} />}
                            </div>
                            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{benefit}</h3>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ marginTop: '5rem' }}
                >
                    <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Ready to transform your oral health?</p>
                    <button style={{
                        fontSize: '1.2rem',
                        padding: '1rem 3rem',
                        background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
                        color: '#fff',
                        border: 'none',
                        fontWeight: 'bold'
                    }}>
                        Join the Waitlist
                    </button>
                </motion.div>

            </div>
        </section>
    );
};

export default Benefits;
