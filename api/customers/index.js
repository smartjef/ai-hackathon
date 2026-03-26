module.exports = async function (context, req) {
    context.res = {
        body: [
            { id: '1', name: 'Alice Smith', phone: '0712345678', email: 'alice@example.com', totalPurchases: 450, lastVisit: '2023-10-25' },
            { id: '2', name: 'Bob Johnson', phone: '0787654321', email: 'bob@example.com', totalPurchases: 120, lastVisit: '2023-11-02' },
        ]
    };
}
