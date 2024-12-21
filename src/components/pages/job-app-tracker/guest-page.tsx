import SaveableState, { BaseState } from '@/lib/state.ts';
import { JobApplication } from '@/api/types.ts';
import { useState } from 'react';
import {
  createJobApplication,
  CreateJobApplicationParams,
} from '@/api/utils.ts';
import JobApplicationDisplay from '@/components/pages/job-app-tracker/job-apps-display.tsx';
import JobAppForm from '@/components/pages/job-app-tracker/job-app-form.tsx';

interface GuestPageState extends BaseState {
  applications: JobApplication[];
}

export default function GuestPage() {
  const savedState = SaveableState.fromLocalStorage<GuestPageState>({
    key: 'guest-page-state',
    applications: [],
  });

  const [state, setState] = useState(savedState.get());
  const [drawerOpen, setDrawerOpen] = useState(false);

  function addApplication(params: CreateJobApplicationParams) {
    const newApplication = createJobApplication(params);
    const applications = state.applications;
    applications.push(newApplication);
    setState(savedState.update({ applications }));
    setDrawerOpen(false);
  }

  function editApplication(
    jobApplication: Partial<JobApplication> &
      Pick<JobApplication, 'companyName'>,
  ) {
    const applications = state.applications;
    const index = applications.findIndex(
      (application) => application.companyName === jobApplication.companyName,
    );
    applications[index] = { ...applications[index], ...jobApplication };
    setState(savedState.update({ applications }));
  }

  function deleteApplication(companyName: string) {
    const applications = state.applications;
    const index = applications.findIndex(
      (application) => application.companyName === companyName,
    );
    applications.splice(index, 1);
    setState(savedState.update({ applications }));
  }

  return (
    <>
      <JobApplicationDisplay
        data={state.applications}
        onAdd={() => setDrawerOpen(true)}
      />
      ;
      <JobAppForm
        drawerProps={{ open: drawerOpen, onClose: () => setDrawerOpen(false) }}
        onSubmit={addApplication}
      />
    </>
  );
}
