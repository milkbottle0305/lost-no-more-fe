import { useState } from 'react';

export default function useBoolean(initialValue?: boolean) {
  const [value, setValue] = useState<boolean>(initialValue ?? false);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  return { value, toggle, setTrue, setFalse };
}
