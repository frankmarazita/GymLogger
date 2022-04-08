import session from './session';
import settings from './settings';

let logout = {

    logout: function () {
        session.deleteToken()
        settings.deleteSettings()
        window.location = '/login'
    }

}

export default logout;