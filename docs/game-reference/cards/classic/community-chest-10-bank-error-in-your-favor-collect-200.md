# Community Chest 10: Bank error in your favor. Collect $200.

**Edition:** Classic (loaded)<br>
**Deck slot:** 9 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L126)

## Printed instruction

> Bank error in your favor. Collect $200.

## Implemented effect

Adds $200 to current player cash (alert category: Community Chest). See addamount (monopoly.js:1787-1793).

**Callback helper:** <code>addamount</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
