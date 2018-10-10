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
        item = new Post(ID, infoObj.title, infoObj.energy, infoObj.desc, infoObj.date);

        //Saves to data object
        data.posts.push(item);
        
        return item;
    }

    checkForMatch(array, propertyToMatch, valueToMatch) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][propertyToMatch] === valueToMatch) {
                return true;
            }
        }
        return false;
    }

    getPosts() {
        return data.posts;
    }

    loadAll () {
        let dataString;

        try {
            if (localStorage['powerbank']) {
                dataString = localStorage['powerbank'];
            }
        } 
        catch (e) {
            onsole.log('ERROR when loading from Local Storage!\n' + e)
        }

        if (dataString) {
            let dataTable = JSON.parse(dataString);

            //Formats the date
            dataTable.posts.forEach(item => {
                item.date = new Date(item.date);
                console.log('item');
                console.log(item);
                console.log('date');
                console.log(item.date);
                
                
            });

            //Checks for matching results in data.posts and dataTable.posts, to prevent adding duplicates
            dataTable.posts.forEach(item => {
                if (!this.checkForMatch(data.posts, 'id', item.id)) {
                    data.posts.push(item);
                }
            });
        }
    }

    saveAll () {
        let dataString;

        try {
            dataString = JSON.stringify(data);
            localStorage['powerbank'] = dataString;
            console.log('Successfully saved to Local Storage!');
        } 
        catch (e) {
            console.log('ERROR when writing to Local Storage!\n' + e)
        }
    }
}


class Post {
    constructor (id, title, energy, desc, date) {
        this.id = id;
        this.title = title;
        this.energy = energy;
        this.desc = desc;
        this.date = date;
    }
}

let data = {
    posts: []
};