class View {
    //Gets info from fields in add page
    getInfo () {
        let infoObj = {};

        if (document.querySelector(DOMstrings.title).value 
        && document.querySelector(DOMstrings.energy)
        && document.querySelector(DOMstrings.desc).value) {
            infoObj.title = document.querySelector(DOMstrings.title).value;
            infoObj.energy = this.smileyToEnergy(document.querySelector(DOMstrings.energy).getAttribute('id'));
            infoObj.desc = document.querySelector(DOMstrings.desc).value;
            infoObj.date = new Date();
        }
        else {
            // Lav dette til en popup
            console.log("Felterne må ikke være null eller empty!");
        }
        
        // Tjekker om objektet er tomt
        if (infoObj) {
            return infoObj;
        }
    }

    clearFields () {
        document.querySelector(DOMstrings.title).value = '';
        document.querySelector(DOMstrings.energy).checked = false;
        document.querySelector(DOMstrings.desc).value = '';

        this.hideModal();
    }

    hideModal () {
        // jQuery command for closing modal
        $('#Modal').modal('hide');
    }
    
    addPost (obj) {
        const posts = document.querySelector(DOMstrings.posts);
        let borderColor;
        let imgPath;
        let dateString;
        
        //Sets Green/Red border
        if (obj.energy >= 0) {
            borderColor = 'greenBorder';
        }
        else {
            borderColor = 'redBorder';
        }

        //Gets image path
        imgPath = this.getSmileyImgPath(obj.energy);

        //Creates date string
        dateString = this.createDateString(obj.date);
        
        let html = `
        <article class="col-12 col-md-6 col-xl-4 mb-3">
            <div class="card h-100 bg-white ${borderColor}">
                <div class="card-body pl-3 pr-2 pt-2">
                    <div class="d-flex justify-content-between">
                        <h4 class="card-title mt-3">${obj.title}</h4>
                        <img class="cardSmiley" src="${imgPath}">
                    </div>

                    <h6 class="card-subtitle mb-2 text-muted">I dag kl. 16.10</h6>
                    <p class="card-text">${obj.desc}</p>
                </div>
                
                <a href="#" class="px-3 pb-3">Rediger</a>
            
            </div>
        </article>
        `;

    }

    displayEnergy () {

    }

    smileyToEnergy (smileyId) {
        let value;

        if (smileyId === 'vomitSmiley') {
            value = -25;
        }
        else if (smileyId === 'sadSmiley') {
            value = -10
        }
        else if (smileyId === 'neutralSmiley') {
            value = 0;
        }
        else if (smileyId === 'happySmiley') {
            value = 10;
        }
        else if (smileyId === 'veryHappySmiley') {
            value = 25
        }
        else {
            console.log('Fejl i smiley ID!');
        }

        return value;
    }

    getSmileyImgPath (energy) {
        let path;

        if (energy === 25) {
            path = 'src/img/happy.svg';
        }
        else if (energy === 10) {
            path = 'src/img/happy-real.svg';
        }
        else if (energy === 0) {
            path = 'src/img/neutral.svg';
        }
        else if (energy === -10) {
            path = 'src/img/Sad.svg';
        }
        else if (energy === -25) {
            path = 'src/img/vomited.svg';
        }

        return path;
    }

    // static dateTEST () {
    //     const currentDate = new Date();

    //     // Burde være 30 dage siden
    //     const testDateInPast = new Date("September 08 2018 12:30");

    //     // TEST
    //     console.log('Milisecs:');
    //     let milisekunder = currentDate.getTime() - testDateInPast.getTime();
    //     console.log(milisekunder);
    //     console.log('---------');
    //     console.log('Sekunder:');
    //     let sekunder = milisekunder / 1000;
    //     console.log(sekunder);
    //     console.log('---------');
    //     console.log('Mins:');
    //     let minutter = sekunder / 60;
    //     console.log(minutter);
    //     console.log('---------');
    //     console.log('Timer:');
    //     let timer = minutter / 60;
    //     console.log(timer);
    //     console.log('---------');
    //     console.log('Dage:')
    //     let dage = timer / 24;
    //     console.log(dage);
    //     console.log('---------');
    // }

    // createDateString(date) {        
    static createDateString(date) {   
        const currentDate = new Date();
        let dateString;
        let dateTime = date.getHours() + '.' + date.getMinutes();

        //Checks if the day is today
        if (date.getFullYear() === currentDate.getFullYear()
        && date.getMonth() === currentDate.getMonth()
        && date.getDate() === currentDate.getDate()) {
            dateString = 'I dag kl. ';
        }
        else {
            // Rounding up to full day (so calculating from time 00:00:00)
            let newDate = date;
            newDate.setHours(0, 0, 0, 0);

            let newCurrentDate = currentDate;
            newCurrentDate.setHours(0, 0, 0, 0);

            //Gets Milliseconds since Epoch time
            let difference = newCurrentDate.getTime() - newDate.getTime();
            let days = difference / 1000 / 60 / 60 / 24;

            if (days === 1) {
                dateString = days + ' dag siden kl. ';
            }
            else {
                dateString = days + ' dage siden kl. ';
            }
        }

        return dateString + dateTime;
    }

    getDOMstrings () {
        return DOMstrings;
    }
}

let DOMstrings = {
    title: '#titleInput',
    // Checks for a element with a specific property+value (name=radioSmileys), that is checked
    energy: 'input[name="radioSmileys"]:checked',
    desc: '#descInput',
    save: '#saveBtn',
    postsContainer: '#posts'
};