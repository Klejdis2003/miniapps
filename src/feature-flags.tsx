import {
  Children,
  FC,
  isValidElement,
  PropsWithChildren,
  ReactNode,
} from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card.tsx';

const featureFlags: {
  [key: string]: FlagStatus;
} = {
  login: 'in development',
  register: 'in development',
  reminders: 'off',
};

type FlagStatus = 'on' | 'off' | 'in development';
interface ConditionalFeatureProps<T> {
  flag: FlagStatus;
  children: ReactNode;
  onStatusOff?: () => ReactNode;
  onStatusInDevelopment?: () => ReactNode;
  inDevChildrenProps?: T;
}

/**
 * ConditionalFeature component to render children based on the flag status.
 * @param flag - Flag status
 * @param children - Children to render
 * @param onStatusInDevelopment - Callback to render when the flag is in development, if not provided, the default
 * in development layer will be rendered. If `inDevChildrenProps` is provided, this will be ignored.
 * @param onStatusOff - Callback to render when the flag is off, if not provided, null will be returned.
 * @param inDevChildrenProps - Props to pass to children when the flag is in development. If provided, the props will be
 * merged with the existing props of children and the children will be rendered with the new props. `onStatusInDevelopment`
 * will be ignored if this is provided.
 * @constructor
 */
function ConditionalFeature<T>({
  flag,
  children,
  onStatusInDevelopment,
  onStatusOff,
  inDevChildrenProps,
}: ConditionalFeatureProps<T>) {
  const InDevLayer: FC<PropsWithChildren> = ({ children }) => (
    <div className={'size-fit relative gap-3 items-center'}>
      <div className={'opacity-15'}>{children}</div>
      <span
        className={
          'absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500 text-2xl font-bold'
        }
      >
        In Development
      </span>
    </div>
  );

  if (inDevChildrenProps) {
    children = Children.map(children, (child) => {
      if (isValidElement(child)) {
        return {
          ...child,
          props: { ...child.props, ...inDevChildrenProps },
        };
      }
      return child;
    });
  }

  switch (flag) {
    case 'on':
      return children;
    case 'off':
      return onStatusOff?.() || null;
    case 'in development':
      return (onStatusInDevelopment?.() ?? inDevChildrenProps) ? (
        children
      ) : (
        <HoverCard>
          <HoverCardTrigger>
            <InDevLayer>{children}</InDevLayer>
          </HoverCardTrigger>
          <HoverCardContent>This feature is in development.</HoverCardContent>
        </HoverCard>
      );
  }
}

export default featureFlags;
export { ConditionalFeature };
export type { FlagStatus, ConditionalFeatureProps };
