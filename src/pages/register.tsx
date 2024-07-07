import RegisterForm from '../components/RegisterForm';
import { AuthProvider } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-500">
        <div className="bg-transparent p-8 rounded shadow-2xl max-w-md w-full">
          <h2 className="text-2xl text-center text-white mb-4">Register</h2>
          <RegisterForm />
        </div>
      </div>
    </AuthProvider>
  );
};

export default RegisterPage;
