import test from 'ava'
import * as TLDMatchPattern from '@/tld-match-pattern/index.js'

test('wildcard scheme + duckduckgo. + TLD wildcard', T => {
  let Pettern = '*://duckduckgo.*/*' as TLDMatchPattern.TLDURLPattern
  let Url = 'https://duckduckgo.com/'

  T.true(TLDMatchPattern.MatchPattern(Pettern, Url))
})

test('wildcard scheme + firefox.com', T => {
  let Pettern = '*://firefox.com/*' as TLDMatchPattern.TLDURLPattern
  let Url = 'https://firefox.com/token'

  T.true(TLDMatchPattern.MatchPattern(Pettern, Url))
})

test('https + firefox.com', T => {
  let Pettern = 'https://firefox.com/*' as TLDMatchPattern.TLDURLPattern
  let Url = 'https://firefox.com/token'

  T.true(TLDMatchPattern.MatchPattern(Pettern, Url))
})

test('https + npmjs.com/nisi/tempor/*', T => {
  let Pettern = 'https://npmjs.com/nisi/tempor/*' as TLDMatchPattern.TLDURLPattern
  let Url = 'https://npmjs.com/nisi/tempor/package.json'

  T.true(TLDMatchPattern.MatchPattern(Pettern, Url))
})

test('https + npmjs.com/nisi/*/tempor/', T => {
  let Pettern = 'https://npmjs.com/nisi/*/tempor/' as TLDMatchPattern.TLDURLPattern
  let Url = 'https://npmjs.com/nisi/xyz/tempor/'

  T.true(TLDMatchPattern.MatchPattern(Pettern, Url))
})

test('ko.wikipedia.org Montreal Metro', T => {
  let Pettern = 'https://ko.wikipedia.org/wiki/%EB%AA%AC%ED%8A%B8%EB%A6%AC%EC%98%AC_%EC%A7%80%ED%95%98%EC%B2%A0/*' as TLDMatchPattern.TLDURLPattern
  let Url = 'https://ko.wikipedia.org/wiki/%EB%AA%AC%ED%8A%B8%EB%A6%AC%EC%98%AC_%EC%A7%80%ED%95%98%EC%B2%A0/%EB%8C%80%ED%86%B5%EB%A1%9C'

  T.true(TLDMatchPattern.MatchPattern(Pettern, Url))
})

test('all_urls ftp', T => {
  let Pettern = '<all_urls>' as TLDMatchPattern.TLDURLPattern
  let Url = 'ftp://example.com/resource'
  
  T.false(TLDMatchPattern.MatchPattern(Pettern, Url))
})

test('all_urls duckdcukgo.com', T => {
  let Pettern = '<all_urls>' as TLDMatchPattern.TLDURLPattern
  let Url = 'https://duckduckgo.com/'
  
  T.true(TLDMatchPattern.MatchPattern(Pettern, Url))
})