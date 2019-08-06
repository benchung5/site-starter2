module.exports = {
   "development": {
	   	SERVER_URL: "http://localhost/api",
	   	ROOT_URL: "http://localhost",
      ARTICLES_UPLOADS_PATH: '/uploads/articles/',
	   	TREES_UPLOADS_PATH: '/uploads/trees/',
   },
   "production": {
	   	SERVER_URL: "https:workshopelves.com/api",
	   	ROOT_URL: "https:workshopelves.com/",
	   	ARTICLES_UPLOADS_PATH: '/uploads/articles/',
      TREES_UPLOADS_PATH: '/uploads/trees/',
   },
   "globals": {
      HIDE_MENU_THRESHOLD: 1150,
   		POST_CONFIG: {
           headers: {
             'CONTENT_TYPE': 'application/json',
           }
         },
      ADMIN_ENTRIES_PER_PAGE: 25,
      ADMIN_URL: 'admin'
   	}
}