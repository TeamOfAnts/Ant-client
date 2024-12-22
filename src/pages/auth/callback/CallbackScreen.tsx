import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTE_POLLS, ROUTE_USERS_NAME } from '@routes';
import { loadAccessToken, loadRefreshToken } from '@providers';
import { useQuery } from '@libs/query';
import { authRepository } from '@repositories';
import { useToast } from '@hooks';

function CallbackScreen(props: {}) {
  // prop destruction
  // lib hooks
  const [querystring] = useSearchParams();
  const code = querystring.get('code');
  const provider = querystring.get('provider');
  const { toast } = useToast();
  const navigate = useNavigate();
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
        window.location.href = data.isNew ? ROUTE_USERS_NAME : ROUTE_POLLS;
      }
    },
    onError: () => {
      toast({
        title: '인증에 실패했습니다.',
        color: 'red',
        duration: 1500,
        variant: 'destructive',
      });

      // HACK: 아직 더 좋은 방법을 찾지 못했다.
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    },
  });
  // calculated values
  // effects
  // handlers
  return <></>;
}

export { CallbackScreen };
