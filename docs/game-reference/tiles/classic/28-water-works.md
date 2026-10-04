# Water Works (square 28)

**Edition:** Classic (loaded by index.html)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L101)<br>
**Board index:** 28 of 39

## Data

- Display text: $150.
- Purchase price: $150.
- Group number: 2.
- Color: <code>#FFFFFF</code>.
- Initial state: unowned by players (bank owner 0), unmortgaged, no houses/hotel, and landing count 0.
- Rent is computed from dice and utility ownership; no rent schedule is stored per square.

## Implemented gameplay

Ownable utility. Rent is dice total ×4 when one utility is owned, ×10 when both are owned; Chance nearest-utility movement also applies ×10. No buildings.

The shared landing path increments land count, offers unowned property for purchase, queues unbought property for auction, and collects rent when due: land (monopoly.js:2282-2415). See [shared gameplay rules](../../gameplay-rules.md) for buying, auction, mortgage, group development, jail, taxes, and card resolution.
