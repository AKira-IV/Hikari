'use client';

import { ReactNode, useMemo } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface CaptchaProviderProps {
  children: ReactNode;
}

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function CaptchaProvider({ children }: CaptchaProviderProps) {
  const isEnabled = Boolean(siteKey);

  const providerProps = useMemo(
    () => ({
      reCaptchaKey: siteKey ?? '',
      scriptProps: {
        async: true,
        defer: true,
      },
    }),
    [],
  );

  if (!isEnabled) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('reCAPTCHA site key not configured; captcha is disabled on the client.');
    }
    return <>{children}</>;
  }

  return <GoogleReCaptchaProvider {...providerProps}>{children}</GoogleReCaptchaProvider>;
}
