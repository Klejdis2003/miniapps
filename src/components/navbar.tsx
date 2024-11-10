import { Button } from '@/components/ui/button.tsx';
import {
  Link,
  useLocation,
  useMatches,
  useRouter,
} from '@tanstack/react-router';
import ThemeToggle from '@/components/theme-toggle.tsx';
import { HomeIcon, LayoutGrid } from 'lucide-react';
import BreadcrumbResponsive from '@/components/ui/extended-breadcrumb.tsx';
import ExtendedBreadcrumb from '@/components/ui/extended-breadcrumb.tsx';
import { NavRoute } from '@/routes/__root.tsx';
import { pathnameToTitle } from '@/lib/utils.ts';

function isHomepage(path: string) {
  return path === '/';
}

export default function Navbar() {
  const currentPath = useLocation().pathname;
  const title = pathnameToTitle(
    currentPath.replace('/', '').split('/')[0] as NavRoute,
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
      className={'sticky z-50 top-0 w-full border-b-[1px] bg-background -mt-3 '}
    >
      <div className={'w-full flex justify-center  items-center py-2'}>
        <div
          className={
            'flex flex-row justify-between w-full sm:w-[90%] items-center h-full '
          }
        >
          <header className={'flex flex-row gap-2 items-center'}>
            <LayoutGrid />
            <h1 className={'text-lg sm:text-2xl font-bold'}>
              <Link to={'/'}>
                Klejdis Mini Apps {title != 'Home' ? ` / ${title}` : ''}
              </Link>
            </h1>
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
