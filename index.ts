#! /usr/bin/env node

import inquirer from "inquirer";

// Bank Account Interface

interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

class BankAccounts implements BankAccount {
    accountNumber:number;
    balance:number

constructor(accountNumber:number,  balance:number ) {
    this.accountNumber = accountNumber;
    this.balance = balance
}

// Debit Money
withdraw(amount: number): void {
    if(this.balance >= amount){
        this.balance -= amount
        console.log(`Withraw of $${amount} Successfully. Remaining Balance: $${this.balance}`);
    } else {
        console.log("Insufficient Balance");
    }
}

// Credit Money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1   // $1 Fee charged if more then $100 is deposited
    } this.balance += amount
        console.log(`Deposit of $${amount} successfully. Remaining Balance: $${this.balance}`);
}

// Check Balance

checkBalance(): void {
    console.log(`current Balance $${this.balance}`);
}
}

// customer class

class customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber:number;
    account: BankAccounts

constructor(  firstName: string,   lastName: string,  gender: string,     age: number,  mobileNumber:number,    account: BankAccounts){
    this.firstName = firstName
    this.lastName = lastName
    this.gender = gender
    this.age = age
    this.mobileNumber = mobileNumber
    this.account = account
}

}

// creat Bank Account

const accounts: BankAccounts[] = [
    new BankAccounts (1001, 1000),
    new BankAccounts (1002, 3000),
    new BankAccounts (1003, 5000),
    new BankAccounts (1004, 10000)
];

// creat customers

const customers:customer[] = [
    new customer("Owais", "Ahsan", "Male", 26, 3107653790, accounts[0]),
    new customer("Zaheer", "Ahmed", "Male", 30, 3017653790, accounts[1]),
    new customer("Aqsa", "Ejaz", "Female", 26, 3417653790, accounts[2]),
    new customer("Anabiya", "Naz", "Female", 26, 3307653790, accounts[3]),
]
async function services(){
    do{
        const accountNumberInput = await inquirer.prompt(
            [
                {
                    name: "accountNumber",
                    type: "number",
                    message: "Enter Account Number"
    
                }
            ]
        )

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if(customer){
            console.log(`Welcome ${customer.firstName} ${customer.lastName}`);
           
            const ans = await inquirer.prompt(
                [
                    {
                        name: "Select",
                        type: "list",
                        message: "Select an option",
                        choices: ["Withdraw", "Deposit", "Check Balance", "Exit"]
                    }
                ]
            );

            switch(ans.Select){
                case "Withdraw":
                
                let withdrawAmount = await inquirer.prompt(
                    [
                        {
                            name: "Amount",
                            type: "number",
                            message: "Enter the amount to Withdraw"
                        }
                    ]
                )
                customer.account.withdraw(withdrawAmount.Amount);
                break;

                case "Deposit":
                
                let depositAmount = await inquirer.prompt(
                    [
                        {
                            name: "Amount",
                            type: "number",
                            message: "Enter the amount to deposit"
                        }
                    ]
                )
                customer.account.deposit(depositAmount.Amount);
                break;

                case "Check Balance":
                    customer.account.checkBalance();
                    break;

                case "Exit":
                    console.log("Exiting...");
                    console.log("\n Thank you for using our services");
                    return;
                    
                    

            }

            

        }else {
            console.log("Invalid Account Number. Please try again.")
        }
    } while(true)
    
} 

services()














