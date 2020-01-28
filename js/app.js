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
    let tmpExpedeture = +expenditure; // первый обязательный расход
    let tmpExpedeture2 = +expenditure2; // второй обязательный расход
    return 30*(tmpExpedeture + tmpExpedeture2);    
}
//getAccumulatedMonth возвращаем доход за месяц доход - расход
function getAccumulatedMonth(income, expenditure) {
    let tmpIncome = +income; // доход за месяц
    let tmpExpedeture = +expenditure; // расходы за месяц
    return tmpIncome - tmpExpedeture;
}
//getTargetMonth подсчитываем за какой период будет достигнута цель
function getTargetMonth(moneyMission, incomeMonth) {
    let tmpMoneyMonth = +moneyMission; // сколько хотим заработать
    let tmpIncomeMonth = +incomeMonth; // какой доход в месяц
    return Math.ceil(tmpMoneyMonth/tmpIncomeMonth);    
}
//fbudgetDay посчитаем дневной бюджет
function fbudgetDay(accumulatedMonth) {
    let tmpMoney = +money; // доход в месяц
    return Math.floor(tmpMoney/30);    
}
//showTypeOf возвращаем тип переменной
function showTypeOf(params) {
    return typeof params; // возвращаем тип переменной
}

//getStatusIncome статус нашего дохода
function getStatusIncome() {
    console.log('вызов функции getStatusIncome');    
}

budgetDay = fbudgetDay(accumulatedMonth);

if ( budgetDay > 1200 ) {
    messageUser = 'У вас высокий уровень дохода';
} else if (budgetDay < 1200 && budgetDay >600) {
    messageUser = 'У вас средний уровень дохода';
}else if (budgetDay < 600 && budgetDay > 0) {
    messageUser = 'К сожалению у вас уровень дохода ниже среднего';
}else if (budgetDay < 0) {
    messageUser = 'Что то пошло не так !!!';
}else if (budgetDay === 0 || budgetDay === 600 || budgetDay === 1200) {
    switch (budgetDay){
        case (0):{
            messageUser = 'Может нужно идти на работу?';
            break;
        }
        case(600):{
            messageUser = 'У вас средний уровень дохода';
            break;
        }
        case(1200):{
            messageUser = 'У вас высокий уровень дохода';
            break;
        }
    }
}; 

console.log('money: ', showTypeOf(money));
console.log('income: ', showTypeOf(income));
console.log('deposit: ', showTypeOf(deposit));
console.log('Расходы за месяц: ', getExpensesMonth(amount1,amount2));
console.log('Доп затраты в массив: ', addExpenses.split(', '));
console.log(mission + ' с твоим доходом можно заработать за ' + getTargetMonth(money,getAccumulatedMonth(money,getExpensesMonth(amount1,amount2))) + ' месяцев ');
console.log('Дневной бюджет: ', budgetDay);
getStatusIncome();

// console.log('Длинна строки addExpenses: ', addExpenses.length);
// console.log('Период равен '+ period +' месяцев ');
// console.log('Цель заработать ' + mission + ' рублей');
// console.log(addExpenses.toLowerCase());
// console.log('Месячный бюджет: ', budgetMonth);
// console.log(messageUser);

