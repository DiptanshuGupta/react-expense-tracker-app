import { useState } from 'react';

export function useForm(initial = {}) {
  const [values, setValues] = useState(initial);

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => setValues(initial);

  const bindField = (name) => ({
    value: values[name] ?? '',
    onChange: (e) => setField(name, e.target.value),
  });

  return { values, setField, reset, bindField };
}