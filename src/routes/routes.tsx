import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CallbackScreen, LoginScreen, NotFound, PollScreen, UserNameAuditScreen, UserScreen } from '@pages';
import { Layout } from '../layouts';
import { ROUTE_AUTH, ROUTE_POLLS, ROUTE_USERS } from './const';

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
          <Route path="/" element={<Navigate replace to={ROUTE_POLLS} />} />
          <Route path={ROUTE_POLLS} element={<PollScreen />} />
          <Route path={ROUTE_AUTH}>
            <Route path="login" element={<LoginScreen />} />
            <Route path="callback" element={<CallbackScreen />} />
          </Route>
          <Route path={ROUTE_USERS}>
            <Route path="" element={<UserScreen />} />
            <Route path="name" element={<UserNameAuditScreen />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export { AppRouter };
