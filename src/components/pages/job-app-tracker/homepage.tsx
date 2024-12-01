import { useState } from 'react';
import SaveableState, { BaseState } from '@/lib/state.ts';
import Landing from '@/components/pages/job-app-tracker/landing.tsx';
import GuestPage from '@/components/pages/job-app-tracker/guest-page.tsx';

interface JobAppTrackerState extends BaseState {
  selectedOption?: 'guest' | 'login';
}

export default function JobAppTrackerHomepage() {
  const savedState = SaveableState.fromLocalStorage<JobAppTrackerState>({
    key: 'job-app-tracker-state',
  });
  const [state, setState] = useState(savedState.get());

  function handleGuestClick() {
    setState(
      savedState.update({
        selectedOption: 'guest',
      }),
    );
  }

  function handleLoginClick() {
    setState(
      savedState.update({
        selectedOption: 'login',
      }),
    );
  }

  function hasUserMadeSelection() {
    return state.selectedOption !== undefined;
  }

  if (hasUserMadeSelection() && state.selectedOption === 'guest') {
    return <GuestPage />;
  }

  return (
    <Landing onLoginClick={handleLoginClick} onGuestClick={handleGuestClick} />
  );
}
