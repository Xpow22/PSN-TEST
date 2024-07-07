import { JSX, useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';

const withAuth = (WrappedComponent: NextPage) => {
    return (props: JSX.IntrinsicAttributes) => {
        useEffect(() => {
            const userData = localStorage.getItem('isAuthenticated');
            if (!userData) {
                Router.push('/login');
            }
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
