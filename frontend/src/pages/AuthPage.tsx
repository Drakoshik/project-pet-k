import React, {useState} from 'react';
import './AuthPage.css';
import {login, register} from "../api/auth";

const AuthPage: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password || (mode === 'register' && !username)) {
            setError('Будь ласка, заповніть усі поля');
            return;
        }
        setError('');

        if (mode === 'login') {
            console.log('➡️ Login:', {email, password});
            try {
                await login({email, password});
            } catch (err: any) {
                setError(err.response?.data?.message || 'Login failed');
            }
        } else {
            console.log('🆕 Register:', {username, email, password});
            try {
                await register({email, password});
            } catch (err: any) {
                setError(err.response?.data?.message || 'Login failed');
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-switch">
                <button
                    className={mode === 'login' ? 'active' : ''}
                    onClick={() => setMode('login')}
                >
                    Увійти
                </button>
                <button
                    className={mode === 'register' ? 'active' : ''}
                    onClick={() => setMode('register')}
                >
                    Зареєструватися
                </button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
                <h2 className="auth-title">{mode === 'login' ? 'Увійти' : 'Реєстрація'}</h2>

                {error && <div className="error">{error}</div>}

                {mode === 'register' && (
                    <div className="form-group">
                        <label>Ім’я користувача</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group password-group">
                    <label>Пароль</label>
                    <div className="input-with-icon">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <span className="password-icon" onClick={
                            () => setShowPassword(prev => !prev)}>
      {showPassword ? '🙈' : '👁️'}
    </span>


                    </div>
                </div>


                {mode === 'register' && (
                    <div className="form-group password-group">
                        <label>Повторити пароль</label>
                        <div className="input-with-icon">
                            <input
                                type={showRepeatPassword ? 'text' : 'password'}
                                value={repeatPassword}
                                onChange={e => setRepeatPassword(e.target.value)}
                                required
                            />
                            <span className="password-icon" onClick=
                                {() => setShowRepeatPassword(prev => !prev)}>
      {showRepeatPassword ? '🙈' : '👁️'}
    </span>
                        </div>
                    </div>
                )
                }

                <button type="submit" className="auth-button">
                    {mode === 'login' ? 'Увійти' : 'Зареєструватися'}
                </button>
            </form>
        </div>
    );
};

export default AuthPage;
