const express = require("express");
const app = express();
const router = express.Router();
const knex = require("../database");
//const { sum } = require("../database");

//Returns all meals
//Get meals that has a price smaller than maxPrice
//Get meals that still has available reservations
//Get meals that partially match a title.
//Get meals that has been created after the date
//Only specific number of meals

router.get("/", async (req, res) => {
  try {
    const {
      maxPrice,
      availableReservations,
      title,
      createdAfter,
      limit,
    } = req.query;
    const meals = await knex.select("*").table("meal");

    if (maxPrice) {
      const parsedPrice = parseInt(maxPrice);
      const mealsLessThanMaxPrice = await knex("meal")
        .select()
        .where("price", "<", parsedPrice);
      res.json(mealsLessThanMaxPrice);
    }

    if (availableReservations === "true") {
      //api/meals?availableReservations=true
      const result = await knex
        .from("meal")
        .innerJoin("reservation", { "meal.id": "reservation.meal_id" })
        .groupBy("meal.id")
        .having(
          knex.raw(
            "meal.max_reservation > coalesce(sum(reservation.number_of_guests), 0)"
          )
        )
        .select("meal.*");
      res.json(result);
    }

    if (title) {
      const mealsWithMatchingTitle = await knex("meal").where(
        "title",
        "like",
        `%${title}%`
      );
      res.json(mealsWithMatchingTitle);
    }

    if (createdAfter) {
      const dateCreatedAfter = new Date(createdAfter);
      const mealsCreatedAfter = await knex("meal")
        .select()
        .where("created_date", ">", dateCreatedAfter);
      res.json(mealsCreatedAfter);
    }

    if (limit) {
      const parsedLimit = parseInt(limit);
      const mealsShownInLimit = await knex
        .select()
        .from("meal")
        .limit(parsedLimit);
      res.json(mealsShownInLimit);
    }

    if (meals.length === 0) {
      res.status(404).send(`404 Error. Meal is not found`);
    }
    res.json(meals);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (request, response) => {
  // const {
  //   title,
  //   description,
  //   location,
  //   max_reservation,
  //   price
  // } = request.body;
  // console.log(request.body);
  try {
    const mealTitle = request.body.Title;
    const mealDescription = request.body.Description;
    const location = request.body.Location;
    const maxNumberOfGuests = request.body.maxReservation;
    const mealPrice = request.body.Price;

    const addMeal = await knex("meal").insert({
      title: mealTitle,
      description: mealDescription,
      location: location,
      price: mealPrice,
      max_reservation: maxNumberOfGuests,
    });

    response.json(`created meal with ${mealTitle}`);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    //console.log(request.body);
    const {
      title,
      description,
      location,
      when_date,
      max_reservation,
      price,
      created_date,
    } = request.body;
    //knex syntax for selecting things. Look up the documentation for knex for further info
    const updateMealsWIthID = await knex("meal")
      .where({ id: request.params.id })
      .update({
        title,
        description,
        location,
        when_date,
        max_reservation,
        price,
        created_date,
      });
    response.json(updateMealsWIthID);
  } catch (error) {
    throw error;
  }
});
router.get("/:id", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const getMealWithId = await knex("meal").where({
      id: request.params.id,
    });
    response.json(getMealWithId);
  } catch (error) {
    throw error;
  }
});
router.delete("/:id", async (request, response) => {
  try {
    //knex syntax for selecting things. Look up the documentation for knex for further info
    const deleteMealWIthID = await knex("meal")
      .where({ id: request.params.id })
      .del();
    response.json(deleteMealWIthID);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
