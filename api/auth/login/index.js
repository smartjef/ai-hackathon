module.exports = async function (context, req) {
    context.res = {
        body: { message: "Login successful (mock)" }
    };
}
