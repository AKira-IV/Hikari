'use client';

import { ReactNode, useMemo } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

interface CaptchaProviderProps {
  children: ReactNode;
}

// Use Google reCAPTCHA test key in non-production if site key is not set
const TEST_RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
const siteKey =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  (process.env.NODE_ENV !== 'production' ? TEST_RECAPTCHA_SITE_KEY : '');

export function CaptchaProvider({ children }: CaptchaProviderProps) {
  const isEnabled = Boolean(siteKey);

  const providerProps = useMemo(
    () => ({
      reCaptchaKey: siteKey,
      scriptProps: {
        async: true,
        defer: true,
      },
    }),
    [], // siteKey es una constante, no necesita dependency
  );

  if (!isEnabled) {
    console.warn('reCAPTCHA site key not configured; captcha is disabled on the client.');
    return <>{children}</>;
  }

  return <GoogleReCaptchaProvider {...providerProps}>{children}</GoogleReCaptchaProvider>;
}
