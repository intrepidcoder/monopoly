# B&O Railroad (square 25)

**Edition:** Classic (loaded by index.html)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L98)<br>
**Board index:** 25 of 39

## Data

- Display text: $200.
- Purchase price: $200.
- Group number: 1.
- Color: <code>#FFFFFF</code>.
- Initial state: unowned by players (bank owner 0), unmortgaged, no houses/hotel, and landing count 0.
- Rent is computed from railroad ownership; no rent schedule is stored per square.

## Implemented gameplay

Ownable railroad/transit. Ordinary rent is $25 with one railroad and doubles for each railroad held by the same owner (2/3/4 yield $50/$100/$200); Chance nearest-railroad movement doubles rent again. No buildings.

The shared landing path increments land count, offers unowned property for purchase, queues unbought property for auction, and collects rent when due: land (monopoly.js:2282-2415). See [shared gameplay rules](../../gameplay-rules.md) for buying, auction, mortgage, group development, jail, taxes, and card resolution.
