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

type JobModality = 'in person' | 'remote' | 'hybrid';
type JobApplicationStatus =
  | 'applied'
  | 'interview'
  | 'rejected'
  | 'offer'
  | 'no response';

export type { JobModality, JobApplicationStatus, JobApplication };
