
exports.up = function(knex) {
    return knex.schema.createTable("cars", tbl => {
        tbl.increments("id")
        
        tbl
            .string("make", 255)
            .notNullable()
    

        tbl
            .string("model", 255)
            .notNullable()
      
        tbl
            .integer("mileage", 255)
            .notNullable()
        
        
        tbl
            .integer("VIN", 255)
            .notNullable()
        
        tbl
            .boolean("transmission_type_is_manual").defaultTo(false)
        
        tbl
            .boolean("title_is_clean").defaultTo(true)
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
