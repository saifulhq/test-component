/* eslint-disable prettier/prettier */
const parse = (v) => {
    let num = parseFloat(v);
    if (isNaN(num)) return 0;
    return num;
};
const calculateItem = (item) => {
    item.gross_amount = item.quantity * parse(item.price);
    let totalDiscounts = item.quantity * parse(item.discounts);
    item.net_amount = item.gross_amount - totalDiscounts - parse(item.promos) -
        parse(item.taxs) - parse(item.vouchers);
};
const cartItems = (state = [], action) => {
    let found = state.find(d => {
        return d.product_id === action.payload.product_id && d.outlet_id === action.payload.outlet_id;
    });
    switch (action.type) {
        case 'UPDATE_ITEM':
            if (found) {
                found.quantity = action.payload.quantity;
                found.customer_note = action.payload.customer_note;
                calculateItem(found);
            }
            return state.filter(d => true);
        case 'ADD_TO_CART':
            if (found) {
                found.quantity = found.quantity + action.payload.quantity;
                calculateItem(found);
                return state.filter(d => true);
            } else {
                calculateItem(action.payload);
                return [...state, action.payload];
            }
        case 'CANCEL_ORDER':
            return [];
        case 'REMOVE_FROM_CART':
            return state.filter(d => !(d.product_id === action.payload.product_id && d.outlet_id === action.payload.outlet_id));
    }

    return state;
};

export default cartItems;
