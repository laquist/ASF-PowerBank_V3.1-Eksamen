class View {
    //Gets info from fields in add page
    getInfo () {
        let infoObj = {};

        if (document.querySelector(DOMstrings.title).value 
        && document.querySelector(DOMstrings.energy).getAttribute('id') 
        && document.getElementById(DOMstrings.desc).value) {
            infoObj.title = document.querySelector(DOMstrings.title).value;
            infoObj.energy = this.smileyToEnergyFormat(document.querySelector(DOMstrings.energy).getAttribute('id'));
            infoObj.desc = document.getElementById(DOMstrings.desc).value;
        }
        else {
            console.log("Felterne må ikke være null eller empty!");
        }
        
        if (infoObj) {
            return infoObj;
        }
        else {
            console.log('infoObj er tomt!');
        }
    }

    clearFields () {
        
    }
    
    addItem () {

    }

    displayEnergy () {
        
    }

    // Nyt navn?
    smileyToEnergyFormat (smileyId) {
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

    getDOMstrings () {
        return DOMstrings;
    }
}

let DOMstrings = {
    title: '.titleInput',
    // Checks for a element with a specific property+value (name=radioSmileys), that is checked
    energy: 'input[name="radioSmileys"]:checked',
    desc: '.descInput'
}