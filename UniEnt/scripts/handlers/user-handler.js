handlers.getLoginPage = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    if (userService.isAuth()) {
        notify.showInfo("Please logout first.");
        ctx.redirect("/");
    } else {
        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs"
        }).then(function () {
            this.partial("../../views/user/loginPage.hbs")
        }).catch(function (err) {
            notify.handleError(err);
        });
    }
}

handlers.getRegisterPage = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    if (userService.isAuth()) {
        notify.showInfo("Please logout first.");
        ctx.redirect("/");
    } else {
        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs"
        }).then(function () {
            this.partial("../../views/user/registerPage.hbs")
        }).catch(function (err) {
            notify.handleError(err);
        });
    }
}

handlers.registerUser = function (ctx) {
    let inputParameters = { ...ctx.params };

    let username = inputParameters.username;
    let password = inputParameters.password;
    let confirmPassword = inputParameters.rePassword;

    if (username.length < 3) {
        notify.showError("Username must be at least 3 symbols");
        return;
    } else if (password.length < 6) {
        notify.showError("Password must be at least 6 symbols");
        return;
    } else if (password !== confirmPassword) {
        notify.showError("Password and Re-Password do not match");
        return;
    }

    userService.register(username, password).then(function (res) {
        userService.saveSession(res);
        ctx.redirect("/");
        notify.showInfo("User registration successful.");
    }).catch(function (err) {
        notify.handleError(err);
    });
}

handlers.logUser = function (ctx) {
    let inputParameteters = { ...ctx.params };

    let username = inputParameteters.username;
    let password = inputParameteters.password;

    userService.login(username, password).then(function (res) {
        userService.saveSession(res);
        ctx.redirect("/");
        notify.showInfo("Login successful.");
    }).catch(function (err) {
        notify.handleError(err);
    });
}

handlers.logoutUser = function (ctx) {
    userService.logout().then(function () {
        sessionStorage.clear();
        notify.showInfo("Logout successful.");
        ctx.redirect("/");
    }).catch(function (err) {
        notify.handleError(err);
    })
}

handlers.getUserProfilePage = function(ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    eventService.getAllEvents().then(function (events) {
        let userEvents = events.filter(e => e._acl.creator === userService.getCurrentUserId());
        
        ctx.hasOrganizedEvents = userEvents.length > 0;
        ctx.eventsOrganizedCount = userEvents.length;
        ctx.events = userEvents;

        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs"
        }).then(function () {
            this.partial("../../views/user/userProfilePage.hbs")
        }).catch(function (err) {
            notify.handleError(err);
        });
    })
}