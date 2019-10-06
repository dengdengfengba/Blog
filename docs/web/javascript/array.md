---
title: 数组的访问方法
---

## Array.prototype.concat

### 语法

::: danger
Array.concat(value1[, value2[, ...[, valueN]]])
:::

参数(valueN)： 
 - 数组或值

返回值：         
 - 一个新的数组实例

### 描述

`concat`方法用于创建一个新的数组，它由被调用的对象中的元素组成，每个参数的顺序依次是该参数的元素(如果参数是数组)或参数本身(如果参数不是数组)。它不会低轨道嵌套数组参数中。

`concat`方法不会改变 this 或任何作为参数提供的数组，而是返回一个浅拷贝，它包含与原始数组相结合的相同元素的副本。

### 示例

+ 两个数组连接

    ```js
    const arr1 = ['a', 'b', 'c'];
    const arr2 = [1, 2, 3];
    arr1.concat(arr2);      // ['a', 'b', 'c', 1, 2, 3]
    ```

+  三个数组，连接

    ```js
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const arr3 = [7, 8, 9];
    arr1.concat(arr2, arr3); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    ```

+ 值与数组连接

    ```js
    const arr = ['a', 'b', 'c'];
    arr.concat(1, [2, 3]); // ['a', 'b', 'c', 1, 2, 3]
    ```

+ 嵌套数组连接

    ```js
    const arr1 = [[1]];
    const arr2 = [2, [3]];
    arr1.concat(arr2); // [[1], 2, [3]]
    arr1[0].push(4); // [[1, 4], 2, [3]]
     ```

## Array.prototype.includes

### 语法

::: danger
arr.includes(valueToFind[, fromIndex])
:::

参数：
 - valueToFind: 需要查找的元素
 - fromIndex：从fromIndex索引处开始查找valueToFind，可以为负值。（数组从fromIndex 索引处开始查找，若valueToFind为负值，则按升序从 array.length + fromIndex 的索引开始搜。默认为 0。）

返回值：
 - 一个布尔值

### 描述

`includes`用来判断一个数组是否包含某个指定值，包含true，不包含false。

### 示例

+ fromIndex大于或等于数组长度

```js
const arr = ['a', 'b', 'c'];
arr.includes('c', 3);     //false
arr.includes('c', 100);   //false
```

+ fromIndex小于0

```js
const arr = ['a', 'b', 'c'];
arr.includes('a', -100); // true
arr.includes('b', -100); // true
arr.includes('c', -100); // true
arr.includes('a', -2); // false // 3 + (-2) = 1
```

## Array.prototype.indexOf

### 语法

::: danger
arr.indexOf(searchElement[, fromIndex = 0])
:::

参数：
 - searchElement：要查找的元素。
 - fromIndex：开始查找的元素。

返回值：
- 首个被找到的元素在数组的中索引位置，若没有找到，则返回-1。

### 描述

用于判断数组中是否存在某个值，常用语数组去重

### 示例

+ 找出指定元素出现的所有位置

```js
var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.indexOf(element);
while (idx != -1) {
  indices.push(idx);        // [0, 2, 4]
  idx = array.indexOf(element, idx + 1);
}
```

+ 判断一个元素是否在数组里，不在则更新数组

```js
function updateVegetablesCollection (veggies, veggie) {
    if (veggies.indexOf(veggie) === -1) {
        veggies.push(veggie);
        console.log('New veggies collection is : ' + veggies);
    } else if (veggies.indexOf(veggie) > -1) {
        console.log(veggie + ' already exists in the veggies collection.');
    }
}
var veggies = ['potato', 'tomato', 'chillies', 'green-pepper'];
// New veggies collection is : potato,tomato,chillies,green-papper,spinach
updateVegetablesCollection(veggies, 'spinach'); 
// spinach already exists in the veggies collection.
updateVegetablesCollection(veggies, 'spinach');
```

## Array.prototype.join

### 语法

::: danger
arr.join([separator])
:::

参数:
 - separator: 指定一个字符串来分隔数组的每个元素。如果需要，将分隔符转换为字符串。如果缺省该值，数组元素用逗号（,）分隔。如果separator是空字符串("")，则所有元素之间都没有任何字符。(默认为`,`)

返回值:
 - 一个所有数组元素连接的字符串。如果 `arr.length` 为0，则返回空字符串。

### 描述

所有的数组元素被转换成字符串，再用一个分隔符将这些字符串连接起来。

### 示例

+ 使用四种不同的分隔符连接数组元素

```js
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      // myVar1的值变为"Wind,Rain,Fire"
var myVar2 = a.join(', ');  // myVar2的值变为"Wind, Rain, Fire"
var myVar3 = a.join(' + '); // myVar3的值变为"Wind + Rain + Fire"
var myVar4 = a.join('');    // myVar4的值变为"WindRainFire"
```

+ 连接类数组对象

```js
function f(a, b, c) {
  return Array.prototype.join.call(arguments);
}
f(1, 'a', true);      // '1,a,true'
```

## Array.prototype.lastIndexOf

### 语法

::: danger
arr.lastIndexOf(searchElement[, fromIndex = arr.length - 1])
:::

参数:
 - searchElement: 被查找的元素。
 - fromIndex: 从此位置开始逆向查找。默认为数组的长度减 1，即整个数组都被查找。如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移。即使该值为负，数组仍然会被从后向前查找。如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。

返回值: 
 - 数组中最后一个元素的索引，如未找到返回-1

### 描述

`lastIndexOf`使用严格相等（strict equality，即 ===）比较 searchElement 和数组中的元素。 (与indexOf相反)

### 示例

+ 查找所有元素

```js
var indices = [];
var array = ['a', 'b', 'a', 'c', 'a', 'd'];
var element = 'a';
var idx = array.lastIndexOf(element);
while (idx != -1) {
  indices.push(idx);       //[4, 2, 0]
  idx = (idx > 0 ? array.lastIndexOf(element, idx - 1) : -1);
}
```

## Array.prototype.slice

### 语法

::: danger
arr.slice([begin[, end]])
:::

参数:
 - begin: 提取起始处的索引，默认为 0；
 - end：提取终止处的索引，默认为 length-1。

返回值:
 - 一个含有被提取元素的新数组。

### 描述

`slice`不会修改原数组，只会返回一个浅拷贝的新数组。

### 示例

+ 返回现有数组的一部分

```js
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);
// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']
```

## Array.prototype.toString

### 语法

::: danger
arr.toString()
:::

返回值:
 - 一个表示指定的数组及元素的字符串。

### 描述

`Array`对象覆盖了`Object`的`toString`方法。对于数组对象，`toString`方法连接数组并返回一个字符串，其中包含用逗号分隔的每个数组元素。

### 示例

```js
const array = [1, 2, 'a', '1a'];
arrar.toString(); // "1,2,a,1a"
```

## Array.prototype.toLocaleString

### 语法

::: danger
arr.toLocaleString([locales[,options]]);
:::

参数:
 - locales: 带有 BCP 47 语言标记的字符串或字符串数组
 - options: 一个可配置属性的对象
 
返回值:
 - 表示数组元素的字符串。

### 描述

`toLocaleString()`返回一个字符串表示数组中的元素。数组中的元素将使用各自的`toLocaleString`方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。

### 示例

```js
 // 数组中的元素将会使用各自的 toLocaleString 方法：
 // Object: Object.prototype.toLocaleString()
 // Number: Number.prototype.toLocaleString()
 // Date: Date.prototype.toLocaleString()

var prices = ['￥7', 500, 8123, 12];
prices.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });  // "￥7,￥500,￥8,123,￥12"
```
