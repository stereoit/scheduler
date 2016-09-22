import React from 'react'
import TeacherView from 'views/TeacherView';
import StudentView from 'views/StudentView';
// import ReactRouter from 'react-router'

// { Router, Route, Link, IndexRoute, hashHistory, browserHistory }

class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/teacher' component={TeacherView} />
        <Route path='/student' component={StudentView} />
      </Router>
    )
  }
}
export default App
