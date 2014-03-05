var projectHandlers = require('./projectHandlers');
var userHandlers = require('app/users/userHandlers');

'use strict';

module.exports = function (app) {

    var canModify = [userHandlers.loggedIn, projectHandlers.getProjectById,
        projectHandlers.isProjectOwner];

    app.post('/api/projects', userHandlers.loggedIn, projectHandlers.create);
    app.get('/api/projects');

    app.post('/api/projects/:id', canModify, projectHandlers.save);
    app.get('/api/projects/:id', projectHandlers.getProjectById, projectHandlers.send);
    app.del('/api/projects/:id', canModify, projectHandlers.del);

};