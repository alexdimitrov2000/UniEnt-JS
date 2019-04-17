const userService = (() => {
    function isAuth() {
        return sessionStorage.getItem("authtoken") !== null;
    }

    function getCurrentUserName() {
        return sessionStorage.getItem("username");
    }

    function getCurrentUserId() {
        return sessionStorage.getItem("id");
    }

    function register(username, password) {
        return kinvey.post("user", "", "basic", JSON.stringify({ username, password }));
    }
    
    function login(username, password) {
        return kinvey.post("user", "login", "basic", JSON.stringify({ username, password }));
    }

    function logout() {
        return kinvey.post("user", "_logout", "kinvey");
    }

    function saveSession(res) {
        sessionStorage.setItem("username", res.username);
        sessionStorage.setItem("authtoken", res._kmd.authtoken);
        sessionStorage.setItem("id", res._id);
    }

    return {
        isAuth,
        getCurrentUserName,
        register,
        login,
        logout,
        saveSession,
        getCurrentUserId
    }
})();