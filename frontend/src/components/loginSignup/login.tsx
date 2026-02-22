import { useState } from 'react';
import './login.css';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { authApi } from '../../api/auth/authApi.ts';
import { useDispatch } from 'react-redux';
import {
    setAccessToken,
    setRefreshToken,
} from '../../store/features/auth/authSlice.ts';

interface LoginFormProps {
    setIsVisible: (visible: boolean) => void;
}

interface LoginProps {
    email: string;
    password: string;
}

interface SignUpProps {
    email: string;
    password: string;
    name: string;
    secondName?: string;
}

const Login = (loginFormProps: LoginFormProps) => {
    const [activeTab, setActiveTab] = useState<'signUp' | 'login'>('login');
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const [loginInfo, setLoginInfo] = useState<LoginProps>({
        email: '',
        password: '',
    });

    const [signUpInfo, setSignUpInfo] = useState<SignUpProps>({
        email: '',
        password: '',
        name: '',
        secondName: '',
    });

    const dispatch = useDispatch();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const loginData = await authApi.login(loginInfo);

            console.log('loginData:', loginData);
            console.log(typeof loginData);
            dispatch(setAccessToken(loginData.data.accessToken));
            dispatch(setRefreshToken(loginData.data.refreshToken));
            loginFormProps.setIsVisible(false);
            setError(null);
        } catch (error) {
            setError(
                'Login failed. Please check your credentials and try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = async () => {
        setIsLoading(true);
        try {
            console.log('signUp info:', signUpInfo);
            await authApi.register(signUpInfo);
            setError(null);
        } catch (error) {
            console.error('signUp error:', error);
            setError(
                'Login failed. Please check your credentials and try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginClick = () => {
        if (activeTab === 'login') {
            handleLogin();
        } else {
            setLoginInfo({
                email: signUpInfo.email,
                password: signUpInfo.password,
            });
            setActiveTab('login');
        }
    };

    const handleSignUpClick = () => {
        if (activeTab === 'signUp') {
            handleSignUp();
        } else {
            setSignUpInfo({
                email: loginInfo.email,
                password: loginInfo.password,
                name: '',
                secondName: '',
            });
            setActiveTab('signUp');
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <div className="text">
                    {activeTab === 'signUp' ? 'Sign up' : 'Login'}
                </div>
                <div className="underline"></div>
            </div>

            <div className="inputs">
                {activeTab === 'signUp' && (
                    <div className="input">
                        <FiUser className="m-4 icon" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={signUpInfo.name}
                            onChange={(e) =>
                                setSignUpInfo({
                                    ...signUpInfo,
                                    name: e.target.value,
                                })
                            }
                            disabled={isLoading}
                        />
                    </div>
                )}

                <div className="input">
                    <FiMail className="m-4 icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={
                            activeTab === 'signUp'
                                ? signUpInfo.email
                                : loginInfo.email
                        }
                        onChange={(e) => {
                            if (activeTab === 'signUp') {
                                setSignUpInfo({
                                    ...signUpInfo,
                                    email: e.target.value,
                                });
                            } else {
                                setLoginInfo({
                                    ...loginInfo,
                                    email: e.target.value,
                                });
                            }
                        }}
                        disabled={isLoading}
                    />
                </div>

                <div className="input">
                    <FiLock className="m-4 icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={
                            activeTab === 'signUp'
                                ? signUpInfo.password
                                : loginInfo.password
                        }
                        onChange={(e) => {
                            if (activeTab === 'signUp') {
                                setSignUpInfo({
                                    ...signUpInfo,
                                    password: e.target.value,
                                });
                            } else {
                                setLoginInfo({
                                    ...loginInfo,
                                    password: e.target.value,
                                });
                            }
                        }}
                        disabled={isLoading}
                    />
                </div>

                {activeTab === 'signUp' && (
                    <div className="input">
                        <FiUser className="m-4 icon" />
                        <input
                            type="text"
                            placeholder="Second Name (optional)"
                            value={signUpInfo.secondName}
                            onChange={(e) =>
                                setSignUpInfo({
                                    ...signUpInfo,
                                    secondName: e.target.value,
                                })
                            }
                            disabled={isLoading}
                        />
                    </div>
                )}
            </div>

            <div className="submit-container">
                <div
                    className={
                        activeTab === 'signUp'
                            ? 'submit-button'
                            : 'submit-button change'
                    }
                    onClick={handleSignUpClick}
                >
                    {isLoading && activeTab === 'signUp' ? '...' : 'Sign Up'}
                </div>

                <div
                    className={
                        activeTab === 'login'
                            ? 'submit-button'
                            : 'submit-button change'
                    }
                    onClick={handleLoginClick}
                >
                    {isLoading && activeTab === 'login' ? '...' : 'Login'}
                </div>
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default Login;
