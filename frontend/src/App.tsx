import React, { type ReactNode, useEffect, useState } from 'react';
import { FiSun, FiMoon, FiLogIn, FiLogOut } from 'react-icons/fi';
import { useThemeContext } from './theme/ThemeProvider.tsx';
import { KanbanBoard } from './components/kanban/KanbanBoard.tsx';
import Modal from './components/modal/modal.tsx';
import Login from './components/loginSignup/login.tsx';
import AdvancedFallingComponent from './components/fall/falling.tsx';

function DndKitDemo() {
    const [activeTab, setActiveTab] = useState<
        'basic' | 'sortable' | 'multiple'
    >('multiple');

    return (
        <div className="mx-auto p-4">
            <div className="mb-6">
                <div className="flex border-b dark:border-gray-700">
                    <button
                        className={`px-4 py-2 ${
                            activeTab === 'multiple'
                                ? 'border-b-2 border-cyan-500 font-medium  dark:text-purple-400 text-black'
                                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        }`}
                        onClick={() => setActiveTab('multiple')}
                    >
                        Your Kanban Board
                    </button>
                </div>
            </div>

            <div className="rounded-lg border bg-white p-6 dark:border-gray-700 dark:bg-gray-800 min-h-[calc(75vh)]">
                {activeTab === 'multiple' && (
                    <div className="min-h-[calc(60vh)]">
                        <h2 className="mb-4 text-xl font-bold dark:text-white">
                            Project name
                        </h2>
                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            description
                        </p>
                        <KanbanBoard />
                    </div>
                )}
            </div>
        </div>
    );
}

function App(): ReactNode {
    const { isDarkMode, toggleDarkMode } = useThemeContext();
    // const { isLoggedIn, Login } = useAuthContext();
    const [modalOpen, setModalOpen] = useState(true);

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
            <header className="sticky top-0 z-10 bg-white shadow-sm dark:border-b dark:border-gray-800 dark:bg-gray-900">
                <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-4">
                        <span className="h-6 w-px bg-gray-300 dark:bg-gray-700"></span>
                        <button
                            onClick={toggleDarkMode}
                            className="flex h-10 w-10 items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none active:bg-gray-400 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-500"
                            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                        >
                            {isDarkMode ? (
                                <FiSun aria-hidden="true" />
                            ) : (
                                <FiMoon aria-hidden="true" />
                            )}
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="h-6 w-px bg-gray-300 dark:bg-gray-700"></span>
                        <button
                            onClick={() => {
                                setModalOpen(true);
                            }}
                            className="flex h-10 w-10 items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none active:bg-gray-400 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-500"
                            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                        >
                            {isDarkMode ? (
                                <FiLogIn aria-hidden="true" />
                            ) : (
                                <FiLogOut aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
                <Modal active={modalOpen} setActive={setModalOpen}>
                    <AdvancedFallingComponent
                        isVisible={modalOpen}
                        setIsVisible={setModalOpen}
                    >
                        <Login />
                    </AdvancedFallingComponent>
                </Modal>
            </header>

            <main className="flex-grow px-4 py-6 p-8 ">
                <div className="mx-auto ">
                    <DndKitDemo />
                </div>
            </main>
        </div>
    );
}

export default App;

// return (
//     <BrowserRouter>
//         <Routes>
//             <Route path="/auth" element={<AuthPage />} />
//             <Route path="/" element={<KanbanComponent />} />
//         </Routes>
//     </BrowserRouter>
// );
