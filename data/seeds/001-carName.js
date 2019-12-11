
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        
        {id: 1, make: 'car1', model: "test1", mileage: 223423, VIN: 353453},
        {id: 2, make: 'car2', model: "test2", mileage: 223423, VIN: 353453},
        {id: 3, make: 'car3', model: "test3", mileage: 223423, VIN: 353453}
      ]);
    });
};
