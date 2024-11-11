import { useRef, useState } from 'react';
import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { ValueInputOptions } from '@/components/pages/random-generator/value-choice-card.tsx';

interface SelectInputProps {
  selectedOption: ValueInputOptions;
  onSuccessfulEntry: (enteredValues: string[]) => void;
}

export default function SelectInput({
  selectedOption,
  onSuccessfulEntry,
}: SelectInputProps) {
  const enteredValues = useRef<string[]>([]);

  if (selectedOption === 'raw') return <RawInput />;
  return <VisualInput />;

  function RawInput() {
    const [value, setValue] = useState('');
    return (
      <div className={'flex flex-col gap-2'}>
        <p className={'text-muted-foreground text-sm'}>
          Enter values seperated by new lines
        </p>
        <Textarea onChange={(event) => setValue(event.target.value)} />
        <Button
          disabled={value.trim() === ''}
          onClick={() => onRawSubmit(value)}
        >
          Enter
        </Button>
      </div>
    );
  }

  function VisualInput() {
    const [value, setValue] = useState('');
    return (
      <div className={'flex flex-row gap-x-2'}>
        <Input
          type={'text'}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button
          disabled={value.trim() === ''}
          onClick={() => onVisualSubmit(value)}
        >
          Enter
        </Button>
      </div>
    );
  }

  function onRawSubmit(value: string) {
    const values = value
      .split('\n')
      .map((val) => val.trim())
      .filter((val) => val !== '');
    enteredValues.current = values;
    onSuccessfulEntry(values);
  }

  function onVisualSubmit(value: string) {
    onSuccessfulEntry([value]);
  }
}
