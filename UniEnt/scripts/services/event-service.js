const eventService = (() => {
    function createEvent(event) {
        return kinvey.post("appdata", "events", "kinvey", event);
    }

    function getAllEvents() {
        return kinvey.get("appdata", `events?sort={"peopleInterestedIn": -1}`, "kinvey");
    }

    function getById(eventId) {
        return kinvey.get("appdata", `events/${eventId}`, "kinvey");
    }

    function editEvent(eventId, event) {
        return kinvey.update("appdata", `events/${eventId}`, "kinvey", event);
    }

    function closeEvent(eventId) {
        return kinvey.remove("appdata", `events/${eventId}`, "kinvey");
    }

    return {
        createEvent,
        getAllEvents,
        getById,
        editEvent,
        closeEvent
    }
})();