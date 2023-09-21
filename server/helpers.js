// CART ENDPOINTS
// GET: /cart           -- RETURNS list of items in the cart
// POST: /cart          -- ADD item to the cart -->  expecting in the body {id: 1, name: "Product 1", price: 10, quantity: 1}
// PATCH: /cart         -- UPDATE item in the cart --> expecting in the body {id: 1, name: "Product 1", price: 10, quantity: 11}
// DELETE: /cart/:_id   -- DELETE item from the cart/:id --> expecting item id {_id}

// ORDER ENDPOINT (CHECKOUT)
// POST: /order         -- ADD new order -->  expecting in the body {userid}...,
//--
