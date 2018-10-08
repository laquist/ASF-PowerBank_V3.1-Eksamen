class View {
    //Gets info from fields in add page
    getInfo () {
        let infoObj = {};

        if (document.querySelector(DOMstrings.title).value 
        && document.querySelector(DOMstrings.energy)
        && document.querySelector(DOMstrings.desc).value) {
            infoObj.title = document.querySelector(DOMstrings.title).value;
            infoObj.energy = this.smileyToEnergyFormat(document.querySelector(DOMstrings.energy).getAttribute('id'));
            infoObj.desc = document.querySelector(DOMstrings.desc).value;
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
    }

    hideModal () {
        // jQuery command for closing modal
        $('#Modal').modal('hide');
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
    title: '#titleInput',
    // Checks for a element with a specific property+value (name=radioSmileys), that is checked
    energy: 'input[name="radioSmileys"]:checked',
    desc: '#descInput'
}