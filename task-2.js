// Задание 2.
// Написать функцию sum, которая может быть исполнена любое количество раз с не undefined аргументом.
// Если она исполнена без аргументов, то возвращает значение суммы всех переданных до этого значений.
// sum(1)(2)(3)....(n)() === 1 + 2 + 3 + ... + n

const sum1 = (value) => {
    if (typeof sum1.result === 'undefined') {
        sum1.result = 0;
    }

    if (typeof value === 'undefined') {
        return sum1.result;
    }

    sum1.result += value;

    return sum1;
};
  
const sum2 = (value, initialResult = 0) => {
    let result = initialResult;

    if (typeof value === 'undefined') {
        return result;
    }

    result += value;

    return (currValue) => sum2(currValue, result);
};
  
  console.log(sum2(1)(2)(3)());
  