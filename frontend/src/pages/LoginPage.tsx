import React, {useState} from 'react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (email === '' || password === '') {
            setError('Будь ласка, заповніть усі поля');
        } else {
            setError('');
            console.log('Login:', {email, password});
            // Тут можна зробити реальний запит до бекенду
        }

        // try {
        //     await login({email, password});
        //     navigate('/project/1');
        // } catch (err: any) {
        //     setError(err.response?.data?.message || 'Login failed');
        // }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Увійти</h2>
                {error && <div className="error">{error}</div>}

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-button">
                    Увійти
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
