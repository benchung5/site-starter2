/* ==========================================================================
load foundation plugins - keep this
========================================================================== */
import $ from 'jquery';
import whatInput from 'what-input';
window.$ = $;
// import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, 
// comment out the above and uncomment the line below
import './lib/foundation-explicit-pieces';
$(document).foundation(); 

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import customHistory from './history';
import { Router, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import asyncComponent from './lib/async_component';
import { globals } from './config.js';

import Main from './components/main';
import MainPlants from './components/main_plants';
import ArtPiece from './components/art_piece';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import { PrefixerProvider, withPrefixer } from 'react-prefixer-provider';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}


const protecetWarning = asyncComponent(() => 
  System.import('./components/admin/protected_warning').then(module => module.default)
)

const signin = asyncComponent(() => 
  System.import('./components/admin/auth/signin').then(module => module.default)
)

const signout = asyncComponent(() => 
  System.import('./components/admin/auth/signout').then(module => module.default)
)

const signup = asyncComponent(() => 
  System.import('./components/admin/auth/signup').then(module => module.default)
)

const admin = asyncComponent(() => 
  System.import('./components/admin/dashboard').then(module => module.default)
)

const articlesList = asyncComponent(() => 
  System.import('./components/admin/articles/articles_list').then(module => module.default)
)

const articleEdit = asyncComponent(() => 
  System.import('./components/admin/articles/article_edit').then(module => module.default)
)

const articleAdd = asyncComponent(() => 
  System.import('./components/admin/articles/article_add').then(module => module.default)
)

const treesList = asyncComponent(() => 
  System.import('./components/admin/trees/trees_list').then(module => module.default)
)

const treeEdit = asyncComponent(() => 
  System.import('./components/admin/trees/tree_edit').then(module => module.default)
)

const treeAdd = asyncComponent(() => 
  System.import('./components/admin/trees/tree_add').then(module => module.default)
)

const usersList = asyncComponent(() => 
  System.import('./components/admin/users/users_list').then(module => module.default)
)

const categoryAdd = asyncComponent(() => 
  System.import('./components/admin/categories/category_add').then(module => module.default)
)

const categoryList = asyncComponent(() => 
  System.import('./components/admin/categories/category_list').then(module => module.default)
)

const categoryEdit = asyncComponent(() => 
  System.import('./components/admin/categories/category_edit').then(module => module.default)
)

const backup = asyncComponent(() => 
  System.import('./components/admin/backup/backup').then(module => module.default)
)

// This prefixes everything with the webkit prefix. 
const myPrefixer = (styles) => {
  const prefixed = {}
  for (let key in styles) {
    prefixed["Webkit" + key[0].toUpperCase() + key.substr(1)] = styles[key]
  }
  return prefixed
}

// only render on pages with an app-container element
const appContainer = document.querySelector('.app-container');
if ( appContainer ) {
  //Header needs to be a pathless Route so it updates when 
  //the route changes and use props.history
  //<Route history={customHistory} component={Header} />

  //note the "exact" in the /articles-list route
  //for root app, swap /explore.html/ for /
  //<Route history={customHistory} path="/articles/artwork/:artId" component={ArtPiece} />
    ReactDOM.render(
      <PrefixerProvider prefixer={myPrefixer}>
      <Provider store={store}>
        <Router history={customHistory}>
          <div>
           <Switch history={customHistory}>
              {/* website */}
              <Route history={customHistory} exact path="/articles" component={withPrefixer(Main)} />
              <Route history={customHistory} exact path="/plants" component={withPrefixer(MainPlants)} />
              {/* admin */}
              <Route history={customHistory} path={`/${globals.ADMIN_URL}/protected`} component={protecetWarning} />
              <Route history={customHistory} path={`/${globals.ADMIN_URL}/signin`} component={signin} />
              <Route history={customHistory} path={`/${globals.ADMIN_URL}/signout`} component={signout} />
              <Route history={customHistory} exact path={`/${globals.ADMIN_URL}`} component={admin} />
              <Route history={customHistory} path={`/${globals.ADMIN_URL}/signup`} component={signup} /> 
              <Route history={customHistory} exact path={`/${globals.ADMIN_URL}/articles-list`} component={articlesList} />
              <Route history={customHistory} path={`/${globals.ADMIN_URL}/articles-list/:articleId`} component={articleEdit} />
              <Route history={customHistory} path={`/${globals.ADMIN_URL}/article-add`} component={articleAdd} />
              <Route history={customHistory} exact path={`/${globals.ADMIN_URL}/trees-list`} component={treesList} />
              <Route history={customHistory} path={`/${globals.ADMIN_URL}/trees-list/:treeId`} component={treeEdit} />
              <Route history={customHistory} path={`/${globals.ADMIN_URL}/tree-add`} component={treeAdd} />
              <Route history={customHistory} path={`/${globals.ADMIN_URL}/users-list`} component={usersList} />
              <Route history={customHistory} path={`/${globals.ADMIN_URL}/category-add`} component={categoryAdd} />
              <Route history={customHistory} exact path={`/${globals.ADMIN_URL}/category-list`} component={categoryList} />
              <Route history={customHistory} path={`/${globals.ADMIN_URL}/category-list/:categoryId`} component={categoryEdit} />
              <Route history={customHistory} path={`/${globals.ADMIN_URL}/backup`} component={backup} />
            </Switch> 
          </div>  
        </Router>
      </Provider>
      </PrefixerProvider>
    , appContainer);
}


//export store for use with redux-watch
export { store };
