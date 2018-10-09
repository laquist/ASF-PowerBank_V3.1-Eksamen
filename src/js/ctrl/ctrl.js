let myPowerbank;
let myView;

class Controller {
    static ctrlAdd () {
        // Gets info from input fields
        const info = myView.getInfo();

        //Checks if the properties have 'truthy values' (not null, empty string, etc.)
        if (info.title && info.energy && info.desc && info.date) {
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

    // TEMP
    static createTestData () {
        const obj1 = {
            title: 'Klarede opvasken',
            energy: 10,
            desc: 'Kom igennem alle mine 40 tallerkener',
            date: new Date('October 09 2018 16:10')
        }

        const obj2 = {
            title: 'Proppet S-tog',
            energy: -25,
            desc: 'Tog toget på arbejde, det var propfyldt og forsinket med 15min. En gammel klam person klemte sig ned ved siden af mig, og hostede ud over mig.',
            date: new Date('October 08 2018 08:12')
        }

        const obj3 = {
            title: 'Tur i skoven',
            energy: 25,
            desc: 'Jeg gik en tur i harreskoven. Så de flotte forårsnuancer, det gav energi.',
            date: new Date('October 07 2018 15:00')
        }

        const obj4 = {
            title: 'Trænede ben',
            energy: 10,
            desc: 'Bliver altid så glad når mine ben har fået en god tur i fitness. Der er også så tomt på denne tid.',
            date: new Date('October 07 2018 06:25')
        }

        myView.addPost(obj1);
        myView.addPost(obj2);
        myView.addPost(obj3);
        myView.addPost(obj4);
    }
}

//Starter
Controller.initialize();