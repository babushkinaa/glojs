

"use strict";

let isNumber = function (number) {
    return !isNaN(parseFloat(number)) && isFinite(parseFloat(number));
}
let //переменные страницы

    calculateButton = document.getElementById('start'), // кнока рассчитать
    btnPlusIncomeAdd = document.getElementsByClassName('income_add'), // кнопка дополнительный доход "+"
    btnPlusExpensesAdd = document.getElementsByClassName('expenses_add'), // возможные расходы кнопка "+"
    depositCheckmark = document.querySelector('.deposit-checkmark'), // чек-бокс депозит
    additionalIncome = document.querySelectorAll('.additional_income'), // возможные доходы

    //value
    resultTotalBudgetMonthValue = document.querySelector('.budget_month-value'), // доход за месяц
    resultTotalBudgetDayValue = document.querySelector('.budget_day-value'), // дневной доход
    resultTotalExpensesMonthValue = document.querySelector('.expenses_month-value'), // расход за месяц
    resultTotalAdditionalIncomeValue = document.querySelector('.additional_income-value'), // возможные доходы
    resultTotalAdditionalExpensesValue = document.querySelector('.additional_expenses-value'), // возможные расходы
    resultTotalIncomePeriodValue = document.querySelector('.income_period-value'), // накопления за период
    resultTotalTargetMonthValue = document.querySelector('.target_month-value'), // срок достижения

    // input
    inputSalaryAmount = document.querySelector('.salary-amount'), // месячный доход
    inputIncomeTitle = document.querySelector('.income-title'), //дополнительный доход наименование
    inputIncomeAmount = document.querySelector('.income-amount'), // дополнительный доход сумма
    inputAdditionalIncomeItem = document.querySelectorAll('.additional_income-title'), //возможный доход коллекция
    inputExpensesTitle = document.querySelector('.expenses-title'), // обязательные расходы наименование
    inputExpensesAmount = document.querySelector('.expenses-amount'), // обязательные расходы сумма
    inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item'), // возможные рассходы
    inputTargetAmount = document.querySelector('.target-amount'), // цель накопления
    
    // бегунок
    inputPeriodSelect = document.querySelector('.period-select'), // период рассчета ползунок
    
    // Переменные скрипта

    money,
    appData = {
    income: {},
    budget : 0,
    budgetDay : 0,
    budgetMonth : 0,
    expensesMonth : 0,
    persentDeposit : 0,
    moneyDeposit : 0,
    expenses : {},
    deposit : true,
    mission : 1000000,
    period : 12,
    addExpenses : {},

    // получаем обязательные расходы за месяц expenses
    asking : function () {
        let sum =0;
        let m = {};
        for (let index = 0; index < 2; index++) {
            let name;
            do {
                name = prompt('Введите обязательную статью расходов');
            } while (isNumber(name)); 
            do {
                sum = +prompt('Сколько требуется тратить', '100');
            } while (!isNumber(sum));
            appData.expenses[name] = sum;
        }
                
        if (confirm('Есть ли у вас дополнительный заработок?')) {
            let itemIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Профи.ру');
            } while (isNumber(itemIncome)); 

            let cashIncome;
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 5000);
            } while (!isNumber(cashIncome));
             
            appData.income[itemIncome] = cashIncome;
            
        }
                
    },
    // есть ли депозит в банке deposit
    questDeposit : function(){
        let quest = prompt('Есть ли у вас счет в банке? "да" "нет"', 'Да').toLocaleLowerCase();
        return appData.deposit = quest === 'да' ? true : false;
    },
    // Если есть депозит спросим какой процент и какая сумма
    getInfoDeposit : function(){
        if (appData.deposit) {
            let persentDeposit;
            do {
                persentDeposit = prompt('какой процент', 10);
            } while (!isNumber(persentDeposit));
            appData.persentDeposit = +persentDeposit;

            let moneyDeposit;
            do {
                moneyDeposit = prompt('Какая сумма?', 10000);
            } while (!isNumber(moneyDeposit));
            appData.moneyDeposit = +moneyDeposit;
        }
    },

    calcSavedMoney : function(){
        return appData.budgetMonth * appData.period;
    },

    // считаем сумму расходов за месяц expensesMonth
    getExpensesMonth : function () { 
   
        let expensesMonth = 0;
            for (const key in appData.expenses) {
                if (appData.expenses.hasOwnProperty(key)) {
                    const element = appData.expenses[key];
                    expensesMonth += element;
                }
            }
    
            return appData.expensesMonth = expensesMonth;
    },
    // Дополнительные возможные расходы
    getAddExpences : function(){
        if (confirm('Есть ли у вас дополнительные рассходы?')) {
            let itemAddExpenses;
            let quest = true;
            do {
                do {
                    itemAddExpenses = prompt('Какой у вас дополнительный расход?', 'Интернет');
                } while (isNumber(itemAddExpenses)); 
        
                let cashAddExpenses;
                do {
                    cashAddExpenses = prompt('Сколько в месяц вы тратите на '+itemAddExpenses+'?', 500);
                } while (!isNumber(cashAddExpenses));

                appData.addExpenses[itemAddExpenses] = cashAddExpenses;

                if (!confirm('Есть ли еще рассходы?')) {
                    quest = false;
                } 
                
            } while (quest);
        }
    },
    //вывести дополнительные расходы в консоль
    showAddExpenses : function(){
        let show ='';
        let calc = 0;
        console.log();
        
        for (const key in appData.addExpenses) {
            if (appData.addExpenses.hasOwnProperty(key)) {
                const element = appData.addExpenses[key];
                let tmp = key[0];
                tmp = tmp.toUpperCase();

                if (calc === Object.keys(appData.addExpenses).length - 1) {
                    show += tmp + key.substring(1)+' ';
                } else{
                    show += tmp + key.substring(1)+', ';
                }
            }
            calc +=1;
            
        }
        console.log('Дополнительные расходы: '+show);


    },
    //getAccumulatedMonth возвращаем доход за месяц доход - расход budgetMonth, budgetDay
    getBudget : function () { 
        let budgetMonth = appData.budget - appData.expensesMonth;
        let budgetDay = Math.floor(budgetMonth/30);
        return appData.budgetMonth = budgetMonth, appData.budgetDay = budgetDay;
    },
    // budget = money
    setBudget : function(money){
        // return appData.budget = 50000;
        return appData.budget = money;
    },
    showBudget : function(){
        console.log('расходы за месяц :' + appData.expensesMonth);
    },

    // за какое время будет достигнута цель
    getTargetMonth : function () {
        if (Math.ceil(appData.budgetMonth)<0) {
            console.log('Цель не будет достигнута');
        }  else {
            console.log('Цель в ' + appData.mission + ' с твоим доходом будет достигнута за ' + (Math.ceil(appData.mission/appData.budgetMonth)) + ' месяцев ');
        } 
        return ;    
    },
    // определяем уровень дохода
    getStatusIncome : function(){
        let budgetDay = appData.budgetDay;
        if ( budgetDay >= 1200 ) {
            return 'У вас высокий уровень дохода';
        } else if (budgetDay < 1200 && budgetDay >600) {
            return 'У вас средний уровень дохода';
        }else if (budgetDay < 600 && budgetDay > 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        }else if (budgetDay < 0) {
            return 'Что то пошло не так !!!';
        }else if (budgetDay === 0){
            return 'Может нужно идти на работу?';
        }else if(budgetDay === 600 ){
            return 'У вас средний уровень дохода';
        }
    
    }

}

// appData.getAddExpences();
// appData.showAddExpenses();

appData.asking();     // получаем обязательные расходы за месяц expenses

let start = function () {
        do {
            money = +prompt('Укажите ваш месячный доход: ', 50000);
        } while (!isNumber(money));

    appData.getExpensesMonth();
    appData.getAddExpences();
    appData.showAddExpenses();
    appData.questDeposit();
    appData.getInfoDeposit();
    appData.setBudget(money);
    appData.getBudget();
    appData.showBudget();
    appData.getTargetMonth();
    console.log( appData.getStatusIncome());
}
start();

console.log( calculateButton 
            ,btnPlusIncomeAdd 
            ,btnPlusExpensesAdd 
            ,depositCheckmark 
            ,additionalIncome 
            ,resultTotalBudgetMonthValue 
            ,resultTotalBudgetDayValue 
            ,resultTotalExpensesMonthValue  
            ,resultTotalAdditionalIncomeValue 
            ,resultTotalAdditionalExpensesValue 
            ,resultTotalIncomePeriodValue  
            ,resultTotalTargetMonthValue 
            ,inputSalaryAmount 
            ,inputIncomeTitle 
            ,inputIncomeAmount 
            ,inputAdditionalIncomeItem 
            ,inputExpensesTitle 
            ,inputExpensesAmount 
            ,inputAdditionalExpensesItem 
            ,inputTargetAmount 
            ,inputPeriodSelect );
    





