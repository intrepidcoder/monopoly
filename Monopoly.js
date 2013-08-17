function Game() {
	var die1;
	var die2;
	var areDiceRolled = false;
	
	var auctionQueue = [];
	var highestbidder;
	var highestbid;
	var currentbidder = 1;
	var auctionproperty;
	
	this.rollDice = function() {
		die1 = Math.floor(Math.random() * 6) + 1;
		die2 = Math.floor(Math.random() * 6) + 1;
		areDiceRolled = true;
	};
	
	this.resetDice = function() {
		areDiceRolled = false;
	};
	
	this.next = function() {
		if (areDiceRolled && doublecount === 0) {
			play();
		} else {
			roll();
		}
	};
	
	this.getDie = function(die) {
		if (die === 1) {
			
			return die1;
		} else {
		
			return die2;
		}		
			
	};
	
	var finalizeAuction = function() {
		var p = player[highestbidder];
		var sq = square[auctionproperty];
		
		if (highestbid > 0) {
			p.pay(highestbid, 0);
			sq.owner = highestbidder;
			addalert(p.name + " bought " + sq.name + " for $" + highestbid + ".");
		}
		
		for (var i = 1; i <= pcount; i++) {
			player[i].bidding = true;
		}
		
		hide('popupbackground');
		hide('popupwrap');
		
		if (!game.auction()) {
			play();
		}
	};
	
	this.addPropertyToAuctionQueue = function(propertyIndex) {
		auctionQueue.push(propertyIndex);
	};
	
	this.auction = function() {
		if (auctionQueue.length === 0) {
			return false;
		}
		
		index = auctionQueue.shift();
		
		var s = square[index];
		
		if (s.price === 0 || s.owner !== 0) {
			return game.auction();
		}
		
		auctionproperty = index;
		highestbidder = 0;
		highestbid = 0;
		currentbidder = turn + 1;
		
		if (currentbidder > pcount) {
			currentbidder -= pcount;
		}
		
		popup("<div style='font-weight: bold; font-size: 16px;'>Auction <span id='propertyname'></span></div><div>Bid = $<span id='highestbid'></span> (<span id='highestbidder'></span>)</div><div><span id='currentbidder'></span>, it is your turn to bid.<br />$<input id='bid' style='width: 291px;' onfocus='bid_onfocus(this);' onkeydown='return bid_onkeydown(this);' /></div><div><input type='button' value='Bid' onclick='game.auctionBid();' /><input type='button' value='Pass' title='Skip bidding this time.' onclick='game.auctionPass();' /><input type='button' value='Exit Auction' title='Stop bidding on this property altogether.' onclick='if (confirm(\"Are you sure you want to stop bidding on this property altogether?\")) game.auctionExit();' /></div>", false);

		document.getElementById("propertyname").innerHTML = "<a href='javascript:void(0);' onmouseover='showdeed(" + auctionproperty + ");' onmouseout='hidedeed();' class='statscellcolor'>" + s.name + "</a>";
		document.getElementById("highestbid").innerHTML = "0";
		document.getElementById("highestbidder").innerHTML = "N/A";
		document.getElementById("currentbidder").innerHTML = player[currentbidder].name;
		
		updatemoney();
		return true;
	};

	this.auctionPass = function() {
		if (highestbidder === 0) {
			highestbidder = currentbidder;
		}
		
		while (true) {
			currentbidder++;
			
			if (currentbidder > pcount) {
				currentbidder -= pcount;
			}
			
			if (currentbidder == highestbidder) {
				finalizeAuction();
				break;
			} else if (player[currentbidder].bidding) {
				break;
			}
			
		}
		
		if (document.getElementById("currentbidder") != null) {
			document.getElementById("currentbidder").innerHTML = player[currentbidder].name;
			document.getElementById("bid").value = "";
			document.getElementById("bid").style.color = "black";
		}
	};

	this.auctionBid = function() {
		bid = parseInt(document.getElementById("bid").value);
		
		if (bid === "" || bid === null) {
			document.getElementById("bid").value = "Please enter a bid.";
			document.getElementById("bid").style.color = "red";
		} else if (!isNaN(bid)) {
			
			if (bid > player[currentbidder].money) {
				document.getElementById("bid").value = "You don't have enough money to bid $" + bid + ".";
				document.getElementById("bid").style.color = "red";
			} else if (bid > highestbid) {
				highestbid = bid;
				document.getElementById("highestbid").innerHTML = parseInt(bid);
				highestbidder = currentbidder;
				document.getElementById("highestbidder").innerHTML = player[highestbidder].name;
				
				document.getElementById("bid").focus();
				this.auctionPass();
			} else {
				document.getElementById("bid").value = "Your bid must be greater than highest bid. ($" + highestbid + ")";
				document.getElementById("bid").style.color = "red";
			}
		} else {
			document.getElementById("bid").value = "Your bid must be a number.";
			document.getElementById("bid").style.color = "red";
		}
	};

	this.auctionExit = function() {
		player[currentbidder].bidding = false;
		this.auctionPass();
	};
}

var game = new Game();

// AI functionality is in progress.
// function AITest() {
	// this.alertList = "";
	
	// this.buyProperty = function(index) {
		// return true;
	// }
	
	// this.acceptTrade = function() {
		// return false;
	// }
	
	// this.initiateTrade = function() {
	
	// }
	
	// this.manageProperty = function() {
	
	// }
	
	// // boolean: Or use card if have one
	// this.postBail = function() {
		// return false;
	// }
	
	// // integer 0-39 (1-40 for now)
	// this.payDebt = function() {
		
	// }
	
	// // integer: -1 for exit auction, 0 for pass, positive for bid
	// this.bid = function(property) {
		// return -1;
	// }
// }

function Player(name, color) {
	this.name = name;
	this.color = color;
	this.position = 0;
	this.money = 1500;
	this.creditor = -1;
	this.jail = false;
	this.jailroll = 0;
	this.communityChestJailCard = false;
	this.chanceJailCard = false;
	this.bidding = true;
	// this.human = true;
	// this.AI = new AITest();
	
	this.pay = function (amount, creditor) {
		if (amount <= this.money) {
			this.money -= amount;
			updatemoney();
			return true;
		} else {
			this.money -= amount;
			this.creditor = creditor;
			
			for (var i = 0; i < 40; i++) {
				if (player[square[i].owner] == this && square[i].mortgage == false) {
					
					// Zero amounts are used to check for bankruptcy.
					if (amount !== 0) {
						popup(this.name + ", you owe $" + (amount) + " to " + player[creditor].name + ". Mortgage enough property to pay your debt.", true);
					}
					updatemoney();
					return false;
				}
			}
			
			// Player has no unmortgaged properties. Eliminate him.
			updatemoney();
			
			var buttonAonclick = 'hide("popupbackground"); hide("popupwrap"); bankruptcy();';
			popup("You are bankrupt, " + this.name + ". All your remaining assets will be turned over to " + player[creditor].name + ".<div><input type='button' value='OK' onclick='" + buttonAonclick + "' /></div>", false);
			
			addalert(this.name + " is bankrupt.");
			
			return false;
		}
	}
}

var player = [];

var pcount;
var turn = 0, doublecount = 0;


// Overwrite an array with numbers from one to the array's length in a random order.
Array.prototype.randomize = function (length) {
	length = (length || this.length);
	var num;
	var indexArray = new Array;
	
	for (var i = 0; i < length; i++) {
		indexArray[i] = i;
	}
	
	for (var i = 0; i < length; i++) {
		// Generate random number between 0 and indexArray.length - 1.
		num = Math.floor(Math.random() * indexArray.length);
		this[i] = indexArray[num] + 1;
		
		indexArray.splice(num, 1);
	}
}

function show(element) {
	// Element may be an HTML element or the id of one passed as a string.
	if (element.constructor == String) {
		element = document.getElementById(element);
	}
	
	if (element.tagName == "INPUT" || element.tagName == "SPAN" || element.tagName == "LABEL") {
		element.style.display = "inline";
	} else {
		element.style.display = "block";
	}
}

function hide(element) {
	// Element may be an HTML element or the id of one passed as a string.
	if (element.constructor == String) {
		document.getElementById(element).style.display = "none";
	} else {
		element.style.display = "none";
	}
}

function addalert(alertText) {
	var oldalerts = document.getElementById("alert").innerHTML;
	oldalerts = "<div>" + alertText + "</div>" + oldalerts;
	document.getElementById("alert").innerHTML = oldalerts;
	
	// player[turn].AI.alertList += "<div>" + alertText + "</div>";
}

function popup(HTML, showClose) {
	document.getElementById("popuptext").innerHTML = HTML;
	document.getElementById("popup").style.width = "300px";
	document.getElementById("popup").style.top = "0px";
	document.getElementById("popup").style.left = "0px";
	show("popupbackground");
	show("popupwrap");
	
	if (showClose === false) {
		hide("popupclose");
	} else {
		show("popupclose");
	}
}

function updateposition() {
	// Reset borders
	document.getElementById("jail").style.border = "1px solid black";
	document.getElementById("jailpositionholder").innerHTML = "";
	for (var i = 0; i < 40; i++) {
		document.getElementById("cell" + i).style.border = "1px solid black";
		document.getElementById("cell" + i + "positionholder").innerHTML = "";
		
	}

	var sq, left, top;
	
	for (var x = 0; x < 40; x++) {
		sq = square[x];
		left = 0;
		top = 0;
		
		for (var y = turn; y <= pcount; y++) {
			
			if (player[y].position == x && !player[y].jail) {
				
				document.getElementById("cell" + x + "positionholder").innerHTML += "<div class='cell-position' title='" + player[y].name + "' style='background-color: " + player[y].color + "; left: " + left + "px; top: " + top + "px;'></div>";
				if (left == 36) {
					left = 0;
					top = 12;
				} else
					left += 12;
			}
		}
		
		for (var y = 1; y < turn; y++) {
			
			if (player[y].position == x && !player[y].jail) {
				document.getElementById("cell" + x + "positionholder").innerHTML += "<div class='cell-position' title='" + player[y].name + "' style='background-color: " + player[y].color + "; left: " + left + "px; top: " + top + "px;'></div>";
				if (left == 36) {
					left = 0;
					top = 12;
				} else
					left += 12;
			}
		}
	}
	
	left = 0;
	top = 53;
	for (var i = turn; i <= pcount; i++) {
		if (player[i].jail) {
			document.getElementById("jailpositionholder").innerHTML += "<div class='cell-position' title='" + player[i].name + "' style='background-color: " + player[i].color + "; left: " + left + "px; top: " + top + "px;'></div>";
			
			if (left === 36) {
				left = 0;
				top = 41;
			} else {
				left += 12;
			}
		}
	}
	
	for (var i = 1; i < turn; i++) {
		if (player[i].jail) {
			document.getElementById("jailpositionholder").innerHTML += "<div class='cell-position' title='" + player[i].name + "' style='background-color: " + player[i].color + "; left: " + left + "px; top: " + top + "px;'></div>";
			if (left == 36) {
				left = 0;
				top = 41;
			} else
				left += 12;
		}
	}
	
	p = player[turn];
	
	if (p.jail) {
		document.getElementById("jail").style.border = "1px solid " + p.color;
	} else {
		document.getElementById("cell" + p.position).style.border = "1px solid " + p.color;
	}
	
}

function updatemoney() {
	var p = player[turn];
	
	document.getElementById("pmoney").innerHTML = "$" + p.money;
	for (var i = 1; i <= 9; i++) {
		hide("moneybarrow" + i);
	}
	
	for (var i = 1; i <= pcount; i++) {
		p_i = player[i];
		
		show("moneybarrow" + i);
		document.getElementById("p" + parseInt(i) + "moneybar").style.border = "2px solid " + p_i.color;
		document.getElementById("p" + parseInt(i) + "money").innerHTML = p_i.money;
		document.getElementById("p" + parseInt(i) + "moneyname").innerHTML = p_i.name;
	}
	show("moneybarrow9"); // Don't remove this line or make the first for-loop stop when i <= 8, because this affects how the table is displayed.
	
	if (document.getElementById("landed").innerHTML == "")
		hide("landed");
	
	document.getElementById("quickstats").style.borderColor = p.color;
	
	if (p.money < 0) {
		document.getElementById("nextbutton").disabled = true;
	} else {
		document.getElementById("nextbutton").disabled = false;
	}
}

function updatedice() {
	var die1 = game.getDie(1);
	var die2 = game.getDie(2);
	
	show("die1");
	show("die2");
	
	if (document.images) {
		document.getElementById("die1").innerHTML = '<img src="Images/Die_' + die1 + '.png" alt="' + die1 + '" style="width: 30px; height: 30px;" />';
		document.getElementById("die2").innerHTML = '<img src="Images/Die_' + die2 + '.png" alt="' + die2 + '" style="width: 30px; height: 30px;" />';
		
		document.getElementById("die1").className = "";
		document.getElementById("die2").className = "";
		
		document.getElementById("die1").title = "Die (" + die1 + " spots)";
		document.getElementById("die2").title = "Die (" + die2 + " spots)";
		
	} else {
		document.getElementById("die1").innerHTML = die1;
		document.getElementById("die2").innerHTML = die2;
		
		document.getElementById("die1").className = "die";
		document.getElementById("die2").className = "die";
		
		document.getElementById("die1").title = "Die";
		document.getElementById("die2").title = "Die";
	}
}

function updateowned() {
	var p = player[turn];
	var checkedproperty = getcheckedproperty();
	show("option");
	show("owned");
	
	var HTML = "",
	firstproperty = -1;
	
	var mortgagetext = "",
	housetext = "";
	var sq;
	
	for (var i = 0; i < 40; i++) {
		sq = square[i];
		if (sq.group && sq.owner === 0) {
			document.getElementById("cell" + i + "owner").style.display = "none";
		} else if (sq.group && sq.owner > 0) {
			with (document.getElementById("cell" + i + "owner")) {
				style.display = "block";
				style.backgroundColor = player[sq.owner].color;
				title = player[sq.owner].name;
			}
		}
	}
	
	for (var i = 0; i < 40; i++) {
		sq = square[i];
		if (sq.owner == turn) {
			
			mortgagetext = "";
			if (sq.mortgage) {
				mortgagetext = "title='Mortgaged' style='color: grey;'";
			}
			
			housetext = "";
			if (sq.house >= 1 && sq.house <= 4) {
				for (var x = 1; x <= sq.house; x++) {
					housetext += "<img src='Images/house.png' alt='' title='House' class='house' />";
				}
			} else if (sq.hotel) {
				housetext += "<img src='Images/hotel.png' alt='' title='Hotel' class='hotel' />";
			}
			
			if (HTML == "") {
				HTML += "<table>";
				firstproperty = i;
			}
			
			HTML += "<tr onclick='propertycell_onclick(this, " + i + ");'><td class='propertycellcheckbox'><input type='checkbox' id='propertycheckbox" + i + "' /></td><td class='propertycellcolor' style='background: " + sq.color + ";";
			
			if (sq.group == 1 || sq.group == 2) {
				HTML += " border: 1px solid grey; width: 18px;";
			}
			
			HTML += "' onmouseover='showdeed(" + i + ");' onmouseout='hidedeed();'></td><td class='propertycellname' " + mortgagetext + ">" + sq.name + housetext + "</td></tr>";
		}
	}
	
	if (p.communityChestJailCard) {
		if (HTML == "") {
			firstproperty = 40;
			HTML += "<table>";
		}
		HTML += "<tr onclick='propertycell_onclick(this, 40);'><td class='propertycellcheckbox'><input type='checkbox' id='propertycheckbox40' /></td><td class='propertycellcolor' style='background: white;'></td><td class='propertycellname'>Get Out of Jail Free Card</td></tr>";
		
	}
	if (p.chanceJailCard) {
		if (HTML == "") {
			firstproperty = 41;
			HTML += "<table>";
		}
		HTML += "<tr onclick='propertycell_onclick(this, 41);'><td class='propertycellcheckbox'><input type='checkbox' id='propertycheckbox41' /></td><td class='propertycellcolor' style='background: white;'></td><td class='propertycellname'>Get Out of Jail Free Card</td></tr>";
	}
	
	if (HTML == "") {
		HTML = p.name + ", you don't have any properties.";
		hide("option");
	} else {
		HTML += "</table>";
	}
	
	document.getElementById("owned").innerHTML = HTML;
	
	// Select previously selected property.
	if (checkedproperty > -1 && document.getElementById("propertycheckbox" + checkedproperty))
		document.getElementById("propertycheckbox" + checkedproperty).checked = true;
	else if (firstproperty > -1)
		document.getElementById("propertycheckbox" + firstproperty).checked = true;
	
	updateoption();
}

function updateoption() {
	show("option");
	
	var allGroupUninproved = true,
	allGroupUnmortgaged = true;
	var checkedproperty = getcheckedproperty();
	
	if (checkedproperty < 0 || checkedproperty >= 40) {
		hide("buyhousebutton");
		hide("sellhousebutton");
		hide("mortgagebutton");
		
		var housesum = 32;
		var hotelsum = 12;
		
		for (var i = 0; i < 40; i++) {
			s = square[i];
			if (s.hotel == 1)
				hotelsum--;
			else
				housesum -= s.house;
		}
		
		show("buildings");
		document.getElementById("buildings").innerHTML = "<img src='Images/house.png' alt='' title='House' class='house' float='none' />:&nbsp;" + housesum + "&nbsp;&nbsp;<img src='Images/hotel.png' alt='' title='Hotel' class='hotel' float='none' />:&nbsp;" + hotelsum;
		
		return;
	}
	
	hide("buildings");
	var sq = square[checkedproperty];
	
	buyhousebutton = document.getElementById("buyhousebutton");
	sellhousebutton = document.getElementById("sellhousebutton");
	
	show("mortgagebutton");
	document.getElementById("mortgagebutton").disabled = false;
	
	if (sq.mortgage) {
		document.getElementById("mortgagebutton").value = "Unmortgage ($" + Math.round(sq.price * 0.6) + ")";
		document.getElementById("mortgagebutton").title = "Unmortgage " + sq.name + " for $" + Math.round(sq.price * 0.6) + ".";
		hide("buyhousebutton");
		hide("sellhousebutton");
		
		allGroupUnmortgaged = false;
	} else {
		document.getElementById("mortgagebutton").value = "Mortgage ($" + (sq.price * 0.5) + ")";
		document.getElementById("mortgagebutton").title = "Mortgage " + sq.name + " for $" + (sq.price * 0.5) + ".";
		
		if (sq.group >= 3) {
			show("buyhousebutton");
			show("sellhousebutton");
			buyhousebutton.disabled = false;
			sellhousebutton.disabled = false;
			
			buyhousebutton.value = "Buy house ($" + sq.houseprice + ")";
			sellhousebutton.value = "Sell house ($" + (sq.houseprice * 0.5) + ")";
			buyhousebutton.title = "Buy a house for $" + sq.houseprice;
			sellhousebutton.title = "Sell a house for $" + (sq.houseprice * 0.5);
			
			if (sq.house == 4) {
				buyhousebutton.value = "Buy hotel ($" + sq.houseprice + ")";
				buyhousebutton.title = "Buy a hotel for $" + sq.houseprice;
			}
			if (sq.hotel == 1) {
				hide("buyhousebutton");
				sellhousebutton.value = "Sell hotel ($" + (sq.houseprice * 0.5) + ")";
				sellhousebutton.title = "Sell a hotel for $" + (sq.houseprice * 0.5);
			}
			
			var maxhouse = 0;
			var minhouse = 5;
			for (var i = 0; i < 40; i++) {
				s = square[i];
				
				if (s.group == sq.group && s.owner != sq.owner) {
					buyhousebutton.disabled = true;
					sellhousebutton.disabled = true;
					buyhousebutton.title = "Before you can buy a house, you must own all the properties of this color-group.";
				} else if (s.group == sq.group && s.owner == sq.owner) {
					
					if (s.house > maxhouse)
						maxhouse = s.house;
					if (s.house < minhouse)
						minhouse = s.house;
					if (s.house > 0)
						allGroupUninproved = false;
					if (s.mortgage)
						allGroupUnmortgaged = false;
				}
			}
			
			if (!allGroupUnmortgaged) {
				buyhousebutton.disabled = true;
				buyhousebutton.title = "Before you can buy a house, you must unmortgage all the properties of this color-group.";
			}
			
			// Force even building
			if (sq.house > minhouse) {
				buyhousebutton.disabled = true;
				
				if (sq.house == 1) {
					buyhousebutton.title = "Before you can buy another house, the other properties of this color-group must all have one house.";
				} else if (sq.house == 4) {
					buyhousebutton.title = "Before you can buy a hotel, the other properties of this color-group must all have 4 houses.";
				} else {
					buyhousebutton.title = "Before you can buy a house, the other properties of this color-group must all have " + sq.house + " houses.";
				}
			}
			if (sq.house < maxhouse) {
				sellhousebutton.disabled = true;
				
				if (sq.house == 1) {
					sellhousebutton.title = "Before you can sell house, the other properties of this color-group must all have one house.";
				} else {
					sellhousebutton.title = "Before you can sell a house, the other properties of this color-group must all have " + sq.house + " houses.";
				}
			}
			
			if (sq.house === 0 && sq.hotel === 0) {
				hide("sellhousebutton");
			} else {
				hide("mortgagebutton");
			}
			
			// Before a property can be mortgaged or sold, all the properties of its color-group must unimproved.
			if (!allGroupUninproved) {
				document.getElementById("mortgagebutton").title = "Before a property can be mortgaged, all the properties of its color-group must unimproved.";
				document.getElementById("mortgagebutton").disabled = true;
			}
			
		} else {
			hide("buyhousebutton");
			hide("sellhousebutton");
		}
	}
}

function bankruptcyunmortgage() {
	var p = player[turn];
	
	if (p.creditor === 0) {
		eliminateplayer();
		return;
	}
	
	var pcredit = player[p.creditor];
	
	for (var i = 0; i < 40; i++) {
		sq = square[i];
		if (sq.owner == p.index && sq.mortgage) {
			sq.owner = p.creditor;
			
			price = Math.round(sq.price * 0.6);
			if (price <= pcredit.money) {
				
				var buttonAonclick = 'hide("popupbackground"); hide("popupwrap"); player[' + p.creditor + '].pay(' + price + ', 0); square[' + i + '].mortgage = false; addalert(player[' + p.creditor + '].name + " unmortgaged " + "' + sq.name + '" + " for $" + ' + price + ' + "."); bankruptcyunmortgage();';
				var buttonBonclick = 'hide("popupbackground"); hide("popupwrap"); player[' + p.creditor + '].pay(Math.round(' + sq.price + ' * 0.05), 0); bankruptcyunmortgage();';
				
				popup(pcredit.name + ", do you want to unmortgage " + sq.name + " for $" + price + "?<br />If you do not unmortgage it now, you must pay $" + Math.round(sq.price * 0.1) + " in interest immediately.<div><input type='button' value='Unmortgage ($" + price + ")' onclick='" + buttonAonclick + "' /><input type='button' value='Pay $" + Math.round(sq.price * 0.1) + " fee' onclick='" + buttonBonclick + "' /></div>", false);
				return;
			}
		}
	}
	
	eliminateplayer();
}

function bankruptcy() {
	var p = player[turn];
	var pcredit = player[p.creditor];
	
	if (p.money >= 0)
		return;
	
	if (p.creditor !== 0) {
		pcredit.money += p.money;
	}
	
	for (var i = 0; i < 40; i++) {
		sq = square[i];
		if (sq.owner == p.index) {
			if (!sq.mortgage) {
				sq.owner = p.creditor;
			}
			
			if (sq.house > 0) {
				if (p.creditor !== 0) {
					pcredit.money += sq.houseprice * 0.5 * sq.house;
				}
				sq.hotel = 0;
				sq.house = 0;
			}
			
			if (p.creditor === 0) {
				sq.mortgage = false;
				game.addPropertyToAuctionQueue(i);
				sq.owner = 0;
			}
		}
	}
	
	updatemoney();
	if (pcount == 2) {
		eliminateplayer();
	} else {
		bankruptcyunmortgage();
	}
}

function eliminateplayer() {
	var p = player[turn];
	
	for (var i = p.index; i < pcount; i++) {
		player[i] = player[i + 1];
		player[i].index = i;
		
	}
	
	for (var i = 0; i < 40; i++) {
		if (square[i].owner >= p.index) {
			square[i].owner--;
		}
	}
	
	pcount--;
	turn--;
	
	if (pcount == 2)
		document.getElementById("stats").style.width = "454px";
	else if (pcount == 3)
		document.getElementById("stats").style.width = "680px";
	
	if (pcount == 1) {
		updatemoney();
		hide("control");
		hide("board");
		show("refresh");
		
		// Display land counts for survey purposes.
		var text;
		for (var i = 0; i < 40; i++) {
			if (i === 0)
				text = square[i].landcount;
			else
				text += " " + square[i].landcount;
		}
		
		document.getElementById("refresh").innerHTML += "<br><br><div><textarea type='text' style='width: 980px;' onclick='javascript:select();' />" + text + "</textarea></div>";
		popup("Congratulations, " + player[1].name + ", you have won the game.", true);
		
	} else {
		play();
	}
}

function chanceCommunityChest() {
	var p = player[turn];
	
	// Community Chest
	if (p.position === 2 || p.position === 17 || p.position === 33) {
		var communityChestIndex = communityChestCards.deck[communityChestCards.index];
		
		// Remove the get out of jail free card from the deck.
		if (communityChestIndex === 0) {
			communityChestCards.deck.splice(communityChestCards.index, 1);
		}
		
		popup("<img src='Images/community_chest_icon.png' style='height: 50px; width: 53px; float: left; margin: 8px 8px 8px 0px;' /><div style='font-weight: bold; font-size: 16px; '>Community Chest:</div><div style='text-align: justify;'>" + communityChestCards[communityChestIndex].text + "</div><div><input type='button' value='OK' onclick='cchestaction(" + communityChestIndex + ");' /></div>", false);
		
		communityChestCards.index++;
		
		if (communityChestCards.index >= communityChestCards.deck.length) {
			communityChestCards.index = 0;
		}
	
	// Chance
	} else if (p.position === 7 || p.position === 22 || p.position === 36) {
		var chanceIndex = chanceCards.deck[chanceCards.index];

		// Remove the get out of jail free card from the deck.
		if (chanceIndex === 0) {
			chanceCards.deck.splice(chanceCards.index, 1);
		}
		
		popup("<img src='Images/chance_icon.png' style='height: 50px; width: 26px; float: left; margin: 8px 8px 8px 0px;' /><div style='font-weight: bold; font-size: 16px; '>Chance:</div><div style='text-align: justify;'>" + chanceCards[chanceIndex].text + "</div><div><input type='button' value='OK' onclick='chanceaction(" + chanceIndex + ");' /></div>", false);
		
		chanceCards.index++;
		
		if (chanceCards.index >= chanceCards.deck.length) {
			chanceCards.index = 0;
		}
	} else {
		// if (!p.human) {
			// p.AI.alertList = "";
			// game.next();
		// }
	}
}

function chanceaction(chanceIndex) {
	var p = player[turn]; // This is needed for reference in action() method.
	
	hide('popupbackground');
	hide('popupwrap');
	chanceCards[chanceIndex].action();
	
	updatemoney();
	
	// if (chanceIndex !== 15 && !p.human) {
		// p.AI.alertList = "";
		// game.next();
	// }
}

function cchestaction(communityChestIndex) {
	var p = player[turn]; // This is needed for reference in action() method.
	
	hide('popupbackground');
	hide('popupwrap');
	communityChestCards[communityChestIndex].action();
	
	updatemoney();
	
	// if (communityChestIndex !== 15 && !p.human) {
		// p.AI.alertList = "";
		// game.next();
	// }
}

function addamount(amount, cause) {
	var p = player[turn];
	
	p.money += amount;
	
	addalert(p.name + " received $" + amount + " from " + cause + ".");
}

function subtractamount(amount, cause) {
	var p = player[turn];
	
	p.pay(amount, 0);
	
	addalert(p.name + " lost $" + amount + " from " + cause + ".");
}

function gotojail() {
	var p = player[turn];
	addalert(p.name + " was sent directly to jail.");
	document.getElementById("landed").innerHTML = "You are in jail.";
	
	p.jail = true;
	doublecount = 0;
	
	document.getElementById("nextbutton").value = "End turn";
	document.getElementById("nextbutton").title = "End turn and advance to the next player.";
	
	updateposition();
	updateowned();

	// if (!p.human) {
		// popup(p.AI.alertList + "<div><input type='button' value='OK' onclick='hide(\"popupbackground\"); hide(\"popupwrap\"); game.next();' /></div>", false);
		// p.AI.alertList = "";
	// }
}

function gobackthreespaces() {
	var p = player[turn];
	
	p.position -= 3;
	
	land();
}

function payeachplayer(amount, cause) {
	var p = player[turn];
	var total = 0;
	
	for (var i = 1; i <= pcount; i++) {
		if (i != turn) {
			player[i].money += amount;
			total += amount;
			creditor = p.money >= 0 ? i : creditor;
			
			p.pay(amount, creditor);
		}
	}
	
	addalert(p.name + " lost $" + total + " from " + cause + ".");
}

function collectfromeachplayer(amount, cause) {
	var p = player[turn];
	var total = 0;
	
	for (var i = 1; i <= pcount; i++) {
		if (i != turn) {
			money = player[i].money;
			if (money < amount) {
				p.money += money;
				total += money;
				player[i].money = 0;
			} else {
				player[i].pay(amount, turn);
				p.money += amount;
				total += amount;
			}
		}
	}
	
	addalert(p.name + " received $" + total + " from " + cause + ".");
}

function advance(destination, pass) {
	var p = player[turn];
	
	if (typeof pass === "number") {
		if (p.position < pass) {
			p.position = pass;
		} else {
			p.position = pass;
			p.money += 200;
			addalert(p.name + " collected a $200 salary for passing GO.");
		}
	}
	if (p.position < destination) {
		p.position = destination;
	} else {
		p.position = destination;
		p.money += 200;
		addalert(p.name + " collected a $200 salary for passing GO.");
	}
	
	land();
}

function advanceToNearestUtility() {
	var p = player[turn];
	
	if (p.position < 12) {
		p.position = 12;
	} else if (p.position >= 12 && p.position < 28) {
		p.position = 28;
	} else if (p.position >= 28) {
		p.position = 12;
		p.money += 200;
		addalert(p.name + " collected a $200 salary for passing GO.");
	}
	
	var s = square[p.position];
	
	show("landed");
	document.getElementById("landed").innerHTML = "You landed on " + s.name + ".";
	s.landcount++;
	addalert(p.name + " landed on " + s.name + ".");
	
	// Allow player to buy the property on which he landed.
	if (s.price !== 0 && s.owner === 0) {
		
		document.getElementById("landed").innerHTML = "<div>You landed on " + s.name + ".<input type='button' onclick='buy();' value='Buy ($" + s.price + ")' title='Buy " + s.name + " for " + s.pricetext + ".'/></div>";
		
		game.addPropertyToAuctionQueue(p.position);
		
	}
	
	// Collect rent
	if (s.owner > 0 && s.owner != turn && !s.mortgage) {
		var groupowned = true;
		var rent;
		
		// Utilities
		if (p.position == 12 || p.position == 28) {
			rent = (die1 + die2) * 10;
		}
		
		p.pay(rent, s.owner);
		player[s.owner].money += rent;
		
		document.getElementById("landed").innerHTML = "You landed on " + s.name + ". " + player[s.owner].name + " collected $" + rent + " rent.";
		addalert(p.name + " paid $" + rent + " rent to " + player[s.owner].name + ".");
	}
	
	updatemoney();
	updateposition();
	updateowned();
}

function advanceToNearestRailroad() {
	var p = player[turn];
	
	updateposition();
	
	if (p.position < 15) {
		p.position = 15;
	} else if (p.position >= 15 && p.position < 25) {
		p.position = 25;
	} else if (p.position >= 35) {
		p.position = 5;
		p.money += 200;
		addalert(p.name + " collected a $200 salary for passing GO.");
	}
	
	var s = square[p.position];
	
	show("landed");
	document.getElementById("landed").innerHTML = "You landed on " + s.name + ".";
	s.landcount++;
	addalert(p.name + " landed on " + s.name + ".");
	
	// Allow player to buy the property on which he landed.
	if (s.price !== 0 && s.owner === 0) {
		
		document.getElementById("landed").innerHTML = "<div>You landed on " + s.name + ".<input type='button' onclick='buy();' value='Buy ($" + s.price + ")' title='Buy " + s.name + " for " + s.pricetext + ".'/></div>";
		
		game.addPropertyToAuctionQueue(p.position);
		
	}
	
	// Collect rent
	if (s.owner > 0 && s.owner != turn && !s.mortgage) {
		var groupowned = true;
		var rent;
		
		// Railroads
		if (p.position == 5 || p.position == 15 || p.position == 25 || p.position == 35) {
			rent = 25;
			if (s.owner == square[5].owner) {
				rent *= 2;
			}
			if (s.owner == square[15].owner) {
				rent *= 2;
			}
			if (s.owner == square[25].owner) {
				rent *= 2;
			}
			if (s.owner == square[35].owner) {
				rent *= 2;
			}
		}
		
		p.pay(rent, s.owner);
		player[s.owner].money += rent;
		
		document.getElementById("landed").innerHTML = "You landed on " + s.name + ". " + player[s.owner].name + " collected $" + rent + " rent.";
		addalert(p.name + " paid $" + rent + " rent to " + player[s.owner].name + ".");
	}
	
	updatemoney();
	updateposition();
	updateowned();
}

function streetrepairs(houseprice, hotelprice) {
	var cost = 0;
	for (var i = 0; i < 40; i++) {
		var s = square[i];
		if (s.owner == turn) {
			if (s.hotel == 1)
				cost += hotelprice;
			else
				cost += s.house * houseprice;
		}
	}
	
	var p = player[turn];
	
	if (cost > 0) {
		p.pay(cost, 0);
		
		// If function was called by Community Chest.
		if (houseprice === 40) {
			addalert(p.name + " lost $" + cost + " to Community Chest.");
		} else {
			addalert(p.name + " lost $" + cost + " to Chance.");
		}
	}
	
}

function payfifty() {
	var p = player[turn];
	
	document.getElementById("jail").style.border = '1px solid black';
	document.getElementById("cell11").style.border = '2px solid ' + p.color;
	
	hide("landed");
	doublecount = 0;
	
	p.jail = false;
	p.jailroll = 0;
	p.position = 10;
	p.pay(50, 0);
	
	addalert(p.name + " paid the $50 fine to get out of jail.");
	updatemoney();
	updateposition();
}

function useJailCard() {
	var p = player[turn];
	
	document.getElementById("jail").style.border = '1px solid black';
	document.getElementById("cell11").style.border = '2px solid ' + p.color;
	
	hide("landed");
	p.jail = false;
	p.jailroll = 0;
	
	p.position = 10;
	
	doublecount = 0;
	
	if (p.communityChestJailCard) {
		p.communityChestJailCard = false;
		
		// Insert the get out of jail free card back into the community chest deck.
		communityChestCards.deck.splice(communityChestCards.index, 0, 0);
		
		communityChestCards.index++;
		
		if (communityChestCards.index >= communityChestCards.deck.length) {
			communityChestCards.index = 0;
		}
	} else if (p.chanceJailCard) {
		p.chanceJailCard = false;
		
		// Insert the get out of jail free card back into the chance deck.
		chanceCards.deck.splice(chanceCards.index, 0, 0);
		
		chanceCards.index++;
		
		if (chanceCards.index >= chanceCards.deck.length) {
			chanceCards.index = 0;
		}
	}
	
	addalert(p.name + " used a \"Get Out of Jail Free\" card.");
	updateowned();
	updateposition();
}

function buyhouse() {
	sq = square[getcheckedproperty()];
	p = player[sq.owner];
	
	if (p.money - sq.houseprice < 0) {
		if (sq.house == 4) {
			popup(p.name + ", you don't have enough money to buy a hotel for " + sq.name + ".", true);
			return;
		} else {
			popup(p.name + ", you don't have enough money to buy a house for " + sq.name + ".", true);
			return;
		}
		
	} else {
		var housesum = 0;
		var hotelsum = 0;
		
		for (var i = 0; i < 40; i++) {
			s = square[i];
			if (s.hotel == 1)
				hotelsum++;
			else
				housesum += s.house;
		}
		
		if (sq.house < 4) {
			if (housesum >= 32) {
				popup("All 32 houses are owned. You must wait until one is available.", true);
				return;
				
			} else {
				sq.house++;
				addalert(p.name + " placed a house on " + sq.name + ".");
			}
			
		} else {
			if (hotelsum >= 12) {
				popup("All 12 hotels are owned. You must wait until one is available.", true);
				return;
				
			} else {
				sq.house = 5;
				sq.hotel = 1;
				addalert(p.name + " placed a hotel on " + sq.name + ".");
			}
		}
		
		p.pay(sq.houseprice, 0);
		
		updateowned();
		updatemoney();
	}
}

function sellhouse() {
	sq = square[getcheckedproperty()];
	p = player[sq.owner];
	
	if (sq.hotel == 1) {
		sq.hotel = 0;
		sq.house = 4;
		addalert(p.name + " sold the hotel on " + sq.name + ".");
	} else {
		sq.house--;
		addalert(p.name + " sold a house on " + sq.name + ".");
	}
	p.money += sq.houseprice * 0.5;
	updateowned();
	updatemoney();
}

function showstats() {
	var HTML,
	sq,
	p;
	var mortgagetext,
	housetext;
	var write;
	HTML = "<table align='center'><tr>";
	
	for (var x = 1; x <= pcount; x++) {
		write = false;
		p = player[x];
		if (x == 5) {
			HTML += "</tr><tr>";
		}
		HTML += "<td class='statscell' id='statscell" + x + "' style='border: 2px solid " + p.color + "' ><div class='statsplayername'>" + p.name + "</div>";
		
		for (var i = 0; i < 40; i++) {
			sq = square[i];
			
			if (sq.owner == x) {
				mortgagetext = "",
				housetext = "";
				
				if (sq.mortgage) {
					mortgagetext = "title='Mortgaged' style='color: grey;'";
				}
				
				if (!write) {
					write = true;
					HTML += "<table>";
				}
				
				if (sq.house == 5) {
					housetext += "<span style='float: right; font-weight: bold;'>1&nbsp;x&nbsp;<img src='Images/hotel.png' alt='' title='Hotel' class='hotel' style='float: none;' /></span>";
				} else if (sq.house > 0 && sq.house < 5) {
					housetext += "<span style='float: right; font-weight: bold;'>" + sq.house + "&nbsp;x&nbsp;<img src='Images/house.png' alt='' title='House' class='house' style='float: none;' /></span>";
				}
				
				HTML += "<tr><td class='statscellcolor' style='background: " + sq.color + ";";
				
				if (sq.group == 1 || sq.group == 2) {
					HTML += " border: 1px solid grey; width: 16px;";
				}
				
				HTML += "' onmouseover='showdeed(" + i + ");' onmouseout='hidedeed();'></td><td class='statscellname' " + mortgagetext + ">" + sq.name + housetext + "</td></tr>";
			}
		}
		
		if (p.communityChestJailCard) {
			if (!write) {
				write = true;
				HTML += "<table>";
			}
			HTML += "<tr><td class='statscellcolor'></td><td class='statscellname'>Get Out of Jail Free Card</td></tr>";
			
		}
		if (p.chanceJailCard) {
			if (!write) {
				write = true;
				HTML += "<table>";
			}
			HTML += "<tr><td class='statscellcolor'></td><td class='statscellname'>Get Out of Jail Free Card</td></tr>";
			
		}
		
		if (!write) {
			HTML += p.name + " dosen't have any properties.";
		} else {
			HTML += "</table>";
		}
		
		HTML += "</td>";
	}
	HTML += "</tr></table><div id='titledeed'></div>";
	
	document.getElementById("statstext").innerHTML = HTML;
	show("statsbackground");
	show("statswrap");
}

function showdeed(property) {
	var sq = square[property];
	show("deed");
	hide("deed-normal");
	hide("deed-mortgaged");
	hide("deed-special");
	
	if (sq.mortgage) {
		show("deed-mortgaged");
		document.getElementById("deed-mortgaged-name").innerHTML = sq.name;
		document.getElementById("deed-mortgaged-mortgage").innerHTML = (sq.price / 2);
		
	} else {
		
		if (sq.group >= 3) {
			show("deed-normal");
			document.getElementById("deed-header").style.backgroundColor = sq.color;
			document.getElementById("deed-name").innerHTML = sq.name;
			document.getElementById("deed-baserent").innerHTML = sq.baserent;
			document.getElementById("deed-rent1").innerHTML = sq.rent1;
			document.getElementById("deed-rent2").innerHTML = sq.rent2;
			document.getElementById("deed-rent3").innerHTML = sq.rent3;
			document.getElementById("deed-rent4").innerHTML = sq.rent4;
			document.getElementById("deed-rent5").innerHTML = sq.rent5;
			document.getElementById("deed-mortgage").innerHTML = (sq.price / 2);
			document.getElementById("deed-houseprice").innerHTML = sq.houseprice;
			document.getElementById("deed-hotelprice").innerHTML = sq.houseprice;
			
		} else if (sq.group == 2) {
			show("deed-special");
			document.getElementById("deed-special-name").innerHTML = sq.name;
			document.getElementById("deed-special-text").innerHTML = utiltext();
			document.getElementById("deed-special-mortgage").innerHTML = (sq.price / 2);
			
		} else if (sq.group == 1) {
			show("deed-special");
			document.getElementById("deed-special-name").innerHTML = sq.name;
			document.getElementById("deed-special-text").innerHTML = transtext();
			document.getElementById("deed-special-mortgage").innerHTML = (sq.price / 2);
		}
	}
}

function hidedeed() {
	hide("deed");
}

function buy() {
	var p = player[turn];
	var property = square[p.position]
	var cost = property.price;
	
	if (p.money >= cost) {
		p.pay(cost, 0);
		
		property.owner = turn;
		updatemoney();
		addalert(p.name + " bought " + property.name + " for " + property.pricetext + ".");
		
		updateowned();
		
		hide("landed");
		
	} else {
		popup("<div>" + p.name + ", you need $" + (property.price - p.money) + " more to buy " + property.name + ".</div>", true);
	}
}

function mortgage() {
	sq = square[getcheckedproperty()];
	p = player[sq.owner];
	
	if (sq.house > 0 || sq.hotel > 0)
		return;
	
	var price = sq.price * 0.5;
	
	if (confirm(p.name + ", are you sure you want to mortgage " + sq.name + " for $" + price + "?")) {
		sq.mortgage = true;
		p.money += price;
		
		document.getElementById("mortgagebutton").value = "Unmortgage for $" + Math.round(sq.price * 0.6);
		document.getElementById("mortgagebutton").title = "Unmortgage " + sq.name + " for $" + Math.round(sq.price * 0.6) + ".";
		
		addalert(p.name + " mortgaged " + sq.name + " for $" + price + ".");
		updateowned();
		
		// Check for bankruptcy.
		p.pay(0, p.creditor);
	}
}

function unmortgage() {
	sq = square[getcheckedproperty()];
	p = player[sq.owner];
	
	var price = Math.round(sq.price * 0.6);
	if (price <= p.money) {
		if (confirm(p.name + ", are you sure you want to unmortgage " + sq.name + " for $" + price + "?")) {
			p.pay(price, 0);
			sq.mortgage = false;
			document.getElementById("mortgagebutton").value = "Mortgage for $" + (sq.price * 0.5);
			document.getElementById("mortgagebutton").title = "Mortgage " + sq.name + " for $" + (sq.price * 0.5) + ".";
			
			addalert(p.name + " unmortgaged " + sq.name + " for $" + price + ".");
			updateowned();
			return true;
		}
	} else {
		popup("You don't have enough money to unmortgage this property.", true);
	}
	return false;
}

function trade() {
	hide("board");
	hide("control");
	show("trade");
	
	if (turn == 1)
		var rightp = player[2];
	else
		var rightp = player[1];
	
	var leftp = player[turn];
	var sq;
	var allGroupUninproved;
	var leftHTML = "";
	var rightHTML = "";
	var mortgagetext = "";
	
	for (var i = 0; i < 40; i++) {
		sq = square[i];
		allGroupUninproved = true;
		
		for (var x = 0; x < 40; x++) {
			s = square[x];
			if (s.owner == sq.owner && s.group == sq.group && s.house > 0)
				allGroupUninproved = false;
		}
		
		if (sq.owner == turn && sq.house === 0 && allGroupUninproved) {
			
			mortgagetext = "";
			if (sq.mortgage) {
				mortgagetext = "title='Mortgaged' style='color: grey;'";
			}
			
			if (leftHTML == "") {
				leftHTML += "<table>";
			}
			
			leftHTML += "<tr onclick='tradecell_onclick(this, " + i + ", true);'><td class='propertycellcheckbox'><input type='checkbox' id='tradeleftcheckbox" + i + "' /></td><td class='propertycellcolor' style='background: " + sq.color + ";'></td><td class='propertycellname' " + mortgagetext + ">" + sq.name + "</td></tr>";
		} else if (sq.owner == rightp.index) {
			
			mortgagetext = "";
			if (sq.mortgage) {
				mortgagetext = "title='Mortgaged' style='color: grey;'";
			}
			
			if (rightHTML == "") {
				rightHTML += "<table>";
			}
			
			rightHTML += "<tr onclick='tradecell_onclick(this, " + i + ", false);'><td class='propertycellcheckbox'><input type='checkbox' id='traderightcheckbox" + i + "' /></td><td class='propertycellcolor' style='background: " + sq.color + ";'></td><td class='propertycellname' " + mortgagetext + ">" + sq.name + "</td></tr>";
		}
	}
	
	if (leftp.communityChestJailCard) {
		if (leftHTML == "") {
			leftHTML += "<table>";
		}
		leftHTML += "<tr onclick='tradecell_onclick(this, 40, true);'><td class='propertycellcheckbox'><input type='checkbox' id='tradeleftcheckbox40' /></td><td class='propertycellcolor' style='background: white;'></td><td class='propertycellname'>Get Out of Jail Free Card</td></tr>";
	}
	
	if (leftp.chanceJailCard) {
		if (leftHTML == "") {
			leftHTML += "<table>";
		}
		leftHTML += "<tr onclick='tradecell_onclick(this, 41, true);'><td class='propertycellcheckbox'><input type='checkbox' id='tradeleftcheckbox41' /></td><td class='propertycellcolor' style='background: white;'></td><td class='propertycellname'>Get Out of Jail Free Card</td></tr>";
	}
	
	if (leftHTML == "") {
		leftHTML = leftp.name + " has no properties.";
	} else {
		leftHTML += "</table>";
	}
	
	document.getElementById("trade-leftp-property").innerHTML = leftHTML;
	
	if (rightp.communityChestJailCard) {
		if (rightHTML == "") {
			rightHTML += "<table>";
		}
		rightHTML += "<tr onclick='tradecell_onclick(this, 40, false);'><td class='propertycellcheckbox'><input type='checkbox' id='traderightcheckbox40' /></td><td class='propertycellcolor' style='background: white;'></td><td class='propertycellname'>Get Out of Jail Free Card</td></tr>";
	}
	
	if (rightp.chanceJailCard) {
		if (rightHTML == "") {
			rightHTML += "<table>";
		}
		rightHTML += "<tr onclick='tradecell_onclick(this, 41, false);'><td class='propertycellcheckbox'><input type='checkbox' id='traderightcheckbox41' /></td><td class='propertycellcolor' style='background: white;'></td><td class='propertycellname'>Get Out of Jail Free Card</td></tr>";
	}
	
	if (rightHTML == "") {
		rightHTML = rightp.name + " has no properties.";
	} else {
		rightHTML += "</table>";
	}
	
	document.getElementById("trade-rightp-property").innerHTML = rightHTML;
	
	var leftHTML,
	rightHTML;
	for (var i = 1; i <= pcount; i++) {
		
		if (i == leftp.index) {
			leftHTML += "<option selected='selected' value='" + i + "' style='color: " + player[i].color + ";'>" + player[i].name + "</option>";
		} else if (i == rightp.index) {
			rightHTML += "<option selected='selected' value='" + i + "' style='color: " + player[i].color + ";'>" + player[i].name + "</option>";
		} else {
			rightHTML += "<option value='" + i + "' style='color: " + player[i].color + ";'>" + player[i].name + "</option>";
			leftHTML += "<option value='" + i + "' style='color: " + player[i].color + ";'>" + player[i].name + "</option>";
		}
	}
	
	document.getElementById("trade-leftp-name").innerHTML = leftHTML;
	document.getElementById("trade-rightp-name").innerHTML = rightHTML;
	
	tradepname_onchange(document.getElementById("trade-rightp-name"));
	
	document.getElementById("trade-leftp-money").value = 0;
	document.getElementById("trade-rightp-money").value = 0;
}

function finishtrade() {
	var rightp = player[parseInt(document.getElementById("trade-rightp-name").value)],
	leftp = player[parseInt(document.getElementById("trade-leftp-name").value)];
	
	var tradetext = "";
	
	var leftmoney = document.getElementById("trade-leftp-money").value;
	var rightmoney = document.getElementById("trade-rightp-money").value;
	
	leftmoney = leftmoney == "" ? 0 : parseInt(leftmoney);
	rightmoney = rightmoney == "" ? 0 : parseInt(rightmoney);
	
	if (isNaN(leftmoney) || isNaN(rightmoney)) {
		return false;
	}
	
	if (leftmoney > leftp.money) {
		document.getElementById("trade-leftp-money").value = "You cannot trade more money than you have.";
		document.getElementById("trade-leftp-money").style.color = "red";
		return false;
	} else if (rightmoney > rightp.money) {
		document.getElementById("trade-rightp-money").value = "You cannot trade more money than you have.";
		document.getElementById("trade-rightp-money").style.color = "red";
		return false;
	}
	
	var isapropertychecked = false;
	
	// Exchange properties
	for (var i = 0; i < 42; i++) {
		
		if (document.getElementById("tradeleftcheckbox" + i) != null && document.getElementById("tradeleftcheckbox" + i).checked == true) {
			if (!isapropertychecked && !confirm(rightp.name + ", do you want to make this exchange with " + leftp.name + "?")) {
				return false;
			}
			isapropertychecked = true;
			
			if (i >= 40) {
				if (leftp.communityChestJailCard) {
					leftp.communityChestJailCard = false;
					rightp.communityChestJailCard = true;
					addalert(rightp.name + ' received a "Get Out of Jail Free" card from ' + leftp.name + ".");
				} else if (leftp.chanceJailCard) {
					leftp.chanceJailCard = false;
					rightp.chanceJailCard = true;
					addalert(rightp.name + ' received a "Get Out of Jail Free" card from ' + leftp.name + ".");
				}
			} else {
				square[i].owner = rightp.index;
				addalert(rightp.name + " received " + square[i].name + " from " + leftp.name + ".");
			}
		}
		if (document.getElementById("traderightcheckbox" + i) != null && document.getElementById("traderightcheckbox" + i).checked == true) {
			if (!isapropertychecked && !confirm(rightp.name + ", do you want to make this exchange with " + leftp.name + "?")) {
				return false;
			}
			isapropertychecked = true;
			
			if (i >= 40) {
				if (rightp.communityChestJailCard) {
					rightp.communityChestJailCard = false;
					leftp.communityChestJailCard = true;
					addalert(leftp.name + ' received a "Get Out of Jail Free" card from ' + rightp.name + ".");
				} else if (rightp.chanceJailCard) {
					rightp.chanceJailCard = false;
					leftp.chanceJailCard = true;
					addalert(leftp.name + ' received a "Get Out of Jail Free" card from ' + rightp.name + ".");
				}
			} else {
				square[i].owner = leftp.index;
				addalert(leftp.name + " received " + square[i].name + " from " + rightp.name + ".");
			}
		}
		
	}
	updateowned();
	
	if (!isapropertychecked) {
		popup("You must select one or more properties.", true);
		
		return false;
	}
	
	// Exchange money.
	leftp.pay(leftmoney, rightp.index);
	leftp.money += rightmoney;
	if (rightmoney) {
		addalert(leftp.name + " received $" + rightmoney + " from " + rightp.name + ".");
	}
	
	rightp.pay(rightmoney, leftp.index);
	rightp.money += leftmoney;
	if (leftmoney) {
		addalert(rightp.name + " received $" + leftmoney + " from " + leftp.name + ".");
	}
	
	updatemoney();
	
	show("board");
	show("control");
	hide("trade");
}

function land() {
	var p = player[turn];
	var s = square[p.position];
	
	var die1 = game.getDie(1);
	var die2 = game.getDie(2);
	
	show("landed");
	document.getElementById("landed").innerHTML = "You landed on " + s.name + ".";
	s.landcount++;
	addalert(p.name + " landed on " + s.name + ".");
	
	// Allow player to buy the property on which he landed.
	if (s.price !== 0 && s.owner === 0) {
		
		// if (!p.human) {
			
			// if (p.AI.buyProperty(p.position)) {
				// buy();
			// }
		// } else {
			document.getElementById("landed").innerHTML = "<div>You landed on <a href='javascript:void(0);' onmouseover='showdeed(" + p.position + ");' onmouseout='hidedeed();' class='statscellcolor'>" + s.name + "</a>.<input type='button' onclick='buy();' value='Buy ($" + s.price + ")' title='Buy " + s.name + " for " + s.pricetext + ".'/></div>";
		// }
		
		
		game.addPropertyToAuctionQueue(p.position);
	}
	
	// Collect rent
	if (s.owner !== 0 && s.owner != turn && !s.mortgage) {
		var groupowned = true;
		var rent;
		
		// Railroads
		if (p.position == 5 || p.position == 15 || p.position == 25 || p.position == 35) {
			rent = 12.5;
			if (s.owner == square[5].owner) {
				rent *= 2;
			}
			if (s.owner == square[15].owner) {
				rent *= 2;
			}
			if (s.owner == square[25].owner) {
				rent *= 2;
			}
			if (s.owner == square[35].owner) {
				rent *= 2;
			}
			
		} else if (p.position === 12) {
			if (square[28].owner == s.owner) {
				rent = (die1 + die2) * 10;
			} else {
				rent = (die1 + die2) * 4;
			}
			
		} else if (p.position === 28) {
			if (square[12].owner == s.owner) {
				rent = (die1 + die2) * 10;
			} else {
				rent = (die1 + die2) * 4;
			}
			
		} else {
			
			for (var i = 0; i < 40; i++) {
				sq = square[i];
				if (sq.group == s.group && sq.owner != s.owner) {
					groupowned = false;
				}
			}
			
			if (!groupowned) {
				rent = s.baserent;
			} else {
				if (s.house === 0) {
					rent = s.baserent * 2;
				} else {
					rent = s["rent" + s.house];
				}
			}
		}
		
		addalert(p.name + " paid $" + rent + " rent to " + player[s.owner].name + ".");
		p.pay(rent, s.owner);
		player[s.owner].money += rent;
		
		document.getElementById("landed").innerHTML = "You landed on " + s.name + ". " + player[s.owner].name + " collected $" + rent + " rent.";
	} else if (s.owner > 0 && s.owner != turn && s.mortgage) {
		document.getElementById("landed").innerHTML = "You landed on " + s.name + ". Property is mortgaged; no rent was collected.";
	}
	
	// City Tax
	if (p.position === 4) {
		citytax();
	}
	
	// Go to jail. Go directly to Jail. Do not pass GO. Do not collect $200.
	if (p.position === 30) {
		updatemoney();
		updateposition();
		
		// if (p.human) {
			popup("<div>Go to jail. Go directly to Jail. Do not pass GO. Do not collect $200.</div><div><input type='button' value='OK' onclick=" + '"' + "hide('popupbackground'); hide('popupwrap'); gotojail();" + '"' + " /></div>", false);
		// } else {
			// gotojail();
		// }

		return;
	}
	
	// Luxury Tax
	if (p.position === 38) {
		luxurytax();
	}

	updatemoney();
	updateposition();
	updateowned();
	
	// if (!p.human) {
		// popup(p.AI.alertList + "<div><input type='button' value='OK' onclick='hide(\"popupbackground\"); hide(\"popupwrap\"); chanceCommunityChest();' /></div>", false);
		// p.AI.alertList = "";
	// } else {
		chanceCommunityChest();
	// }
}

function roll() {
	var p = player[turn];
	
	hide("option");
	show("buy");
	hide("manage");
	
	document.getElementById("nextbutton").value = "End turn";
	document.getElementById("nextbutton").title = "End turn and advance to the next player.";
	
	game.rollDice();
	var die1 = game.getDie(1);
	var die2 = game.getDie(2);
	
	doublecount++;
	
	if (die1 == die2 && !p.jail) {
		updatedice(die1, die2);
		addalert(p.name + " rolled " + (die1 + die2) + " - doubles.");
		
		if (doublecount < 3) {
			document.getElementById("nextbutton").value = "Roll again";
			document.getElementById("nextbutton").title = "You threw doubles. Roll again.";
			
		// If player rolls doubles three times in a row, send him to jail
		} else if (doublecount === 3) {
			p.jail = true;
			doublecount = 0;
			addalert(p.name + " rolled doubles three times in a row.");
			updatemoney(); 
			
			
			// if (p.human) {
				buttonAonclick = 'hide("popupbackground"); hide("popupwrap"); gotojail();';
				popup("You rolled doubles three times in a row. Go to jail.<div><input type='button' value='OK' onclick='" + buttonAonclick + "' /></div>", false);			
			// } else {
				// gotojail();
			// }
			
			return;
		}
	} else {
		document.getElementById("nextbutton").value = "End turn";
		document.getElementById("nextbutton").title = "End turn and advance to the next player.";
		addalert(p.name + " rolled " + (die1 + die2) + ".");
		doublecount = 0;
	}
	
	updateposition();
	updatemoney();
	updateowned();
	
	if (p.jail === true) {
		p.jailroll++;
		
		if (p.jailroll === 3 && (p.communityChestJailCard || p.chanceJailCard)) {
			updatedice(die1, die2);
			if (die1 == die2) {
				document.getElementById("jail").style.border = "1px solid black";
				document.getElementById("cell11").style.border = "2px solid " + p.color;
				hide("landed");
				
				p.jail = false;
				p.jailroll = 0;
				p.position = 10 + die1 + die2;
				doublecount = 0;
				
				addalert(p.name + " rolled doubles and got out of jail.");
				
				land();
			} else {
				buttonAonclick = 'hide("popupbackground"); hide("popupwrap"); payfifty(); player[turn].position+=' + (die1 + die2) + '; land();';
				popup("You must pay the $50 fine.<div><input type='button' value='OK' onclick='" + buttonAonclick + "' /></div>", false);
			}
			
		} else {
			
			updatedice(die1, die2);
			
			show("landed");
			document.getElementById("landed").innerHTML = "You are in jail.";
			
			if (die1 == die2) {
				document.getElementById("jail").style.border = '1px solid black';
				document.getElementById("cell11").style.border = '2px solid ' + p.color;
				
				hide("landed");
				p.jail = false;
				p.jailroll = 0;
				doublecount = 0;
				
				p.position = 10 + die1 + die2;
				
				addalert(p.name + " rolled doubles and got out of jail.");
				
				land();
			}
			
			if (p.jailroll === 3) {
				
				buttonAonclick = 'hide("popupbackground"); hide("popupwrap"); payfifty(); player[turn].position+=' + (die1 + die2) + '; land();';
				popup("You must pay the $50 fine.<div><input type='button' value='OK' onclick='" + buttonAonclick + "' /></div>", false);
			}
		}
		
	} else {
		updatedice(die1, die2);
		
		// Move player
		p.position += die1 + die2;
		
		// Collect $200 salary as you pass GO
		if (p.position >= 40) {
			p.position -= 40;
			p.money += 200;
			addalert(p.name + " collected a $200 salary for passing GO.");
		}
		
		land();
	}
}

function play() {
	if (game.auction()) {
		return;
	}
	
	turn++;
	if (turn > pcount) {
		turn -= pcount;
	}
	
	var p = player[turn];
	game.resetDice();
	
	document.getElementById("pname").innerHTML = p.name;
	
	addalert("It is " + p.name + "'s turn.");
	
	// Check for bankruptcy.
	p.pay(0, p.creditor);
	
	hide("landed");
	hide("option");
	show("control");
	show("board");
	show("viewstats");
	show("buy");
	hide("manage");
	
	doublecount = 0;
	document.getElementById("nextbutton").value = "Roll Dice";
	document.getElementById("nextbutton").title = "Roll the dice and move your token accordingly.";
	
	hide("die1");
	hide("die2");
	
	if (p.jail) {
		show("landed");
		document.getElementById("landed").innerHTML = "You are in jail.<input type='button' title='Pay $50 fine to get out of jail immediately.' value='Pay $50 fine' onclick='payfifty();' />";
		
		if (p.communityChestJailCard || p.chanceJailCard) {
			document.getElementById("landed").innerHTML += "<input type='button' id='gojfbutton' title='Use &quot;Get Out of Jail Free&quot; card.' onclick='useJailCard();' value='Use Card' />";
		}
		
		document.getElementById("nextbutton").title = "Roll the dice. If you throw doubles, you will get out of jail.";
		
		if (p.jailroll === 0)
			addalert("This is " + p.name + "'s first turn in jail.");
		else if (p.jailroll === 1)
			addalert("This is " + p.name + "'s second turn in jail.");
		else if (p.jailroll === 2) {
			document.getElementById("landed").innerHTML += "<div>NOTE: If you do not throw doubles after this roll, you <i>must</i> pay the $50 fine.</div>";
			addalert("This is " + p.name + "'s third turn in jail.");
		}
		
	}
	
	updatemoney();
	updateposition();
	updateowned();
	
	for (var i = 1; i <= pcount; i++) {
		hide("p" + i + "arrow");
	}
	
	show("p" + turn + "arrow");
	
	// if (!p.human) {
		// game.next()
	// }
}

function setup() {
	pcount = parseInt(document.getElementById("playernumber").value);
	
	var playerArray = new Array(pcount);
	
	playerArray.randomize();
	
	for (var i = 1; i <= pcount; i++) {
		index = playerArray[i - 1];
		
		player[index].name = document.getElementById("player" + i + "name").value;
		player[index].color = document.getElementById("player" + i + "color").value.toLowerCase();
	}
	
	show("board");
	hide("setup");
	show("moneybar");
	
	if (pcount === 2) {
		document.getElementById("stats").style.width = "454px";
	} else if (pcount === 3) {
		document.getElementById("stats").style.width = "680px";
	}
	
	document.getElementById("stats").style.top = "0px";
	document.getElementById("stats").style.left = "0px";

	play();
}

function togglecheck(elementid) {
	element = document.getElementById(elementid);
	
	if (window.event.srcElement.id == elementid)
		return;
	
	if (element.checked)
		element.checked = false;
	else
		element.checked = true;
}

function getcheckedproperty() {
	for (var i = 0; i < 42; i++) {
		if (document.getElementById("propertycheckbox" + i) != null && document.getElementById("propertycheckbox" + i).checked == true) {
			return i;
		}
	}
	return -1; // No property is checked.
}

function propertycell_onclick(element, num) {
	togglecheck("propertycheckbox" + num);
	if (document.getElementById("propertycheckbox" + num).checked) {
		
		// Uncheck all other boxes.
		for (var i = 0; i < 40; i++) {
			if (i !== num && document.getElementById("propertycheckbox" + i) != null) {
				document.getElementById("propertycheckbox" + i).checked = false;
			}
		}
	}
	
	updateoption();
}

function tradecell_onclick(element, num, isleft) {
	var side = isleft ? "left" : "right";
	
	togglecheck("trade" + side + "checkbox" + num);
}

function tradepname_onchange(element) {
	var pnum = parseInt(element.value);
	var p = player[pnum],
	sq;
	var HTML = "",
	mortgagetext = "";
	var side = element.id.slice(6, -6);
	var isleft = side == "left" ? "true" : "false";
	
	for (var i = 0; i < 40; i++) {
		sq = square[i];
		if (sq.owner == pnum) {
			
			mortgagetext = "";
			if (sq.mortgage) {
				mortgagetext = "title='Mortgaged' style='color: grey;'";
			}
			
			if (HTML == "") {
				HTML += "<table>";
			}
			
			HTML += "<tr onclick='tradecell_onclick(this, " + i + ", " + isleft + ");'><td class='propertycellcheckbox'><input type='checkbox' id='trade" + side + "checkbox" + i + "' /></td><td class='propertycellcolor' style='background: " + sq.color + ";'></td><td class='propertycellname' " + mortgagetext + ">" + sq.name + "</td></tr>";
		}
	}
	
	if (p.communityChestJailCard) {
		if (HTML == "") {
			HTML += "<table>";
		}
		HTML += "<tr onclick='tradecell_onclick(this, 40, " + isleft + ");'><td class='propertycellcheckbox'><input type='checkbox' id='trade" + side + "checkbox40' /></td><td class='propertycellcolor' style='background: white;'></td><td class='propertycellname'>Get Out of Jail Free Card</td></tr>";
	}
	
	if (p.chanceJailCard) {
		if (HTML == "") {
			HTML += "<table>";
		}
		HTML += "<tr onclick='tradecell_onclick(this, 41, " + isleft + ");'><td class='propertycellcheckbox'><input type='checkbox' id='trade" + side + "checkbox41' /></td><td class='propertycellcolor' style='background: white;'></td><td class='propertycellname'>Get Out of Jail Free Card</td></tr>";
	}
	
	if (HTML == "") {
		HTML = p.name + " has no properties.";
	} else {
		HTML += "</table>";
	}
	
	document.getElementById("trade-" + side + "p-property").innerHTML = HTML;
	
	var leftpnum = parseInt(document.getElementById("trade-leftp-name").value);
	var rightpnum = parseInt(document.getElementById("trade-rightp-name").value);
	
	var leftHTML,
	rightHTML;
	for (var i = 1; i <= pcount; i++) {
		
		if (i == leftpnum) {
			leftHTML += "<option selected='selected' value='" + i + "' style='color: " + player[i].color + ";'>" + player[i].name + "</option>";
		} else if (i == rightpnum) {
			rightHTML += "<option selected='selected' value='" + i + "' style='color: " + player[i].color + ";'>" + player[i].name + "</option>";
		} else {
			rightHTML += "<option value='" + i + "' style='color: " + player[i].color + ";'>" + player[i].name + "</option>";
			leftHTML += "<option value='" + i + "' style='color: " + player[i].color + ";'>" + player[i].name + "</option>";
		}
	}
	
	document.getElementById("trade-leftp-name").innerHTML = leftHTML;
	document.getElementById("trade-rightp-name").innerHTML = rightHTML;
	
}

function tradepmoney_onchange(element) {
	amount = element.value;
	
	if (isNaN(amount)) {
		element.value = "This value must be a number.";
		element.style.color = "red";
		return false;
	}
	
	amount = amount == "" ? 0 : Math.round(amount);
	element.value = amount;
	
	if (amount < 0) {
		element.value = "This value must be greater than 0.";
		element.style.color = "red";
		return false;
	}
	
	return true;
}

function playernumber_onchange() {
	pcount = parseInt(document.getElementById("playernumber").value);
	
	for (var i = 1; i <= 8; i++) {
		hide("player" + parseInt(i) + "input");
	}
	
	for (var i = 1; i <= pcount; i++) {
		show("player" + parseInt(i) + "input");
	}
}

function menuitem_onmouseover(element) {
	element.className = "menuitem menuitem_hover";
	return;
}

function menuitem_onmouseout(element) {
	element.className = "menuitem";
	return;
}

function bid_onfocus(element) {
	element.style.color = "black";
	if (isNaN(element.value)) {
		element.value = "";
	}
}

function bid_onkeydown(element) {
	var key;
	var isCtrl = false;
	var keychar;
	var reg;
	
	if (window.event) {
		key = window.event.keyCode;
		isCtrl = window.event.ctrlKey
	} else if (window.event.which) {
		key = window.event.which;
		isCtrl = window.event.ctrlKey;
	}
	
	if (isNaN(key))
		return true;
	
	keychar = String.fromCharCode(key);
	
	if (key == 13) {
		auctionbid();
		return false;
	}
	
	// check for backspace or delete, or if Ctrl was pressed
	if (key == 8 || key == 9 || isCtrl || key == 46 || (key >= 35 && key <= 40)) {
		return true;
	}
	
	if (window.event.shiftKey) {
		return false;
	}
	
	reg = /\d/;
	
	return reg.test(keychar);
}

window.onload = function() {
	for (var i = 0; i <= 8; i++) {
		player[i] = new Player("", "");
		player[i].index = i;
	}
	
	player[0].name = "the bank";
	
	communityChestCards.index = 0;
	chanceCards.index = 0;
	
	communityChestCards.deck = [];
	chanceCards.deck = [];
	
	for (var i = 0; i < 16; i++) {
		chanceCards.deck[i] = i;
		communityChestCards.deck[i] = i;
	}
	
	// Shuffle Chance and Community Chest decks.
	chanceCards.deck.sort(function() {return Math.random() - 0.5;});
	communityChestCards.deck.sort(function() {return Math.random() - 0.5;});
	
	document.getElementById("playernumber").onchange = playernumber_onchange;
	playernumber_onchange();
	
	document.getElementById("nextbutton").onclick = game.next;
	
	show("setup");
	show("noF5");
	
	var enlargeWrap = document.body.appendChild(document.createElement("div"));
	
	enlargeWrap.id = "enlarge-wrap";
	
	var HTML = "";
	for (var i = 0; i < 40; i++) {
		HTML += "<div id='enlarge" + parseInt(i) + "' class='enlarge'>";
		HTML += "<div id='enlarge" + parseInt(i) + "color' class='enlarge-color'></div><br /><div id='enlarge" + parseInt(i) + "name' class='enlarge-name'></div>";
		HTML += "<br /><div id='enlarge" + parseInt(i) + "price' class='enlarge-price'></div>";
		HTML += "<br /><div id='enlarge" + parseInt(i) + "token' class='enlarge-token'></div></div>";
	}

	enlargeWrap.innerHTML = HTML;
	
	var currentCell;
	var currentCellAnchor;
	var currentCellPositionHolder;
	var currentCellName;
	var currentCellOwner;
	
	for (var i = 0; i < 40; i++) {
	
		s = square[i];
		
		currentCell = document.getElementById("cell" + i);
		
		currentCellAnchor = currentCell.appendChild(document.createElement("div"));
		currentCellAnchor.id = "cell" + i + "anchor";
		currentCellAnchor.className = "cell-anchor";
		
		currentCellPositionHolder = currentCellAnchor.appendChild(document.createElement("div"));
		currentCellPositionHolder.id = "cell" + i + "positionholder";
		currentCellPositionHolder.className = "cell-position-holder";
		currentCellPositionHolder.enlargeId = "enlarge" + i;
		
		currentCellName = currentCellAnchor.appendChild(document.createElement("div"));
		currentCellName.id = "cell" + i + "name";
		currentCellName.className = "cell-name";
		currentCellName.textContent = s.name;
		
		if (square[i].group) {
			currentCellOwner = currentCellAnchor.appendChild(document.createElement("div"));
			currentCellOwner.id = "cell" + i + "owner";
			currentCellOwner.className = "cell-owner";
		}
		
		document.getElementById("enlarge" + i + "color").style.backgroundColor = s.color;
		document.getElementById("enlarge" + i + "name").textContent = s.name;
		document.getElementById("enlarge" + i + "price").textContent = s.pricetext;
		
		currentCellPositionHolder.onmouseover = function() {show("enlarge-wrap"); show(this.enlargeId);};
		currentCellPositionHolder.onmouseout = function() {hide('enlarge-wrap'); hide(this.enlargeId);};
	}

	corrections();
	
	// Jail corrections
	var jail = document.getElementById("jail");
	jail.innerHTML = "Jail<div id='jailpositionholder'></div>";
	document.getElementById("enlarge-wrap").innerHTML += "<div id='enlarge40' class='enlarge'><div id='enlarge40color' class='enlarge-color'></div><br /><div id='enlarge40name' class='enlarge-name'></div><br /><div id='enlarge40price' class='enlarge-price'><img src='Images/jake_icon.png' height='80' width='80' alt='' style='position: relative; top: -20px;' /></div><br /><div id='enlarge40token' class='enlarge-token'></div></div>";
	
	document.getElementById("enlarge40name").innerHTML = "Jail";
	
	var nn6 = document.getElementById && !document.all;
	var drag, dragX, dragY, dragObj, dragTop, dragLeft;
	
	window.onmousemove = function(e) {
		var object = nn6 ? e.target : window.event.srcElement;
		
		if (object.classList.contains("cell-position") || object.classList.contains("cell-position-holder") || object.id === "jail") {
			
			if (e.clientY + 20 > window.innerHeight - 204) {
				enlargeWrap.style.top = window.innerHeight - 204;
			} else {
				enlargeWrap.style.top = e.clientY + 20;
			}
			
			enlargeWrap.style.left = e.clientX + 10;
			
		} else if (object.className == "propertycellcolor" || object.className == "statscellcolor") {
			if (e.clientY + 20 > window.innerHeight - 279) {
				document.getElementById("deed").style.top = window.innerHeight - 279;
			} else {
				document.getElementById("deed").style.top = e.clientY + 20;
			}
			document.getElementById("deed").style.left = e.clientX + 10;
		}
		
		if (drag) {
			dragObj.style.left = dragLeft + window.event.clientX - dragX;
			dragObj.style.top = dragTop + window.event.clientY - dragY;
			return false;
		}
	}
	
	window.onmouseup = function mouseup() {
		drag = false;
	}
	
	document.getElementById("statsdrag").onmousedown = function() {
		dragObj = document.getElementById("stats");
		dragObj.style.position = "relative";
		
		dragTop = dragObj.style.top ? parseInt(dragObj.style.top) : 0;
		dragLeft = dragObj.style.left ? parseInt(dragObj.style.left) : 0;
		
		dragX = window.event.clientX;
		dragY = window.event.clientY;
		
		drag = true;
	}

	document.getElementById("popupdrag").onmousedown = function() {
		dragObj = document.getElementById("popup");
		dragObj.style.position = "relative";
		
		dragTop = dragObj.style.top ? parseInt(dragObj.style.top) : 0;
		dragLeft = dragObj.style.left ? parseInt(dragObj.style.left) : 0;
		
		dragX = window.event.clientX;
		dragY = window.event.clientY;
		
		drag = true;
	}
	
	// Add images to enlarges.
	document.getElementById("enlarge0token").innerHTML += '<img src="Images/arrow_icon.png" height="40" width="136" alt="" />';
	document.getElementById("enlarge20price").innerHTML += "<img src='Images/free_parking_icon.png' height='80' width='72' alt='' style='position: relative; top: -20px;' />";
	document.getElementById("enlarge38token").innerHTML += '<img src="Images/tax_icon.png" height="60" width="70" alt="" style="position: relative; top: -20px;" />';
};
