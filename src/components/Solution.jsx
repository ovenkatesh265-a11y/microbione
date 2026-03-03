import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, ShieldCheck, Smile } from 'lucide-react';

const Solution = () => {
    return (
        <section className="section" style={{ background: 'linear-gradient(180deg, rgba(5,5,16,0) 0%, rgba(79, 172, 254, 0.1) 100%)' }}>
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span style={{ color: '#4facfe', fontSize: '2rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>The Solution</span>
                        <h2 style={{ fontSize: '3rem', margin: '1rem 0' }}>Microbiome-First Care</h2>
                        <p style={{ fontSize: '1.2rem', maxWidth: '700px', marginBottom: '4rem', opacity: 0.9 }}>
                            Unlike traditional toothpastes, our formula introduces beneficial microbes to your oral cavity,
                            restoring balance rather than destroying it.
                        </p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', width: '100%' }}>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="glass-card"
                            style={{ textAlign: 'left' }}
                        >
                            <h3 style={{ fontSize: '1.8rem', color: '#4facfe', marginBottom: '1rem' }}>Beneficial Microbes</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ShieldCheck size={20} color="#4facfe" /> Lactobacillus Species
                                </li>
                                <li style={{ padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ShieldCheck size={20} color="#4facfe" /> Bifidobacterium Species
                                </li>
                            </ul>
                            <p style={{ marginTop: '1rem', fontSize: '0.95rem', opacity: 0.8 }}>
                                These probiotics remove tooth stains, reduce plaque, and actively prevent dental caries by outcompeting harmful bacteria.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="glass-card"
                            style={{ textAlign: 'left' }}
                        >
                            <h3 style={{ fontSize: '1.8rem', color: '#fbc2eb', marginBottom: '1rem' }}>Natural Ingredients</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Droplet size={18} color="#fbc2eb" /> Papain</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Droplet size={18} color="#fbc2eb" /> Peppermint Oil</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Droplet size={18} color="#fbc2eb" /> Cellulose Wax</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Droplet size={18} color="#fbc2eb" /> Natural Colors</div>
                            </div>
                            <p style={{ marginTop: '1rem', fontSize: '0.95rem', opacity: 0.8 }}>
                                Chemical-free, environment-friendly ingredients that are safe for your oral mucosa and body.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solution;
