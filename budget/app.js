/*
 * @Author: Hebe-Liu
 * @Date:   2019-10-28 18:17:26
 * @Last Modified by:   Hebe-Liu
 * @Last Modified time: 2019-11-19 17:05:00
 */
class UI {
    constructor() {

        this.budgetInput = document.getElementById('budget-input');
        this.titleInput = document.getElementById('title-input');
        this.expenseInput = document.getElementById('expense-input');
        this.budgetForm = document.getElementById('budget-form');
        this.expenseForm = document.getElementById('expense-form');
        this.budgetFeedback = document.querySelector('.budget-feedback');
        this.expenseFeedback = document.querySelector('.expense-feedback');
        this.budgetAmount = document.getElementById('budget-amount');
        this.balanceAmount = document.getElementById('balance-amount');
        this.expenseAmount = document.getElementById('expense-amount');
        this.expenseList = document.querySelector('.expense-list');
        this.itemId = 0;
        this.itemList = [];
    }

    //submit budget form
    submitBudgetForm() {
        const budgetValue = this.budgetInput.value;
        if (budgetValue === '' || budgetValue < 0) {
            this.budgetFeedback.classList.add('showItem');
            this.budgetFeedback.innerHTML = `Budget Cannot Be Empty Or Negative`;
            const self = this;
            setTimeout(() => self.budgetFeedback.classList.remove('showItem'), 3000);
        } else {
            this.budgetAmount.textContent = budgetValue;
            this.budgetInput.value = '';
            this.showBalance();
        }
    }


    //show balance
    showBalance() {
        const expense = this.totalExpense();
        const balance = parseInt(this.budgetAmount.textContent) - expense;
        this.balanceAmount.textContent = balance;
        if (balance < 0) {
            this.balanceAmount.classList.remove('showGreen');
            this.balanceAmount.classList.add('showRed');
        } else if (balance > 0) {
            this.balanceAmount.classList.remove('showRed');
            this.balanceAmount.classList.add('showGreen');
        } else {
            this.balanceAmount.classList.remove('showGreen', 'showRed');
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
            setTimeout(() => self.expenseFeedback.classList.remove('showItem'), 3000);
        } else if (expenseValue === '' || expenseValue < 0) {
            this.expenseFeedback.classList.add('showItem');
            this.expenseFeedback.innerHTML = `Expenses Amount Cannot Be Empty Or Negative`;
            const self = this;
            setTimeout(() => self.expenseFeedback.classList.remove('showItem'), 3000);
        } else {

            this.titleInput.value = '';
            this.expenseInput.value = '';
            let expense = {
                id: this.itemId,
                title: expenseTitle,
                amount: parseInt(expenseValue),
            }
            this.itemId++;
            this.itemList.push(expense);
            this.addExpense(expense);
            this.showBalance();

        }

    }


    addExpense(expense) {
        const div = document.createElement('div');
        div.innerHTML = `<div class="row">
                    <span class="col-md-4">${expense.title}</span>
                    <span class="col-md-4">${expense.amount}</span>
                    <div class="col-md-2" style="text-align: center;">
                        <a href="#" class="edit-icon material-icons" data-id=${expense.id}>create</a>
                        <a href="#" class="delete-icon material-icons" data-id=${expense.id}>clear</a>
                    </div>`;
        this.expenseList.appendChild(div);
    }


    totalExpense() {
        let total = 0;
        if (this.itemList.length > 0) {
            total = this.itemList.reduce((acc, curr) => { acc += curr.amount; return acc; }, 0);
        }
        this.expenseAmount.textContent = total;
        return total;
    }

    editExpense(element) {
        let id = parseInt(element.dataset.id);
        const parent = element.parentElement.parentElement.parentElement;

        // remove from dom
        this.expenseList.removeChild(parent);


        let expense = this.itemList.filter(function(item) {
            return item.id === id;
        })

        this.titleInput.value = expense[0].title;
        this.expenseInput.value = expense[0].amount;

        // remove from list
        let tempList = this.itemList.filter(function(item) {
            return item.id !== id;
        })
        this.itemList = tempList;

        this.showBalance();

    }

    deleteExpense(element) {
        let id = parseInt(element.dataset.id);

        // remove from dom
        const parent = element.parentElement.parentElement.parentElement;
        this.expenseList.removeChild(parent);

        // remove from list
        let tempList = this.itemList.filter(function(item) {
            return item.id !== id;
        })
        this.itemList = tempList;

        this.showBalance();
    }
}

function eventListeners() {

    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.querySelector('.expense-list');

    const ui = new UI();

    budgetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        ui.submitBudgetForm();

    })

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        ui.submitExpenseForm();

    })

    expenseList.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-icon')) {
            ui.editExpense(event.target);
        } else if (event.target.classList.contains('delete-icon')) {
            ui.deleteExpense(event.target);
        }
    })

}

document.addEventListener('DOMContentLoaded', () => {
    eventListeners();
})