import React, { useState } from 'react';
import axios from 'axios';

function SetupCompany({ onContinue }) {
    const [companyName, setCompanyName] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [providerName, setProviderName] = useState('');
    const [providerSurname, setProviderSurname] = useState('');
    const [error, setError] = useState('');

    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = phoneNumber.replace(/\D/g, '');
        const formatted = `+${cleaned.slice(0, 3)} (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 11)}`;
        return formatted;
    };

    const validatePhone = (phoneNumber) => { 

        const phoneRegex = /^\+\d{3} \(\d{2}\) \d{3}-\d{3}$/;
        
        return phoneRegex.test(phoneNumber);
      };

    const validateCompanyName = (name) => {
        return name.trim() !== '';
    };

    const validateName = (name) => {
        return name.trim() !== '';
    };

    const handlePhoneChange = (e) => {
        const rawValue = e.target.value;
        const formattedValue = formatPhoneNumber(rawValue);
        setCompanyPhone(formattedValue);
    };

    const handleCompanySetup = async () => {
        try {
            if (!validateCompanyName(companyName) || !validatePhone(companyPhone) || !validateName(providerName) || !validateName(providerSurname)) {
                setError('Пожалуйста, заполните все поля корректно.');
                return;
            } else {
                setError('');
            }

            // Отправка данных на сервер
            const response = await axios.post('http://localhost:3001/signup-second', {
                companyName,
                companyPhone
            });

            console.log('Front: Успешная настройка компании', response.data);
            onContinue({ companyName, companyPhone, providerName, providerSurname });

        } catch (error) {
            if (error.response) {
                setError(error.response.data.error)
                console.error('Ошибка от сервера:', error.response.data.error);
            }
        }
    };

    return (
        <div className='signup_body'>
            <div className="signup_container">
                <form>
                    <div className="title">Дополнительная информация</div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="input-box underline">
                        <input
                            type="text"
                            placeholder="Введите название компании"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box underline">
                        <input
                            type="text"
                            placeholder="Введите номер телефона"
                            required
                            value={companyPhone}
                            onChange={handlePhoneChange}
                        />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box underline">
                        <input
                            type="text"
                            placeholder="Введите ваше имя"
                            required
                            value={providerName}
                            onChange={(e) => setProviderName(e.target.value)}
                        />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box underline">
                        <input
                            type="text"
                            placeholder="Введите вашу фамилию"
                            required
                            value={providerSurname}
                            onChange={(e) => setProviderSurname(e.target.value)}
                        />
                        <div className="underline"></div>
                    </div>
                    <div className="input-box button">
                        <input type="button" value="Начать" onClick={handleCompanySetup} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SetupCompany;
