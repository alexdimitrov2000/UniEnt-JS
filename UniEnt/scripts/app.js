const handlers = {};

$(() => {
    const app = Sammy("#root", function() {
        this.use("Handlebars", "hbs");

        // home page routes
        this.get("/(/:category)?", handlers.getHome);
        this.get("#/home(/:category)?", handlers.getHome);
        this.get("/index.html(/:category)?", handlers.getHome);

        // user pages GET routes
        this.get("#/login", handlers.getLoginPage);
        this.get("#/register", handlers.getRegisterPage);
        this.get("#/logout", handlers.logoutUser);

        // user pages POST routes
        this.post("#/login", handlers.logUser);
        this.post("#/register", handlers.registerUser);
        
        this.get("#/organizeEvent", handlers.getOrganizeEventPage);
        this.post("#/organizeEvent", handlers.organizeEvent);

        this.get("#/details/:id", handlers.getEventDetailsPage);
        this.get("#/edit/:id", handlers.getEventEditPage);
        this.post("#/edit/:id", handlers.editEvent);
        this.get("#/close/:id", handlers.closeEvent);
        this.get("#/join/:id", handlers.joinEvent);
        this.get("#/userProfile", handlers.getUserProfilePage);
    });

    app.run("/");
});