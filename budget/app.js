/*
 * @Author: Hebe-Liu
 * @Date:   2019-10-28 18:17:26
 * @Last Modified by:   Hebe-Liu
 * @Last Modified time: 2019-11-05 20:29:11
 */
class UI {
    constructor(){

        this.budgetInput = document.getElementById('budget-input');
        this.titleInput = document.getElementById('title-input');
        this.expenseInput = document.getElementById('expense-input');
        this.budgetForm = document.getElementById('budget-form');
        this.expenseForm = document.getElementById('expense-form');
        this.budgetFeedback = document.querySelector('.budget-feedback');
        this.expenseFeedback = document.querySelector('.expense-feedback');
    }

    //submit budget form
    submitBudgetForm(){
    	const budgetValue = this.budgetInput.value;
    	if (budgetValue === ''|| budgetValue < 0){
            this.budgetFeedback.classList.add('showItem');
    		this.budgetFeedback.innerHTML = `Budget Cannot Be Empty Or Negative`;
            const self = this;
            setTimeout(()=>self.budgetFeedback.classList.remove('showItem'), 3000);
    	}
    }

    //submit expense form
    submitExpenseForm() {
        const expenseTitle = this.titleInput.value;
        const expenseValue = this.expenseInput.value;
      	 if (expenseTitle === '') {
            this.expenseFeedback.classList.add('showItem');
        	this.expenseFeedback.innerHTML = `Expenses Cannot Be Empty`;
            const self = this;
            setTimeout(()=>self.expenseFeedback.classList.remove('showItem'), 3000);
        } else if (expenseValue ==='' || expenseValue < 0) {
            this.expenseFeedback.classList.add('showItem');
        	this.expenseFeedback.innerHTML = `Expenses Amount Cannot Be Empty Or Negative`;
            const self = this;
            setTimeout(()=>self.expenseFeedback.classList.remove('showItem'), 3000);
        }
        
    }

}

function eventListeners() {

    const bugetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');

    const ui = new UI();

    bugetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        ui.submitBudgetForm();

     })     

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        ui.submitExpenseForm();
        
    })

}

document.addEventListener('DOMContentLoaded', () => {
    eventListeners();
})