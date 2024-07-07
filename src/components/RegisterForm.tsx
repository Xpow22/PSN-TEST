import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { FloatLabel } from 'primereact/floatlabel';
import Router from 'next/router';
import Link from 'next/link';
import { Form, Field } from 'react-final-form';
import React from 'react';
import toast from 'react-hot-toast';

const RegisterForm: React.FC = () => {
    const validate = (values: { username: string; email: string; password: string; confirm_password: string }) => {
        const errors: { username?: string; email?: string; password?: string; confirm_password?: string } = {};
        if (!values.username) {
            errors.username = 'Username is required';
        }
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email is invalid';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        if (!values.confirm_password) {
            errors.confirm_password = 'Confirm Password is required';
        } else if (values.confirm_password !== values.password) {
            errors.confirm_password = 'Passwords do not match';
        }
        return errors;
    };

    const handleSubmit = (values: { username: string; email: string; password: string; confirm_password: string }) => {
        const userData = {
            username: values.username,
            email: values.email,
            password: values.password,
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        Router.push('/login');
        toast.success('Registrasi is Successfullly')
    };

    return (
        <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit, submitting, submitFailed }) => (
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-5">
                    <Field name="username">
                        {({ input, meta }) => (
                            <div className="mt-3">
                                <FloatLabel>
                                    <label className='text-black' htmlFor="username">Username</label>
                                    <InputText {...input} className='rounded-lg border bg-transparent' id="username" />
                                </FloatLabel>
                                {meta.touched && meta.error && <div className="text-red-500">{meta.error}</div>}
                            </div>
                        )}
                    </Field>
                    <Field name="email">
                        {({ input, meta }) => (
                            <div className="my-3">
                                <FloatLabel>
                                    <label className='text-black' htmlFor="email">Email</label>
                                    <InputText {...input} className='rounded-lg border bg-transparent' id="email" type="email" />
                                </FloatLabel>
                                {meta.touched && meta.error && <div className="text-red-500">{meta.error}</div>}
                            </div>
                        )}
                    </Field>
                    <Field name="password">
                        {({ input, meta }) => (
                            <div className="mb-2 relative">
                                <FloatLabel>
                                    <label className='text-black' htmlFor="password">Password</label>
                                    <Password
                                        {...input}
                                        className='rounded-lg border bg-transparent'
                                        id="password"
                                        toggleMask
                                        feedback={false}
                                        promptLabel="Enter a password"
                                    />
                                </FloatLabel>
                                {meta.touched && meta.error && <span className="text-red-500">{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <Field name="confirm_password">
                        {({ input, meta }) => (
                            <div className="mb-2 relative">
                                <FloatLabel>
                                    <label className='text-black' htmlFor="confirm_password">Confirm Password</label>
                                    <Password
                                        {...input}
                                        className='rounded-lg border bg-transparent'
                                        id="confirm_password"
                                        toggleMask
                                        feedback={false}
                                        promptLabel="Confirm Password"
                                    />
                                </FloatLabel>
                                {meta.touched && meta.error && <span className="text-red-500">{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <Button type="submit" label="Register" className="w-24 border bg-purple-400 text-black rounded-lg" disabled={submitting} />
                    <div>
                        Do you have an account?{' '}
                        <Link href="/login" className="text-yellow-400">
                            Login
                        </Link>
                    </div>
                    {submitFailed && (
                        <div className="text-red-500 mt-4">
                            Please correct the errors above.
                        </div>
                    )}
                </form>
            )}
        />
    );
};

export default RegisterForm;
