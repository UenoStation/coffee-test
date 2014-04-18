var coffeeList = [];

// submit button handler
document.getElementById('submitBtn').onclick = function () {

    var coffee = {};
    coffee.id = coffeeList.length;
    coffee.name = document.getElementById('nameText').value;
    coffee.desc = document.getElementById('descText').value;
    coffee.roast = checkRoast();
    coffee.votes = 0;

    coffeeList.push(coffee);
    renderCoffeeList();
}

// check roast type
function checkRoast(){
    if (document.getElementById('lroast').checked) {
        return "Light Roast";
    } else if (document.getElementById('droast').checked) {
        return "Dark Roast";
    }
}

// get element for appending
function createCoffeeElement(coffee){

    var ul = document.createElement('ul');
    ul.appendChild(getListItem(coffee.name));
    ul.appendChild(getListItem(coffee.desc));
    ul.appendChild(getListItem(coffee.roast));
    ul.appendChild(getVoteSet(coffee));
    ul.appendChild(getListItem(coffee.votes.toString()));

    document.getElementById('voteColumn').appendChild(ul);
}

// return new list item with text
function getListItem( item ) {

    var li = document.createElement('li');
    li.appendChild( document.createTextNode( item ) );

    return li;
}

// return new vote button element
function getVoteSet( coffee ) {

    // vote up button
    var upbtn = document.createElement('button');
    upbtn.setAttribute('id', 'upVote');
    upbtn.setAttribute('onclick', 'addVote(' + coffee.id + ')');

    // vote down button
    var dwnbtn = document.createElement('button');
    dwnbtn.setAttribute('id', 'downVote');
    dwnbtn.setAttribute('onclick', 'decrVote(' + coffee.id + ')');

    var plus = document.createTextNode('+');
    upbtn.appendChild(plus);

    var minus = document.createTextNode('-');
    dwnbtn.appendChild(minus);

    var li = document.createElement('li');
    li.appendChild(upbtn);
    li.appendChild(dwnbtn);

    return li;
}

function addVote( id ) {
    var coffee = getListItemById(id);
    coffee.votes += 1;
    renderCoffeeList();
}

function decrVote( id ) {
    var coffee = getListItemById(id);
    coffee.votes -= 1;
    renderCoffeeList();
}

// returns coffee list item by passing id
function getListItemById( id ) {

    for (var i=0; i < coffeeList.length; i++) {
        if (coffeeList[i].id === id) {
            return coffeeList[i];
        }
    };
}

// redraw coffee list column
function renderCoffeeList() {

    // remove elements in column
    var column = document.getElementById('voteColumn');
    while (column.firstChild) {
        column.removeChild(column.firstChild);
    }

    coffeeList.sort(function(a,b){
        return b.votes-a.votes;
    });

    for (var i=0; i < coffeeList.length; i++) {
        createCoffeeElement(coffeeList[i]);
    }
}