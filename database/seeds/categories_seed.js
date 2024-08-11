exports.seed = async function (knex) {
  return await knex('categories').insert([
    { name: 'Makanan' },
    { name: 'Minuman' },
    { name: 'Obat-obatan' },
  ]);
};
