import { SplitOnce } from '@/utils/splitonce/index.js'
import type { ValidSchemesType } from './type.js'

export const ValidSchemes = [
  'http',
  'https',
  '*',
] as const

export type TLDURLPattern = '<all_urls>' | `${ValidSchemesType}://${'*' | `*.${string}` | `${string}.${string}`}${`/${string}`}`

/**
 * Converts a WebExtension-style match pattern into an equivalent regular expression that matches URLs.
 *
 * @param Pattern - The match pattern string, such as `*://*.example.com/*`.
 * @returns A regular expression matching URLs permitted by the provided pattern.
 * @throws Error If the pattern omits the `://` separator or specifies an invalid scheme.
 */
export function MatchPatternToRegExp(Pattern: TLDURLPattern): RegExp {
  if (typeof Pattern !== 'string') {
    throw new Error(`Pattern parameter must be a string in Javascript/Typescript built-in type: ${Pattern}`)
  }
  
  if (Pattern === '<all_urls>') {
    return /^(http|https):\/\/.+$/
  }

  if (ValidSchemes.every(ValidScheme => !Pattern.startsWith(`${ValidScheme}://`))) {
    throw new Error(`Invalid match pattern (missing "://"): ${Pattern}`)
  }

  let RegExpStr: string = '^'

  const Scheme = ValidSchemes.find(ValidScheme => Pattern.startsWith(`${ValidScheme}://`))
  const RestWithScheme = Pattern.slice(Scheme.length + '://'.length)
  RegExpStr += Scheme === '*' ? 'https?' : Scheme
  RegExpStr += '://'
  
  const [Host, Path] = SplitOnce(RestWithScheme, '/')
  if (Path === '' && Host.endsWith('*')) {
    throw new Error(`Invalid match pattern (missing path indicator and asterisk mark exists at its end): ${Pattern}`)
  }
  
  RegExpStr += Host.replaceAll(/\*/g, '[A-Za-z0-9-]+').replaceAll('.', '\\.')

  RegExpStr += '/' + Path.replaceAll(/\*/g, '.*')

  RegExpStr += '$'

  return new RegExp(RegExpStr)
}

/**
 * Tests whether a URL matches a given match pattern.
 *
 * @param Pattern - The match pattern string to convert into a regular expression.
 * @param Url - The URL (or URL string) to test against the pattern.
 * @returns `true` if the URL matches the pattern; otherwise, `false`.
 */
export function MatchPattern(Pattern: TLDURLPattern, Url: string | URL): boolean {
  const Href = typeof Url === 'string' ? Url : Url.href
  const Re = MatchPatternToRegExp(Pattern)
  return Re.test(Href)
}

/**
 * Determines whether a given match pattern string conforms to supported URL-matching rules.
 *
 * @param Pattern - The candidate match pattern to validate.
 * @returns `true` if the pattern has a recognized scheme, host, and path structure; otherwise, `false`.
 */
export function IsValidMatchPattern(Pattern: string): boolean {
  try {
    MatchPatternToRegExp(Pattern as TLDURLPattern)
    return true
  } catch {
    return false
  }
}