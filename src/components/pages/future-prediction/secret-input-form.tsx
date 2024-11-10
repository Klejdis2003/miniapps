import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';

interface SelectInputFormProps {
  onSubmit: (secret: string) => void;
}

export default function SecretInputForm({ onSubmit }: SelectInputFormProps) {
  const [secret, setSecret] = useState('');
  return (
    <div
      className={
        'flex flex-col justify-center h-full w-full gap-5 items-center'
      }
    >
      <Textarea
        placeholder={'Enter your secret here'}
        className={'w-1/3 min-w-72 h-52'}
        value={secret}
        onChange={(event) => setSecret(event.target.value)}
      />
      <Button
        disabled={secret.length == 0}
        onClick={() => onSubmit(secret)}
        className={'w-1/3 min-w-72'}
      >
        Submit
      </Button>
    </div>
  );
}
