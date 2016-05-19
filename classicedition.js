function Square(name, pricetext, color, price, groupNumber, baserent, rent1, rent2, rent3, rent4, rent5) {
	this.name = name;
	this.pricetext = pricetext;
	this.color = color;
	this.owner = 0;
	this.mortgage = false;
	this.house = 0;
	this.hotel = 0;
	this.groupNumber = groupNumber || 0;
	this.price = (price || 0);
	this.baserent = (baserent || 0);
	this.rent1 = (rent1 || 0);
	this.rent2 = (rent2 || 0);
	this.rent3 = (rent3 || 0);
	this.rent4 = (rent4 || 0);
	this.rent5 = (rent5 || 0);
	this.landcount = 0;
	
	if (groupNumber === 3 || groupNumber === 4) {
		this.houseprice = 50;
	} else if (groupNumber === 5 || groupNumber === 6) {
		this.houseprice = 100;
	} else if (groupNumber === 7 || groupNumber === 8) {
		this.houseprice = 150;
	} else if (groupNumber === 9 || groupNumber === 10) {
		this.houseprice = 200;
	} else {
		this.houseprice = 0;
	}
}

function Card(text, action) {
	this.text = text;
	this.action = action;
}

function corrections() {
	document.getElementById("cell1name").textContent = "Mediter-ranean Avenue";
	
	// Add images to enlarges.
	document.getElementById("enlarge5token").innerHTML += '<img src="images/train_icon.png" height="60" width="65" alt="" style="position: relative; bottom: 20px;" />';
	document.getElementById("enlarge15token").innerHTML += '<img src="images/train_icon.png" height="60" width="65" alt="" style="position: relative; top: -20px;" />';
	document.getElementById("enlarge25token").innerHTML += '<img src="images/train_icon.png" height="60" width="65" alt="" style="position: relative; top: -20px;" />';
	document.getElementById("enlarge35token").innerHTML += '<img src="images/train_icon.png" height="60" width="65" alt="" style="position: relative; top: -20px;" />';
	document.getElementById("enlarge12token").innerHTML += '<img src="images/electric_icon.png" height="60" width="48" alt="" style="position: relative; top: -20px;" />';
	document.getElementById("enlarge28token").innerHTML += '<img src="images/water_icon.png" height="60" width="78" alt="" style="position: relative; top: -20px;" />';
}

function utiltext() {
	return '&nbsp;&nbsp;&nbsp;&nbsp;If one "Utility" is owned rent is 4 times amount shown on dice.<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;If both "Utilitys" are owned rent is 10 times amount shown on dice.';
}

function transtext() {
	return '<div style="font-size: 14px; line-height: 1.5;">Rent<span style="float: right;">$25.</span><br />If 2 Railroads are owned<span style="float: right;">50.</span><br />If 3 &nbsp; &nbsp; " &nbsp; &nbsp; " &nbsp; &nbsp; "<span style="float: right;">100.</span><br />If 4 &nbsp; &nbsp; " &nbsp; &nbsp; " &nbsp; &nbsp; "<span style="float: right;">200.</span></div>';
}

function luxurytax() {
	addAlert(player[turn].name + " paid $100 for landing on Floods.");
	player[turn].pay(100, 0);
	
	$("#landed").show().text("You landed on Floods. Pay $100.");
}

function citytax() {
	addAlert(player[turn].name + " paid $200 for landing on Earthquakes.");
	player[turn].pay(200, 0);

	$("#landed").show().text("You landed on Earthquakes. Pay $200.");
}

var square = [];

square[0] = new Square("GO", "COLLECT $200 AS YOU PASS.", "#FFFFFF");
square[1] = new Square("Suriname", "$60", "#8B4513", 60, 3, 2, 10, 30, 90, 160, 250);
square[2] = new Square("Fun Facts", "FOLLOW INSTRUCTIONS ON TOP CARD AND THEN MOVE TO THAT COUNTRY OR LANDFORM", "#FFFFFF");
square[3] = new Square("Uruguay", "$60", "#8B4513", 60, 3, 4, 20, 60, 180, 320, 450);
square[4] = new Square("Earthquakes", "Pay $200", "#FFFFFF");
square[5] = new Square("Learn Dutch", "$200", "#FFFFFF", 200, 1);
square[6] = new Square("Guyana", "$100", "#87CEEB", 100, 4, 6, 30, 90, 270, 400, 550);
square[7] = new Square("Chance", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF");
square[8] = new Square("Ecuador", "$100", "#87CEEB", 100, 4, 6, 30, 90, 270, 400, 550);
square[9] = new Square("Paraguay", "$120", "#87CEEB", 120, 4, 8, 40, 100, 300, 450, 600);
square[10] = new Square("Just Visiting", "", "#FFFFFF");
square[11] = new Square("Chile", "$140", "#FF0080", 140, 5, 10, 50, 150, 450, 625, 750);
square[12] = new Square("Manufactured Products", "$150", "#FFFFFF", 150, 2);
square[13] = new Square("Venezuela", "$140", "#FF0080", 140, 5, 10, 50, 150, 450, 625, 750);
square[14] = new Square("Bolivia", "$160", "#FF0080", 160, 5, 12, 60, 180, 500, 700, 900);
square[15] = new Square("Learn French", "$200", "#FFFFFF", 200, 1);
square[16] = new Square("Colombia", "$180", "#FFA500", 180, 6, 14, 70, 200, 550, 750, 950);
square[17] = new Square("Fun Facts", "FOLLOW INSTRUCTIONS ON TOP CARD AND THEN MOVE TO THAT COUNTRY OR LANDFORM", "#FFFFFF");
square[18] = new Square("Peru", "$180", "#FFA500", 180, 6, 14, 70, 200, 550, 750, 950);
square[19] = new Square("Argentina", "$200", "#FFA500", 200, 6, 16, 80, 220, 600, 800, 1000);
square[20] = new Square("Earn money from relief organizations", "", "#FFFFFF");
square[21] = new Square("Brazil", "$220", "#FF0000", 220, 7, 18, 90, 250, 700, 875, 1050);
square[22] = new Square("Chance", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF");
square[23] = new Square("French Guiana", "$220", "#FF0000", 220, 7, 18, 90, 250, 700, 875, 1050);
square[24] = new Square("Falkland Islands", "$240", "#FF0000", 240, 7, 20, 100, 300, 750, 925, 1100);
square[25] = new Square("Learn Portuguese", "$200", "#FFFFFF", 200, 1);
square[26] = new Square("South Georgia and South Sandwich Islands", "$260", "#FFFF00", 260, 8, 22, 110, 330, 800, 975, 1150);
square[27] = new Square("Galapagos Islands", "$260", "#FFFF00", 260, 8, 22, 110, 330, 800, 975, 1150);
square[28] = new Square("Agricultural Products", "$150", "#FFFFFF", 150, 2);
square[29] = new Square("Andes Mountains", "$280", "#FFFF00", 280, 8, 24, 120, 360, 850, 1025, 1200);
square[30] = new Square("Go to Jail", "Go directly to Jail. Do not pass GO. Do not collect $200.", "#FFFFFF");
square[31] = new Square("Amazon River", "$300", "#008000", 300, 9, 26, 130, 390, 900, 110, 1275);
square[32] = new Square("Amazon Rainforest", "$300", "#008000", 300, 9, 26, 130, 390, 900, 110, 1275);
square[33] = new Square("Fun Facts", "FOLLOW INSTRUCTIONS ON TOP CARD AND THEN MOVE TO THAT COUNTRY OR LANDFORM", "#FFFFFF");
square[34] = new Square("Amazon Basin", "$320", "#008000", 320, 9, 28, 150, 450, 1000, 1200, 1400);
square[35] = new Square("Learn Spanish", "$200", "#FFFFFF", 200, 1);
square[36] = new Square("Chance", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF");
square[37] = new Square("Atlantic Ocean", "$350", "#0000FF", 350, 10, 35, 175, 500, 1100, 1300, 1500);
square[38] = new Square("Floods", "Pay $100", "#FFFFFF");
square[39] = new Square("Pacific Ocean", "$400", "#0000FF", 400, 10, 50, 200, 600, 1400, 1700, 2000);

var communityChestCards = [];
var chanceCards = [];

communityChestCards[0] = new Card("It has over 2.5 million insect species and contains ⅕ of the world’s fresh water.", function(p) { p.communityChestJailCard = true; updateOwned();});
communityChestCards[1] = new Card(" It was discovered by Jimmy Angel, an American, in 1937.", function() { addamount(10, 'Community Chest');});
communityChestCards[2] = new Card("The desert covers a 1,000 km strip of land and is a plateau.", function() { addamount(50, 'Community Chest');});
communityChestCards[3] = new Card("It is located on Argentina’s island. People visiting Antarctica often start and end here.", function() { addamount(100, 'Community Chest');});
communityChestCards[4] = new Card("Income tax refund. Collect $20.", function() { addamount(20, 'Community Chest');});
communityChestCards[5] = new Card("Ecuador’s birth rate is 19.6/1,000 and its death rate is 5.01/1,000.", function() { addamount(100, 'Community Chest');});
communityChestCards[6] = new Card("Brazil covers half of South America and is almost as big as the United States. Suriname is one of the ten least inhabited countries in the world. ", function() { addamount(100, 'Community Chest');});
communityChestCards[7] = new Card("There can be up to 5,000 visitors a day and about 1 million people visit Machu Picchu annually.", function() { addamount(25, 'Community Chest');});
communityChestCards[8] = new Card("These are 4 of the 14 countries that cross the Equator. That means these places constantly have 12 hours of daylight.", function() { subtractamount(100, 'Community Chest');});
communityChestCards[9] = new Card("Bank error in your favor. Collect $200.", function() { addamount(200, 'Community Chest');});
communityChestCards[10] = new Card("Pay school fees of $50.", function() { subtractamount(50, 'Community Chest');});
communityChestCards[11] = new Card("Doctor's fee. Pay $50.", function() { subtractamount(50, 'Community Chest');});
communityChestCards[12] = new Card("It is your birthday. Collect $10 from every player.", function() { collectfromeachplayer(10, 'Community Chest');});
communityChestCards[13] = new Card("Advance to \"GO\" (Collect $200).", function() { advance(0);});
communityChestCards[14] = new Card("You are assessed for street repairs. $40 per house. $115 per hotel.", function() { streetrepairs(40, 115);});
communityChestCards[15] = new Card("Go to Jail. Go directly to Jail. Do not pass \"GO\". Do not collect $200.", function() { gotojail();});


chanceCards[0] = new Card("GET OUT OF JAIL FREE. This card may be kept until needed or traded.", function(p) { p.chanceJailCard=true; updateOwned();});
chanceCards[1] = new Card("Make General Repairs on All Your Property. For each house pay $25. For each hotel $100.", function() { streetrepairs(25, 100);});
chanceCards[2] = new Card("Speeding fine $15.", function() { subtractamount(15, 'Chance');});
chanceCards[3] = new Card("You have been elected chairman of the board. Pay each player $50.", function() { payeachplayer(50, 'Chance');});
chanceCards[4] = new Card("Go back three spaces.", function() { gobackthreespaces();});
chanceCards[5] = new Card("ADVANCE TO THE NEAREST UTILITY. IF UNOWNED, you may buy it from the Bank. IF OWNED, throw dice and pay owner a total ten times the amount thrown.", function() { advanceToNearestUtility();});
chanceCards[6] = new Card("Bank pays you dividend of $50.", function() { addamount(50, 'Chance');});
chanceCards[7] = new Card("ADVANCE TO THE NEAREST RAILROAD. If UNOWNED, you may buy it from the Bank. If OWNED, pay owner twice the rental to which they are otherwise entitled.", function() { advanceToNearestRailroad();});
chanceCards[8] = new Card("Pay poor tax of $15.", function() { subtractamount(15, 'Chance');});
chanceCards[9] = new Card("Take a trip to Reading Rail Road. If you pass \"GO\" collect $200.", function() { advance(5);});
chanceCards[10] = new Card("ADVANCE to Boardwalk.", function() { advance(39);});
chanceCards[11] = new Card("ADVANCE to Illinois Avenue. If you pass \"GO\" collect $200.", function() { advance(24);});
chanceCards[12] = new Card("Your building loan matures. Collect $150.", function() { addamount(150, 'Chance');});
chanceCards[13] = new Card("ADVANCE TO THE NEAREST RAILROAD. If UNOWNED, you may buy it from the Bank. If OWNED, pay owner twice the rental to which they are otherwise entitled.", function() { advanceToNearestRailroad();});
chanceCards[14] = new Card("ADVANCE to St. Charles Place. If you pass \"GO\" collect $200.", function() { advance(11);});
chanceCards[15] = new Card("Go to Jail. Go Directly to Jail. Do not pass \"GO\". Do not collect $200.", function() { gotojail();});
