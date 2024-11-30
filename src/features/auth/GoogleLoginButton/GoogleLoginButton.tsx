import { useTheme } from '@shared/libs/theme';
import GoogleDarkIcon from '@assets/icons/google-dark.svg';
import GoogleLightIcon from '@assets/icons/google-light.svg';

function GoogleLoginButton(props: {}) {
  // prop destruction
  // lib hooks
  const { theme } = useTheme();
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <a
      href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}&response_type=code&scope=${import.meta.env.VITE_GOOGLE_SCOPE}`}
    >
      {theme === 'dark' ? <GoogleDarkIcon /> : <GoogleLightIcon />}
    </a>
  );
}

export { GoogleLoginButton };
