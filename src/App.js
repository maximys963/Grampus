import React, { Component } from 'react'
import MainScreen from './components/main_screen'

import 'antd/dist/antd.less'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Community from "./components/community"
import CompanyState from "./components/company_state"
import Profile from "./components/profile"
import Rating from "./components/rating"
import SignUp from './components/sign_up'
import MyInformation from './components/my_information'
import OtherProfile from './components/other_profile'
import Tasks from './components/help_tasks'
import SmartCalendar from './components/calendar'
export const backUrl = 'http://c1d965fa.ngrok.io';

class App extends Component {
  render() {
    return (
      <Router className="App" >
          <div >
          <Route exact path="/" component={MainScreen} />
          <Route path="/community" component={Community}/>
           <Route path="/state" component={CompanyState}/>
           <Route path="/profile" component={Profile}/>
           <Route path="/rating" component={Rating}/>
            <Route path="/signup" component={SignUp}/>
                  <Route path="/myinfo" component={MyInformation}/>
                  <Route path="/profileoutsider" component={OtherProfile}/>
                  <Route path="/help" component={Tasks}/>
                  <Route path="/calendar" component={SmartCalendar}/>

          </div>
      </Router>
    );
  }
}

export default App;
