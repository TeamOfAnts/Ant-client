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
  return <>this is user screen</>;
}

export { UserScreen };
