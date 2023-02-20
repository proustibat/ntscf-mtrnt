import 'normalize.css/normalize.css';
import '@/styles/globals.css';
import type { AppProps, NextWebVitalsMetric } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}
