const User = require("../models/auth-model");
const Contact = require("../models/contact-model");
const sessionFlash = require("../util/session-flash");
const validation = require("../util/validation");
const authUtil = require("../util/authentification");

function getSignup(req, res) {
    let sessionData = sessionFlash.flashSessionData(req);
    if (!sessionData) {
        sessionData = {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            address: '',
            city: '',
            postal: '',
            number: ''
        };
    }
    res.render('customer/auth/signup', { inputData: sessionData });
}

async function postSignup(req, res, next) {

    const enteredData = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        name: req.body.name, 
        address: req.body.address,
        city: req.body.city,
        postal: req.body.postal,
        number: req.body.number
    }


    if (!validation.userDetailsAreValid(
        req.body.email,
        req.body.password,
        req.body.confirmPassword,
        req.body.name,
        req.body.address,
        req.body.city,
        req.body.postal,
        req.body.number
    ) || !validation.PasswordIsConfirmed(req.body.password, req.body.confirmPassword)
    ) {
        sessionFlash.flashDataToSession(req,
            {
                errorMessage:
                    'Please Check Your Input, Password must be at least 6 characters',
                ...enteredData
            },
            function () {

                res.redirect('/signup');
            })
        return;
    }

    const user = new User(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.address,
        req.body.city,
        req.body.postal,
        req.body.number
    );
    try {
        const existsAlready = await user.existsAlready();
        if (existsAlready) {
            sessionFlash.flashDataToSession(req,
                {
                    errorMessage: 'This email is already associated with another account.',
                    ...enteredData
                }, function () {

                    res.redirect('/signup');
                })
            return;
        }
        await user.postSignup();
    } catch (error) {
        next(error);
        return
    }
    res.redirect('/login');

}

function getLogin(req, res) {
    let sessionData = sessionFlash.flashSessionData(req);
    if (!sessionData) {
        sessionData = {
            email: '',
            password: '',
        };
    }

    res.render('customer/auth/login', { inputData: sessionData });
}

async function login(req, res, next) {
    const user = new User(0, req.body.email, req.body.password);
    let existingUser;
    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        next(error);
        return;
    }
    const sessionErrorData = {
        errorMessage:
            'Invalid credentials - please double-check your email and password!',
        email: user.email,
        password: user.password,
    };

    if (!existingUser) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function () {
            res.redirect('/login');
        });
        return;
    }

    const passwordIsCorrect = await user.hasMatchingPassword(
        existingUser.password
    );

    if (!passwordIsCorrect) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function () {
            res.redirect('/login');
        });
        return;
    }

    authUtil.createUserSession(req, existingUser, function () {
        res.redirect('/');
    });

}

async function saveContactInfo(req, res, next) {
    const messageInfo = new Contact(
        req.body.name,
        req.body.email,
        req.body.message
    )
    try {
        await messageInfo.postContactUs();
    } catch (error) {
        next(error);
        return;
    }
    res.redirect('/');
}

function logout(req, res) {
    authUtil.destroyUserAuthSession(req);
    res.redirect('/login');
}




module.exports = {
    getSignup: getSignup,
    postSignup: postSignup,
    getLogin: getLogin,
    saveContactInfo: saveContactInfo,
    login: login,
    logout: logout,

}