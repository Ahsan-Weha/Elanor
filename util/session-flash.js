function flashSessionData(req) {
    const sessionData = req.session.flashData;

    req.session.flashData = null;

    return sessionData;

}

function flashDataToSession(req, data, action) {
    req.session.flashData = data;
    req.session.save(action);
}

module.exports = {
    flashDataToSession: flashDataToSession,
    flashSessionData: flashSessionData,
}