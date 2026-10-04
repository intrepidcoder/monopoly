# Chance 8: Advance token to the nearest Transportation and pay owner Twice the Rental to which they are otherwise entitled. If Transportation is unowned, you may buy it from the Bank.

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 7 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L142)

## Printed instruction

> Advance token to the nearest Transportation and pay owner Twice the Rental to which they are otherwise entitled. If Transportation is unowned, you may buy it from the Bank.

## Implemented effect

Moves to the next railroad, pays $200 if crossing GO, then lands with twice ordinary railroad rent. Unowned railroad is offered for purchase and auction. See advanceToNearestRailroad / land(true) (monopoly.js:1913-1930, 2282-2415).

**Callback helper:** <code>advanceToNearestRailroad</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
