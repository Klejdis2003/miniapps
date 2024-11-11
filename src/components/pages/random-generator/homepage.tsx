import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.tsx';
import NumberCard from '@/components/pages/random-generator/number-card.tsx';
import ValueChoiceCard from '@/components/pages/random-generator/value-choice-card.tsx';

export default function RandomGeneratorHomepage() {
  return (
    <div className={'flex flex-col pt-7  h-full w-full gap-5 items-center'}>
      <p className={'text-2xl text-center'}>
        Welcome to the random generator! Here you can generate random numbers,
        strings, and more.
      </p>
      <div className={'flex flex-grow  w-full justify-center'}>
        <Tabs
          className={'w-full sm:w-1/3 sm:min-w-[35rem]'}
          defaultValue={'random-number'}
        >
          <TabsList className={'grid w-full grid-cols-2'}>
            <TabsTrigger value={'random-number'}>Random Number</TabsTrigger>
            <TabsTrigger value={'value-choices'}>Value Choices</TabsTrigger>
          </TabsList>
          <TabsContent value={'random-number'}>
            <NumberCard />
          </TabsContent>
          <TabsContent value={'value-choices'}>
            <ValueChoiceCard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
