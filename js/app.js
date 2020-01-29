// 1) Переписать функцию start циклом do while
// 2) Добавить проверку что введённые данные являются числом, 
// которые мы получаем на вопрос 'Во сколько это обойдется?’ в функции  getExpensesMonth
// 3) Если getTargetMonth возвращает нам отрицательное значение, то вместо “Цель будет достигнута” необходимо выводить “Цель не будет достигнута”
// 4) Проверить, чтобы все работало и не было ошибок в консоли
// 5) Добавить папку с уроком в свой репозиторий на GitHub
"use strict";

let isNumber = function (number) {
    return !isNaN(parseFloat(number)) && isFinite(parseFloat(number));
}

let messageUser,
    // money = prompt('Укажите ваш месячный доход: ', 50000), // доход за месяц
    money, // доход за месяц
    income = "Профи.ру", // дополнительный источник дохода
    addExpenses = prompt('Укажите Ваши расходы через запятую " , "', 'Интернет, Комунальные платежи, Школа, Сад, Транспорт'), 
    questDeposit = prompt('Есть ли у вас счет в банке? "да" "нет"', 'Да').toLocaleLowerCase(),
    deposit = questDeposit === 'да' ? true : false,
    mission = 1000000, // хочу миллион
    period = 12, // хочу миллион за какой период
    accumulatedMonth;


let start = function () {
        do {
            money = prompt('Укажите ваш месячный доход: ', 50000);
        } while (!isNumber(money));
}

start();

let expenses = [];

let getExpensesMonth = function () {
    let sum =0;
        for (let index = 0; index < 2; index++) {
            let summ = 0;
            expenses[index] = prompt('Введите обязательную статью расходов');
            do {
                summ = +prompt('Сколько требуется тратить', '100');
            } while (!isNumber(summ));
            sum += summ;
        }
        return sum;    
}

let expensesMonth = getExpensesMonth(); // сумма расходов в месяц

//getAccumulatedMonth возвращаем доход за месяц доход - расход
let getAccumulatedMonth = function () {
        return money - expensesMonth;
}

//вычесляем месячный доход
accumulatedMonth = getAccumulatedMonth();

//getTargetMonth подсчитываем за какой период будет достигнута цель
let getTargetMonth = function () {
    if (Math.ceil(mission/accumulatedMonth)<0) {
        console.log('Цель не будет достигнута');
    }  else {
        console.log('Цель в ' + mission + ' с твоим доходом будет достигнута за ' + (Math.ceil(mission/accumulatedMonth)) + ' месяцев ');
    } 
    return ;    
}

let budgetDay = function () {
    return Math.floor(+accumulatedMonth/30);    
}
//showTypeOf возвращаем тип переменной
function showTypeOf(params) {
    return typeof params; // возвращаем тип переменной
}

function getStatusIncome(getBudget) {
    if ( getBudget > 1200 ) {
        return 'У вас высокий уровень дохода';
    } else if (getBudget < 1200 && getBudget >600) {
        return 'У вас средний уровень дохода';
    }else if (getBudget < 600 && getBudget > 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    }else if (getBudget < 0) {
        return 'Что то пошло не так !!!';
    }else if (getBudget === 0 || getBudget === 600 || getBudget === 1200) {
        switch (budgetDay){
            case (0):{
                return 'Может нужно идти на работу?';
                break;
            }
            case(600):{
                return 'У вас средний уровень дохода';
                break;
            }
            case(1200):{
                return 'У вас высокий уровень дохода';
                break;
            }
        }
    }; 

}

console.log('money: ', showTypeOf(money));
console.log('income: ', showTypeOf(income));
console.log('deposit: ', showTypeOf(deposit));
console.log('Расходы за месяц: ', expensesMonth);
// console.log('Расходы за месяц: ', 30 * expensesMonth);
console.log('Доп затраты в массив: ', addExpenses.split(', '));
getTargetMonth();
console.log('Дневной бюджет: ', budgetDay());
console.log('Уровень вашего дохода: ', getStatusIncome(budgetDay()));



