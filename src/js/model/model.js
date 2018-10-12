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

    setDay (dayStart, dayEnd) {
        data.energy.startTime = dayStart;
        data.energy.endTime = dayEnd;
    }

    calcEnergyPercent () {
        const currentTime = new Date();

        //Checks if currentTime is between the startTime & endTime
        if (currentTime.getHours() >= data.energy.startTime.getHours() 
        && currentTime.getHours() < data.energy.endTime.getHours()) {
            
            //Time difference from startTime to now
            let difference = currentTime - data.energy.startTime;

            //Current energy based on the normal "uncharge"
            // let energy = difference / data.energy.interval;
            let energy = 100 - (difference / data.energy.interval);

            //Calculates energy from personal posts
            data.posts.forEach(item => {
                //Checks if item's date is today
                if (item.date.getFullYear() === currentTime.getFullYear()
                && item.date.getMonth() === currentTime.getMonth()
                && item.date.getDate() === currentTime.getDate()) {
                    //Limits the value to between 0-100
                    if (energy + item.energy >= 100) {
                        energy = 100;
                    }
                    else if (energy + item.energy <= 0) {
                        energy = 0;
                    }
                    else {
                        energy += item.energy;
                    }
                }
            });

            return energy;
        }
        else {
            //0% Energy after endTime until next startTime
            return 0;
        }
    }

    calcInterval () {
        if (data.energy.startTime !== new Date(0) 
        && data.energy.endTime !== new Date(0)) {
            //Calculates time interval for 1%
            data.energy.interval = (data.energy.endTime - data.energy.startTime) / 100;
        }
        else {
            console.log('ERROR calculating energy interval!')
        }
    }
    
    calcNextTimer () {
        //Calculates millisecs from startTime to now
        let currentEnergy = this.calcEnergyPercent() * data.energy.interval;

        //Calculates millisecs from startTime and to the next percent
        let nextUpdate = (Math.floor(this.calcEnergyPercent()) + 1) * data.energy.interval;
        
        //Calculates millisecs from now to next percent
        let timeForNextUpdate = nextUpdate - currentEnergy;

        return timeForNextUpdate;
    }

    checkForMatch (array, propertyToMatch, valueToMatch) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][propertyToMatch] === valueToMatch) {
                return true;
            }
        }
        return false;
    }

    getPosts () {
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

            //Formats the date for posts
            dataTable.posts.forEach(item => {
                item.date = new Date(item.date);
            });

            //Checks for matching results in data.posts and dataTable.posts, to prevent adding duplicates
            dataTable.posts.forEach(item => {
                if (!this.checkForMatch(data.posts, 'id', item.id)) {
                    data.posts.push(item);
                }
            });

            //Formats the date for energy dayStart and dayEnd
            data.energy.startTime = new Date(dataTable.energy.startTime);
            data.energy.endTime = new Date(dataTable.energy.endTime);

            //Sets interval
            data.energy.interval = dataTable.energy.interval;
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
    posts: [],
    energy: {
        startTime: new Date(0),
        endTime: new Date(0),
        interval: 0
    }
};