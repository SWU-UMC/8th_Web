import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';


const useLogout = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: () => logout(),
  });
};

export default useLogout;