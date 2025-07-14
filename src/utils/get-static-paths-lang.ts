import { languages } from "@i18n/utils";
import type { GetStaticPaths, InferGetStaticParamsType } from "astro";

export function getStaticPathsLang(): ReturnType<GetStaticPaths> {
    return Object.keys(languages).map((lang) => ({
        params: { lang },
    }));
}
export type getStaticPathsLangParams = InferGetStaticParamsType<typeof getStaticPathsLang>;
