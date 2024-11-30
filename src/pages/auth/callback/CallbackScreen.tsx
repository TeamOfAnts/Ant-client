import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ROUTE_AUTH_LOGIN } from '@routes';
import { useEffect } from 'react';
import { loadAccessToken } from '@providers';
import { useQuery } from '@libs/query';
import { authRepository } from '@repositories';

function CallbackScreen(props: {}) {
  // prop destruction
  // lib hooks
  const params = useParams();
  const [querystring] = useSearchParams();
  const navigate = useNavigate();
  const code = querystring.get('code');
  const { provider } = params;
  // state, ref hooks
  // form hooks
  // query hooks
  const { data: accessToken } = useQuery(authRepository.callback, {
    skip: !code || !provider,
    variables: {
      provider: provider!,
      code: code!,
    },
  });
  // calculated values
  // effects
  useEffect(() => {
    if (!code || !provider) {
      alert('잘못된 경로입니다.');
      navigate(ROUTE_AUTH_LOGIN);
    }
  }, [code, navigate, provider]);
  useEffect(() => {
    if (accessToken) {
      loadAccessToken(accessToken);
      navigate('/users/nickname');
    }
  }, [accessToken, navigate]);
  // handlers
  return <></>;
}

export { CallbackScreen };
