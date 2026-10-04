import { useAuth } from '../context/AuthContext';

const useSession = () => {
  const auth = useAuth();

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    clearError: auth.clearError,
    login: auth.login,
    loginAdmin: auth.loginAdmin,
    forgotPassword: auth.forgotPassword,
    resetPassword: auth.resetPassword,
    logout: auth.logout,
  };
};

export default useSession;

