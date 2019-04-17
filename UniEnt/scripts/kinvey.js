const kinvey = (() => {
    const SLASH = "/";
    const GET_METHOD = "GET";
    const POST_METHOD = "POST";
    const PUT_METHOD = "PUT";
    const DELETE_METHOD = "DELETE";
    const BASE_URL = "https://baas.kinvey.com/";
    const APP_KEY = "kid_ryOd1Igc4";
    const APP_SECRET = "ec460f99acd64f7d91abb531ffb8aa80";

    function makeAuth(auth) {
        if (auth.toLowerCase() == "basic") {
            return {
                "Authorization": `Basic ${btoa(APP_KEY + ":" + APP_SECRET)}`,
                "Content-Type": "application/json"
            };
        } else if (auth.toLowerCase() == "kinvey") {
            return {
                "Authorization": `Kinvey ${sessionStorage.getItem("authtoken")}`,
                "Content-Type": "application/json"
            };
        }
    }

    function makeRequest(method, collection, endPoint, auth) {
        return {
            url: BASE_URL + collection + SLASH + APP_KEY + SLASH + endPoint,
            method: method,
            headers: makeAuth(auth)
        };
    }

    function get(collection, endPoint, auth) {
        let request = makeRequest(GET_METHOD, collection, endPoint, auth);

        return $.ajax(request);
    }

    function post(collection, endPoint, auth, data) {
        let request = makeRequest(POST_METHOD, collection, endPoint, auth);
        request.data = data;

        return $.ajax(request);
    }

    function update(collection, endPoint, auth, data) {
        let request = makeRequest(PUT_METHOD, collection, endPoint, auth);
        request.data = data;

        return $.ajax(request);
    }

    function remove(collection, endPoint, auth) {
        let request = makeRequest(DELETE_METHOD, collection, endPoint, auth);

        return $.ajax(request);
    }

    return {
        get,
        post,
        update,
        remove
    }
})();