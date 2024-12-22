import { useSearchParams } from 'react-router-dom';
import { ROUTE_USERS_NAME } from '@routes';
import { loadAccessToken, loadRefreshToken } from '@providers';
import { useQuery } from '@libs/query';
import { authRepository } from '@repositories';
import { useToast } from '../../../hooks';

function CallbackScreen(props: {}) {
  // prop destruction
  // lib hooks
  const [querystring] = useSearchParams();
  const code = querystring.get('code');
  const provider = querystring.get('provider');
  const { toast } = useToast();
  // state, ref hooks
  // form hooks
  // query hooks
  useQuery(authRepository.callback, {
    variables: {
      provider: provider?.toUpperCase()!,
      authorizationCode: code!,
    },
    onCompleted: (data) => {
      if (data) {
        loadAccessToken(data.accessToken);
        loadRefreshToken(data.refreshToken);
        window.location.href = ROUTE_USERS_NAME;
      }
    },
    onError: (err) => {
      toast({
        title: '인증에 실패했습니다.',
        description: err.message,
        color: 'red',
        duration: 1500,
        variant: 'destructive',
      });
    },
  });
  // calculated values
  // effects
  // handlers
  return <></>;
}

export { CallbackScreen };
