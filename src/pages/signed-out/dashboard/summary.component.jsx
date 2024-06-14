import React, { useEffect, Fragment } from "react";
import BankingSummary from "../../../components/signed-out/summary/banking/banking-summary.component";
import InvestmentsSummary from "../../../components/signed-out/summary/investments/investments-summary.component";
import SavingsSummary from "../../../components/signed-out/summary/savings/savings-summary.component";

// import { BankingContext } from "../../../contexts/signed-out/banking/banking.context";
// import { InvestmentsContext } from "../../../contexts/signed-out/investments/investments.context";
// import { SavingsContext } from "../../../contexts/signed-out/savings/savings.context";
// import { DashboardContext } from "../../../contexts/signed-out/dashboard/dashboard.context";

import "./summary.styles.scss";
import ExpensesSummary from "../../../components/signed-out/summary/expenses/expenses.component";
// import { ExpensesContext } from "../../../contexts/signed-out/expenses/expenses.context";
import ChatBot from "../../shared/chatbot/chatbot.component";

import { useDispatch, useSelector } from "react-redux";
import { selectSummaries } from "../../../store/signed-out/dashboard/dashboard.selector";
import { selectExpenses, selectExpensesSummary } from "../../../store/signed-out/expenses/expenses.selector";
import { selectBankingAccounts, selectBankingSummary } from "../../../store/signed-out/banking/banking.selector";
import { selectInvestments, selectInvestmentsSummary } from "../../../store/signed-out/investments/investments.selector";
import { selectSavingsAccounts, selectSavingsAccountsSummary } from "../../../store/signed-out/savings/savings.selector";
import { setSummaries, setUserSummary } from "../../../store/signed-out/dashboard/dashboard.action";

const Summary = () => {
  // const { summaries } = useContext(DashboardContext);
  // const { expenses } = useContext(ExpensesContext)
  // const { bankingAccounts } = useContext(BankingContext);
  // const { investments } = useContext(InvestmentsContext);
  // const { savingsAccounts } = useContext(SavingsContext);
  const dispatch = useDispatch()

  const summaries = useSelector(selectSummaries)
  const expenses = useSelector(selectExpenses)
  const bankingAccounts = useSelector(selectBankingAccounts)
  const investments = useSelector(selectInvestments)
  const savingsAccounts = useSelector(selectSavingsAccounts)

  const expensesSummary = useSelector(selectExpensesSummary)
  const bankingSummary = useSelector(selectBankingSummary)
  const investmentsSummary = useSelector(selectInvestmentsSummary)
  const savingsAccountsSummary = useSelector(selectSavingsAccountsSummary)

  useEffect(() => {
    // updating summaries
    dispatch(setSummaries({
      expensesSummary: expensesSummary,
      bankingSummary: bankingSummary,
      investmentsSummary: investmentsSummary,
      savingsAccountsSummary: savingsAccountsSummary,
    }))
  }, [expensesSummary, bankingSummary, investmentsSummary, savingsAccountsSummary, dispatch]);

  useEffect(() => {
    // updating userSummary if user is signed in
    dispatch(setUserSummary({
      expenses: expenses,
      bankingAccounts: bankingAccounts,
      investments: investments,
      savingsAccounts: savingsAccounts
    }))
  }, [expenses, bankingAccounts, investments, savingsAccounts, dispatch]);

  return (
    <Fragment>
      <ChatBot></ChatBot>
      {
        (expenses.length === 0 && bankingAccounts.length === 0 && investments.length === 0 && savingsAccounts.length === 0 ) ? 
        <div className="empty-dashboard-container">
          <h2>Nothing yet in the dashboard, track some finance to get started!</h2>
        </div>
        :
        <div className="accounts-summary-dashboard-container">
          {
            expenses.length !== 0 ? 
            <Fragment>
              <ExpensesSummary></ExpensesSummary> 
            </Fragment>
            : null
          }
          
          {/* <h1>Summary</h1> */}

          <div className="summary-dashboard-container">
            {
              bankingAccounts.length !== 0 && 
              <div className="summary-dashboard-banking-container">
                <h4>{`Total Banking Balance - $${summaries.bankingSummary.currentAllBankingBalance}`}</h4>
                <h4>{`Total In - $${summaries.bankingSummary.totalAllBankingIn}`}</h4>
                <h4>{`Total Out - $${summaries.bankingSummary.totalAllBankingOut}`}</h4>
              </div>
            }
            {
              investments.length !== 0 &&
              <div className="summary-dashboard-investments-container">
                <h4>{`Total Investments Balance - $${summaries.investmentsSummary.currentAllInvestmentsBalance}`}</h4>
                <h4>{`Total Contribution - $${summaries.investmentsSummary.totalAllContribution}`}</h4>
                <h4>{`Total Interest - $${summaries.investmentsSummary.totalAllInterest}`}</h4>
              </div>
            }
            {
              savingsAccounts.length !== 0 &&
              <div className="summary-dashboard-savings-container">
                <h4>{`Total Savings Balance - $${summaries.savingsAccountsSummary.currentAllSavingsAccountsBalance}`}</h4>
                <h4>{`Total Contribution - $${summaries.savingsAccountsSummary.totalAllContribution}`}</h4>
                <h4>{`Total Interest - $${summaries.savingsAccountsSummary.totalAllInterest}`}</h4>
              </div>
            }
          </div>

          <div className="dashboard-accounts-summary-container">
            
            {
              bankingAccounts.length !== 0 && <BankingSummary></BankingSummary>
            }
            {
              investments.length !== 0 && <InvestmentsSummary></InvestmentsSummary>
            }
            {
              savingsAccounts.length !== 0 && <SavingsSummary></SavingsSummary>
            }
          </div>
            
        </div>
      }
    </Fragment>
  );
};

export default Summary;