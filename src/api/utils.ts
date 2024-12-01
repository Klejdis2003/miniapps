import { JobApplication } from '@/api/types.ts';

/**
 * @param jobApplication - The job application to create. There are three required fields: `companyName`, `modality`, and `position`.
 * The other fields are optional and will override the default values.
 * The default values are:
 * - `status`: 'applied'
 * - `dateApplied`: The current date
 * @returns The created job application with the default values overridden by the provided values, if any.
 */
function createJobApplication(
  jobApplication: Pick<
    JobApplication,
    'companyName' | 'modality' | 'position' | 'id'
  > &
    Partial<JobApplication>,
): JobApplication {
  return {
    status: 'applied',
    dateApplied: new Date(),
    ...jobApplication,
  };
}

type CreateJobApplicationParams = Parameters<typeof createJobApplication>[0];

export type { CreateJobApplicationParams };
export { createJobApplication };
