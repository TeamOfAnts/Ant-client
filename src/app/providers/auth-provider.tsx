import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from '@models';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { ROUTE_AUTH_LOGIN } from '@routes';
import { userRepository } from '@repositories';

const AuthContext = createContext<{ getUser(): User | undefined; setUser(user?: User): void }>({
  getUser() {
    return undefined;
  },
  setUser() {},
});

export function getAccessToken() {
  return Cookie.get('accessToken');
}

export function getRefreshToken() {
  return Cookie.get('refreshToken');
}

export function loadAccessToken(token: string) {
  return Cookie.set('accessToken', token);
}

export function loadRefreshToken(token: string) {
  return Cookie.set('refreshToken', token);
}

export function AuthProvider(props: { children?: ReactNode }) {
  // prop destruction
  const { children } = props;

  // lib hooks
  // state, ref, querystring hooks
  const [user, setUser] = useState<User>();
  const [initialized, setInitialized] = useState(false);

  // form hooks
  // query hooks
  // calculated values
  const contextValue = useMemo(() => {
    return {
      getUser() {
        return user;
      },
      setUser,
    };
  }, [user]);

  // effects
  useEffect(() => {
    if (initialized) {
      return;
    }

    const token = getAccessToken();

    if (!token) {
      setInitialized(true);
      return;
    }

    loadAccessToken(token);

    userRepository
      .self()
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        /**
         * TODO: token은 있는데 getSelf에 실패했을 때 ex) 만료된 토큰. 서버에 장애가 있음. 등등
         */
        console.error(err);
      })
      .finally(() => {
        setInitialized(true);
      });
  }, [initialized]);

  // handlers

  if (!initialized) {
    return null;
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useUser = <T extends boolean = false>(options?: {
  canBeUnauthenticated: T;
}): T extends false ? [User] : [User | undefined] => {
  const { getUser } = useContext(AuthContext);
  const user = getUser();
  const navigate = useNavigate();
  const canBeUnauthenticated = options?.canBeUnauthenticated ?? false;

  if (!user && !canBeUnauthenticated) {
    navigate(ROUTE_AUTH_LOGIN);
  }

  return [user!];
};
