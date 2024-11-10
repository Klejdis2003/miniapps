import { NavRoute } from '@/routes/__root.tsx';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { pathnameToTitle } from '@/lib/utils.ts';

interface PathItem {
  name: string;
  path: NavRoute;
}

interface ExtendedBreadcrumbProps {
  pathname: NavRoute;
  className?: string;
}

/**
 * Breadcrumb component to display the current path easily
 * @param pathname  The current path
 * @param className The class name to apply to the breadcrumb
 */
export default function ExtendedBreadcrumb({
  pathname,
  className,
}: ExtendedBreadcrumbProps) {
  const items = getRouteStack(pathname);
  const Separator: FC<{ index: number }> = ({ index }) => {
    if (index != items.length - 1) return <BreadcrumbSeparator />;
    return null;
  };

  if (items.length <= 1) return null;
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <>
            <BreadcrumbItem key={item.path}>
              <BreadcrumbLink asChild>
                <Link to={item.path}>{item.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <Separator index={index} />
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

/**
 * Get the stack of routes for the current path
 * @param pathname The current path
 * @returns The stack of routes
 */
function getRouteStack(pathname: NavRoute): PathItem[] {
  const pathParts = pathname.split('/').filter((part) => part.length > 0);
  return pathParts.map((part, index) => {
    const path = '/' + pathParts.slice(0, index + 1).join('/');
    return { name: pathnameToTitle(part), path: path as NavRoute };
  });
}
