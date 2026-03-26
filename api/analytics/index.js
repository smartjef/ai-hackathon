module.exports = async function (context, req) {
    context.res = {
        body: {
            revenue: [
                { name: 'Mon', revenue: 400 },
                { name: 'Tue', revenue: 700 },
                { name: 'Wed', revenue: 500 },
                { name: 'Thu', revenue: 600 },
                { name: 'Fri', revenue: 800 },
                { name: 'Sat', revenue: 1200 },
                { name: 'Sun', revenue: 900 },
            ],
            topSellingProduct: "Organic Coffee"
        }
    };
}
