# Chance 8: ADVANCE TO THE NEAREST RAILROAD. If UNOWNED, you may buy it from the Bank. If OWNED, pay owner twice the rental to which they are otherwise entitled.

**Edition:** Classic (loaded)<br>
**Deck slot:** 7 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L142)

## Printed instruction

> ADVANCE TO THE NEAREST RAILROAD. If UNOWNED, you may buy it from the Bank. If OWNED, pay owner twice the rental to which they are otherwise entitled.

## Implemented effect

Moves to the next railroad, pays $200 if crossing GO, then lands with twice ordinary railroad rent. Unowned railroad is offered for purchase and auction. See advanceToNearestRailroad / land(true) (monopoly.js:1913-1930, 2282-2415).

**Callback helper:** <code>advanceToNearestRailroad</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
