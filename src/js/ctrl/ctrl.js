let myPowerbank;
let myView;
let data = {};

class Controller {
    static ctrlAdd () {
        // Gets info from input fields
        let info = myView.getInfo();

        // Creates and returns new instance
        let newObj = myPowerbank.addItem(info);

        // Displays new post on page
        myView.addPost(newObj);
        
        // Clears input fields
        myView.clearFields();

        // Updates energy
        Controller.updateEnergy();
    }

    static updateEnergy () {

    }

    static setupEventListeners () {
        const DOMstrings = myView.getDOMstrings();

        //Listens to click on save button when adding new post
        document.querySelector(DOMstrings.save).addEventListener('click', function () {
            Controller.ctrlAdd(); 
        });
    }

    static initialize () {
        //Creates Powerbank/Model instance
        myPowerbank = new Powerbank();

        //Creates View instance
        myView = new View();

        // Adds EventListeners
        Controller.setupEventListeners();
    }
}

//Starter
Controller.initialize();