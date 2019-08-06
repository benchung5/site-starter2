import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import reducerArticle from './reducerArticle';
import reducerArticles from './reducerArticles';
import reducerTree from './reducerTree';
import reducerTrees from './reducerTrees';
import reducerAuth from './reducerAuth';
import reducerUser from './reducerUser';
import reducerUsers from './reducerUsers';
import reducerCategory from './reducerCategory';
import reducerCategories from './reducerCategories';
import reducerTag from './reducerTag';
import reducerTags from './reducerTags';
import reducerTreeTables from './reducerTreeTables';
import reducerLocation from './reducerLocation';
import reducerGlobal from './reducerGlobal';
import reducerGlobalTrees from './reducerGlobalTrees';
import reducerViews from './reducerViews';
import reducerRoutes from './reducerRoutes';
import reducerNearMe from './reducerNearMe';
import reducerMapStyle from './reducerMapStyle';
import reducerShowSingle from './reducerShowSingle';
import reducerShowMenu from './reducerShowMenu';
import reducerDb from './reducerDb';
import reducerIsOnline from './reducerIsOnline';
import reducerLang from './reducerLang';
import reducerInternalLoad from './reducerInternalLoad';
import reducerInitialLoad from './reducerInitialLoad';

const rootReducer = combineReducers({
  form,
  article: reducerArticle,
  articles: reducerArticles,
  tree: reducerTree,
  trees: reducerTrees,
  auth: reducerAuth,
  user: reducerUser,
  users: reducerUsers,
  category: reducerCategory,
  categories: reducerCategories,
  tag: reducerTag,
  tags: reducerTags,
  treeTables: reducerTreeTables,
  map: reducerLocation,
  global: reducerGlobal,
  globalTrees: reducerGlobalTrees,
  views: reducerViews,
  routes: reducerRoutes,
  nearMe: reducerNearMe,
  mapStyle: reducerMapStyle,
  showSingle: reducerShowSingle,
  showMenu: reducerShowMenu,
  db: reducerDb,
  isOnline: reducerIsOnline,
  language: reducerLang,
  initialLoad: reducerInitialLoad,
  internalLoad: reducerInternalLoad,
});

export default rootReducer;
