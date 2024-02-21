import React, { useState, useEffect } from 'react';
import SignUp from './SignUp';
import SetupCompany from './SetupCompany';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function CreateCompany() {
    
    const [currentComponent, setCurrentComponent] = useState(1);
    const [userData, setUserData] = useState({});
    const [companyData, setCompanyData] = useState({});
    const history = useNavigate();

    useEffect(() => {

        if (currentComponent === 2) {
            handleCreateCompany();
        }
        // eslint-disable-next-line
    }, [companyData, currentComponent]);

    const handleCreateCompany = async () => {
        try {

            if (userData.email && userData.password && companyData.companyName && companyData.companyPhone && companyData.providerName && companyData.providerSurname) {
                const companyName = companyData.companyName;
                const companyPhone = companyData.companyPhone;
                const providerName = companyData.providerName;
                const email = userData.email;
                const password = userData.password;
                const providerSurname = companyData.providerSurname;
                const response = await axios.post('http://localhost:3001/signup-final', {
                    email,
                    password,
                    companyName,
                    companyPhone,
                    providerSurname,
                    providerName
                });

                if (response.data.success === 'success') {
                    Cookies.set('userData', JSON.stringify(userData), { expires: 7 });
                    history('/dashboard');
                  }
            } else {

                console.log('Some data is missing');
            }
        } catch (error) {

            console.error(error);
        }
    }

    const handleSignUpContinue = (userData) => {
        setUserData(userData);
        setCurrentComponent(currentComponent + 1);
    };

    const handleCompanyContinue = (companyData) => {
        setCompanyData(companyData);
    }

    const renderCurrentComponent = () =>{
        switch (currentComponent) {
            case 1:
                return <SignUp onContinue={handleSignUpContinue} />;
            case 2:
                return <SetupCompany onContinue={handleCompanyContinue} />;
            default:
                return null;
        }
    }

    return (
        <div className='signup_body'>
            {renderCurrentComponent()}
        </div>
    );
}

export default CreateCompany;
