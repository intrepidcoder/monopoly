# Chance 6: Advance token to the nearest Con Edison utility. If UNOWNED you may buy it from the bank. If OWNED, throw dice and pay owner a total of ten times the amount thrown.

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 5 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L140)

## Printed instruction

> Advance token to the nearest Con Edison utility. If UNOWNED you may buy it from the bank. If OWNED, throw dice and pay owner a total of ten times the amount thrown.

## Implemented effect

Moves to the next utility, pays $200 on wraparound, then lands with 10× dice rent. Unowned utility is offered for purchase and auction. See advanceToNearestUtility / land(true) (monopoly.js:1897-1911, 2282-2415).

**Callback helper:** <code>advanceToNearestUtility</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
