import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PollScreen } from '../pages/poll/PollScreen';
import { Layout } from '../layouts';
import { ROUTE_POLLS } from './const';

function AppRouter(props: {}) {
  // prop destruction
  // lib hooks
  // state, ref hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={ROUTE_POLLS} element={<PollScreen />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export { AppRouter };
