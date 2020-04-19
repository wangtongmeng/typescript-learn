// 布尔类型
// 声明赋值 [变量]:类型 = 值
// let bool:boolean = false
let bool: boolean
bool = true
// bool = 123 // Type '123' is not assignable to type 'boolean'.

// 数值类型
// ts和js一样，所有数值都是浮点数，所以只有一个number类型  
let num: number = 123
// num = 'abc' // Type '"abc"' is not assignable to type 'number'.
// ts 数值支持二、八、十、十六进制数字字面量
num = 0b1111011 // 二进制
num = 0o173 // 八进制
num = 0x7b // 十六进制

// 字符串类型
let str: string
str = 'abc' // 'abc' 也是一种类型，字符串字面量类型，后面会讲到
str = `数值是${num}` // 支持模板字面量写法
// console.log(str) // 数值是123

// 数组类型
// 两种写法
// 写法1
let arr: number[] // 声明一个变量arr，类型是元素都是number的数组
arr = [5, 3, 9]
// 写法2
let arr2: Array<number>

let arr3: (string | number)[] // 变量arr3的元素既可以是string也可以是number组成的数组
let arr4: Array<string | number>
arr3 = [1, 'a']
arr4 = [1, 'a']

// 元组类型
let tuple: [string, number, boolean] // 与数组的区别，固定长度、类型位置固定
tuple = ['a', 1, false]
// tuple = ['a', 1, false, 12] // 超出长度的元素叫做越界元素。2.6版本之前，只要越界元素类型在规定类型范围之内就符合。2.6版本后，不允许超出

// 枚举类型
enum Roles { // 名字对应序列号，序列号默认从0开始
  SUPER_ADMIN,
  ADMIN,
  USER
}
console.log(Roles.SUPER_ADMIN) // 0
console.log(Roles.ADMIN) // 1
console.log(Roles.USER) // 2
// 也可以指定值
enum Roles2 {
  SUPER_ADMIN = 1,
  ADMIN = 3,
  USER = 8
}
// 也可以指定部分值，其他依次递增
enum Roles3 {
  SUPER_ADMIN = 1, // 1
  ADMIN, // 2
  USER // 3
}
enum Roles4 {
  SUPER_ADMIN, // 0
  ADMIN = 5, // 5
  USER // 6
}
// 通过名字取到索引值，也可以通过索引值取到名字
// console.log(Roles4[5], Roles4[0])

// any类型
let value: any
value = 'abc'
value = 123
value = false
const arr5: any[] = [1, 'a'] // 数组元素类型任意

// void类型
// void类型与any类型相反，表示任意类型都不是
const consoleText = (text: string): void => { // 参数text这里需要类型，后面可以通过配置成不指定类型也不会报错。指定函数返回值是void
  console.log(text)
}
console.log('abc') // 'abc'
let v: void
v = undefined // undefined和null可以赋值给void类型
v = null // 需要再tsconfig.json中关掉"strict": true

// null和undefined
// 在js中null和undefined是基础类型。在ts中他们既是值也是类型
// null和undefined是其他类型的子类型，可以把它们直接赋值给其他任意类型
let u: undefined
u = undefined
// u = 123 // Type '123' is not assignable to type 'undefined'.
let n: null
n = null
// n = 'abc' // Type '"abc"' is not assignable to type 'null'.
num = undefined // 如果开启"strictNullChecks": true，则undefined只能赋值给undefined类型了
num = null // 同理

// never类型
// never类型是任意类型的子类型，而没有任何类型是never的子类型，所以never类型的值可以赋值给其他任意类型，
// 表示那些永远不存在的值得类型
// 示例1，抛出错误，不可能有返回值
const errorFunc = (message: string): never => {
  throw new Error(message)
}
// errorFunc('abc')
// 示例2，死循环，不可能有返回值
// const infiniteFunc = (): never => {
//   while (true) {}
// }
// let neverVariable = (() => {
//   while (true) {}
// })()
// neverVariable = 123 // Type '123' is not assignable to type 'never'.
// num = neverVariable

// object类型
let obj = {
  name: 'zhangsan'
}
function getObject(obj: object): void {
  console.log(obj)
}
getObject(obj) // {name: "zhangsan"}

// 类型断言
// 类似于类型转换
const getLength = (target: string | number): number => { // 高级类型的自定义类型保护，只需要做一次类型包含即可
  if ((<string>target).length || (target as string).length === 0) { // 写法1，尖括号形式。写法2：as形式。如果使用jsx，只能使用as形式
    return (<string>target).length
  } else {
    return target.toString().length
  }
}
getLength(123)
getLength('123')
