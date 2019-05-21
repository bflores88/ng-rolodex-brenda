'use strict';

const bookshelf = require('../bookshelf');

require('./Contact')
class User extends bookshelf.Model {
  get tableName() {
    return 'users';
  }
  get hasTimestamps() {
    return true;
  }

  contacts () {
    return this.hasMany('Contact', 'created_by');
  }

}

module.exports = bookshelf.model('User', User);