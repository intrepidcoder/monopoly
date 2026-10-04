# Community Chest 13: Madison Square Garden opening tonight. Collect $50 from every player for opening night seats.

**Edition:** New York City (dormant edition source)<br>
**Deck slot:** 12 (zero-based source index)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L129)

## Printed instruction

> Madison Square Garden opening tonight. Collect $50 from every player for opening night seats.

## Implemented effect

Collects up to $50 from each other player; a player with less pays their remaining cash. The total is credited to the current player. See collectfromeachplayer (monopoly.js:1852-1872).

**Callback helper:** <code>collectfromeachplayer</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
