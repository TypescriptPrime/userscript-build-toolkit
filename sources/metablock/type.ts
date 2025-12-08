import type { TLDURLPattern } from '@/tld-match-pattern/index.js'

type AtLeastOneOf<T, Keys extends keyof T> = {
  [K in Keys]:
    Required<Pick<T, K>> & Partial<Omit<T, K>>
}[Keys]

type OneOf<T, Keys extends keyof T> = {
  [K in Keys]:
    Required<Pick<T, K>>
    & { [P in Exclude<Keys, K>]?: undefined }
    & Omit<T, Keys>
}[Keys]

export const GMPrivilegedAPIsLagacy = [
  'GM_info',
  'GM_getValue',
  'GM_getValues',
  'GM_setValue',
  'GM_setValues',
  'GM_deleteValue',
  'GM_deleteValues',
  'GM_listValues',
  'GM_addValueChangeListener',
  'GM_removeValueChangeListener',
  'GM_getResourceText',
  'GM_getResourceURL',
  'GM_addElement',
  'GM_addStyle',
  'GM_openInTab',
  'GM_registerMenuCommand',
  'GM_unregisterMenuCommand',
  'GM_notification',
  'GM_setClipboard',
  'GM_setClipboard',
  'GM_xmlhttpRequest',
  'GM_download'
] as const
export const GMPrivilegedAPIs = GMPrivilegedAPIsLagacy.map(Api => Api.replace('GM_', 'GM.'))
export type GMPrivilegedAPIsLagacy = (typeof GMPrivilegedAPIsLagacy)[number]
export type GMPrivilegedAPIs = (typeof GMPrivilegedAPIs)[number]

export interface UserscriptMetaBlockObj {
  Name: string
  Namespace?: string
  WebMatches: AtLeastOneOf<{
    Match: TLDURLPattern[],
    Include: TLDURLPattern[],
    ExcludeMatch: TLDURLPattern[],
    Exclude: TLDURLPattern[]
  }, 'Match' | 'Include'>,
  Version: string
  Description?: Record<string, string>,
  Icon?: string | URL,
  Require?: URL[],
  Resource?: Array<{Type: 'logo' | 'text', Url: URL}>,
  RunAt?: 'document-start' | 'document-end' | 'document-idle' | 'document-body',
  Grant?: Array<GMPrivilegedAPIs | GMPrivilegedAPIsLagacy>,
  InjectInto?: OneOf<{
    Page: true,
    ContentScripts: true,
    Auto: true
  }, 'Page' | 'ContentScripts' | 'Auto'>,
  DownloadURL?: URL,
  SupportURL?: URL,
  HomepageURL?: URL,
  ScriptHandling?: OneOf<{ Unwrap: false, TopLevelAwait: false }, 'Unwrap' | 'TopLevelAwait'>
}