import React, { createContext, useContext, useState } from "react";
import { transactionsData } from "./data";

const TransactionContext = createContext();

export const useTransaction = () => {
  return useContext(TransactionContext);
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(transactionsData);

  
  const updateTransaction = (transaction) => {
    setTransactions(transaction);
  };


  return (
    <TransactionContext.Provider
      value={{
        transactions,
        updateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
