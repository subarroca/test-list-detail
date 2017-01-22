var express = require('express');
var router = express.Router();
var users = require('../data/users.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var maxPageSize = 25;

  var page = Math.max(0, parseInt(req.query.page) - 1 || 0);
  var pageSize = Math.min(maxPageSize, parseInt(req.query.pageSize) || maxPageSize);
  var q = (req.query.q || '').toLowerCase();

  var filteredUsers = users
    .filter(user =>
      (user.name.toLowerCase().search(q) > -1) || (user.surname.toLowerCase().search(q) > -1));

  var usersPage = filteredUsers
    .slice(page * pageSize, (page + 1) * pageSize);

  res.send({
    pagination: {
      page: page + 1,
      pageSize: pageSize,
      totalItems: filteredUsers.length
    },
    results: usersPage
  });
});

/* GET user by id. */
router.get('/:userId', function(req, res, next) {
  var user = users.filter(user => user.id === parseInt(req.params.userId))[0];
  res.send(user);
});

module.exports = router;
