// Написать функцию
// promiseReduce(asyncFunctions, reduce, initialValue)
// asyncFunctions - массив асинхронных функций, возвращающих промис
// reduce(memo, value) - функция, которая будет вызвана для каждого успешно завершившегося промиса.
// initialValue - стартовое значение для функции reduce
// promiseReduce последовательно вызывает переданные асинхронные функции
// и выполняет reduce функцию сразу при получении результата до вызова следующей асинхронной функции. Функция promiseReduce должна возвращать промис с конечным результатом.

const fn1 = () => {
  return Promise.resolve(3);
};

const fn2 = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(2), 1000);
  });

const promiseReduce = (asyncFunctions, reduceFn, initialValue) => {
  return asyncFunctions.reduce(async (acc, asyncFunction) => {
    const awaitedAcc = await acc;

    const resultFromAsyncFunction = await asyncFunction();

    const result = reduceFn(awaitedAcc, resultFromAsyncFunction);

    return result;
  }, initialValue);
};

promiseReduce(
  [fn1, fn2],
   (memo, value)=> memo * value,
  2,
).then(console.log);

// 2 * 3 * 2 => 12