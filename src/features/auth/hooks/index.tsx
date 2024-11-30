import { useQuery } from '@shared/libs/query';
import { authRepository } from '@repositories';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadAccessToken } from '@providers';

export function useOAuth(props: { provider: string; code: string }) {
  // prop destruction
  const { provider, code } = props;
  const navigate = useNavigate();
  // lib hooks
  // state, ref hooks
  // form hooks
  // query hooks
  const { data: accessToken } = useQuery(authRepository.callback, {
    variables: {
      provider,
      code,
    },
  });
  // calculated values
  // effects
  useEffect(() => {
    if (accessToken) {
      loadAccessToken(accessToken);
      navigate('/polls');
    }
  }, [accessToken]);
  // handlers
}
