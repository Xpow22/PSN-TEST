import { useContext, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { Password } from 'primereact/password'; // Import Password component
import Router from 'next/router';
import Link from 'next/link';
import { Form, Field } from 'react-final-form';
import { AuthContext } from '../context/AuthContext';

const LoginForm: React.FC = () => {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState('');

    const validate = (values: { username: string; password: string }) => {
        const errors: { username?: string; password?: string } = {};
        if (!values.username) {
            errors.username = 'Username is required';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const handleSubmit = async (values: { username: string; password: string }) => {
        try {
            login(values.username, values.password);
            Router.push('/');
        } catch (error) {
            setError('Username or password is incorrect. Please try again.');
        }
    };

    return (
        <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center space-y-4">
                    <Field name="username">
                        {({ input, meta }) => (
                            <div className="mb-2">
                                <FloatLabel>
                                    <label className='text-white' htmlFor="username">Username</label>
                                    <InputText
                                        {...input}
                                        className='rounded-lg border bg-transparent w-full'
                                        id="username"
                                    />
                                </FloatLabel>
                                {meta.touched && meta.error && <span className="text-red-500">{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <Field name="password">
                        {({ input, meta }) => (
                            <div className="mb-2 relative">
                                <FloatLabel>
                                    <label className='text-white' htmlFor="password">Password</label>
                                    <Password
                                        {...input}
                                        className='rounded-lg border bg-transparent w-full'
                                        id="password"
                                        toggleMask 
                                        feedback={false} 
                                    />
                                </FloatLabel>
                                {meta.touched && meta.error && <span className="text-red-500">{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    {error && <div className="text-red-500 text-center">{error}</div>}
                    <Button type="submit" label="Login" className="w-24 border bg-purple-400 text-white rounded-lg" disabled={submitting} />
                    <div>
                        Don't have an account?{' '}
                        <Link href="/register" className="text-yellow-400">
                            Register
                        </Link>
                    </div>
                </form>
            )}
        />
    );
};

export default LoginForm;
