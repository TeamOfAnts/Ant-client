import type { PollStatus } from '@models';
import { useQuery } from '@libs/query';
import { pollRepository } from '@repositories';
import { LoadingProgress, Paginate } from '@shared/ui';
import { PollCard } from '../PollCard';
import { useState } from 'react';

const PAGE_SIZE = 8;

function PollList(props: { status: PollStatus }) {
  // prop destruction
  const { status } = props;
  // lib hooks
  // state, ref hooks
  const [page, setPage] = useState(1);
  // form hooks
  // query hooks
  const { data, isLoading } = useQuery(pollRepository.list, {
    variables: {
      status,
      page: page - 1,
      size: PAGE_SIZE,
    },
  });
  // calculated values
  const loading = isLoading || !data;
  // effects
  // handlers
  return (
    <div className="flex flex-col space-y-4">
      {loading ? (
        <LoadingProgress />
      ) : (
        <>
          <div className="grid lg:grid-cols-4 grid-rows-auto auto-rows-max gap-10 md:grid-cols-3 sm:grid-cols-2">
            {data.contents.map((poll) => {
              return <PollCard key={poll.id} poll={poll} />;
            })}
          </div>
          <Paginate total={data.totalCount} limit={PAGE_SIZE} page={page} setPage={setPage} />
        </>
      )}
    </div>
  );
}

export { PollList };
