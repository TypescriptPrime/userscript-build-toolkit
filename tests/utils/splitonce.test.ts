import test from 'ava'
import { SplitOnce } from '@/helpers/splitonce/index.js'

test('split string with one length keyword', T => {
  let Input = 'duckduckgo.com/token'
  let [Head, Tail] = SplitOnce(Input, '/')
  
  T.is(Head, 'duckduckgo.com')
  T.is(Tail, 'token')

  T.pass()
})

test('split string with three length keyword', T => {
  let Input = 'duckduckgo.com///token'
  let [Head, Tail] = SplitOnce(Input, '///')
  
  T.is(Head, 'duckduckgo.com')
  T.is(Tail, 'token')

  T.pass()
})

test('split nothing because of no spliting keyword', T => {
  let Input = 'duckduckgo.com'
  let [Head, Tail] = SplitOnce(Input, '/')
  
  T.is(Head, 'duckduckgo.com')
  T.is(Tail, '')

  T.pass()
})