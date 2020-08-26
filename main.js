//tasker object
let tasker = {

    construct: function(){
        this.selectElements();
        this.bindEvents();
        this.scanTaskList();
    },

    //Creating properties(html elements) by selecting document objects elements with document.getElemementById()method
    selectElements: function () {
        //selecting the input field
        this.taskInput = document.getElementById("input-task");
        //selecting  the entire tasklist
        this.taskList = document.getElementById("tasks");
        //selecting the items on the task list 
        this.taskListChildren = this.taskList.children;

        //selecting add button on the item
        this.addButton = document.getElementById("add-task-btn");

        //selecting the error message if task input field is empty
        this.errorMessage = document.getElementById("error");

    },
    // Creating or building a structure for a single task item

    buildTask: function () {
        //1.variables for a task item
        let taskListItem, taskCheckBox, taskValue, taskDeleteButton, taskTrash;

        //k2.list item
        taskListItem = document.createElement("li");
        taskListItem.setAttribute("class", "task");
        //checkBox item

        taskCheckBox = document.createElement("input");
        taskCheckBox.setAttribute("type", "checkbox");

        //creating task value
        taskValue = document.createTextNode(this.taskInput.value);

        //delete button
        taskDeleteButton = document.createElement("button");
        taskDeleteButton.setAttribute("class", "delete-task-btn");

        //trash icon
        taskTrash = document.createElement("i");
        taskTrash.setAttribute("class", "fa fa-trash");

        //Append trash icon into delete button
        taskDeleteButton.appendChild(taskTrash);

        //Append all elements to tasklist
        taskListItem.appendChild(taskCheckBox);
        taskListItem.appendChild(taskValue);
        taskListItem.appendChild(taskDeleteButton);

        // Append tasklistitem to the tasklist

        this.taskList.appendChild(taskListItem);

    },
    //Display an error if you try to enter an empty task

    error: function () {
        this.errorMessage.style.display = "block";

    },

    //Method that actually adds the task

    addTask: function () {

        //declare and initilize task value 
        let taskValue = this.taskInputValue;
        this.errorMessage.style.display = "none";//default value of error message

        if (taskValue === "") {
            this.error();
        } else {
            this.buildTask();
            this.taskInput.value = "";//reset task value to empty
            this.scanTaskList(); //event  listeners for task item buttons
        }

    },

    //method on enterkey event

    enterKey: function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            this.addTask();
        }
    },

    //Method that binds  events

    bindEvents: function () {

        // a. addButton() onclick event to addTask()
        this.addButton.onclick = this.addTask.bind(this);

        // b. enterkey() onkeypress event to taskInput()
        this.taskInput.onkeypress = this.enterKey.bind(this);

    },


    scanTaskList: function () {
        let taskListItem, checkBox, deleteButton;

        //loop through all list elements
        for (i = 0; this.taskListChildren.length; i++) {
            //conter for each task list item
            taskListItem = this.taskListChildren[i];
            //select checkBox and delete button
            checkBox = taskListItem.getElementByTagName("input")[0];
            deleteButton = taskListItem.getElementById("delete-task-btn")[0];
        }

        //bind onclick event to check box
        checkBox.onclick = this.completeTask.bind(this,taskListItem, checkBox);


        //add click event to the delete button
        deleteButton.onclick = this.deleteTask.bind(this,i);


    },

    deleteTask: function(i){

    this.taskListChildren[i].remove();
    this.scanTaskList();
    },


    completeTask: function(taskListItem, checkBox){

        if(checkBox.checked){
            taskListItem.className ="task completed";
        }else{
            this.incompleteTask(taskListItem);
        }


    },
    
    incompleteTask: function(taskListItem){
        taskListItem.className ="task";

    }






}