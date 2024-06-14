import { errorOnInvalidExpenseForAndCategory, errorOnInvalidExpenseCost,
  errorOnStartDateBeforeEndDate
 } from "../errors/expenses.error"

// expenses validation functions

// TODO: include underscores to be approved
export const validateAddExpense = (expense) => {
  // validating if expenseFor and expenseCategory are valid
  if ((expense.expenseFor && !(/^[A-Za-z0-9]*$/.test(String(expense.expenseFor)))) || 
    (expense.expenseCategory && !(/^[A-Za-z0-9]*$/.test(String(expense.expenseCategory))))) {
    errorOnInvalidExpenseForAndCategory()
    return true;
  }

  // validating if expenseCost is valid
  if (!(/^[0-9]*$/.test(String(expense.expenseCost))) || Number(expense.expenseCost) < 0) {
    errorOnInvalidExpenseCost()
    return true
  }

  return false
}

export const validateFilterExpenses = (filterConditions) => {
  // validating if expenseFor and expenseCategory are valid
  if ((filterConditions.expenseFor && !(/^[A-Za-z0-9]*$/.test(String(filterConditions.expenseFor)))) || 
    (filterConditions.expenseCategory && !(/^[A-Za-z0-9]*$/.test(String(filterConditions.expenseCategory))))) {
    errorOnInvalidExpenseForAndCategory()
    return true
  }

  // validating if startDate > endDate
  if (filterConditions.expensesStartDate && filterConditions.expensesEndDate && filterConditions.expensesStartDate > filterConditions.expensesEndDate) {
    errorOnStartDateBeforeEndDate()
    return true
  }

  return false
}

export const validateRemoveExpense = (expenseId) => {
  return false
}