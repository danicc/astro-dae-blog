import { useState, useEffect } from "react";
import {
  getLangFromUrl,
  languages,
} from "@i18n/utils";
import { getRelativeLocaleUrl } from "astro:i18n";
import { navigate } from "astro:transitions/client";

export default function LanguageSelector() {
  const isClient = typeof window !== "undefined";
  const currentURL = isClient ? new URL(window.location.href) : null;
  const initialLanguage = currentURL ? getLangFromUrl(currentURL) : "en";
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

  useEffect(() => {
    if (isClient) {
      const newCurrentURL = new URL(window.location.href);
      const newLang = getLangFromUrl(newCurrentURL);
      if (newLang !== selectedLanguage) {
        setSelectedLanguage(newLang);
      }
    }
  }, [isClient, selectedLanguage]);

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLang = e.target.value;
    if (currentURL && newLang !== selectedLanguage) {
      let path = currentURL.pathname;

      // Remove base path if it exists
      if (import.meta.env.BASE_URL && path.startsWith(import.meta.env.BASE_URL)) {
        path = path.substring(import.meta.env.BASE_URL.length);
      }

      // Ensure path starts with a slash for consistent processing
      if (!path.startsWith('/')) {
        path = '/' + path;
      }

      // Remove current language prefix (using selectedLanguage for consistency)
      if (path.startsWith(`/${selectedLanguage}/`)) {
        path = path.substring(`/${selectedLanguage}/`.length);
      } else if (path === `/${selectedLanguage}`) {
        path = '';
      }

      // Ensure path starts with a slash if not empty, or is just '/' for root
      if (path && !path.startsWith('/')) {
        path = '/' + path;
      } else if (!path) {
        path = '/';
      }

      const newPath = getRelativeLocaleUrl(
        newLang,
        path
      );
      navigate(newPath);
    }
  }

  return (
    <div className="relative flex items-center p-2 border-sky-500/70 bg-sky-500 cursor-pointer transition delay-10 duration-50 ease-in hover:scale-105 text-white">
      <label htmlFor="language-select" className="sr-only">
        Select language
      </label>
      <select
        id="language-select"
        className="text-white"
        onChange={handleLanguageChange}
        disabled={!isClient} // Disable on server
        value={selectedLanguage} // Use value instead of defaultValue
      >
        {Object.entries(languages).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

