
document.addEventListener("DOMContentLoaded", function(){
    calculateButton.disabled = true;

});


"use strict";

let isNumber = function (number) {
    return !isNaN(parseFloat(number)) && isFinite(parseFloat(number));
}
let //переменные страницы

    calculateButton = document.querySelector('#start'), // кнока рассчитать
    btnPlusIncomeAdd = document.getElementsByClassName('income_add')[0], // кнопка дополнительный доход "+"
    btnPlusExpensesAdd = document.getElementsByClassName('expenses_add')[0], // возможные расходы кнопка "+"
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
    periodAmount = document.querySelector('.period-amount');

    // input
    inputSalaryAmount = document.querySelector('.salary-amount'), // месячный доход
    inputIncomeTitle = document.querySelector('.income-title'), //дополнительный доход наименование
    inputIncomeAmount = document.querySelectorAll('.income-items'), // дополнительный доход сумма
    inputAdditionalIncome = document.querySelectorAll('.additional_income'), //возможный доход коллекция
    inputAdditionalIncomeItem = document.querySelectorAll('.additional_income-item'), //возможный доход коллекция
    inputExpensesAmount = document.querySelectorAll('.expenses-items'), // обязательные расходы сумма
    inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item'), // возможные рассходы
    inputTargetAmount = document.querySelector('.target-amount'), // цель накопления
    
    // бегунок
    inputPeriodSelect = document.querySelector('.period-select'), // период рассчета ползунок
    
    // Переменные скрипта

    appData = {
        income: [],
        addIncome: [],
        budget : 0,
        budgetDay : 0,
        budgetMonth : 0,
        expensesMonth : 0,
        persentDeposit : 0,
        moneyDeposit : 0,
        expenses : [],
        addExpenses : [],
        deposit : true,
        mission : 1000000,
        period : 12,

    start : function () {
       
        appData.budget = +inputSalaryAmount.value;    
        appData.getExpences();
        appData.getAddIncome();
        appData.getAddExpences();
        appData.showAddExpences();
        appData.getAddIncomeManu();
    
        appData.getExpensesMonth();
        // appData.questDeposit();
        // appData.getInfoDeposit();
        appData.getBudget();
        appData.getTargetMonth();
    
        appData.calcSavedMoney();

        appData.showResults();
    },    
// присваиваем значение на странице
    showResults : function(){
        resultTotalBudgetMonthValue.value = appData.budgetMonth;
        resultTotalBudgetDayValue.value = appData.budgetDay;
        resultTotalExpensesMonthValue.value = appData.expensesMonth;
        resultTotalTargetMonthValue.value = appData.getTargetMonth();
        resultTotalAdditionalIncomeValue.value = appData.addIncome.join(', ');
        inputPeriodSelect.addEventListener('input',appData.calcSavedMoney);
    },
    
// Расходы
    addExpensesBlock : function(){ // обязательные расходы добавление строчек
        let item = inputExpensesAmount[0].cloneNode(true);
        // item.textContent = '';
        // inputExpensesAmount[0].parentNode.appendChild(item);
        inputExpensesAmount[0].parentNode.insertBefore(item,btnPlusExpensesAdd);
        inputExpensesAmount = document.querySelectorAll('.expenses-items');
        if (inputExpensesAmount.length === 3) {
            btnPlusExpensesAdd.style.display = 'none';
        }
    },
     // считаем сумму расходов за месяц expensesMonth
    getExpensesMonth : function () { 
   
        let expensesMonth = 0;
            for (const key in appData.expenses) {
                if (appData.expenses.hasOwnProperty(key)) {
                    const element = +appData.expenses[key];
                    expensesMonth += element;
                }
            }

            
    
            return appData.expensesMonth = expensesMonth;
    },
    // Expenses обязательные с input расходы
    getExpences : function(){
    console.log(inputExpensesAmount);
        inputExpensesAmount.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashAmount = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashAmount !== '') {
                appData.expenses[itemExpenses] = cashAmount;
            }
        });
    },
    //возможные расходы
    getAddExpences : function(){
        let addExp = inputAdditionalExpensesItem.value.split(',');
        console.log('addExpenses: ', addExp);
            addExp.forEach(function(item){
                item = item.trim();
                if(item !== ''){
                    appData.addExpenses.push(item);
                }
            });
    },
    //возможные расходы отображение
    showAddExpences : function(){
        resultTotalAdditionalExpensesValue.value = appData.addExpenses.join(', ');
    },
// Доходы
    addIncomeBlock : function(){ // дополнительный доход добавление строчек
        let item = inputIncomeAmount[0].cloneNode(true);     
        inputIncomeAmount[0].parentNode.insertBefore(item,btnPlusIncomeAdd);
        inputIncomeAmount = document.querySelectorAll('.income-items');
        if (inputIncomeAmount.length === 3) {
            btnPlusIncomeAdd.style.display = 'none';
        }
        
    },
    // Дополнительные доходы с input
    getAddIncome : function(){
        // console.log(inputIncomeAmount[0]);
        let addIncome = 0;
        inputIncomeAmount.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            // console.log('item.querySelector.value: ', item.querySelector('.income-items').value);
            let cashAmount = +item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashAmount !== '') {
                appData.income[itemIncome] = cashAmount;
                addIncome += cashAmount;
            }
        });
        appData.budget = appData.budget + addIncome;
    },
    // Возможные доходы
    getAddIncomeManu : function(){
        console.dir(inputAdditionalIncome);
        inputAdditionalIncomeItem.forEach(function(item){
            let itemIncome = item.value.trim();
            if (itemIncome !== '') {
                appData.addIncome.push(itemIncome);
            }
        });

    },
    // Значение под бегунком
    setValuePeriod : function(){
        let numPeriod = document.querySelector('.period-amount');
        let pSelect = document.querySelector('.period-select')
        numPeriod.value = pSelect.value;
        numPeriod.textContent = pSelect.value;
    },
     // есть ли депозит в банке deposit
    questDeposit : function(){
        // let quest = prompt('Есть ли у вас счет в банке? "да" "нет"', 'Да').toLocaleLowerCase();
        // return appData.deposit = quest === 'да' ? true : false;
        return appData.deposit = false;
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
    //    return appData.budgetMonth * inputPeriodSelect.value;
       resultTotalIncomePeriodValue.value = appData.budgetMonth * inputPeriodSelect.value;
       resultTotalTargetMonthValue.value = appData.getTargetMonth();

        // appData.getTargetMonth();
    },
    //getAccumulatedMonth возвращаем доход за месяц доход - расход budgetMonth, budgetDay
    getBudget : function () { 
        let budgetMonth = appData.budget - appData.expensesMonth;
        let budgetDay = Math.floor(budgetMonth/30);
        return appData.budgetMonth = budgetMonth, appData.budgetDay = budgetDay;
    },
    // за какое время будет достигнута цель
    getTargetMonth : function () {
        // if (Math.ceil(appData.budgetMonth)<0) {
        //     console.log('Цель не будет достигнута');
        // }  else {
        //     console.log('Цель в ' + appData.mission + ' с твоим доходом будет достигнута за ' + (Math.ceil(appData.mission/appData.budgetMonth)) + ' месяцев ');
        // } 
        return (Math.ceil(inputTargetAmount.value/appData.budgetMonth));    
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
    
    },
    enableBtn : function(){
   
    calculateButton.disabled = false;
    
    }

}
// appData.getAddIncomeManu();
periodAmount.addEventListener('change',appData.showResults);
inputSalaryAmount.addEventListener('input', appData.enableBtn);
inputPeriodSelect.addEventListener('input',appData.setValuePeriod);
calculateButton.addEventListener('click',appData.start);
btnPlusExpensesAdd.addEventListener('click',appData.addExpensesBlock);
btnPlusIncomeAdd.addEventListener('click',appData.addIncomeBlock);



console.log(appData);






