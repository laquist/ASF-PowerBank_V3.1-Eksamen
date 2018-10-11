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
            //Lav en console.log, popup, alert her. 
        }
    }

    static updateEnergy () {
        //Calculates energy
        const energyPercent = myPowerbank.calcEnergyPercent();

        //Displays energy on page
        myView.displayEnergy(energyPercent);
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

        //Saves the data to Local Storage
        myPowerbank.saveAll();
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

            //Updates Energy bar
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

    // TEMP
    static createTestData () {
        const obj4 = {
            title: 'Klarede opvasken',
            energy: 10,
            desc: 'Kom igennem alle mine 40 tallerkener',
            date: new Date('October 10 2018 16:10')
        }

        const obj3 = {
            title: 'Proppet S-tog',
            energy: -25,
            desc: 'Tog toget på arbejde, det var propfyldt og forsinket med 15min. En gammel klam person klemte sig ned ved siden af mig, og hostede ud over mig.',
            date: new Date('October 09 2018 08:12')
        }

        const obj2 = {
            title: 'Tur i skoven',
            energy: 25,
            desc: 'Jeg gik en tur i harreskoven. Så de flotte forårsnuancer, det gav energi.',
            date: new Date('October 08 2018 15:00')
        }

        const obj1 = {
            title: 'Trænede ben',
            energy: 10,
            desc: 'Bliver altid så glad når mine ben har fået en god tur i fitness. Der er også så tomt på denne tid.',
            date: new Date('October 08 2018 06:25')
        }

        // Creates and returns new instance
        const newObj1 = myPowerbank.addItem(obj1);
        const newObj2 = myPowerbank.addItem(obj2);
        const newObj3 = myPowerbank.addItem(obj3);
        const newObj4 = myPowerbank.addItem(obj4);

        // Displays new post on page
        myView.addPost(newObj1);
        myView.addPost(newObj2);
        myView.addPost(newObj3);
        myView.addPost(newObj4);

        //Saves to Local Storage
        myPowerbank.saveAll();
    }
}

//Starter
Controller.initialize();