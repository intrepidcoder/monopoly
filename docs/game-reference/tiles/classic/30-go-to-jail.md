# Go to Jail (square 30)

**Edition:** Classic (loaded by index.html)<br>
**Source definition:** [<code>classicedition.js</code>](../../../../classicedition.js#L103)<br>
**Board index:** 30 of 39

## Data

- Display text: Go directly to Jail. Do not pass GO. Do not collect $200..
- Purchase price: not purchasable.
- Group number: 0 (special/non-group).
- Color: <code>#FFFFFF</code>.
- Initial state: unowned by players (bank owner 0), unmortgaged, no houses/hotel, and landing count 0.
- No purchase/rent schedule.

## Implemented gameplay

Sends the player directly to jail, resets doubles, and awards no GO salary. See gotojail (monopoly.js:1803-1825).

The shared landing path increments land count, offers unowned property for purchase, queues unbought property for auction, and collects rent when due: land (monopoly.js:2282-2415). See [shared gameplay rules](../../gameplay-rules.md) for buying, auction, mortgage, group development, jail, taxes, and card resolution.
