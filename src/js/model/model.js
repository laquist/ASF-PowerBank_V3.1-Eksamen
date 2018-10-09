class Powerbank {
    addItem (infoObj) {
        let item;
        let ID;

        //Checks for and gives the next available ID
        if (data.posts.length != 0) {
            ID = data.posts[data.posts.length - 1].id + 1;
        }
        else {
            ID = 1;
        }

        //Creates instance
        item = new Posts(ID, infoObj.title, infoObj.energy, infoObj.desc, infoObj.date);

        //Saves to data object
        data.posts[ID] = item;
        
        return item;
    }

    loadAll () {
        //Load from Local Storage
        //Load til 'data' variablen
    }

    saveAll () {
        //Save to Local Storage
        //Få et object med til at gemme?
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

let data = {
    posts: [],
};