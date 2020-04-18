import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(income => income.value)
      .reduce((value, currentValue) => value + currentValue, 0);

    const totalOutcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(income => income.value)
      .reduce((value, currentValue) => value + currentValue, 0);

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    return balance;
  }

  public create({ title, type, value }: Transaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
