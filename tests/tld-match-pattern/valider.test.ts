import test from 'ava'
import * as TLDMatchPattern from '@/tld-match-pattern/index.js'

test('wildcard scheme + duckduckgo. + TLD wildcard', T => {
  let Pettern = '*://duckduckgo.*/*' as TLDMatchPattern.TLDURLPattern

  T.true(TLDMatchPattern.IsValidMatchPattern(Pettern))
})

test('wildcard scheme + firefox.com', T => {
  let Pettern = '*://firefox.com/*' as TLDMatchPattern.TLDURLPattern

  T.true(TLDMatchPattern.IsValidMatchPattern(Pettern))
})

test('https + firefox.com', T => {
  let Pettern = 'https://firefox.com/*' as TLDMatchPattern.TLDURLPattern

  T.true(TLDMatchPattern.IsValidMatchPattern(Pettern))
})

test('https + npmjs.com/nisi/tempor/*', T => {
  let Pettern = 'https://npmjs.com/nisi/tempor/*' as TLDMatchPattern.TLDURLPattern

  T.true(TLDMatchPattern.IsValidMatchPattern(Pettern))
})

test('https + npmjs.com/nisi/*/tempor/', T => {
  let Pettern = 'https://npmjs.com/nisi/*/tempor/' as TLDMatchPattern.TLDURLPattern

  T.true(TLDMatchPattern.IsValidMatchPattern(Pettern))
})

test('ko.wikipedia.org Montreal Metro', T => {
  let Pettern = 'https://ko.wikipedia.org/wiki/%EB%AA%AC%ED%8A%B8%EB%A6%AC%EC%98%AC_%EC%A7%80%ED%95%98%EC%B2%A0/*' as TLDMatchPattern.TLDURLPattern

  T.true(TLDMatchPattern.IsValidMatchPattern(Pettern))
})

test('wildcard scheme + duckduckgo. + TLD wildcard (missing slash)', T => {
  let Pettern = '*:/duckduckgo.*/*' as TLDMatchPattern.TLDURLPattern

  T.false(TLDMatchPattern.IsValidMatchPattern(Pettern))
})

test('wildcard scheme + firefox.com (missing end slash)', T => {
  let Pettern = '*://firefox.com*' as TLDMatchPattern.TLDURLPattern

  T.false(TLDMatchPattern.IsValidMatchPattern(Pettern))
})