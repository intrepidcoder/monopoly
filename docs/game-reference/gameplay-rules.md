# Shared gameplay rules

This file describes shared runtime behavior referenced by the individual entity pages. References use repository-relative source paths and one-based line numbers.

## Runtime and scope

`index.html:8-12` loads `classicedition.js`, `ai.js`, then `monopoly.js`; the `newyorkcityedition.js` script tag is commented out. The edition file defines the global `square`, `communityChestCards`, and `chanceCards` data consumed by the engine, so only one edition can be active at a time. The page supports two to eight participants (`index.html:245-247`). Setup creates `Player` objects and optionally attaches `AITest` (`monopoly.js:2610-2658`).

The classic edition and New York City edition each define 40 squares and two 16-card decks (`classicedition.js:73-150`; `newyorkcityedition.js:73-150`). The latter is implemented source data, but is not reachable from the shipped page without changing its script include. Its board/card functions also contain `addalert(...)` calls while the engine exports `addAlert(...)` (`newyorkcityedition.js:49-70`, `monopoly.js:1221`); activating it as-is can therefore fail when its tax helpers run. Neither edition's `corrections()` is called by `index.html` or `monopoly.js`.

## Square state and board groups

The edition-level `Square` constructor (`classicedition.js:1-29`; mirrored in `newyorkcityedition.js:1-29`) stores `name`, display price text, color, owner, mortgage, house/hotel counts, group number, purchase price, base and improved rents, and landing count. New squares begin unowned (`owner === 0`), unmortgaged, unimproved, and with a zero landing count. It assigns building prices by group: groups 3-4 cost $50, groups 5-6 $100, groups 7-8 $150, groups 9-10 $200; railroad/utility/special groups have no building price. At page initialization, `window.onload` in `monopoly.js:2706-2757` builds each numbered group's member list, assigns each square its board index, and shuffles the decks.

Group 1 denotes railroads/transit; group 2 denotes utilities; groups 3-10 are color streets. Streets can be built on only when the owner has the full group and every group property is unmortgaged. Building/selling is even across the group. The engine allows at most four houses then one hotel per street, with shared bank limits of 32 houses and 12 hotels (`monopoly.js:1548-1704`, `2020-2085`). A hotel is represented as `house === 5` and `hotel === 1`. Improvements block mortgaging or trading the color group until all are sold; sale returns half the building price.

## Turns, movement, and landing

`Game.rollDice`, `roll`, and `play` implement two random six-sided dice, turn progression, doubles, jail attempts, and movement (`monopoly.js:12-38`, `2417-2608`). A player moving past index 39 wraps around and receives $200; landing on GO itself does not pay. Three consecutive doubles send a free player to jail. A jailed player exits on doubles; after the third failed roll the player must pay $50 and move by that roll. Players can also pay $50 or consume a held jail-free card before rolling (`monopoly.js:1958-2018`, `2417-2510`).

`land(increasedRent)` (`monopoly.js:2282-2415`) increments a square's `landcount`; offers any unowned purchasable square for its listed price and queues it for auction whether or not it is bought; charges rent to another owner unless mortgaged; and invokes tax, jail, and card-square actions. A player who cannot pay becomes indebted to the specified creditor; bankruptcy processing is in `Game.bankruptcy` (`monopoly.js:1043-1108`). Landed-on tax and card effects can trigger the same debt path.

### Rent

For color streets, an owner of the complete group charges twice the base rent when the landed street has no buildings; otherwise the rent is the configured `rent1` through `rent5` for its house count. With an incomplete group, the street charges base rent. A mortgaged property collects no rent.

For a railroad, ordinary rent starts at $12.50 and doubles once for each of the four railroad squares whose owner matches the landed railroad's owner (therefore one railroad yields $25, two $50, three $100, four $200). A Chance advance sets `increasedRent`, doubling those values again. Utilities charge the sum of the most recently rolled dice times 4 when one utility is owned, or times 10 when both are owned; Chance's nearest-utility advance also uses the 10-times rate. These formulas are implemented by `land` and the two nearest-asset helpers (`monopoly.js:2282-2374`, `1897-1930`).

## Buying, auction, mortgage, and trades

`buy()` spends the square's price and assigns ownership only when funds suffice (`monopoly.js:2216-2234`). Unbought properties are auctioned in queue order; players may bid, pass, or exit (`Game.auction*`, `monopoly.js:55-254`). Mortgage pays half the purchase price; unmortgage costs 55% (mortgage plus 10% interest), and mortgaged holdings do not collect rent (`monopoly.js:2237-2280`).

`Trade` represents money, up to 40 property flags and the two separately-held jail cards (`monopoly.js:1149-1176`). The UI prohibits exchanging properties in a group while any group property is improved. A completed trade transfers the listed owner/card state and money (`Game.resetTrade`, `readTrade`, `acceptTrade`, and `proposeTrade`, `monopoly.js:335-954`). Bankruptcy transfers assets to the creditor, or returns properties to bank auction when the bank is creditor; mortgaged-property interest is handled separately (`monopoly.js:955-1108`).

## Taxes, card decks, and card execution

Classic City Tax always charges $200; classic Luxury Tax charges $100 (`classicedition.js:57-70`). NYC's dormant City Tax and Luxury Tax functions call undefined `addalert` before reaching their `Player.pay` calls; the active engine defines `addAlert` instead (`newyorkcityedition.js:49-70`, `monopoly.js:1221`), so activating that edition causes a runtime error before those taxes are paid. On a Community Chest or Chance square, `chanceCommunityChest()` selects the next card from a shuffled deck; the deck cycles and a jail-free card is removed while held. The draw code increments the deck index after removing the current item, so the card shifted into the removed slot is skipped on that draw; using a held card reinserts it at the current index and also advances the index (`monopoly.js:1706-1755`, `1977-2018`). `communityChestAction` and `chanceAction` execute the card callback (`monopoly.js:1757-1785`). The card action functions perform money transfers, movement, repairs, jail, or deck effects through the helpers listed below.

| Helper | Implemented effect | Source |
|---|---|---|
| `addamount` / `subtractamount` | Adds money or calls `Player.pay`; a shortfall records a creditor. | `monopoly.js:1787-1801` |
| `payeachplayer` / `collectfromeachplayer` | Pays each other participant or collects up to the requested amount from each. | `monopoly.js:1835-1872` |
| `advance` | Moves to a fixed board index and pays $200 when the destination is behind the current position; optional `pass` parameter first sets position to that index and may also pay salary before the destination path pays. Thus NYC Chance's `advance(0, 32)` pays $200 from Chance 7 or 22, but $400 from Chance 36 (the current index 36 is already at or beyond 32, then the move to GO awards another $200). | `monopoly.js:1874-1895`; NYC card at `newyorkcityedition.js:143` |
| `advanceToNearestUtility` / `advanceToNearestRailroad` | Moves to the next relevant square, pays salary if wrapping, then lands with enhanced rent. | `monopoly.js:1897-1930` |
| `streetrepairs` | Charges per house and per hotel across the player's holdings. | `monopoly.js:1931-1956` |
| `gobackthreespaces` | Subtracts three from position, then calls `land`. | `monopoly.js:1827-1833` |
| `gotojail` | Marks jailed, resets doubles, and moves the player's representation to jail. | `monopoly.js:1803-1825` |

The callbacks on the jail-free cards set the matching player flag. Using a card returns it to its originating deck; trading and bankruptcy can transfer it (`monopoly.js:1977-2018`, `Game.acceptTrade` at `monopoly.js:745-863`, `Game.bankruptcy` at `monopoly.js:1043-1108`).

## Character and AI model

`Player` (`monopoly.js:1110-1146`) is the only player entity model: it stores name, color, position, money, creditor, jail/doubles state, jail-free flags, and a `human` flag; `pay` subtracts funds and records a creditor if the balance becomes negative. The UI offers 16 colors as display customization, not distinct character implementations (`index.html:257-475`). Player markers are colored CSS elements rather than named tokens (`updatePosition`, `monopoly.js:1281-1359`); `images/jake_icon.png` is used as Jail-space artwork (`monopoly.js:2829`). `AITest` is the only included computer player (`ai.js:2-208`); it is a demonstration strategy, not an alternative game ruleset.

## Deliberately excluded and unused code

`monopoly.js` contains commented-out legacy helpers and a commented token-image renderer; they are not gameplay capabilities. The individual pages cover every square/card data entry in both edition source files, including the dormant New York City source, but do not treat the 16 cosmetic player colors, UI controls, Jail artwork, or other images as separate characters or game entities. The landing-count field is incremented but the visible land-count export is commented out (`monopoly.js:2293`, `955-1000`).
