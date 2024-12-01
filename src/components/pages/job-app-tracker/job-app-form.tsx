import { JobApplication } from '@/api/types.ts';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobApplicationSchema, JobApplicationZodType } from '@/api/schemas.ts';
import { Input } from '@/components/ui/input.tsx';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer.tsx';
import { ComponentProps } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { camelCaseToTitle } from '@/lib/utils.ts';

interface JobAppFormProps {
  drawerProps?: ComponentProps<typeof DrawerPrimitive.Root>;
  onSubmit?: (data: JobApplication) => void;
  onCancel?: () => void;
  initialData?: JobApplication;
}

export default function JobAppForm({
  drawerProps,
  onSubmit,
  onCancel,
  initialData,
}: JobAppFormProps) {
  const form = useForm<JobApplicationZodType>({
    resolver: zodResolver(jobApplicationSchema),
    shouldFocusError: true,
    criteriaMode: 'all',
    mode: 'all',
  });

  if (initialData) {
    form.reset(initialData);
  }

  const formFields = Object.keys(jobApplicationSchema.shape);
  return (
    <Drawer {...drawerProps}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {initialData ? 'Edit' : 'Add'} Job Application
          </DrawerTitle>
          <DrawerDescription>
            {initialData
              ? 'Edit the job application details'
              : 'Add a new job application'}
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              onSubmit?.(data);
              form.reset();
            })}
          >
            {formFields.map((formField) => (
              <FormField
                control={form.control}
                name={formField as keyof JobApplicationZodType}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{camelCaseToTitle(formField)}</FormLabel>
                    <Input {...field} />
                  </FormItem>
                )}
              />
            ))}
            <FormMessage />
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
