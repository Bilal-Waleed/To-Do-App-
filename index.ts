#!/usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
//1) first asking username  
//2) todos array
//3) functions 
//4) operaions

//----------------------------ASKING USER NAME-----------------------------------

const askUserName = async () => {
const userName_ans = await inquirer.prompt({
    name: "usr_name",
    type: "input",
    message: chalk.magenta(`\nWhat is Your Good Name:`),
    validate: (input) => {
        const trimmedInput = input.trim();
        if (trimmedInput === "") 
            {
          return chalk.redBright("Please enter your name.");
        }
        else if (!/^[a-zA-Z]+$/.test(trimmedInput)) 
            {
            return chalk.redBright("Please enter a valid name without numbers.");
        }
        return true;
      },
    });
    return userName_ans.usr_name;
  };

let todos : string[] = [];
async function createTodos (todos: string[]){
    const userName = await askUserName();

//-------------------------TO-DO LIST HEADING -------------------------

let appName : string = chalk.magenta.underline.italic(` Welcome "${userName}" in TO-DO List: `);
console.log(`\n\t`,`\t`,`\t`,`${appName}\n`);
    
 //-------------------------- MAIN FUNCTION ---------------------------------

        let useTodo = true;
        while(useTodo){
        let ans = await inquirer.prompt({
            name: `select`,
            type: `list`,
            message: `Select an operation:`,
            choices:[`Add`,`Update`,`View`,`Delete`] 
        }); 

 //------------------------ ADD ITEM ----------------------------------------

        if(ans.select == `Add`){
            let addTodo = await inquirer.prompt({
                name: `addNew`,
                type: `input`,
                message: `Add items...`,
                validate: (input) => {
                    if (input.trim() === ``) {
                      return chalk.redBright("Please enter something.");
                    }
                    return true;
                  },
            }); 
                todos.push(addTodo.addNew);
                console.log(chalk.yellow.underline(`\n\t Item Added:  ${todos.join(` , `)}\n`))
        }  

 //---------------------------UPDATE ITEM --------------------------------------

        if(ans.select == `Update`){
            let updateTodo = await inquirer.prompt({
                name: `todo`,
                type: `list`,
                message: `Select item for update:`,
                choices: todos.map(item => item)
            });
            let addTodo = await inquirer.prompt({
                name: `addNew`,
                type: `input`,
                message: `Add item for update...`,
                validate: (input) => {
                    if (input.trim() === ``) {
                      return chalk.redBright("Please enter something.");
                    }
                    return true;
                  },
            });
                let newTodos = todos.filter(item => item !== updateTodo.todo);
                todos = [...newTodos,addTodo.addNew];    
                console.log(chalk.yellow.underline(`\n\t Item Updated: ${todos.join(` , `)}\n`));
        }

 //-----------------------------VIEW ITEM ------------------------------------

        if(ans.select == `View`){
            console.log(chalk.yellow.underline(`\n\t Curent list status: ${todos.join(` - `)}\n`));
        }

 //-----------------------------DELETE ITEM -------------------------------------

        if(ans.select == `Delete`){
            let deleteTodo = await inquirer.prompt({
                name: `todo`,
                type: `list`,
                message: `Select item for Delete:`,
                choices: todos.map(item => item)
            });
            let newTodos = todos.filter(val => val !== deleteTodo.todo);
            todos = [...newTodos]; 
            console.log(chalk.redBright.underline(`\n\t Item Deleted: ${deleteTodo.todo}`));
            console.log(chalk.yellow.underline(`\n\t Remaining Items: ${todos.join(` , `)}\n`));
        } 


           const confirmation_ans = await inquirer.prompt({
           name: `user_confirmation`,
           type: `confirm`,
           message: chalk.red.bold(`Do you want to use TO-DO list more..? `),
           default: true, 
        });

        if (confirmation_ans.user_confirmation == false){
        useTodo = false;
    }
} 
        console.log(chalk.yellow.underline(
          "\n\t Thank you for using the TO-DO LIST. Have a great day!"
        ));
        let develporName = chalk.magenta.underline` BILAL WALEED `;
        console.log(chalk.magenta(`\n\t`,`\t`,`\t`,`Developer Name: ${develporName}`));
        process.exit();
    
}
createTodos(todos);