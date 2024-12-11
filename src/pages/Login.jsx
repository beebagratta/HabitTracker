// Login.jsx
import React, { useContext } from 'react';
import AuthCard from '../components/AuthCard';

const Login = () => {


    return (
        <div>
            <AuthCard
              
                AuthButton={"Login"}
                AuthLink={"/signup"} // Link to the signup page
                AuthLinkText={"Create New"}
            />
        </div>
    );
};

export default Login;
