export function SplitOnce(Str: string, Sep: string): [string, string] {
  const SepIndex = Str.indexOf(Sep)
  if (SepIndex === -1) {
    return [Str, '']
  } else {
    const Before = Str.slice(0, SepIndex)
    const After = Str.slice(SepIndex + Sep.length)
    return [Before, After]
  }
}