let myPowerbank;
let myView;

class Controller {
    static ctrlAdd () {
        // Gets info from input fields
        const info = myView.getInfo();

        //Checks if the properties have 'truthy values' (not null, empty string, etc.)
        if (info.title && Number.isInteger(info.energy) && info.desc && info.date) {
            // Creates and returns new instance
            const newObj = myPowerbank.addItem(info);

            // Displays new post on page
            myView.addPost(newObj);

            //Saves to Local Storage
            myPowerbank.saveAll();
            
            // Clears input fields
            myView.clearFields();

            // Updates energy
            Controller.updateEnergy();
        }
        else {
            console.log('ERROR in info from input fields!');
        }
    }

    static updateEnergy () {
        //Calculates energy
        const energyPercent = myPowerbank.calcEnergyPercent();

        //Displays energy on page
        myView.displayEnergy(energyPercent);

        //Sets timer for next update
        setTimeout(Controller.updateEnergy, myPowerbank.calcNextTimer());
    }

    static ctrlLoad () {
        //Loads from localStorage to the data object
        myPowerbank.loadAll();

        //Gets the posts from the data object
        const posts = myPowerbank.getPosts();

        // Adds posts to view
        posts.forEach(item => {
            myView.addPost(item);
        });
    }

    static ctrlSetDay () {
        //Sets times for start of day and end of day (07:00 - 23:00)
        let startTime = new Date();
        startTime.setHours(7, 0, 0, 0);

        let endTime = new Date();
        endTime.setHours(23, 0, 0, 0)

        myPowerbank.setDay(startTime, endTime);

        //Calculates interval for 1% of time between start of day and end of day
        myPowerbank.calcInterval();
    }

    static setupEventListeners () {
        const DOMstrings = myView.getDOMstrings();

        //Listens to click on save button when adding new post
        document.querySelector(DOMstrings.save).addEventListener('click', function () {
            Controller.ctrlAdd(); 
        });

        window.addEventListener('load', function () {
            //Loads posts
            Controller.ctrlLoad();

            //Updates the energy and starts a timer for next update
            Controller.updateEnergy();
        });
    }

    static initialize () {
        //Creates Powerbank/Model instance
        myPowerbank = new Powerbank();

        //Creates View instance
        myView = new View();

        // Adds EventListeners
        Controller.setupEventListeners();

        // Sets times for start of day and end of day
        Controller.ctrlSetDay();
    }
}

//Starter
Controller.initialize();