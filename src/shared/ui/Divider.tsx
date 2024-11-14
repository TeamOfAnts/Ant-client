function Divider(props: { className?: string; orientation: 'horizontal' | 'vertical' }) {
  // prop destruction
  const { className = '', orientation } = props;
  // lib hooks
  // state, ref hooks
  // query hooks
  // calculated values
  const classes =
    orientation === 'vertical'
      ? `border-t-2 border-primary w-full h-full ${className}`
      : `border-r-2 border-primary w-full h-full ${className}`;
  // effects
  // handlers
  return <div className={classes} />;
}

export { Divider };
