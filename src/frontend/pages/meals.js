window.handleMealsRequest = async () => {
  const getMealsFromDB = await fetch("/api/meals");
  const getAllMeals = await getMealsFromDB.json();

  document.body.innerHTML = `
    <html lang ="en">
    <head>
    <meta name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
    <title>Mealsharing</title>
      </head>
      <body>
     <div class="render-meal">
    <div class="menu-container">
      <div>
        <img src="/images/meal-icon.jpg" alt="Logo of the meal sharing app" class="logo">
          </div>
         <div class="searchClass">
          <input type="text" id="searchMeal" placeholder="Search Meal">
          <input type="submit" id="searchButton" value ="Search">
          <div id="displayMeal" ></div>
        </div>
        
            <div class ="menu">
              <ul class="main-nav">
              <li><a href="/" data-navigo >Home</a></li>
              <li><a href="/reviews" data-navigo >Reviews</a></li>
               <li><a href="/reservations" data-navigo >Reservations</a></li>
             </ul>
     </div>
    </div>   
       <div class = "meals-container">

        ${renderMeals(getAllMeals)}   </div>
     
    <div class="add-form"
       <h2>Add A New Meal </h2>
       <form  action="../../api/meals" method="post">
       <label for="title">Title:</label>
       <input type="text" id="title" name="Title"><br><br>
       <label for="desc">Description:</label>
       <input type="text" id="description" name="Description"><br><br>
       <label for="location">Location:</label>
       <input type="text" id="location" name="Location"><br><br>
       <label for="price">Price</label>
       <input type="text" id="price" name="Price"><br><br>
       <label for="reservation">Maximum Reservation</label>
       <input type="text" id="maxReservation" name="maxReservation"><br><br>
       <input type="submit" class="btn" value="Add meal">
        </form>
        </div>
        </div>
        <footer>          
        <p>&copy; 2020 Mealsharing app project done by Anna John George </p>
      </footer> 
      </body>
      </html>         
      `;
  const search = document.querySelector("#searchMeal");
  const searchBtn = document.querySelector("#searchButton");
  if (searchBtn) {
    searchBtn.addEventListener("click", async () => {
      const searchWord = search.value.toLowerCase();

      fetch(`/api/meals?title=${searchWord}`)
        .then((response) => {
          var res = response.json();
          return res;
        })
        .then((data) => {
          data.forEach((list) => {
            document.querySelector(".meals-container").innerHTML = "";
            document.querySelector(".meals-container").innerHTML = `
          <div class="render-searchedMeal">
         Searched Meal : 
         <div>
             <li class="meal-title"> <a href = "/meal/${list.id}"> ${list.title} </a></li>
             </div>
             <div>
              <img class ="meal-photo" src="/images/${list.title}.jpg" alt="Meal with title displayed" width ="180" height="150">
             </div>
             </div>
         
     `;
          });
        });
    });
  }
  function renderMeals(meals) {
    return meals
      .map((mealDetails) => {
        return `
    
  <div class = "left-half">
         <div class="img-column">
         
            <li class="meal-title"> ${mealDetails.title} </a></li>
             <img class ="meal-photo" src="/images/${mealDetails.title}.jpg" alt="Meal with title displayed" width ="180" height="150">
             <div class="book-meal">
           <a href = "/meal/${mealDetails.id}">   <input type="button" class="book-button"  value = "Book Meal">  </a>
           </div>
         </div>
       </div>
       `;
      })
      .join("");
  }
};
