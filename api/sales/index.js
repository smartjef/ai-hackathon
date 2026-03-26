module.exports = async function (context, req) {
    context.res = {
        body: { success: true, message: "Sale recorded" }
    };
}
