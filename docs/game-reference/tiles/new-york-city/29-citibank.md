# CITIBANK (square 29)

**Edition:** New York City (source-defined, not loaded by index.html)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L102)<br>
**Board index:** 29 of 39

## Data

- Display text: $280.
- Purchase price: $280.
- Group number: 8.
- Color: <code>yellow</code>.
- Initial state: unowned by players (bank owner 0), unmortgaged, no houses/hotel, and landing count 0.
- Building price: $150 per house or hotel.
- Base rent: $24; one house: $120; two: $360; three: $850; four: $1025; hotel: $1200.

## Implemented gameplay

Ownable color-group street. A full group doubles base rent while this property is unimproved; otherwise rent follows the listed 1-4 house/hotel schedule. See shared rules for full-group, even building, mortgages, and sales.

The shared landing path increments land count, offers unowned property for purchase, queues unbought property for auction, and collects rent when due: land (monopoly.js:2282-2415). See [shared gameplay rules](../../gameplay-rules.md) for buying, auction, mortgage, group development, jail, taxes, and card resolution.
