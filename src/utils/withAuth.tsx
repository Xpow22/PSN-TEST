import { JSX, useEffect } from 'react';
import Router from 'next/router';
import { NextPage } from 'next';

const withAuth = (WrappedComponent: NextPage) => {
    const ComponentWithAuth = (props: JSX.IntrinsicAttributes) => {
        useEffect(() => {
            const userData = localStorage.getItem('isAuthenticated');
            if (!userData) {
                Router.push('/login');
            }
        }, []);

        return <WrappedComponent {...props} />;
    };

    ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ComponentWithAuth;
};

export default withAuth;
