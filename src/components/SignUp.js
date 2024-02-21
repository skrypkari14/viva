import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

function SignUp({ onContinue }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [existError, setExistError] = useState('');

    const googleSignup = () => {
        console.log('Google Signup');
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleEmailSignup = async () => {
        try {
            if (!validateEmail(email)) {
                setEmailError('Неверный формат электронной почты');
                return;
            } else {
                setEmailError('');
            }

            if (password.length < 6) {
                setPasswordError('Пароль должен содержать не менее 6 символов');
                return;
            } else {
                setPasswordError('');
            }

            if (password !== confirmPassword) {
                setConfirmPasswordError('Пароли не совпадают');
                return;
            } else {
                setConfirmPasswordError('');
            }

            // Отправка данных на сервер
            const response = await axios.post('http://localhost:3001/signup-first', {
                email,
                password,
            });
            console.log('Front : Успешная регистрация', response.data);
            setExistError('');

            onContinue({ email, password });
            
        } catch (error) {
            // Обработка ошибок
            if (error.response) {
                setExistError(error.response.data.error)
                console.error('Ошибка от сервера:', error.response.data.error);
            } else if (error.request) {
                setExistError(error.response.data.error)
                // Ошибка запроса (например, нет ответа от сервера)
                console.error('Ошибка запроса:', error.request);
            } else {
                setExistError(error.response.data.error)
                // Другие ошибки
                console.error('Неизвестная ошибка:', error.message);
            }
        }
    };

    return (
            <div className="signup_container">
                <form>
                    <div className="title">Регистрация</div>

                    {emailError && <p className="error-message">{emailError}</p>}
                    {passwordError && <p className="error-message">{passwordError}</p>}
                    {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
                    {existError && <p className="error-message">{existError}</p>}
                    <div className="input-box underline">
                        <input
                            type="text"
                            placeholder="Введите вашу почту"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Введите ваш пароль"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder="Подтвердите пароль"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box button">
                        <input type="button" value="Зарегистрироваться" onClick={handleEmailSignup} />
                    </div>
                </form>
                <div className="option">или зарегистрируйтесь с помощью социальных сетей</div>
                <button onClick={googleSignup} className="google">
                    <FontAwesomeIcon icon={faGoogle} />
                    <p>Через Google</p>
                </button>
            </div>
    );
}

export default SignUp;
