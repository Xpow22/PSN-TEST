import React from 'react';
import { Form, Field } from 'react-final-form';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string, email: string, body: string }) => void;
}

const validate = (values: { name: string, email: string, body: string }) => {
  const errors: Partial<{ name: string; email: string; body: string }> = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  if (!values.body) {
    errors.body = 'Body is required';
  }
  return errors;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl mb-4">Create Comment</h2>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field name="name">
                {({ input, meta }) => (
                  <div className="mb-4">
                    <input
                      {...input}
                      type="text"
                      placeholder="Name"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    {meta.touched && meta.error && <span className="text-red-500">{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="email">
                {({ input, meta }) => (
                  <div className="mb-4">
                    <input
                      {...input}
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    {meta.touched && meta.error && <span className="text-red-500">{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="body">
                {({ input, meta }) => (
                  <div className="mb-4">
                    <textarea
                      {...input}
                      placeholder="Body"
                      className="w-full p-2 border border-gray-300 rounded"
                      rows={4}
                    />
                    {meta.touched && meta.error && <span className="text-red-500">{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  disabled={submitting}
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default Modal;
