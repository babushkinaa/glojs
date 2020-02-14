
// Блокировка кнопки рассчитать
document.addEventListener("DOMContentLoaded", function(){
    calculateButton.disabled = true;
    

});


"use strict";
// функция для проверки число ли значение
let isNumber = (number) => {
    return !isNaN(parseFloat(number)) && isFinite(parseFloat(number));
}
const rusLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя',
      rusUpper = rusLower.toUpperCase(),
      rus = rusLower + rusUpper;

// let //переменные страницы
const //переменные страницы

    calculateButton = document.querySelector('#start'), // кнока рассчитать
    cancelButton = document.querySelector('#cancel'),
    btnPlusIncomeAdd = document.getElementsByClassName('income_add')[0], // кнопка дополнительный доход "+"
    btnPlusExpensesAdd = document.getElementsByClassName('expenses_add')[0], // возможные расходы кнопка "+"
    depositCheckmark = document.querySelector('#deposit-check'), // чек-бокс депозит
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
    depositCalc = document.querySelector('.deposit-calc');

    // input
    inputSalaryAmount = document.querySelector('.salary-amount'), // месячный доход
    inputIncomeTitle = document.querySelector('.income-title'), //дополнительный доход наименование
    inputIncomeAmount = document.querySelectorAll('.income-items'), // дополнительный доход сумма
    inputAdditionalIncome = document.querySelectorAll('.additional_income'), //возможный доход коллекция
    inputAdditionalIncomeItem = document.querySelectorAll('.additional_income-item'), //возможный доход коллекция
    inputExpensesAmount = document.querySelectorAll('.expenses-items'), // обязательные расходы сумма
    inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item'), // возможные рассходы
    inputTargetAmount = document.querySelector('.target-amount'), // цель накопления
    depositBank = document.querySelector('.deposit-bank');
    depositAmount = document.querySelector('.deposit-amount');
    depositPercent = document.querySelector('.deposit-percent');
    
    // бегунок
    inputPeriodSelect = document.querySelector('.period-select'); // период рассчета ползунок
    

    // Переменные скрипта

 class AppData{

    constructor( //конструктор
            income = [],
            addIncome = [],
            budget = 0,
            budgetDay = 0,
            budgetMonth = 0,
            expensesMonth = 0,
            persentDeposit = 0,
            moneyDeposit = 0,
            expenses = [],
            addExpenses = [],
            deposit = false,
            mission = 1000000,
            period = 12
        ){ // присваиваем значения свойствам класса при создании класса
            this.income = income;
            this.addIncome = addIncome ;
            this.budget = budget;
            this.budgetDay = budgetDay;
            this.budgetMonth = budgetMonth;
            this.expensesMonth = expensesMonth;
            this.persentDeposit = persentDeposit;
            this.moneyDeposit = moneyDeposit;
            this.expenses = expenses;
            this.addExpenses = addExpenses;
            this.deposit = deposit;
            this.mission = mission;
            this.period = period;
        }
        //методы класса
            start = () => {
                console.log('start',this);
                console.trace();
            
               
                this.budget = +inputSalaryAmount.value;    
                // appData.budget = +inputSalaryAmount.value;    
                this.getExpences();
                // appData.getExpences();
                this.getAddIncome();
                // appData.getAddIncome();
                this.getAddExpences();
                // this.getAddExpences.call(appData);
                // appData.getAddExpences(); ----
                this.showAddExpences();
                // appData.showAddExpences();
                this.getAddIncomeManu(); 
                // appData.getAddIncomeManu(); ----
            
                this.getExpensesMonth();
                // appData.getExpensesMonth();
                        // appData.questDeposit();
                this.getInfoDeposit();

                this.getBudget();

                // appData.getBudget();
                this.getTargetMonth();
                // appData.getTargetMonth();
            
                this.calcSavedMoney();
                // appData.calcSavedMoney();
            
                this.showResults();
                // appData.showResults();
            
                this.inputDisable(); //отключаем инпуты
            ;
            };
            // присваиваем значение на странице
            showResults(){
                resultTotalBudgetMonthValue.value = this.budgetMonth;
                resultTotalBudgetDayValue.value = this.budgetDay;
                resultTotalExpensesMonthValue.value = this.expensesMonth;
                resultTotalTargetMonthValue.value = this.getTargetMonth();
                resultTotalAdditionalIncomeValue.value = this.addIncome.join(', ');
                inputPeriodSelect.addEventListener('input',this.calcSavedMoney);
            };
            //сброс
            resetAll(){
                location.reload();
            };
            // Расходы обязательные расходы добавление строчек
            addExpensesBlock(){ 
                const item = inputExpensesAmount[0].cloneNode(true);
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
            getExpensesMonth() { 
                let expensesMonth = 0;
                    for (const key in this.expenses) {
                        if (this.expenses.hasOwnProperty(key)) {
                            const element = +this.expenses[key];
                            expensesMonth += element;
                        }
                    }
                    return this.expensesMonth = expensesMonth;
            };
            // Expenses обязательные с input расходы 
            getExpences(){
                inputExpensesAmount.forEach((item) =>{
                    let itemExpenses = item.querySelector('.expenses-title').value;
                    let cashAmount = item.querySelector('.expenses-amount').value;
                    if (itemExpenses !== '' && cashAmount !== '') {
                        this.expenses[itemExpenses] = cashAmount;
                    }
                });
            };
            //возможные расходы
            getAddExpences(){
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
            showAddExpences(){
                resultTotalAdditionalExpensesValue.value = this.addExpenses.join(', ');
            };
            // Доходы дополнительный доход добавление строчек
            addIncomeBlock(){ // 
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
            getAddIncome(){
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
            getAddIncomeManu(){
                // console.dir(inputAdditionalIncome);
                inputAdditionalIncomeItem.forEach((item) =>{
                    let itemIncome = item.value.trim();
                    if (itemIncome !== '') {
                        this.addIncome.push(itemIncome); 
                    }
                });
            };
            // Значение под бегунком
            setValuePeriod(){
                let numPeriod = document.querySelector('.period-amount');
                let pSelect = document.querySelector('.period-select')
                numPeriod.value = pSelect.value;
                numPeriod.textContent = pSelect.value;
            };
            // сколько накопим 
            calcSavedMoney(){
                //    return appData.budgetMonth * inputPeriodSelect.value;
                resultTotalIncomePeriodValue.value = this.budgetMonth * inputPeriodSelect.value;
                resultTotalTargetMonthValue.value = this.getTargetMonth();
                
                    // appData.getTargetMonth();
            };
            //getAccumulatedMonth возвращаем доход за месяц доход - расход budgetMonth, budgetDay
            getBudget() { 
                let budgetMonth =  this.budget - this.expensesMonth;
                let budgetDay = Math.floor(budgetMonth/30);
                const monthDeposit = this.moneyDeposit * (this.persentDeposit / 100); 
                // const monthDeposit = this.moneyDeposit * (this.persentDeposit / 100); 
                this.budgetMonth = budgetMonth + monthDeposit;
                this.budgetDay = budgetDay;
                // this.budget +=monthDeposit;
            };
            // за какое время будет достигнута цель
            getTargetMonth() {
        
            return (Math.ceil(inputTargetAmount.value/this.budgetMonth));    
            };
            // определяем уровень дохода
            getStatusIncome(){
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
            //включаем кнопку рассчитать
            enableBtn(){
                calculateButton.disabled = false;
             };
             // проверка вводимых символов
            checkSymbol(event){
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
            // отключаем поля ввода
            inputDisable(){
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
            // есть ли депозит в банке deposit
            questDeposit(){
                // let quest = prompt('Есть ли у вас счет в банке? "да" "нет"', 'Да').toLocaleLowerCase();
                // return appData.deposit = quest === 'да' ? true : false;
                this.deposit = false;
            };
            // какой депозит в банке
            getInfoDeposit(){
                if (this.deposit) {
                    this.persentDeposit = depositPercent.value;
                    console.log('depositPercent.value;: ', depositPercent.value);
                    console.log('this.persentDeposit: ', this.persentDeposit);
                    this.moneyDeposit = depositAmount.value;
                    console.log('this.moneyDeposit: ', this.moneyDeposit);
                }
            };
            depozitPass(val){
                if (isNumber(val) || val < 0 || val > 100) {
                    alert('что за банк?');
                }
                continue;
            };
            changePercent(){
                const valueSelect = this.value;
               
                if (valueSelect === 'other') {
                    let val = depositPercent.value;
                    depositPercent.style.display = 'inline-block'; //процент
                    depositPercent.addEventListener('change', ()=>{
                    if(val >100 || val<0 ||val !== isNumber(val)) {
                        calculateButton.disabled = true;
                    
                        alert('Введите корректное значение в поле проценты');
                    }
                    this.persentDeposit = depositPercent.value;
                    });
                } else {
                    depositPercent.style.display = 'none';
                    depositPercent.value = valueSelect;
                    console.log('this.persentDeposit: ', this.persentDeposit);
                    console.log('this.value: ', this.value);
                }
            };
            depositHandler(){
                
                console.dir(depositCheckmark);
                if (depositCheckmark.checked) {
                    
                    depositBank.style.display = 'inline-block';
                    depositAmount.style.display = 'inline-block';
                    this.deposit = true;
                    depositBank.addEventListener('change',this.changePercent);
                } else {
                    console.log('не чек');
                    depositBank.style.display = 'none';
                    depositBank.value = '';
                    depositAmount.style.display = 'none';
                    depositAmount.value = '';
                    this.deposit = false;
                    depositBank.removeEventListener('change',this.changePercent);
                }
            };
            // добавляем обработчики событий
            eventsListeners(){
                periodAmount.addEventListener('change',appData.showResults);
                // periodAmount.addEventListener('change',appData.showResults.bind(appData));
                inputSalaryAmount.addEventListener('input', this.enableBtn.bind(appData));
                // inputSalaryAmount.addEventListener('input', appData.enableBtn.bind(appData));
                inputPeriodSelect.addEventListener('input',appData.setValuePeriod);
                // inputPeriodSelect.addEventListener('input',appData.setValuePeriod.bind(appData));
                calculateButton.addEventListener('click',appData.start);//работает!!!
                // calculateButton.addEventListener('click',appData.start.bind(appData));//работает!!!
                // btnPlusExpensesAdd.addEventListener('click',appData.addExpensesBlock.bind(appData));
                btnPlusExpensesAdd.addEventListener('click',appData.addExpensesBlock);
                btnPlusIncomeAdd.addEventListener('click',appData.addIncomeBlock);
                depositCheckmark.addEventListener('change',this.depositHandler.bind(appData));
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
    

 } 


  const appData = new AppData();
  appData.eventsListeners();
  console.log('appData: ', appData);





