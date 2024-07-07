import LoginForm from '../components/LoginForm';
import { AuthProvider } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-500">
        <div className="bg-transparent p-8 rounded shadow-2xl max-w-md w-full">
          <h2 className="text-2xl text-white mb-4">Login</h2>
          <LoginForm />
        </div>
      </div>
    </AuthProvider>
  );
};

export default LoginPage;
