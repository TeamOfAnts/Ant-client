import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PollScreen, UserScreen } from '@pages';
import { Layout } from '../layouts';
import { ROUTE_POLLS, ROUTE_USERS } from './const';

function AppRouter(props: {}) {
  // prop destruction
  // lib hooks
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={ROUTE_POLLS} element={<PollScreen />} />
          <Route path={ROUTE_USERS} element={<UserScreen />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export { AppRouter };
