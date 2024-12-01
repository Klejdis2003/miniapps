import { z } from 'zod';

const jobApplicationSchema = z.object({
  id: z.number().positive(),
  companyName: z
    .string()
    .min(1, { message: 'Company name should not be empty' }),
  position: z
    .string()
    .min(1, { message: 'Position should not be empty' })
    .describe("The position you're applying for"),
  modality: z.enum(['In Person', 'Remote', 'Hybrid'], {
    message: 'Modality should be In Person, Remote, or Hybrid',
  }),
  dateApplied: z.preprocess(
    (value) => (value ? new Date(value as string) : undefined),
    z.date(),
  ),
  responseDate: z.preprocess(
    (value) => (value ? new Date(value as string) : undefined),
    z.date().optional(),
  ),
  status: z.enum(['Applied', 'Interview', 'Rejected', 'Offer', 'No Response'], {
    message:
      'Should be one of Applied, Interview, Rejected, Offer, or No Response',
  }),
  notes: z.string().optional(),
});

type JobApplicationZodType = z.infer<typeof jobApplicationSchema>;

export { jobApplicationSchema };

export type { JobApplicationZodType };
