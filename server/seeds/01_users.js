const bcrypt = require('bcryptjs');
const saltRounds = 12;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'admin',
          password: bcrypt.hashSync('abc123', saltRounds),
          name: 'Brenda'
        },
        {
          username: 'user1',
          password: bcrypt.hashSync('abc123', saltRounds),
          name: 'Broderick'
        },
        {
          username: 'user2',
          password: bcrypt.hashSync('abc123', saltRounds),
          name: 'Ordin'
        }
      ]);
    });
};
