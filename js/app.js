"use strict";

// 1) +Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц
// 2) +Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
// 3) +Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 
// 4) +Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления (accumulatedMonth) и возвращает результат
// 5) +Удалить из кода переменную budgetMonth
// 6) +budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
// 7) Почистить консоль логи и добавить недостающие, должны остаться:
//     +- вызовы функции showTypeOf
//     +- Расходы за месяц вызов getExpensesMonth
//     +- Вывод возможных расходов в виде массива (addExpenses)
//     +- Cрок достижения цели в месяцах (результат вызова функции getTargetMonth) 
//     +- Бюджет на день (budgetDay)
//     +- вызов функции getStatusIncome
// 8) Проверить, чтобы все работало и не было ошибок в консоли
// 9) Добавить папку с четвертым уроком в свой репозиторий на GitHub

let messageUser; 
let money = prompt('Укажите ваш месячный доход: ', 50000); // доход за месяц
let income = "Профи.ру"; // дополнительный источник дохода
let addExpenses = prompt('Укажите Ваши расходы через запятую " , "', 'Интернет, Комунальные платежи, Школа, Сад, Транспорт'); 
let questDeposit = prompt('Есть ли у вас счет в банке? "да" "нет"', 'Да').toLocaleLowerCase(); 
let deposit = questDeposit === 'да' ? true : false; 
let expenses1 = prompt('Введите обязательную статью расходов?', 'дорога на работу');
let amount1 = prompt('Сколько требуется тратить', '100');
let expenses2 = prompt('Введите обязательную статью расходов?', 'покупка продуктов');
let amount2 = prompt('Сколько требуется тратить', '100');
let mission = 1000000; // хочу миллион
let period = 12; // хочу миллион за какой период
// let budgetDay = Math.floor( money/30 ); // что пока имеем в день
let budgetDay; // что пока имеем в день
// let budgetMonth = 30 * ( budgetDay - amount1 - amount2 ); // сколько заработаем в месяц
// let budgetMonth; // сколько заработаем в месяц
let accumulatedMonth;


// let missionComplect = Math.ceil( mission / accumulatedMonth ); // через сколько месяцев получим результат

//вычесляем месячный доход
accumulatedMonth = getAccumulatedMonth(money,getExpensesMonth(amount1,amount2));

//+getExpensesMonth возвращаем сумму всех обязательных расходов в месяц
function getExpensesMonth(expenditure, expenditure2) {
        return +expenditure + +expenditure2;    
}
//getAccumulatedMonth возвращаем доход за месяц доход - расход
function getAccumulatedMonth(income, expenditure) {
        return +income - expenditure;
}
//getTargetMonth подсчитываем за какой период будет достигнута цель
function getTargetMonth(moneyMission, incomeMonth) {
       return Math.ceil(+moneyMission/incomeMonth);    
}
//fbudgetDay посчитаем дневной бюджет
function fbudgetDay(accumulatedMonth) {
    return Math.floor(+accumulatedMonth/30);    
}
//showTypeOf возвращаем тип переменной
function showTypeOf(params) {
    return typeof params; // возвращаем тип переменной
}

//getStatusIncome статус нашего дохода
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

budgetDay = fbudgetDay(accumulatedMonth);



console.log('money: ', showTypeOf(money));
console.log('income: ', showTypeOf(income));
console.log('deposit: ', showTypeOf(deposit));
console.log('Расходы за месяц: ', 30*(getExpensesMonth(amount1,amount2)));
console.log('Доп затраты в массив: ', addExpenses.split(', '));
console.log(mission + ' с твоим доходом можно заработать за ' + getTargetMonth(money,getAccumulatedMonth(money,getExpensesMonth(amount1,amount2))) + ' месяцев ');
console.log('Дневной бюджет: ', budgetDay);
// getStatusIncome();
console.log('Уровень вашего дохода: ', getStatusIncome(budgetDay));

// console.log('Длинна строки addExpenses: ', addExpenses.length);
// console.log('Период равен '+ period +' месяцев ');
// console.log('Цель заработать ' + mission + ' рублей');
// console.log(addExpenses.toLowerCase());
// console.log('Месячный бюджет: ', budgetMonth);
// console.log(messageUser);

