const SETTINGS_ATTRIBUTE_NAME = 'settings';

let settings = {

    setSettings: function (settings) {
        return sessionStorage.setItem(SETTINGS_ATTRIBUTE_NAME, JSON.stringify(settings))
    },

    getSettings: function () {
        return JSON.parse(sessionStorage.getItem(SETTINGS_ATTRIBUTE_NAME))
    },

    deleteSettings: function () {
        return sessionStorage.removeItem(SETTINGS_ATTRIBUTE_NAME)
    }

}

export default settings;