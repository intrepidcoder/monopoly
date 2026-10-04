# Community Chest 15: You are assessed for street repairs. $40 per house. $115 per hotel.

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 14 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L131)

## Printed instruction

> You are assessed for street repairs. $40 per house. $115 per hotel.

## Implemented effect

Charges $40 per house and $115 per hotel across owned properties; hotels are counted once. See streetrepairs (monopoly.js:1931-1956).

**Callback helper:** <code>streetrepairs</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
