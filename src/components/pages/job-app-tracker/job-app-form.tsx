import { JobApplication } from '@/api/types.ts';
import { ControllerRenderProps, FieldValues, useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form.tsx';
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
import { ComponentProps, ReactElement } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { camelCaseToTitle } from '@/lib/utils.ts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';

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
    progressive: true,
  });

  if (initialData) form.reset(initialData);

  console.log(form.getValues());

  const formFields: Record<
    keyof Omit<JobApplication, 'id'>,
    {
      element: (
        props: ControllerRenderProps<FieldValues, string>,
      ) => ReactElement;
    }
  > = {
    companyName: {
      element: (props) => <Input {...props} />,
    },
    position: {
      element: (props) => <Input {...props} />,
    },
    modality: {
      element: (props) => (
        <Select onValueChange={props.onChange} defaultValue={props.value}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['In Person', 'Remote', 'Hybrid'].map((modality) => (
              <SelectItem key={modality} value={modality}>
                {modality}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
    dateApplied: {
      element: (props) => <Input type={'date'} {...props} />,
    },
    responseDate: {
      element: (props) => <Input type={'date'} {...props} />,
    },
    status: {
      element: (props) => (
        <Select onValueChange={props.onChange} defaultValue={props.value}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {['Applied', 'Interview', 'Rejected', 'Offer', 'No Response'].map(
              (status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      ),
    },
    notes: {
      element: (field) => <Input {...field} />,
    },
  };

  const formFieldNames = Object.keys(
    formFields,
  ) as (keyof JobApplicationZodType)[];
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
            {formFieldNames.map((name) => (
              <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {camelCaseToTitle(name)}
                      {form.formState.errors[name] && (
                        <span className={'ml-1 animate-in delay-300x`'}>
                          ({form.formState.errors[name]?.message})
                        </span>
                      )}
                    </FormLabel>
                    {formFields[
                      name as keyof Omit<JobApplication, 'id'>
                    ].element(
                      field as unknown as ControllerRenderProps<
                        FieldValues,
                        string
                      >,
                    )}
                  </FormItem>
                )}
              />
            ))}
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
