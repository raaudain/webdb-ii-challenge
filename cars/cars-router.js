const express = require("express");
const knex = require("knex");

const router = express.Router();

// const db = knex({
//     client: "sqlite3",
//     connection: {
//         filename: "../data/car-dealer.db3"
//     },
//     useNullAsDefault: true
// });

const db = require("../data/dbConfig");

router.get("/", (req, res) => {
    db("cars")
        .then(car => {
            res.json(car);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Database could not be retrieved"});
        });
});


router.get("/:id", (req, res) => {
    db("cars")
        .where({id: req.params.id})
        .then(car => {
            res.json(car);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Database could not be retrieved"});
        });
});


router.post("/", (req, res) => {
    const body = req.body;

    db("cars")
        .insert(body)
        .then(ids => {
            const id = ids[0];
            return db("cars")
                .select("id", "make", "model", "mileage", "VIN")
                .where({id})
                .then(newCar => {
                    res.status(201).json(newCar);
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Database could not be retrieved"});
        });
});


router.put("/:id", (req, res) => {
    const id = req.params.id;
    const body = req.body;

    db("cars")
        .where({id})
        .update(body)
        .then(car => {
            if(car > 0){
                res.status(200).json("Car information updated");
            }
            else{
                res.status(400).json("Car information not updated");
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Database could not be retrieved"});
        });
});


router.delete("/:id", (req, res) => {
    db("cars")
        .where({id: req.params.id})
        .del()
        .then(car => {
            res.status(200).json("Car removed");
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Database could not be retrieved"});
        });
});


module.exports = router;