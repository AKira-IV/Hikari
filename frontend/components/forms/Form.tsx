'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

interface FormProps {
  onSubmit: (data: any) => void | Promise<void>;
  defaultValues?: any;
  children: (formState: { isSubmitting: boolean; errors: any }) => React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function Form({
  onSubmit,
  defaultValues,
  children,
  style,
  className,
}: FormProps) {
  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit, formState } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={style}
        className={className}
        noValidate
      >
        {children({ isSubmitting: formState.isSubmitting, errors: formState.errors })}
      </form>
    </FormProvider>
  );
}
