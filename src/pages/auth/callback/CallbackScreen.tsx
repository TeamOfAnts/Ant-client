import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ROUTE_AUTH_LOGIN } from '@routes';
import { useOAuth } from '@features/auth/hooks';

function CallbackScreen(props: {}) {
  // prop destruction
  // lib hooks
  const params = useParams();
  const [querystring] = useSearchParams();
  const navigate = useNavigate();
  const code = querystring.get('code');
  const { provider } = params;
  if (!code || !provider) {
    alert('잘못된 경로입니다.');
    navigate(ROUTE_AUTH_LOGIN);
    return;
  }
  useOAuth({ provider, code });
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return <></>;
}

export { CallbackScreen };
