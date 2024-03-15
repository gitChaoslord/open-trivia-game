export type ValueOf<T> = T[keyof T];
/* ---- 
Get Values of object as literals
example
let x = {
  id: '12312',
  name: 'john'
}

ValueOf<typeof x> = '12312' | 'john'

---- */