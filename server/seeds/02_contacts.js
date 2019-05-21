
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contacts').del()
    .then(function () {
      // Inserts seed entries
      return knex('contacts').insert([
        {
          name: 'Justin Bieber',
          address: "555 Baby Baby Baby Street",
          work: 1-803-301-1994,
          created_by: 1
        },
        {
          name: 'Justin Timberlake',
          address: "123 Cry Me A River Street",
          mobile: 1-800-131-1981,
          created_by: 1
        },
        {
          name: 'Justin Timberlake',
          address: "123 Cry Me A River Street",
          mobile: 1-800-131-1981,
          twitter: '@jtimberlake',
          created_by: 2
        },
        {
          name: 'Brendon Urie',
          address: "84 I Write Sins Not Tragedies Street",
          mobile: 1-800-412-1987,
          twitter: '@brendonurie',
          created_by: 2
        },
        {
          name: 'Taylor Swift',
          address: "999 Shake It Off Avenue",
          work: 1-801-213-1989,
          created_by: 2
        },
      ]);
    });
};
