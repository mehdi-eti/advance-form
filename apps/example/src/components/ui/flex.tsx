import React from 'react';
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  gap?: 'sm' | 'md' | 'lg' | number;
  justify?: 'center' | 'start' | 'end' | 'between' | 'around';
  align?: 'center' | 'start' | 'end' | 'stretch';
}
export const Flex: React.FC<FlexProps> = ({
  direction = 'row',
  gap = 'md',
  justify = 'start',
  align = 'start',
  children,
  className,
  ...rest
}) => {
  const gapClass = gap === 'sm' ? 'gap-2' : gap === 'lg' ? 'gap-6' : 'gap-4';
  const dir = direction === 'column' ? 'flex-col' : 'flex-row';
  const justifyMap: Record<string, string> = {
    center: 'justify-center',
    start: 'justify-start',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  };
  const alignMap: Record<string, string> = {
    center: 'items-center',
    start: 'items-start',
    end: 'items-end',
    stretch: 'items-stretch',
  };
  const cls = ['flex', dir, gapClass, justifyMap[justify], alignMap[align], className]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
};
export default Flex;
