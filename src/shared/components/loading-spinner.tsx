import React from 'react';

import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  'data-cid'?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export default function LoadingSpinner({
  size = 'md',
  color = 'text-primary',
  'data-cid': dataCid,
}: LoadingSpinnerProps) {
  return (
    <Loader2
      data-cid={dataCid}
      className={clsx('animate-spin', color, sizeClasses[size])}
    />
  );
}
