const express = require("express");
const app = express();
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const getReservation = await knex.select("*").table("reservation");
    response.json(getReservation);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    const { name, emailaddress, phoneNumber, numGuests, mealID } = request.body;
    const addReservation = await knex("reservation").insert({
      name: name,
      emailaddress: emailaddress,
      phonenumber: phoneNumber,
      number_of_guests: numGuests,
      meal_id: mealID,
    });

    response.json(`Added reservation in the name of ${name}`);

    if (addReservation.length === 0) {
      response.send("Adding reservation failed");
    }
  } catch (error) {
    throw error;
  }
});
router.get("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const getReservationWIthID = await knex("reservation").where({
      id: request.params.id,
    });
    response.send(getMealsWIthID);
  } catch (error) {
    throw error;
  }
});
router.put("/:id", async (request, response) => {
  try {
    //knex syntax for selecting things. Look up the documentation for knex for further info
    const { number_of_guests, meal_id, created_date } = request.body;
    const updateMealsWIthID = await knex("reservation")
      .where({ id: request.params.id })
      .update({ number_of_guests, meal_id, created_date });
    response.json(updateMealsWIthID);
  } catch (error) {
    throw error;
  }
});
router.delete("/:id", async (request, response) => {
  try {
    //knex syntax for selecting things. Look up the documentation for knex for further info
    const deleteMealWIthID = await knex("reservation")
      .where({ id: request.params.id })
      .del();
    response.json(deleteMealWIthID);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
