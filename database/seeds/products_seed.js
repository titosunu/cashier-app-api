exports.seed = async function (knex) {
  return await knex("products").insert([
    { name: "Indomie Goreng Jumbo", category_id: 1, price: 4000, stock: 100 },
    { name: "Floridina", category_id: 2, price: 3000, stock: 200 },
    { name: "Paracetamol", category_id: 3, price: 2000, stock: 50 },
  ]);
};
