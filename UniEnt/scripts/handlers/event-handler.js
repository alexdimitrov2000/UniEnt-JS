handlers.getOrganizeEventPage = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    ctx.loadPartials({
        header: "../../views/common/header.hbs",
        footer: "../../views/common/footer.hbs"
    }).then(function () {
        this.partial("../../views/event/organizeEventPage.hbs")
    }).catch(function (err) {
        notify.handleError(err);
    });
}

handlers.organizeEvent = function (ctx) {
    let { name, dateTime, description, imageURL } = { ...ctx.params };
    
    if (name.length < 6) {
        notify.showError("Name must be at least 6 symbols");
        return;
    } else if (!(/[a-zA-Z0-9- ]+/gm.test(dateTime))) {
        notify.showError("Date must be a valid date format");
        return;
    } else if (description.length < 10) {
        notify.showError("Description must be at least 10 symbols");
        return;
    } else if (!/^(https|http):\/\//.test(imageURL)) {
        notify.showError("Image URL must start with either 'https://' or 'http://'.");
        return;
    }

    let event = {
        name: name,
        dateTime: dateTime,
        description: description,
        imageURL: imageURL,
        organizer: userService.getCurrentUserName(),
        peopleInterestedIn: 0
    };

    eventService.createEvent(JSON.stringify(event)).then(function () {
        notify.showInfo("Event created successfully.");
        ctx.redirect("/");
    }).catch(notify.handleError);
}

handlers.getEventDetailsPage = function(ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    let eventId = ctx.params.id;

    eventService.getById(eventId).then(function(event) {
        ctx.event = event;
        ctx.isCreator = event.organizer === userService.getCurrentUserName();
        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs"
        }).then(function () {
            this.partial("../../views/event/eventDetailsPage.hbs")
        }).catch(notify.handleError);
    }).catch(notify.handleError);
}

handlers.getEventEditPage = function(ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = userService.getCurrentUserName();

    let eventId = ctx.params.id;

    eventService.getById(eventId).then(function(event) {
        ctx.event = event;
        
        ctx.loadPartials({
            header: "../../views/common/header.hbs",
            footer: "../../views/common/footer.hbs"
        }).then(function () {
            this.partial("../../views/event/eventEditPage.hbs")
        }).catch(notify.handleError);
    }).catch(notify.handleError);
}

handlers.editEvent = function(ctx) {
    let { name, dateTime, description, imageURL } = { ...ctx.params };
    let eventId = ctx.params.id;

    eventService.getById(eventId).then(function(event) {
        event.name = name;
        event.description = description;
        event.dateTime = dateTime;
        event.imageURL = imageURL;

        eventService.editEvent(eventId, JSON.stringify(event)).then(function () {
            notify.showInfo("Event edited successfully.");
            ctx.redirect("/");
        }).catch(notify.handleError);
    })

}

handlers.closeEvent = function(ctx) {
    let eventId = ctx.params.id;

    eventService.closeEvent(eventId).then(function() {
        notify.showInfo("Event closed successfully.");
        ctx.redirect("/");
    }).catch(notify.handleError);
}

handlers.joinEvent = function (ctx) {
    let eventId = ctx.params.id;

    eventService.getById(eventId).then(function (res) {
        let event = res;
        event.peopleInterestedIn += 1;

        eventService.editEvent(eventId, JSON.stringify(event)).then(function () {
            notify.showInfo(`You join the event successfully.`);
            ctx.redirect(`#/details/${eventId}`);
        }).catch(notify.handleError);
    }).catch(notify.handleError);
}