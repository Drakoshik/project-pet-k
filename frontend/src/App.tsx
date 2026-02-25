import React, { type ReactNode, useEffect, useState } from 'react';
import { FiSun, FiMoon, FiLogIn, FiUser } from 'react-icons/fi';
import { useThemeContext } from './theme/ThemeProvider.tsx';
import Modal from './components/modal/modal.tsx';
import Login from './components/loginSignup/login.tsx';
import AdvancedFallingComponent from './components/fall/falling.tsx';
import BoardHandler from './components/boards/BoardHandler.tsx';
import { useAuth } from './store/features/auth/authSelector.ts';
import { userApi } from './api/user/userApi.ts';

function App(): ReactNode {
    const { isDarkMode, toggleDarkMode } = useThemeContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const token = useAuth();
    useEffect(() => {
        console.log(`app useEffect ${token.accessToken}`);
        if (token.accessToken) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, [token]);

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
                            onClick={async () => {
                                if (authenticated) {
                                    const users = await userApi.getUsers();
                                    console.log(users);
                                } else {
                                    setModalOpen(true);
                                }
                            }}
                            className="flex h-10 w-10 items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:outline-none active:bg-gray-400 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-500"
                            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                        >
                            {authenticated ? (
                                <FiUser aria-hidden="true" />
                            ) : (
                                <FiLogIn aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
                <Modal active={modalOpen} setActive={setModalOpen}>
                    <AdvancedFallingComponent
                        isVisible={modalOpen}
                        setIsVisible={setModalOpen}
                    >
                        <Login setIsVisible={setModalOpen} />
                    </AdvancedFallingComponent>
                </Modal>
            </header>

            <main className="flex-grow px-4 py-6 p-8 ">
                <div className="mx-auto ">
                    <BoardHandler />
                </div>
            </main>
        </div>
    );
}

export default App;
