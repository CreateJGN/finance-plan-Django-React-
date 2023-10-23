import { createContext, useState, useEffect, useContext } from "react";

import { validateBankingAccountCreation, validateDepositAmount, 
        validateWithdrawalAmount, validateBankingAccountTransfer } 
from "../../../utils/validations/banking.validation";

import { calculateBankingSummary } from "../../../utils/calculations/banking.calculations";

import { TRANSACTION_TYPES } from "../../../utils/constants/banking.constants";

import { UserContext } from "../../shared/user/user.context";

import { getBankingAccountsData } from "../../../utils/api-requests/banking.requests";

// helper functions

const createBankingAccountHelper = (bankingAccounts, bankingAccountName) => {
  if (validateBankingAccountCreation(bankingAccounts, bankingAccountName)) return bankingAccounts;

  console.log(`Creating ${bankingAccountName}`);

  // add bankingAccount to bankingAccounts
  return [ ...bankingAccounts, 
  { 
    name: bankingAccountName,
    currentBalance: 0,
    totalIn: 0,
    totalOut: 0,
    transactions: [], 
  }]
};

const depositToBankingAccountHelper = (bankingAccounts, bankingAccountName, depositAmount, depositReason) => {
  if (validateDepositAmount(bankingAccounts, bankingAccountName, depositAmount)) return bankingAccounts;

  // update currentBalance, totalIn and transactions in bankingAccounts for bankingAccountName
  const updatedBankingAccounts = bankingAccounts.map((account) => {
    return account.name === bankingAccountName ? 
      { 
        ...account, 
        currentBalance: account.currentBalance + Number(depositAmount), 
        totalIn: account.totalIn + Number(depositAmount),
        transactions: [ 
          ...account.transactions, 
          {
            amount: Number(depositAmount),
            type: TRANSACTION_TYPES.deposit, 
            reason: depositReason,
          }
        ] 
      } : account;
  });

  return updatedBankingAccounts;
};

const withdrawFromBankingAccountHelper = (bankingAccounts, bankingAccountName, withdrawAmount, withdrawReason) => {
  if (validateWithdrawalAmount(bankingAccounts, bankingAccountName, withdrawAmount)) return bankingAccounts;

  // update currentBalance, totalOut and transactions in bankingAccounts for bankingAccountName
  const updatedBankingAccounts = bankingAccounts.map((account) => {
    return account.name === bankingAccountName ?
      {
        ...account,
        currentBalance: account.currentBalance - Number(withdrawAmount),
        totalOut: account.totalOut + Number(withdrawAmount),
        transactions: [ 
          ...account.transactions,
          {
            amount: Number(withdrawAmount), 
            type: TRANSACTION_TYPES.withdrawal,
            reason: withdrawReason,
          } 
        ]
      } : account;
  });

  return updatedBankingAccounts;
};

const transferToBankingAccountHelper = (bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount, transferReason) => {
  // update currentBalance, totalOut, totalIn and transactions in bankingAccountTransferFromName and bankingAccountTransferToName
  if (validateBankingAccountTransfer(bankingAccounts, bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount)) return bankingAccounts;

  // console.log(bankingAccountTransferToName, transferAmount);

  // update bankingAccountTransferFromName and bankingAccountTransferToName in bankingAccounts
  const updatedBankingAccounts = bankingAccounts.map((account) => {
    if (account.name === String(bankingAccountTransferFromName)) {
      return {
        ...account,
        currentBalance: account.currentBalance - Number(transferAmount),
        totalOut: account.totalOut + Number(transferAmount),
        transactions: [
          ...account.transactions,
          {
            amount: Number(transferAmount),
            type: TRANSACTION_TYPES.withdrawalTransfer,
            transferReason: transferReason,
          }
        ]
      }
    }
    
    if (account.name === String(bankingAccountTransferToName)) {
      return {
        ...account,
        currentBalance: account.currentBalance + Number(transferAmount),
        totalIn: account.totalIn + Number(transferAmount),
        transactions: [
          ...account.transactions,
          {
            amount: Number(transferAmount),
            type: TRANSACTION_TYPES.depositTransfer,
          }
        ] 
      }
    }

    return account;
  });

  return updatedBankingAccounts;
};

const closeBankingAccountHelper = (bankingAccounts, bankingAccountName) => {
  // return bankingAccounts without the bankingAccountName
  return bankingAccounts.filter(account => account.name !== bankingAccountName);
};

// set default banking values
const setDefaultBankingValuesHelper = () => {
  console.log("Changing banking to default values")
};

// initial state
export const BankingContext = createContext({
  bankingAccounts: [],
  // bankingAccounts structure:
  // [
  //   {
  //     name: "TD",
  //     currentBalance: 120,
  //     totalIn: 135,
  //     totalOut: -15,
  //     transactions: [
  //       {
  //         amount: 135,
  //         type: "DEPOSIT"
  //       },
  //       {
  //         amount: -15,
  //         type: "WITHDRAW",
  //         reason: "gas",
  //       }
  //     ],
  //   }
  // ]

  createBankingAccount: () => {},
  depositToBankingAccount: () => {},
  withdrawFromBankingAccount: () => {},
  transferToBankingAccount: () => {},
  closeBankingAccount: () => {},

  bankingSummary: {},
  // bankingSummary structure:
  // {
  //   currentAllBankingBalance: 105,
  //   totalAllBankingIn: 120,
  //   totalAllBankingOut: -15,
  // }

  setDefaultBankingValues: () => {},
});

// context component
export const BankingProvider = ({ children }) => {
  const [bankingAccounts, setBankingAccounts] = useState([]);
  const [bankingSummary, setBankingSummary] = useState({});

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const bankingSummary = calculateBankingSummary(bankingAccounts);

    console.log(bankingAccounts);

    setBankingSummary({ 
      currentAllBankingBalance: bankingSummary.newAllBankingBalance, 
      totalAllBankingIn: bankingSummary.newAllBankingIn, 
      totalAllBankingOut: bankingSummary.newAllBankingOut });
  }, [bankingAccounts]);

  useEffect(() => {
    async function fetchData() {
      if (currentUser) {
        await getBankingAccountsData(currentUser.uid, currentUser.email);
        console.log(currentUser.uid, currentUser.email);
      } else if (!currentUser) {
        setDefaultBankingValues();
      }
    }
    fetchData();
  }, [currentUser]);

  const createBankingAccount = (bankingAccountName) => {
    setBankingAccounts(createBankingAccountHelper(bankingAccounts, bankingAccountName));
  };

  const depositToBankingAccount = (bankingAccountName, depositAmount, depositReason) => {
    setBankingAccounts(depositToBankingAccountHelper(bankingAccounts, bankingAccountName, depositAmount, depositReason));
  };

  const withdrawFromBankingAccount = (bankingAccountName, withdrawAmount, withdrawReason) => {
    setBankingAccounts(withdrawFromBankingAccountHelper(bankingAccounts, bankingAccountName, withdrawAmount, withdrawReason));
  };

  const transferToBankingAccount = (bankingAccountTransferFromName, bankingAccountTransferToName, transferAmount, transferReason) => {
    setBankingAccounts(transferToBankingAccountHelper(bankingAccounts, bankingAccountTransferFromName, 
                                                      bankingAccountTransferToName, transferAmount, transferReason));
  };

  const closeBankingAccount = (bankingAccountName) => {
    setBankingAccounts(closeBankingAccountHelper(bankingAccounts, bankingAccountName));
  };

  // set default banking values
  const setDefaultBankingValues = () => {
    setDefaultBankingValuesHelper();
  };

  const value = { bankingAccounts, createBankingAccount, depositToBankingAccount, 
    withdrawFromBankingAccount, transferToBankingAccount, closeBankingAccount, bankingSummary,
    setDefaultBankingValues };

  return (
    <BankingContext.Provider
      value={ value }>
      { children }
    </BankingContext.Provider>
  );
};