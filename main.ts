import inquirer from 'inquirer';
import chalk from 'chalk';

class BankAccount {
  private balance: number = 0;
  private transactions: string[] = [];

  constructor(
    private accountNumber: string,
    private accountHolder: string,
    private accountType: string = 'Checking'
  ) {}

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      this.transactions.push(`Deposited $${amount}`);
      console.log(chalk.green(`Deposited $${amount}`));
    } else {
      console.log(chalk.red('Invalid amount.'));
    }
  }

  withdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      this.transactions.push(`Withdrawn $${amount}`);
      console.log(chalk.green(`Withdrawn $${amount}`));
    } else {
      console.log(chalk.red('Invalid amount or insufficient balance.'));
    }
  }

  getBalance(): void {
    console.log(chalk.blue(`Account balance: $${this.balance}`));
  }

  viewTransactions(): void {
    console.log(chalk.yellow('\nTransaction History:'));
    this.transactions.forEach(transaction => console.log(transaction));
  }
}

async function manageAccount(): Promise<void> {
  console.log(chalk.cyan('\t\t\t 💼💰  Welcome to MyBank!!.. 💼💰 \n'));

  const accountInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'accountNumber',
      message: 'Enter your account number:',
    },
    {
      type: 'input',
      name: 'accountHolder',
      message: 'Enter your account holder name:',
    },
    {
      type: 'list',
      name: 'accountType',
      message: 'Select your account type:',
      choices: ['Checking', 'Savings'],
    },
  ]);

  const bankAccount = new BankAccount(
    accountInput.accountNumber,
    accountInput.accountHolder,
    accountInput.accountType
  );

  const actions: string[] = [
    'Deposit funds',
    'Withdraw funds',
    'View account balance',
    'View transaction history',
    'Exit',
  ];

  const actionChoice = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedAction',
      message: 'Select an action:',
      choices: actions,
    },
  ]);

  switch (actionChoice.selectedAction) {
    case actions[0]:
      const depositInput = await inquirer.prompt([
        {
          type: 'input',
          name: 'amount',
          message: 'Enter the amount to deposit:',
          validate: (value: string) => parseFloat(value) >= 0 || 'Please enter a valid amount',
        },
      ]);
      bankAccount.deposit(parseFloat(depositInput.amount));
      break;
    case actions[1]:
      const withdrawInput = await inquirer.prompt([
        {
          type: 'input',
          name: 'amount',
          message: 'Enter the amount to withdraw:',
          validate: (value: string) =>
            parseFloat(value) >= 0 || 'Please enter a valid amount',
        },
      ]);
      bankAccount.withdraw(parseFloat(withdrawInput.amount));
      break;
    case actions[2]:
      bankAccount.getBalance();
      break;
    case actions[3]:
      bankAccount.viewTransactions();
      break;
    case actions[4]:
      console.log(chalk.cyan('\t\t\t 💼🙏Thank you for using MyBank. Goodbye!💼🙏'));
      return;
  }

  manageAccount();
}

manageAccount();
