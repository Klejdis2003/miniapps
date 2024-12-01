type JobApplication = {
  id: number;
  companyName: string;
  position: string;
  modality: JobModality;
  status: JobApplicationStatus;
  dateApplied: Date;
  responseDate?: Date;
  notes?: string;
};

type JobModality = 'In Person' | 'Remote' | 'Hybrid';
type JobApplicationStatus =
  | 'Applied'
  | 'Interview'
  | 'Rejected'
  | 'Offer'
  | 'No Response';

export type { JobModality, JobApplicationStatus, JobApplication };
