

"use strict";

let isNumber = function (number) {
    return !isNaN(parseFloat(number)) && isFinite(parseFloat(number));
}
let appData = {
    income: 'Профи.ру',
    budget : 0,
    budgetDay : 0,
    budgetMonth : 0,
    expensesMonth : 0,
    expenses : {},
    deposit : false,
    mission : 1000000,
    period : 12,

    // получаем обязательные расходы за месяц expenses
    asking : function () {
        let sum =0;
        let m = {};
        for (let index = 0; index < 2; index++) {
            let name = prompt('Введите обязательную статью расходов');
                m[name];
            do {
                sum = +prompt('Сколько требуется тратить', '100');
                m[name] = sum;
            } while (!isNumber(sum));
        }
    
        return appData.expenses = m;
        
    },
    // есть ли депозит в банке deposit
    questDeposit : function(){
        let quest = prompt('Есть ли у вас счет в банке? "да" "нет"', 'Да').toLocaleLowerCase();
        return appData.deposit = quest === 'да' ? true : false;
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
        if ( budgetDay > 1200 ) {
            return 'У вас высокий уровень дохода';
        } else if (budgetDay < 1200 && budgetDay >600) {
            return 'У вас средний уровень дохода';
        }else if (budgetDay < 600 && budgetDay > 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        }else if (budgetDay < 0) {
            return 'Что то пошло не так !!!';
        }else if (budgetDay === 0 || budgetDay === 600 || budgetDay === 1200) {
            switch (appData.budgetDay){
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
        }
    
    }

}

appData.asking(); // затраты в месяц
appData.getExpensesMonth();
appData.questDeposit();

let money;
let start = function () {
        do {
            money = +prompt('Укажите ваш месячный доход: ', 50000);
        } while (!isNumber(money));
}
start();
appData.setBudget(money);
appData.getBudget();
appData.showBudget();
appData.getTargetMonth();
console.log( appData.getStatusIncome());





