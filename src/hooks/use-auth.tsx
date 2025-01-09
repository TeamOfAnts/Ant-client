import Cookies from 'js-cookie';
import { useCallback } from 'react';
import { queryClient } from '../app/App';

function useAuth() {
  const logout = useCallback(() => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    window.location.reload();

    queryClient.clear();
  }, []);

  return { logout };
}

export { useAuth };
