/*import { getRequestConfig } from "next-intl/server";

// Create this configuration once per request and 
// make it available to all Server Components.
export default getRequestConfig(async ({ locale }) => ({
  // Load translations for the active locale.
  messages: (await import(`./app/_translations/${locale}.json`)).default,
}));*/


import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
// Can be imported from a shared config
const locales = ['en', 'de', 'zh'];
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});