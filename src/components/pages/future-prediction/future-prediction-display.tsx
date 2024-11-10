import { z } from 'zod';
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { DatePicker } from '@/components/ui/date-picker.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { forwardRef, useState } from 'react';

interface FuturePredictionDisplayProps {
  futurePrediction: string;
}

const formSchema = z.object({
  firstName: z.string().min(1, 'Cannot be empty'),
  lastName: z.string().min(1, 'Cannot be empty'),
  birthDate: z.date().min(new Date('1900-01-01'), 'Cannot be before 1900'),
});

const fieldPresentationNames: {
  [key in string]: string;
} = {
  firstName: 'First Name',
  lastName: 'Last Name',
  birthDate: 'Birth Date',
};

type SecretForm = z.infer<typeof formSchema>;

export default function FuturePredictionDisplay({
  futurePrediction,
}: FuturePredictionDisplayProps) {
  const form = useForm<SecretForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: undefined,
    },
  });
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return <div>{futurePrediction}</div>;

  return (
    <div className={'flex flex-col items-center justify-center h-full'}>
      <Card
        className={
          'w-fit min-w-[25rem] sm:min-w-[30rem] md:min-w-[35rem] p-6 rounded-xl drop-shadow-xl'
        }
      >
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
          <CardDescription>
            Enter your details and let us do the rest
          </CardDescription>
        </CardHeader>
        <CardContent className={'flex flex-col gap-1'}>
          <Form {...form}>
            <FormField
              control={form.control}
              name={'firstName'}
              render={({ field }) => <FirstNameField {...field} />}
            />

            <FormField
              control={form.control}
              name={'lastName'}
              render={({ field }) => <LastNameField {...field} />}
            />

            <FormField
              control={form.control}
              name={'birthDate'}
              render={({ field }) => <BirthDateField {...field} />}
            />
          </Form>
          <Button
            className={'w-full mt-5'}
            onClick={form.handleSubmit((data) => {
              console.log(data);
              setSubmitted(true);
            })}
          >
            Submit
          </Button>
          <div className={'mt-5 flex flex-col'}>{getFieldsErrorMessages()}</div>
        </CardContent>
      </Card>
    </div>
  );

  function getFieldsErrorMessages() {
    return Object.entries(form.formState.errors).map(([key, error]) => (
      <p key={key} className={'text-red-900 text-sm'}>
        {fieldPresentationNames[key]}:{error.message}
      </p>
    ));
  }
}

const FirstNameField = forwardRef<
  HTMLInputElement,
  ControllerRenderProps<SecretForm, 'firstName'>
>(({ ...field }, ref) => {
  return (
    <FormItem>
      <FormLabel>First Name</FormLabel>
      <FormControl>
        <Input placeholder={'John'} {...field} ref={ref} />
      </FormControl>
    </FormItem>
  );
});

const LastNameField = forwardRef<
  HTMLInputElement,
  ControllerRenderProps<SecretForm, 'lastName'>
>(({ ...field }, ref) => {
  return (
    <FormItem>
      <FormLabel>Last Name</FormLabel>
      <FormControl>
        <Input placeholder={'Doe'} {...field} ref={ref} />
      </FormControl>
    </FormItem>
  );
});

const BirthDateField = ({ ...field }) => {
  return (
    <FormItem>
      <FormLabel>Birth Date</FormLabel>
      <FormControl>
        <DatePicker
          value={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
        />
      </FormControl>
    </FormItem>
  );
};
