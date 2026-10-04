# Community Chest (square 2)

**Edition:** New York City (source-defined, not loaded by index.html)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L75)<br>
**Board index:** 2 of 39

## Data

- Display text: FOLLOW INSTRUCTIONS ON TOP CARD.
- Purchase price: not purchasable.
- Group number: 0 (special/non-group).
- Color: <code>white</code>.
- Initial state: unowned by players (bank owner 0), unmortgaged, no houses/hotel, and landing count 0.
- No purchase/rent schedule.

## Implemented gameplay

Draws the next shuffled Community Chest card; decks cycle and the jail-free card is removed while held and reinserted when used.

The shared landing path increments land count, offers unowned property for purchase, queues unbought property for auction, and collects rent when due: land (monopoly.js:2282-2415). See [shared gameplay rules](../../gameplay-rules.md) for buying, auction, mortgage, group development, jail, taxes, and card resolution.
