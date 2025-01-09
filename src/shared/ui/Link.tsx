import { Link as RouterLink } from 'react-router-dom';
function Link(props: { to: string; children: React.ReactNode; className?: string }) {
  // prop destruction
  const { to, children, className } = props;
  // lib hooks
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <RouterLink className={`text-blue/70 hover:text-primary ${className}`} to={to}>
      {children}
    </RouterLink>
  );
}

export { Link };
