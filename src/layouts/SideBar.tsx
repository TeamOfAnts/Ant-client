import { Button, Divider, ModeToggle } from '@shared/ui';
import Vote from '@assets/icons/vote.svg';
import { useNavigate } from 'react-router-dom';

function SideBar(props: {}) {
  // prop destruction
  // lib hooks
  const navigate = useNavigate();
  // state, ref hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  return (
    <div className="w-16 bg-gray-100 h-full flex flex-col items-center py-4 space-y-8 border-r-4 bg-gray/10 border-primary">
      <div className="flex flex-col justify-between align-center py-8 px-1 w-full h-full">
        <div className="flex flex-row justify-center">
          <Button
            variant="ghost"
            className="px-4 py-1"
            style={{ width: '36px', boxSizing: 'border-box', padding: '4px 8px' }}
            onClick={() => navigate('/polls')}
          >
            <Vote />
          </Button>
        </div>
        <div className="flex flex-row justify-center">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export { SideBar };
