# Chance 7: Citibank pays you interest of $50.

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 6 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L141)

## Printed instruction

> Citibank pays you interest of $50.

## Implemented effect

Adds $50 to current player cash (alert category: Chance). See addamount (monopoly.js:1787-1793).

**Callback helper:** <code>addamount</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
