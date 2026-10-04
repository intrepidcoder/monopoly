# Community Chest 13: It is your birthday. Collect $10 from every player.

**Edition:** Classic (loaded)<br>
**Deck slot:** 12 (zero-based source index)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L129)

## Printed instruction

> It is your birthday. Collect $10 from every player.

## Implemented effect

Collects up to $10 from each other player; a player with less pays their remaining cash. The total is credited to the current player. See collectfromeachplayer (monopoly.js:1852-1872).

**Callback helper:** <code>collectfromeachplayer</code>. chanceAction / communityChestAction dispatches the callback after drawing (monopoly.js:1706-1785). See [shared gameplay rules](../../gameplay-rules.md#taxes-card-decks-and-card-execution) for money/debt, movement, and jail handling.
