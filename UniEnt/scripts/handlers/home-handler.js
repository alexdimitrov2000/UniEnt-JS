handlers.getHome = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    if (!userService.isAuth()) {
        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs"
        }).then(function () {
            this.partial("../../views/home/homePage.hbs")
        }).catch(function (err) {
            notify.handleError(err);
        });
    }

    eventService.getAllEvents().then(function (events) {
        ctx.eventsExist = events.length > 0;
        ctx.events = events;

        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs",
            event: "../../views/event/event.hbs"
        }).then(function () {
            this.partial("../../views/home/homePage.hbs")
        }).catch(function (err) {
            notify.handleError(err);
        });
    })
}