import { useMemo } from 'react';
import {
  useMutation as reactUseMutation,
  useQuery as reactUseQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

export { QueryClient, QueryClientProvider, useQueryClient };

export const queryKeyMap = new Map<(...args: any[]) => Promise<any>, string[]>();

/**
 * Apollo 와 동일한 signature 로 React Query 를 사용하기 위한 wrapper
 */
export const useQuery = <Variables, Result>(
  queryFn: (...variables: Variables[]) => Promise<Result>,
  options?: {
    variables?: Variables;
    skip?: boolean;
    staleTime?: number;
    cacheTime?: number;
    onCompleted?: (result: Result) => void;
    onError?: (err: Error) => void;
    onSettled?: () => void;
  },
) => {
  const { variables, skip, onCompleted, ...otherOPtions } = options || {};
  const queryKey = useMemo(() => {
    const queryKey = queryKeyMap.get(queryFn);
    if (!queryKey) {
      throw Error(`${queryFn.name} didn't set in queryKeyMap`);
    }
    return queryKey;
  }, [queryFn]);

  return reactUseQuery(
    [...queryKey, ...Object.values(variables ?? {})],
    () => (variables ? queryFn(variables) : queryFn()),
    {
      enabled: skip,
      onSuccess: (result) => {
        options?.onCompleted?.(result);
      },
      ...otherOPtions,
    },
  );
};

export const useMutation = <Variables, Result>(
  mutateFn: (variables: Variables) => Promise<Result>,
  options?: {
    disableRefetch?: boolean;
    onCompleted?: (data: Result) => void;
    onError?: (err: Error) => void;
  },
) => {
  const queryClient = useQueryClient();
  const queryKey = useMemo(() => {
    const queryKey = queryKeyMap.get(mutateFn);
    if (!queryKey) {
      throw Error(`${mutateFn.name} didn't set in queryKeyMap`);
    }
    return queryKey;
  }, [mutateFn]);

  return reactUseMutation(queryKey, mutateFn, {
    onSuccess: (result) => {
      !options?.disableRefetch && queryClient.refetchQueries(queryKey, { exact: false });
      options?.onCompleted?.(result);
    },
    onError: options?.onError,
  });
};
