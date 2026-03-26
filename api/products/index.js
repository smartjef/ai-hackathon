module.exports = async function (context, req) {
    context.res = {
        body: [
            { id: '1', name: 'Coffee Beans', category: 'Food', price: 15, stock: 24, unit: 'kg', emoji: '🫘' },
            { id: '2', name: 'Milk', category: 'Food', price: 3, stock: 4, unit: 'litre', emoji: '🥛' },
        ]
    };
}
