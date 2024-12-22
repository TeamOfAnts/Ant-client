import { useUser } from '@providers';

function UserScreen(props: {}) {
  // prop destruction
  // lib hooks
  const [user] = useUser();
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  if (!user) {
    return null;
  }

  return <>your name: {user.name}</>;
}

export { UserScreen };
