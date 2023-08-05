// Написать функцию
// promiseReduce(asyncFunctions, reduce, initialValue)
// asyncFunctions - массив асинхронных функций, возвращающих промис
// reduce(memo, value) - функция, которая будет вызвана для каждого успешно завершившегося промиса.
// initialValue - стартовое значение для функции reduce
// promiseReduce последовательно вызывает переданные асинхронные функции
// и выполняет reduce функцию сразу при получении результата до вызова следующей асинхронной функции. Функция promiseReduce должна возвращать промис с конечным результатом.

const fn2 = () => {
  return Promise.resolve(3);
};

const fn1 = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(2), 5000);
  });

const promiseReduce = async (asyncFunctions, reduceFn, initialValue) => {
  let sum = initialValue

  for await (const asyncFunction of asyncFunctions) {
    const resultFromAsyncFunction = await asyncFunction();

    sum = sum + resultFromAsyncFunction
  }

  return sum
};

promiseReduce(
  [fn1, fn2],
   (memo, value)=> memo * value,
  2,
).then(console.log);

// 2 * 3 * 2 => 12