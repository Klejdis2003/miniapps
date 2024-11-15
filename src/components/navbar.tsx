import { Button } from '@/components/ui/button.tsx';
import { Link, useLocation } from '@tanstack/react-router';
import ThemeToggle from '@/components/theme-toggle.tsx';
import { HomeIcon, LayoutGrid } from 'lucide-react';
import { NavRoute } from '@/routes/__root.tsx';
import { getPathnameBase, pathnameToTitle } from '@/lib/utils.ts';

function isHomepage(path: string) {
  return path === '/';
}

export default function Navbar() {
  const currentPath = useLocation().pathname;
  const title = pathnameToTitle(
    getPathnameBase(currentPath as NavRoute),
    'Klejdis Mini Apps',
  );

  const ConditionalHomeButton = () => {
    if (!isHomepage(currentPath)) {
      return (
        <>
          <Button asChild className={'hidden sm:inline'} variant={'secondary'}>
            <Link to={'/'}>Home</Link>
          </Button>
          <Button className={'sm:hidden'} variant={'secondary'} size={'icon'}>
            <Link to={'/'}>
              <HomeIcon className={'scale-100'} />
            </Link>
          </Button>
        </>
      );
    }
    return null;
  };

  return (
    <div
      className={
        'sticky z-50 top-0 w-full bg-background border-b-[2px] -mt-3 px-8'
      }
    >
      <div className={'w-full flex justify-center  items-center py-2  '}>
        <div
          className={
            'flex flex-row justify-between w-full sm:w-[90%] items-center h-full '
          }
        >
          <header className={'flex flex-row gap-2 items-center'}>
            <LayoutGrid />
            <h1 className={'text-lg sm:text-2xl font-bold'}>{title}</h1>
          </header>
          <div className={'flex flex-row gap-3'}>
            <ConditionalHomeButton />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
