
// game loops 
var mainGameLoop = window.setInterval(function() {
    makeKibble();
}, 1000)

var fishLoop = window.setInterval(function() {
    getFish();
}, 15000)  

var catLoop = window.setInterval(function() {
    if (catActions.missionaries > 0) {
        getCatRecruit();
        // for (i = 0; i < gameData.toys; i++) {
        //     getCatRecruit();
        // }
    }
}, 20000)  

// variables

var gameData = {
    kibble: 0,
    kibblePerClick: 1,
    cats: 0,
    fish: 0,
    gold: 0,
    toys: 0
}

var costs = {
    catCost: 10,
    fishCost: 5
}

var catActions = {
    fishers: 0,
    missionaries: 0
}

// hiding some elements to be unlocked throughout play

// document.getElementById("catsAcquired").style.visibility = "hidden";
// // document.getElementById("fishAcquired").style.visibility = "hidden";
// document.getElementById("fishCost").style.visibility = "hidden";
// document.getElementById("fishers").style.visibility = "hidden";
// document.getElementById("missionaries").style.visibility = "hidden";
// document.getElementById("gold").style.visibility = "hidden";
// document.getElementById("toys").style.visibility = "hidden";

// // button invisibilities 
// document.getElementById("buyCat").style.visibility = "hidden";
// document.getElementById("sendCatFishing").style.visibility = "hidden";
// document.getElementById("CallFishingCat").style.visibility = "hidden";
// document.getElementById("sendCatMissionary").style.visibility = "hidden";
// document.getElementById("callMissionaryCat").style.visibility = "hidden";
// document.getElementById("sellFish").style.visibility = "hidden";
// document.getElementById("goldToKibble").style.visibility = "hidden";
// document.getElementById("goldToToy").style.visibility = "hidden";

// makes kibble
function makeKibble() {
    gameData.kibble += gameData.kibblePerClick;
    update();

    // if (gameData.kibble >= 10) {
    //     document.getElementById("catsAcquired").style.visibility = "visible";
    //     document.getElementById("buyCat").style.visibility = "visible";
    //     update();
    // }
    // if (gameData.fish > 10) {
    //     document.getElementById("sellFish").style.visibility = "visible";
    //     update();
    // }
    // if (gameData.gold > 0) {
    //     document.getElementById("gold").style.visibility = "visible";
    //     update();
    // }
    // if (gameData.gold > 10) {
    //     document.getElementById("goldToKibble").style.visibility = "visible";
    //     update();
    // }
    // if (gameData.gold >100) {
    //     document.getElementById("goldToToy").style.visibility = "visible";
    //     update();
    // }
    // if (gameData.cats > 5) {
    //     document.getElementById("fishers").style.visibility = "visible";
    //     document.getElementById("sendFishingCat").style.visibility = "visible";
    //     document.getElementById("callFishingCat").style.visibility = "visible";
    //     document.getElementById("fishAcquired").style.visibility = "visible";
    //     update();
    // }
    // if (gameData.cats > 10) {
    //     document.getElementById("missionaries").style.visibility = "visible";
    //     document.getElementById("sendCatMissionary").style.visibility = "visible";
    //     document.getElementById("callMissionaryCat").style.visibility = "visible";
    //     update();
    // }
    // if (gameData.toys > 0) {
    //     document.getElementById("toys").style.visibility = "visible";
    //     update();
    // }
}

// exchanges kibble for cat

function buyCat() {
    if (gameData.kibble >= costs.catCost) {
      gameData.kibble -= costs.catCost
      gameData.kibblePerClick += 1
      costs.catCost *= 2
      gameData.cats += 1
      update();
    }
  }  
  

// sends one cat to go fishing
// each fishing cat gets 1 fish per 15 seconds

function sendCatFishing() {
    if (gameData.cats > 0) {
        gameData.cats--
        catActions.fishers++
        update();
    }
 }

function getFish() {
    gameData.fish+= catActions.fishers;
    update();
}

// sends one cat out as a missionary
// each missionary cat gets one recruit every 20 seconds

function sendCatMissionary() {
    if (gameData.cats > 0) {
        gameData.cats--
        catActions.missionaries++
        update();
    }
}

function getCatRecruit() {
    gameData.cats+= catActions.missionaries + gameData.toys;
    update();
}

// calls one cat back from either fishing or being a missionary cat

function callFishingCat() {
    if (catActions.fishers > 0) {
        gameData.cats++
        catActions.fishers--
        update();
    }
  
}

function callMissionaryCat() {
    if (catActions.missionaries > 0) {
        gameData.cats++
        catActions.missionaries--
        update();
    }
}

// selling fish for gold

function sellFish() {
    gameData.gold+=gameData.fish*100;
    gameData.fish=0;
    update();
}

function goldToKibble() {
    if (gameData.gold>=10) {
        gameData.gold-=10;
        gameData.kibble+=2000;
        update();
    }
}

function goldToToy() {
    if (gameData.gold>=100) {
        gameData.gold-=100;
        gameData.toys++
        update();    
    }
}

// updates the numbers every time a function is called

function update() {
    document.getElementById("kibbleAcquired").innerHTML = gameData.kibble + " Kibble Acquired";
    document.getElementById("catsAcquired").innerHTML = gameData.cats + " Cats Available";
    document.getElementById("catCost").innerHTML = "Cat cost: " + costs.catCost + " kibble";
    document.getElementById("fishers").innerHTML = catActions.fishers + " cats fishing";
    document.getElementById("missionaries").innerHTML = catActions.missionaries + " missionary cats";
    document.getElementById("gold").innerHTML = gameData.gold + " Gold";
    document.getElementById("toys").innerHTML = gameData.toys + " Toys";
    document.getElementById("fishAcquired").innerHTML = gameData.fish + " Fish";
}