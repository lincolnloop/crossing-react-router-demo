import React from 'react'
import { Route, Router, Link } from 'react-router'
import History from 'react-router/lib/BrowserHistory'
import Crossing from 'crossing'

class User {
  render () {
    return (
      <div>
        Hey, it worked!
        <div>
          <Link to={urls.get('photos')}>Photos</Link>
        </div>
      </div>
    )
  }
}

class Photos {
  render () {
    return (
      <div>
        Photos
        <Link to={urls.get('user:detail', 123)}>User 123</Link>
      </div>
    )
  }
}

const urls = new Crossing(new RegExp(':([A-Za-z0-9-_%]{1,})'))
const urlTable = {
  'user:detail': '/user/:id',
  'photos': '/photos'
}
urls.load(urlTable)

const routes = (
  <Route path='/'>
    <Route path={urlTable['user:detail']} component={User}/>
    <Route path={urlTable['photos']} component={Photos}/>
  </Route>
)

React.render(
  <Router history={new History}>{routes}</Router>,
  document.body
)
