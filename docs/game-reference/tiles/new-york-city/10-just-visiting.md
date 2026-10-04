# Just Visiting (square 10)

**Edition:** New York City (source-defined, not loaded by index.html)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L83)<br>
**Board index:** 10 of 39

## Data

- Display text: (none).
- Purchase price: not purchasable.
- Group number: 0 (special/non-group).
- Color: <code>white</code>.
- Initial state: unowned by players (bank owner 0), unmortgaged, no houses/hotel, and landing count 0.
- No purchase/rent schedule.

## Implemented gameplay

Just Visiting / jail corner. Ordinary landing has no extra effect. Jail is a player state; sending a player to jail moves them to this index and marks them jailed.

The shared landing path increments land count, offers unowned property for purchase, queues unbought property for auction, and collects rent when due: land (monopoly.js:2282-2415). See [shared gameplay rules](../../gameplay-rules.md) for buying, auction, mortgage, group development, jail, taxes, and card resolution.
