class Powerbank {
    addItem (infoObj) {
        //Giv et ID her. Tjek det næste ledige

        // Save objektet!

        // return det nye oprettede objekt!
    }

    saveAll () {
        //Save to Local Storage
        //Få et object med til at gemme?
    }

    loadAll () {
        //Load from Local Storage
        //Load til 'data' variablen
    }
}


class Posts {
    constructor (id, title, energy, desc, date) {
        this.id = id;
        this.title = title;
        this.energy = energy;
        this.desc = desc;
        this.date = date;
    }
}

let data = {};