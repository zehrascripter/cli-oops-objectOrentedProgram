#! /usr/bin/env
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const displayHeading = () => {
    console.log(chalk.bold.blue(`
  ____  _            _     _               _     
 / ___|| |_ ___  ___| |_  | |    ___   ___| | __ 
 \\___ \\| __/ _ \\/ __| __| | |   / _ \\ / __| |/ / 
  ___) | ||  __/ (__| |_  | |__| (_) | (__|   <  
 |____/ \\__\\___|\\___|\\__| |_____\\___/ \\___|_|\\_\\ 
    `));
};
const startCoding = async (persons) => {
    displayHeading();
    do {
        const ans = await inquirer.prompt([
            {
                name: 'select',
                type: 'list',
                message: 'Choose an option to interact with:',
                choices: ['staff', 'student', 'exit']
            }
        ]);
        if (ans.select === 'staff') {
            console.log(`How may I help you? 🤍🤍🤍💛💛💛💙💙💙💜💜💜`);
        }
        else if (ans.select === 'student') {
            const studentAns = await inquirer.prompt([
                {
                    name: 'student',
                    type: 'input',
                    message: 'Enter student name to connect:'
                }
            ]);
            const student = persons.students.find(val => val.name === studentAns.student);
            if (!student) {
                const newStudent = new Student(studentAns.student);
                persons.addStudent(newStudent);
                console.log(`Hey, I'm ${newStudent.name}. How may I help you? 🤍🤍🤍`);
                console.log(chalk.italic.blueBright(`New student added to the list 💙💙💙`));
                console.log(chalk.italic.bold.yellowBright(`New student list 🤍💛💜`));
                console.log(chalk.bold.bgGreenBright(JSON.stringify(persons.students, null, 2)));
            }
            else {
                console.log(chalk.italic.bold.greenBright(`Hey, I'm ${student.name}!! How may I help you again? 💛💛💛`));
                console.log(chalk.italic.bold.bgGrey(`Existing list 💜💜💜`));
                console.log(chalk.bold.bgRedBright(JSON.stringify(persons.students, null, 2)));
            }
        }
        else if (ans.select === 'exit') {
            console.log(chalk.italic.bold.magentaBright(`Goodbye, have a great day! 💛🤍👋🏻👋🏻👋🏻💙💜`));
            process.exit();
        }
    } while (true);
};
startCoding(persons);
