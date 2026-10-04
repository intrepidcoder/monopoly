# Community Chest 16: Go to Jail. Go directly to Jail. Do not pass GO. Do not collect $200.

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 15 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L132)

## Printed instruction

> Go to Jail. Go directly to Jail. Do not pass GO. Do not collect $200.

## Implemented effect

Sends current player directly to jail without GO salary. See gotojail (monopoly.js:1803-1825).

**Callback helper:** <code>gotojail</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
