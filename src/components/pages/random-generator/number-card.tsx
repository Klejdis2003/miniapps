import { ChangeEvent, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Toggle } from '@/components/ui/toggle.tsx';
import { Button } from '@/components/ui/button.tsx';
import { randomNumber } from '@/lib/utils.ts';

export default function NumberCard() {
  const [start, setStart] = useState('0');
  const [end, setEnd] = useState('100');
  const [result, setResult] = useState<number | null>(null);
  const [defaultSelected, setDefaultSelected] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Random Number Generator</CardTitle>
        <CardDescription>Select a range and press generate</CardDescription>
      </CardHeader>
      <CardContent className={'flex flex-col gap-7'}>
        <div className={'flex justify-end'}>
          <Toggle
            type={'button'}
            pressed={defaultSelected}
            className={'-mb-5'}
            onPressedChange={onToggleChange}
            size={'sm'}
          >
            Default
          </Toggle>
        </div>
        <div className={'flex w-full justify-around'}>
          <Input
            id={'start'}
            type={'text'}
            value={start}
            onChange={onIntegerInputChange}
            disabled={defaultSelected}
            placeholder={'Integer'}
          />
          <Input
            id={'end'}
            type={'text'}
            value={end}
            onChange={onIntegerInputChange}
            disabled={defaultSelected}
            placeholder={'Integer'}
          />
        </div>
        <Button
          onClick={() =>
            setResult(randomNumber(parseInt(start), parseInt(end)))
          }
          disabled={start === '' || end === ''}
        >
          Generate
        </Button>
        <Result />
      </CardContent>
    </Card>
  );

  function Result() {
    if (result === null) return null;
    return (
      <div className={'flex flex-row w-full justify-between gap-x-10'}>
        <div className={'flex flex-row gap-3'}>
          <p className={'text-4xl font-bold'}>Result:</p>
          <p className={'text-4xl'}>{result}</p>
        </div>
        <Button variant={'destructive'} onClick={() => setResult(null)}>
          Clear
        </Button>
      </div>
    );
  }

  function setDefaults() {
    setStart('0');
    setEnd('100');
  }

  function clearDefaults() {
    setStart('');
    setEnd('');
  }

  function onToggleChange(value: boolean) {
    setDefaultSelected(value);
    if (value) setDefaults();
    else clearDefaults();
  }

  function onIntegerInputChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    // Allow empty input (for clearing) or valid integer values only
    if (newValue === '' || /^-?\d*$/.test(newValue)) {
      switch (e.target.id) {
        case 'start':
          setStart(newValue);
          break;
        case 'end':
          setEnd(newValue);
          break;
      }
    }
  }
}
