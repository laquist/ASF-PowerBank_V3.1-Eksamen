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
            // Lav dette til en popup/alert
            console.log("Felterne må ikke være null eller empty!");
        }
        
        return infoObj;
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
        const posts = document.querySelector(DOMstrings.postsContainer);
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
        
        const html = `
        <article class="col-12 col-md-6 col-xl-4 mb-3">
            <div class="card h-100 bg-white ${borderColor}">
                <div class="card-body pl-3 pr-2 pt-2">
                    <div class="d-flex justify-content-between">
                        <h4 class="card-title mt-3">${obj.title}</h4>
                        <img class="cardSmiley" src="${imgPath}">
                    </div>

                    <h6 class="card-subtitle mb-2 text-muted">${dateString}</h6>
                    <p class="card-text">${obj.desc}</p>
                </div>
                
                <a href="#" class="px-3 pb-3">Rediger</a>
            
            </div>
        </article>
        `;

        posts.insertAdjacentHTML('afterbegin', html);
    }

    displayEnergy (energyPercent) {
        const progressBarElement = document.querySelector(DOMstrings.progressBar);
        const progressBarText = document.querySelector(DOMstrings.progressText);

        progressBarElement.style.width = energyPercent + '%';
        progressBarElement.setAttribute('aria-valuenow', energyPercent);
        progressBarText.innerHTML = energyPercent + '%';
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

    createDateString(date) {   
        const currentDate = new Date();
        let dateString;
        //Saves dateTime and makes sure that the time is in 4 digits, instead of it only showing one zero character (15:00 vs 15:0)
        //When using negatives with .slice(), it starts from the end of the string, instead of from the start
        const dateTime = ('0' + date.getHours()).slice(-2) + '.' + ('0' + date.getMinutes()).slice(-2);

        //Checks if the day is today
        if (date.getFullYear() === currentDate.getFullYear()
        && date.getMonth() === currentDate.getMonth()
        && date.getDate() === currentDate.getDate()) {
            dateString = 'I dag kl. ';
        }
        else {
            // Rounding up to full day (so calculating from time 00:00:00)
            let newDate = new Date(date);
            newDate.setHours(0, 0, 0, 0);

            let newCurrentDate = new Date(currentDate);
            newCurrentDate.setHours(0, 0, 0, 0);

            //Gets Milliseconds since Epoch time
            const difference = newCurrentDate.getTime() - newDate.getTime();
            const days = difference / 1000 / 60 / 60 / 24;

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
    postsContainer: '#posts',
    progressBar: '#progressBar',
    progressText: '#progressText'
};