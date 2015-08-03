import React from 'react'
import { Route, Router, Link } from 'react-router'
import History from 'react-router/lib/BrowserHistory'
import Crossing from 'crossing'


/**
 * Define some URL paths and assign them to names
 */
const urlTable = {
  'user:detail': '/user/:id',
  'photos': '/photos'
}

/**
 * Create an instance of Crossing, overriding the param format to be compatible with what react-router expects
 */
const urls = new Crossing(new RegExp(':([A-Za-z0-9-_%]{1,})'))
urls.load(urlTable)

/**
 * Create two React components that will be displayed depending on which
 * route is active.
 *
 * We're using the new ES6 class syntax to keep the code terse. Since these are pure components,
 * all we really need is to pass React something with a `render` method.
 */
class User {
  render () {
    return (
      <div>
        <div>
          User 123
          <Link to={urls.get('photos')}>Photos</Link>
        </div>
        Hey, it worked!
      </div>
    )
  }
}

/**
 * You can see in the `Link` elements, we're using the Crossing instance to obtain
 * URL paths dynamically using the name and passing any appropriate parameters.
 */
class Photos {
  render () {
    return (
      <div>
        <div>
          <Link to={urls.get('user:detail', 123)}>User 123</Link>
          Photos
        </div>
        Photos?
      </div>
    )
  }
}

/**
 * Define some routes for react-router. We're passing the patterns that include param placeholders.
 */
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
