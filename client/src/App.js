import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthenticatedRoute from './routes/AuthenticatedRoute';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import Signup from './containers/Signup/Signup'
import Login from './containers/Login/Login'
import Home from './containers/Home/Home'
import Account from './containers/Account/Account'
import AccountEdit from './containers/Account/AccountEdit'
import AccountEditPassword from './containers/Account/AccountEditPassword'
import AccountEditTwoFactor from './containers/Account/AccountEditTwoFactor';
import Weight from './containers/Weight/Weight'
import ExerciseGroup from './containers/ExerciseGroup/ExerciseGroup'
import ExerciseGroupAdd from './containers/ExerciseGroup/ExerciseGroupAdd'
import ExerciseGroupEdit from './containers/ExerciseGroup/ExerciseGroupEdit'
import Exercise from './containers/Exercise/Exercise'
import ExerciseAdd from './containers/Exercise/ExerciseAdd'
import ExerciseEdit from './containers/Exercise/ExerciseEdit'
import DataExercise from './containers/Data/Exercise/DataExercise'
import DataWeight from './containers/Data/Weight/DataWeight'
import Error from './containers/Error/Error'

function App() {

    let noHeader = ["/login", "/signup"];

    return (
        <Router>
            <Route path="/*" render={(props) => (!noHeader.includes(props.location.pathname)) && <Header />} />
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <AuthenticatedRoute path="/" exact component={Home} />
                <AuthenticatedRoute path="/account" exact component={Account} />
                <AuthenticatedRoute path="/edit/account" exact component={AccountEdit} />
                <AuthenticatedRoute path="/edit/account/password" exact component={AccountEditPassword} />
                <AuthenticatedRoute path="/edit/account/two-factor" exact component={AccountEditTwoFactor} />
                <AuthenticatedRoute path="/weight" exact component={Weight} />
                <AuthenticatedRoute path="/group/:id" exact component={ExerciseGroup} />
                <AuthenticatedRoute path="/add/group" exact component={ExerciseGroupAdd} />
                <AuthenticatedRoute path="/edit/group/:id" exact component={ExerciseGroupEdit} />
                <AuthenticatedRoute path="/exercise/:id" exact component={Exercise} />
                <AuthenticatedRoute path="/add/exercise" exact component={ExerciseAdd} />
                <AuthenticatedRoute path="/edit/exercise/:id" exact component={ExerciseEdit} />
                <AuthenticatedRoute path="/data/exercise/:id" exact component={DataExercise} />
                <AuthenticatedRoute path="/data/weight" exact component={DataWeight} />
                <AuthenticatedRoute path="/error/:code" component={Error} />
                <AuthenticatedRoute exact component={Error} />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;