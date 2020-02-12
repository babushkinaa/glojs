
// Блокировка кнопки рассчитать
document.addEventListener("DOMContentLoaded", function(){
    calculateButton.disabled = true;
    

});


"use strict";
// функция для проверки число ли значение
let isNumber = function (number) {
    return !isNaN(parseFloat(number)) && isFinite(parseFloat(number));
}
const rusLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
      rusUpper = rusLower.toUpperCase(),
      rus = rusLower + rusUpper;

let //переменные страницы

    calculateButton = document.querySelector('#start'), // кнока рассчитать
    cancelButton = document.querySelector('#cancel'),
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
    inputPeriodSelect = document.querySelector('.period-select'); // период рассчета ползунок
    

    // Переменные скрипта

const AppData = function() {
    this.income= [];
    this.addIncome= [];
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.persentDeposit = 0;
    this.moneyDeposit = 0;
    this.expenses = [];
    this.addExpenses = [];
    this.deposit = true;
    this.mission = 1000000;
    this.period = 12;

};

AppData.prototype.start = function () {
    console.log('start',this);
    console.trace();

   
    this.budget = +inputSalaryAmount.value;    
    // appData.budget = +inputSalaryAmount.value;    
    this.getExpences();
    // appData.getExpences();
    this.getAddIncome();
    // appData.getAddIncome();
    this.getAddExpences.call(appData);
    // appData.getAddExpences(); ----
    this.showAddExpences();
    // appData.showAddExpences();
    this.getAddIncomeManu(); 
    // appData.getAddIncomeManu(); ----

    this.getExpensesMonth();
    // appData.getExpensesMonth();
            // appData.questDeposit();
            // appData.getInfoDeposit();
    this.getBudget();
    // appData.getBudget();
    this.getTargetMonth();
    // appData.getTargetMonth();

    this.calcSavedMoney();
    // appData.calcSavedMoney();

    this.showResults();
    // appData.showResults();

    this.inputDisable(); //отключаем инпуты
};
// присваиваем значение на странице
AppData.prototype.showResults = function(){
    resultTotalBudgetMonthValue.value = this.budgetMonth;
    resultTotalBudgetDayValue.value = this.budgetDay;
    resultTotalExpensesMonthValue.value = this.expensesMonth;
    resultTotalTargetMonthValue.value = this.getTargetMonth();
    resultTotalAdditionalIncomeValue.value = this.addIncome.join(', ');
    inputPeriodSelect.addEventListener('input',this.calcSavedMoney);
};
//сброс
AppData.prototype.resetAll = function(){
    location.reload();
};
// Расходы
AppData.prototype.addExpensesBlock = function(){ // обязательные расходы добавление строчек
    let item = inputExpensesAmount[0].cloneNode(true);
    console.log('item: ', item);
    let val = item.querySelector('.expenses-title');
    let val1 = item.querySelector('.expenses-amount');
    val.value ='';
    val1.value='';
    val.addEventListener('keypress',this.checkSymbol);
    val1.addEventListener('keypress',this.checkSymbol);
    inputExpensesAmount[0].parentNode.insertBefore(item,btnPlusExpensesAdd);
    inputExpensesAmount = document.querySelectorAll('.expenses-items');
    if (inputExpensesAmount.length === 3) {
        btnPlusExpensesAdd.style.display = 'none';
    }
};
// считаем сумму расходов за месяц expensesMonth
AppData.prototype.getExpensesMonth = function () { 
   
    let expensesMonth = 0;
        for (const key in this.expenses) {
            if (this.expenses.hasOwnProperty(key)) {
                const element = +this.expenses[key];
                expensesMonth += element;
            }
        }

        

        return this.expensesMonth = expensesMonth;
};
// Expenses обязательные с input расходы ----
AppData.prototype.getExpences = function(){
    inputExpensesAmount.forEach((item) =>{
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashAmount = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashAmount !== '') {
            this.expenses[itemExpenses] = cashAmount;
        }
    });
};
//возможные расходы ----
AppData.prototype.getAddExpences = function(){
    let addExp = inputAdditionalExpensesItem.value.split(',');
        addExp.forEach((item) => {
            item = item.trim();
            if(item !== ''){
                console.log('getAddExpencess', this);
                // addExpenses.push(item);
                this.addExpenses.push(item);
            }
        });
};
 //возможные расходы отображение
AppData.prototype.showAddExpences = function(){
    resultTotalAdditionalExpensesValue.value = this.addExpenses.join(', ');
};
// Доходы
AppData.prototype.addIncomeBlock = function(){ // дополнительный доход добавление строчек
    let item = inputIncomeAmount[0].cloneNode(true);   
    let val = item.querySelector('.income-title');
    let val1 = item.querySelector('.income-amount');
    val.value = '';
    val1.value = '';  
    val.addEventListener('keypress',this.checkSymbol);
    val1.addEventListener('keypress',this.checkSymbol);
    inputIncomeAmount[0].parentNode.insertBefore(item,btnPlusIncomeAdd);
    inputIncomeAmount = document.querySelectorAll('.income-items');
    if (inputIncomeAmount.length === 3) {
        btnPlusIncomeAdd.style.display = 'none';
    }
    
};
// Дополнительные доходы с input
AppData.prototype.getAddIncome = function(){
    let addIncome = 0;
    inputIncomeAmount.forEach((item)=>{
        let itemIncome = item.querySelector('.income-title').value;
        let cashAmount = +item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashAmount !== '') {
            this.income[itemIncome] = cashAmount;
            addIncome += cashAmount;
        }
    });
    this.budget = this.budget + addIncome;
    // appData.budget = appData.budget + addIncome;
};
// Возможные доходы -----
AppData.prototype.getAddIncomeManu = function(){
    // console.dir(inputAdditionalIncome);
    inputAdditionalIncomeItem.forEach((item) =>{
        let itemIncome = item.value.trim();
        if (itemIncome !== '') {
            this.addIncome.push(itemIncome); 
        }
    });

};
// Значение под бегунком
AppData.prototype.setValuePeriod = function(){
    let numPeriod = document.querySelector('.period-amount');
    let pSelect = document.querySelector('.period-select')
    numPeriod.value = pSelect.value;
    numPeriod.textContent = pSelect.value;
};
 // есть ли депозит в банке deposit
 AppData.prototype.questDeposit = function(){
    // let quest = prompt('Есть ли у вас счет в банке? "да" "нет"', 'Да').toLocaleLowerCase();
    // return appData.deposit = quest === 'да' ? true : false;
    this.deposit = false;
};
AppData.prototype.getInfoDeposit = function(){
    if (this.deposit) {
        let persentDeposit;
        do {
            persentDeposit = prompt('какой процент', 10);
        } while (!isNumber(persentDeposit));
        this.persentDeposit = +persentDeposit;

        let moneyDeposit;
        do {
            moneyDeposit = prompt('Какая сумма?', 10000);
        } while (!isNumber(moneyDeposit));
        this.moneyDeposit = +moneyDeposit;
    }
};
// сколько накопим ----
AppData.prototype.calcSavedMoney = function(){
//    return appData.budgetMonth * inputPeriodSelect.value;
   resultTotalIncomePeriodValue.value = this.budgetMonth * inputPeriodSelect.value;
   resultTotalTargetMonthValue.value = this.getTargetMonth();

    // appData.getTargetMonth();
};
//getAccumulatedMonth возвращаем доход за месяц доход - расход budgetMonth, budgetDay
AppData.prototype.getBudget = function () { 
    let budgetMonth =  this.budget - this.expensesMonth;
    let budgetDay = Math.floor(budgetMonth/30);
    return this.budgetMonth = budgetMonth, this.budgetDay = budgetDay;
};
// за какое время будет достигнута цель
AppData.prototype.getTargetMonth = function () {
   
    return (Math.ceil(inputTargetAmount.value/this.budgetMonth));    
};
// определяем уровень дохода
AppData.prototype.getStatusIncome = function(){
    let budgetDay = this.budgetDay;
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

};
AppData.prototype.enableBtn = function(){
   calculateButton.disabled = false;
};
AppData.prototype.checkSymbol = function(event){
    // console.dir(event.target.labels[0].style.display='block');
    // console.dir(event.target);
    let str = '';
    if (event.target.placeholder.toLowerCase() === 'наименование') {
        event.target.labels[0].style.display='none';
        const getChar = (event) => String.fromCharCode(event.keyCode || event.charCode || ',');
        const char = getChar(event)
            if (rus.includes(char)) {
                console.log('ru');
                str +=event.target.value;
                event.target.value = str;
            } else {
                    event.target.labels[0].style.display='block';
                    event.target.value = ' ';   
            }
    
    }else if (event.target.placeholder.toLowerCase() === 'сумма'){
        event.target.labels[0].style.display='none';

        const getChar = (event) => String.fromCharCode(event.keyCode || event.charCode);
        const char = getChar(event)
        if (isNumber(char)) {
            str +=event.target.value;
            event.target.value = str;

        }else{
            event.target.labels[0].style.display='block';

            event.target.value = ' ';   
        }
    }
    
};
AppData.prototype.inputDisable = function(){
// input
    inputSalaryAmount.disabled = true;  // месячный доход

    inputIncomeAmount.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').disabled = true; //дополнительный доход наименование
        let cashAmount = item.querySelector('.income-amount').disabled = true;// дополнительный доход сумма
    });
    inputAdditionalIncomeItem.forEach(function(item){
        let itemIncome = item.disabled = true;
    });
    inputExpensesAmount.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').disabled = true;
        let cashAmount = item.querySelector('.expenses-amount').disabled = true;
        
    });


    inputAdditionalExpensesItem.disabled = true;  // возможные рассходы
    inputTargetAmount.disabled = true;  // цель накопления
    document.querySelector('#deposit-check').disabled = true;
    document.querySelector('.deposit-checkmark').disabled = true;
    btnPlusIncomeAdd.disabled = true;  // кнопка дополнительный доход "+"
    btnPlusExpensesAdd.disabled = true;// возможные расходы кнопка "+"


// бегунок
    inputPeriodSelect.disabled = true;  // период рассчета ползунок

// кнопка старт
    calculateButton.style.display = 'none';
    cancelButton.addEventListener('click',this.resetAll);
    cancelButton.style.display = 'block';

};

AppData.prototype.eventsListeners = function(){
    periodAmount.addEventListener('change',appData.showResults.bind(appData));
    inputSalaryAmount.addEventListener('input', appData.enableBtn.bind(appData));
    inputPeriodSelect.addEventListener('input',appData.setValuePeriod.bind(appData));
    calculateButton.addEventListener('click',appData.start.bind(appData));//работает!!!
    btnPlusExpensesAdd.addEventListener('click',appData.addExpensesBlock.bind(appData));
    btnPlusIncomeAdd.addEventListener('click',appData.addIncomeBlock);
    // собятия на ввод - пока так
    inputExpensesAmount[0].querySelector('.expenses-title').addEventListener('keypress',appData.checkSymbol);
    inputExpensesAmount[0].querySelector('.expenses-amount').addEventListener('keypress',appData.checkSymbol);
    inputIncomeAmount[0].querySelector('.income-title').addEventListener('keypress',appData.checkSymbol);  
    inputIncomeAmount[0].querySelector('.income-amount').addEventListener('keypress',appData.checkSymbol);  
    inputAdditionalIncomeItem[0].addEventListener('keypress',appData.checkSymbol);  
    inputAdditionalIncomeItem[1].addEventListener('keypress',appData.checkSymbol);  
    // inputAdditionalExpensesItem.addEventListener('keypress',appData.checkSymbol);  
    inputTargetAmount.addEventListener('keypress',appData.checkSymbol);  
    inputSalaryAmount.addEventListener('keypress',appData.checkSymbol);  
};

  const appData = new AppData();
  appData.eventsListeners();
  console.log('appData: ', appData);

// почему нужно всем делать bind? 
// periodAmount.addEventListener('change',appData.showResults.bind(appData));
// inputSalaryAmount.addEventListener('input', appData.enableBtn.bind(appData));
// inputPeriodSelect.addEventListener('input',appData.setValuePeriod.bind(appData));
// calculateButton.addEventListener('click',appData.start.bind(appData));//работает!!!
// btnPlusExpensesAdd.addEventListener('click',appData.addExpensesBlock.bind(appData));
// btnPlusIncomeAdd.addEventListener('click',appData.addIncomeBlock.bind(appData));
// // собятия на ввод - пока так
// inputExpensesAmount[0].querySelector('.expenses-title').addEventListener('keypress',appData.checkSymbol);
// inputExpensesAmount[0].querySelector('.expenses-amount').addEventListener('keypress',appData.checkSymbol);
// inputIncomeAmount[0].querySelector('.income-title').addEventListener('keypress',appData.checkSymbol);  
// inputIncomeAmount[0].querySelector('.income-amount').addEventListener('keypress',appData.checkSymbol);  
// inputAdditionalIncomeItem[0].addEventListener('keypress',appData.checkSymbol);  
// inputAdditionalIncomeItem[1].addEventListener('keypress',appData.checkSymbol);  
// inputAdditionalExpensesItem.addEventListener('keypress',appData.checkSymbol);  
// inputTargetAmount.addEventListener('keypress',appData.checkSymbol);  
// inputSalaryAmount.addEventListener('keypress',appData.checkSymbol);  
        




