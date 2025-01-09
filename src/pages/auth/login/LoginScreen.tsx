import { useUser } from '@providers';
import { GoogleLoginButton } from '@features/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_POLLS } from '../../../routes';

function LoginScreen(props: {}) {
  // prop destruction
  // lib hooks
  const [user] = useUser({ canBeUnauthenticated: true });
  const navigate = useNavigate();
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  useEffect(() => {
    if (user) {
      navigate(ROUTE_POLLS);
    }
  }, [user]);
  // handlers
  return (
    <div className="flex items-center justify-center w-full h-full">
      <GoogleLoginButton />
    </div>
  );
}

export { LoginScreen };
