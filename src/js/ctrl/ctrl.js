let myPowerbank;
let myView;
let data = {};

class Controller {
    static ctrlAdd (title, energy, desc,) {
        // if () {

        // }

        //Få returnet det nye object, og kald save på den?
    }

    static saveAll () {
        //Save to Local Storage
        //Få et object med til at gemme?
    }

    static loadAll () {
        //Load from Local Storage
        //Load til 'data' variablen
    }

    static setupEventListeners () {
        //Gem knappen i modal

        document.getElementById('saveBtn').addEventListener('click', function () {
            ctrlAdd();
        });
    }

    static initialize () {
        //Creates Powerbank/Model instance
        myPowerbank = new Powerbank();

        //Creates View instance
        myView = new View();
    }
}

//Starter
Controller.initialize();