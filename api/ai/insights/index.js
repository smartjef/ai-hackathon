module.exports = async function (context, req) {
    context.res = {
        body: {
            insight: "Your Tuesday sales are 40% higher. Consider a 'Tuesday promotion' to boost growth.",
            recommendations: ["Increase Milk stock", "Promote Coffee Beans"]
        }
    };
}
