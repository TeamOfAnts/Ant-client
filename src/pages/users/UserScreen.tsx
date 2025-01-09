import { useUser } from '@providers';
import { Button, Link } from '@shared/ui';
import { ROUTE_USERS_NAME } from '@routes';
import { useAuth } from '@hooks';

function UserScreen(props: {}) {
  // prop destruction
  // lib hooks
  const [user] = useUser();
  const { logout } = useAuth();
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <p>아직 정해진 기획이 없어요! 어떤걸 하면 좋을지 추천해주세요!</p>
      <Link to={ROUTE_USERS_NAME}>이름 변경하기</Link>
      <Button onClick={() => logout()}>로그아웃</Button>
    </div>
  );
}

export { UserScreen };
