# Tiffany & CO. (square 37)

**Edition:** New York City (source-defined, not loaded by index.html)<br>
**Source definition:** [<code>newyorkcityedition.js</code>](../../../../newyorkcityedition.js#L110)<br>
**Board index:** 37 of 39

## Data

- Display text: $350.
- Purchase price: $350.
- Group number: 10.
- Color: <code>blue</code>.
- Initial state: unowned by players (bank owner 0), unmortgaged, no houses/hotel, and landing count 0.
- Building price: $200 per house or hotel.
- Base rent: $35; one house: $175; two: $500; three: $1100; four: $1300; hotel: $1500.

## Implemented gameplay

Ownable color-group street. A full group doubles base rent while this property is unimproved; otherwise rent follows the listed 1-4 house/hotel schedule. See shared rules for full-group, even building, mortgages, and sales.

The shared landing path increments land count, offers unowned property for purchase, queues unbought property for auction, and collects rent when due: land (monopoly.js:2282-2415). See [shared gameplay rules](../../gameplay-rules.md) for buying, auction, mortgage, group development, jail, taxes, and card resolution.
