import { ui, routes } from './ui';

export const languages = {
  en: "EN",
  es: "ES",
};

export const defaultLang = "en";


export function getPathWithoutLocaleFromUrl(url: URL){
  const [,,path] = url.pathname.split('/')
  return path ?? '/';
}

export function getRoutePathFromUrl(url: URL) {
  const lang = getLangFromUrl(url);
  let path = url.pathname;

  // Remove the base path
  if (import.meta.env.BASE_URL && path.startsWith(import.meta.env.BASE_URL)) {
    path = path.substring(import.meta.env.BASE_URL.length);
  }

  // Remove the language segment
  if (path.startsWith(`/${lang}/`)) {
    path = path.substring(`/${lang}/`.length);
  } else if (path === `/${lang}`) { // For homepage like /en
    path = '';
  }

  // Ensure it starts with a slash if not empty
  if (path && !path.startsWith('/')) {
    path = '/' + path;
  } else if (!path) { // If it's empty, it means it's the root path
    path = '/';
  }

  return path;
}

export function getLangFromUrl(url: URL) {
  let pathname = url.pathname;

  // Remove base path if it exists
  if (import.meta.env.BASE_URL && pathname.startsWith(import.meta.env.BASE_URL)) {
    pathname = pathname.substring(import.meta.env.BASE_URL.length);
  }

  // Get the first segment after removing base path
  const [, lang] = pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export const showDefaultLang = true;

export function useTranslatedPath(lang: keyof typeof languages) {
  return function translatePath(path: string, l: keyof typeof routes = lang) {
    const pathName = path.replaceAll('/', '')
    const hasTranslation = defaultLang !== l && routes[l] !== undefined && routes[l][pathName] !== undefined
    const translatedPath = hasTranslation ? '/' + routes[l][pathName] : path

    return !showDefaultLang && l === defaultLang ? translatedPath : `/${l}${translatedPath}`
  }
}


export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const parts = pathname?.split('/');
  const path = parts.pop() || parts.pop();

  if (path === undefined) {
    return undefined;
  }

  const currentLang = getLangFromUrl(url);

  if (defaultLang === currentLang) {
    const route = Object.values(routes)[0];
    return route[path] !== undefined ? route[path] : undefined;
  }

  const getKeyByValue = (obj: Record<string, string>, value: string): string | undefined  => {
      return Object.keys(obj).find((key) => obj[key] === value);
  }

  const reversedKey = getKeyByValue(routes[currentLang], path);

  if (reversedKey !== undefined) {
    return reversedKey;
  }

  return undefined;
}

