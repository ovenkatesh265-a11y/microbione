import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

const Hero = () => {

    return (
        <section className="section" style={{ minHeight: '100vh', flexDirection: 'column', textAlign: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <span className="text-gradient-purple" style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    The Future of Oral Care
                </span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 1 }}
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', margin: '1rem 0', lineHeight: 1.1 }}
            >
                Revolutionizing <br />
                <span className="text-gradient">Oral Health</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2rem' }}
            >
                Harnessing the power of beneficial microbes to restore your oral ecosystem naturally.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                <button style={{ fontSize: '1.1rem', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}>
                    <Sparkles size={20} />
                    Discover the Science
                </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 1 }}
                style={{
                    margin: '3rem auto',
                    maxWidth: '450px',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(138, 43, 226, 0.4)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
            >
                <img
                    src="/paste_img.jpeg"
                    alt="Oral Microbiome Toothpaste Product"
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                />
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ position: 'absolute', bottom: '2rem', opacity: 0.7 }}
            >
                <ArrowDown size={32} />
            </motion.div>
        </section>
    );
};

export default Hero;
