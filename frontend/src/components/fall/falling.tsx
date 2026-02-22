import { motion, AnimatePresence } from 'framer-motion';

interface AdvancedFallingComponentProps {
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
    children: React.ReactNode;
}

const AdvancedFallingComponent = (
    advancedFallingComponentProps: AdvancedFallingComponentProps
) => {
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
                {advancedFallingComponentProps.isVisible && (
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
                        {advancedFallingComponentProps.children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdvancedFallingComponent;
