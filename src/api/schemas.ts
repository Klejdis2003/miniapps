import { z } from 'zod';

const jobApplicationSchema = z.object({
  id: z.number(),
  companyName: z.string().min(1),
  position: z.string().min(1),
  modality: z.enum(['in person', 'remote', 'hybrid']),
  status: z.enum(['applied', 'interview', 'rejected', 'offer', 'no response']),
  notes: z.string().optional(),
});

type JobApplicationZodType = z.infer<typeof jobApplicationSchema>;

export { jobApplicationSchema };

export type { JobApplicationZodType };
