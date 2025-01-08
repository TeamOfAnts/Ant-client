import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Button } from '@shared/ui';
import { ROUTE_POLLS } from '@routes';

function NotFound(props: {}) {
  // prop destruction
  // lib hooks
  const navigate = useNavigate();
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <Card>
      <CardContent>
        <p>Sorry,</p>
        <p>we couldn't find that page :(</p>
        Maybe the page you are looking for has been removed, or you typed in the wrong URL
        <Button onClick={() => navigate(ROUTE_POLLS)}>Go to homepage</Button>
      </CardContent>
    </Card>
  );
}

export { NotFound };
