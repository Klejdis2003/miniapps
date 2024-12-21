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
import { Button } from '@/components/ui/button.tsx';
import { CreateJobApplicationParams } from '@/api/utils.ts';

interface JobAppFormProps {
  drawerProps?: ComponentProps<typeof DrawerPrimitive.Root>;
  onSubmit?: (data: CreateJobApplicationParams) => void;
  onCancel?: () => void;
  initialData?: JobApplication;
}

export default function JobAppForm({
  drawerProps,
  onSubmit,
  initialData,
}: JobAppFormProps) {
  const form = useForm<JobApplicationZodType>({
    resolver: zodResolver(jobApplicationSchema),
    shouldFocusError: true,
    criteriaMode: 'all',
    mode: 'onChange',
    progressive: true,
  });

  if (initialData) form.reset(initialData);

  const formFields: Record<
    keyof JobApplicationZodType,
    {
      element: (
        field: ControllerRenderProps<FieldValues, string>,
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

  const requiredFieldNames: (keyof JobApplicationZodType)[] = [
    'companyName',
    'modality',
    'position',
  ];
  return (
    <Drawer {...drawerProps}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {initialData ? 'Edit' : 'Add'} Job Application
          </DrawerTitle>
          <DrawerDescription className={'flex flex-row justify-between'}>
            <p>
              {initialData
                ? 'Edit the job application details'
                : 'Add a new job application'}
            </p>
            <p>* indicates a required field</p>
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            className={'p-3 flex flex-col gap-y-3'}
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
                      {requiredFieldNames.includes(name) && '*'}
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
            <Button type={'submit'} disabled={!form.formState.isValid}>
              Submit
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
