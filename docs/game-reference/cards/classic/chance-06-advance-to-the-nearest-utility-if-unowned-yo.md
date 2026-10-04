# Chance 6: ADVANCE TO THE NEAREST UTILITY. IF UNOWNED, you may buy it from the Bank. IF OWNED, throw dice and pay owner a total ten times the amount thrown.

**Edition:** Classic (loaded)<br>
**Deck slot:** 5 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L140)

## Printed instruction

> ADVANCE TO THE NEAREST UTILITY. IF UNOWNED, you may buy it from the Bank. IF OWNED, throw dice and pay owner a total ten times the amount thrown.

## Implemented effect

Moves to the next utility, pays $200 on wraparound, then lands with 10× dice rent. Unowned utility is offered for purchase and auction. See advanceToNearestUtility / land(true) (monopoly.js:1897-1911, 2282-2415).

**Callback helper:** <code>advanceToNearestUtility</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
