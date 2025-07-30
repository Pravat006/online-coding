import React from 'react';
import GoogleLogin from './GoogleLogin';
import GithubLogin from './GithubLogin';

const Login: React.FC = () => {



    return (
        <div className='login-card'>
            <div
                className="flex flex-col items-start justify-center gap-5 rounded-xl border-2 border-gray-900 bg-white/80 shadow-[4px_4px_0_0_rgba(55,65,81,1)] px-8 py-10 w-full max-w-sm"
            >
                <p className="font-bold text-gray-900 text-xl mb-2 flex flex-col w-full">
                    Welcome,
                    <span className="font-mono text-gray-500 text-base font-semibold">sign in to continue</span>
                </p>
                <GoogleLogin />
                <GithubLogin />

            </div>
        </div>
    );
};

export default Login;
