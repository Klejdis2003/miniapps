import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Button } from '@/components/ui/button.tsx';
import SelectInput from '@/components/pages/random-generator/input.tsx';
import { Popover } from '@radix-ui/react-popover';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { Trash } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { randomChoices } from '@/lib/utils.ts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip.tsx';

const radioOptions = ['visual', 'raw'];
type ValueInputOptions = (typeof radioOptions)[number];

const LOCAL_STORAGE_VALUE_KEY = 'random-gen:values';

export default function ValueChoiceCard() {
  const [values, setValues] = useState<string[]>(getFromSessionStorage());
  const [numberOfChoices, setNumberOfChoices] = useState(1);
  const [results, setResults] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] =
    useState<ValueInputOptions>('visual');

  return (
    <Card className={'w-full'}>
      <CardHeader>
        <CardTitle>Random Value Selector</CardTitle>
        <CardDescription>
          Enter values and select how many you want to choose
        </CardDescription>
      </CardHeader>
      <CardContent className={'flex flex-col gap-6'}>
        <div className={'flex flex-row justify-between w-full'}>
          <RadioGroup
            defaultValue={'visual'}
            onValueChange={(value) =>
              setSelectedOption(value as ValueInputOptions)
            }
          >
            <div className={'flex flex-row gap-x-2 '}>
              {radioOptions.map((option) => (
                <div className={'flex items-center space-x-2'}>
                  <Label htmlFor={option}>{capitalize(option)}</Label>
                  <RadioGroupItem value={option} key={option}>
                    {option}
                  </RadioGroupItem>
                </div>
              ))}
            </div>
          </RadioGroup>
          <EnteredValues
            values={values}
            onUseLastValues={onUseLastValues}
            onDelete={onDelete}
            onClear={onClear}
          />
        </div>

        <SelectInput
          selectedOption={selectedOption}
          onSuccessfulEntry={onSuccessfulEntry}
        />
        <div className={'flex flex-row justify-between'}>
          <div className={'flex flex-row items-center gap-x-2'}>
            <Label htmlFor={'number-of-choices'}>Number of Choices</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Input
                    disabled={values.length === 0}
                    type={'number'}
                    id={'number-of-choices'}
                    min={1}
                    max={values.length}
                    value={numberOfChoices}
                    onChange={(event) =>
                      setNumberOfChoices(parseInt(event.target.value))
                    }
                    className={'w-32 text-center'}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Min: {1} Max: {values.length}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button
            disabled={values.length === 0}
            onClick={() => {
              const chosenValues = randomChoices(values, numberOfChoices);
              setResults(chosenValues);
            }}
          >
            Generate
          </Button>
        </div>
        <Result />
      </CardContent>
    </Card>
  );

  function Result() {
    if (results.length === 0) return null;
    return (
      <div className={'flex flex-col gap-2'}>
        <p className={'text-2xl font-bold text-primary'}>Chosen Values</p>
        <p>{results.join(', ')}</p>
      </div>
    );
  }

  function onSuccessfulEntry(enteredValues: string[]) {
    const newValues = [...values, ...enteredValues];
    setValues(newValues);
    persistToLocalStorage(newValues);
    persistToSessionStorage(newValues);
  }

  function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function persistToLocalStorage(values: string[]) {
    localStorage.setItem(LOCAL_STORAGE_VALUE_KEY, JSON.stringify(values));
  }

  function bringBackFromLocalStorage() {
    const storedValues = localStorage.getItem(LOCAL_STORAGE_VALUE_KEY);
    if (storedValues) setValues(JSON.parse(storedValues));
  }

  function persistToSessionStorage(values: string[]) {
    sessionStorage.setItem(LOCAL_STORAGE_VALUE_KEY, JSON.stringify(values));
  }

  function getFromSessionStorage(): string[] {
    const storedValues = sessionStorage.getItem(LOCAL_STORAGE_VALUE_KEY);
    if (storedValues) return JSON.parse(storedValues);
    return [];
  }

  function onClear() {
    setValues([]);
    persistToLocalStorage([]);
  }

  function onDelete(value: string) {
    const newValues = values.filter((val) => val !== value);
    setValues(newValues);
    persistToLocalStorage(newValues);
  }

  function onUseLastValues() {
    bringBackFromLocalStorage();
  }
}

export type { ValueInputOptions };

interface EnteredValuesProps {
  values: string[];
  onUseLastValues: () => void;
  onDelete: (value: string) => void;
  onClear: () => void;
}

function EnteredValues({
  values,
  onUseLastValues,
  onDelete,
  onClear,
}: EnteredValuesProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'secondary'}>Entered Values</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className={'w-full flex justify-around gap-x-2'}>
          <Button size={'sm'} variant={'secondary'} onClick={onUseLastValues}>
            Use Last Values
          </Button>
          <Button
            size={'sm'}
            className={'w-full'}
            variant={'destructive'}
            onClick={onClear}
          >
            Clear
          </Button>
        </div>
        <ScrollArea className={'h-64 w-full'}>
          <div className={'flex flex-col p-3 gap-3 overflow-y-auto'}>
            {values.map((value, index) => (
              <div
                className={'flex flex-row w-full items-center justify-between '}
              >
                <p key={index}>{value}</p>{' '}
                <Button
                  variant={'destructive'}
                  className={'h-6 w-6 p-1'}
                  onClick={() => onDelete(value)}
                >
                  <Trash />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
