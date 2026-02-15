import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedFallingComponent = ({ isVisible, setIsVisible, children }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        initial: {
            y: -1000,
            rotate: 0,
            opacity: 0,
        },
        fall: {
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 120,
                damping: 12,
            },
        },
        tilt: {
            rotate: [0, 15, -8, 2, 0],
            transition: {
                duration: 1.2,
                times: [0, 0.2, 0.5, 0.8, 1],
                ease: 'easeInOut',
            },
        },
        final: {
            opacity: 1,
            transition: {
                duration: 0.3,
            },
        },
    };

    return (
        <div>
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial="initial"
                        animate={['fall', 'tilt', 'final']}
                        exit={{
                            y: -1000,
                            rotate: -15,
                            opacity: 0,
                            transition: { duration: 0.7 },
                        }}
                        variants={itemVariants}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdvancedFallingComponent;
