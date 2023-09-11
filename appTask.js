const readline = require('readline');
const fs = require('fs');
//const chalk =require('chalk');

//interface for users input and output
 const rl = readline.createInterface ({
    input:process.stdin,
    output:process.stdout
});


let task =[];

//readline Interface(fuction to get user input)
function getUserInput (input) {
    return new Promise((resolve) => {
        rl.question(input,(answer)=> {
            resolve(answer.trim());
        });
        
    });
}

//Task Management
//function to add task
function addTask (description){
    task.push({description, completed: false});
} 

function  markTaskComplete(taskIndex){
    if (taskIndex >=0 &&taskIndex < task.lenght){
        task [taskIndex].completed =true;
    }
}

//viewing the list of tasks
function displayTaskList(){
    console.log("Task:");
    task.forEach ((task, index) => {
        const status = task.completed? ("[x] ") :("[ ]");
        console.log(`${index + 1}. ${status} ${task.description}`);
    });
}

//function for handling file

async function saveTaskToFile(){
    try{
        const data = Json.stringify(task, null, 2  );
        await fs.promises.writeFile ('tasks.json', data);
        console.log("Task saved to tasks.json.");
    }catch (err) {
        console.error('Error saving tasks to file:,  err');
    }
    }

    async function loadTaskFromFile(){ 
        try{
            const data = await fs.promises.readFile('tasks.json','utf8');
            task = JSON.parse(data);
            console.log ('Task loaded from tasks.json.');
        }catch(err){
            console.error("Error loading Task from files: " + err);
        }
    }


    async function main(){
        await loadTaskFromFile();

        while (true){
            console.log("n\Options:");
            console.log("1. Add Task");
            console.log("2. Mark Task as complete");
            console.log("3. View Tasks");
            console.log("4. Save Tasks to File");
            console.log("5. Exit");

            const choice = await getUserInput('Enter your choice:');

            switch(choice){
                case "1":
                    const taskDescription = await getUserInput("Enter Your description:");
                    addTask(taskDescription);
                    break;
                case "2":
                    const taskIndex = parseInt (await getUserInput("Enter task index to mark as complete:")) - 1 ;
                    markTaskComplete(taskIndex);
                    break;

                    case "3":
                        displayTaskList();
                        break;
                    
                    case "4":
                        await saveTaskToFile();
                        break;

                    case "5":
                        console.log ("Exiting.");
                        rl.close();   
                        return;
                        
                        default:
                        console.log("Invalid choice. please try again.");
         }
        }
    }
        //Testing
        main();
