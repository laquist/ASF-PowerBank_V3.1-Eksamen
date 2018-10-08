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
        
        //Sets Green/Red border
        if (obj.energy >= 0) {
            borderColor = 'greenBorder';
        }
        else {
            borderColor = 'redBorder';
        }

        //Gets image path
        imgPath = this.getSmileyImgPath(obj.energy);
        
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