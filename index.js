#! bin/usr/env node
import inquirer from "inquirer";
;
let users = [
    {
        userID: "anas",
        userPin: 1234,
    },
    {
        userID: "hamza",
        userPin: 4321,
    }
];
let balance = Math.floor((Math.random() * 100000));
let answers1;
let answers2;
startLoop();
async function startLoop() {
    await getUserID();
    do {
        await getTransaction();
        var again = await inquirer.prompt([
            {
                type: "list",
                name: "restart",
                choices: ['yes', 'no'],
                message: "do you want to continue"
            }
        ]);
    } while (again.restart == 'yes');
}
async function getUserID() {
    answers1 = await inquirer.prompt([
        {
            type: "input",
            name: "userID",
            message: "enter your username:"
        },
        {
            type: "number",
            name: "userPin",
            message: "enter your 4 Digit Pin:"
        },
    ]);
    await checkUserID(answers1.userID, answers1.userPin);
}
async function checkUserID(userID, userPin) {
    let condition = false;
    for (let i = 0; i < users.length; i++) {
        if (userID === users[i].userID && userPin === users[i].userPin) {
            condition = true;
            break;
        }
    }
    if (!condition) {
        console.log(`Invalid user ID or Pin. Try again.`);
        await getUserID();
    }
}
async function getTransaction() {
    answers2 = await inquirer.prompt([
        {
            type: "list",
            name: "accountType",
            choices: ["current", "saving"],
            message: "select your account type:"
        },
        {
            type: "list",
            name: "transactionType",
            choices: ["FastCash", "withdrawl"],
            message: "select your transaction type",
        },
        {
            type: "list",
            name: "amount",
            choices: [1000, 5000, 10000, 50000],
            message: "select your amount",
            when(answers2) {
                return answers2.transactionType == "FastCash";
            }
        },
        {
            type: "number",
            name: "amount",
            message: `enter your amount"(current balance is ${balance}):`,
            when(answers2) {
                return answers2.transactionType == "withdrawl";
            }
        }
    ]);
    if (answers1.userID && answers1.userPin) {
        if (answers2.amount <= balance) {
            balance -= answers2.amount;
            console.log(`your current balance is: ${balance}`);
        }
        else {
            console.log(`Insuficient Balance ${balance}`);
        }
    }
}
