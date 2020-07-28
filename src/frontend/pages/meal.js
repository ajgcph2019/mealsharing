window.handleMealRequest = async (params) => {
  const getMealResponse = await fetch(`/api/meals/${params.id}`);

  const getMeal = await getMealResponse.json();
 
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
        <div class ="menu">
          <ul class="main-nav">
          <li><a href="/" data-navigo >Home</a></li>
          <li><a href="/reviews" data-navigo >Reviews</a></li>
           <li><a href="/reservations" data-navigo >Reservations</a></li>
         </ul>
      </div>
</div>
 
  <div>
  <h1>Meal with id ${params.id}</h1>
  ${renderMealWithID(getMeal)}</div>
 
 
  <div class="add-form">
  <h2>Make a reservation</h2>
  <form action="../../api/reservations"  method="post" > 
 
 <div>
  <label for="mealID">Meal ID:</label>
  </div>
  <div>
  <input type="text" id="mealID" name="mealID" value=${
    params.id
  } placeholder="Name" required><br><br>
  </div>
  <div>
    <label for="name">Name:</label>
    </div>
    <div>
    <input type="text" id="name" name="name" placeholder="Name" required><br><br>
    </div>
    <div>
    <label for="emailaddress">Email:</label>
    </div>
    <div>
    <input type="email" id="emailaddress" name="emailaddress" placeholder="example@domain.com" required><br><br>
    </div>
    <div>
    <label for="phoneNumber">Phone number:</label>
    </div>
    <div>
    <input type="tel" id="phoneNumber" name="phoneNumber"
      placeholder="123-456-7890"
       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
       required><br><br>
       </div>
       <div>
       <label for="numGuests">Number Of Guests:</label>
       </div>
       <div>
       <input type="text" id="numGuests" name="numGuests" placeholder="Number Of Guests"><br><br>
       </div>
      
    <input type="submit" class="btn" value="Submit"  >
    
  </form>
 
  </div>
  
  </div>
  <footer>          
  <p>&copy; 2020 Mealsharing app project done by Anna John George </p>
</footer>    
</html>
</body>
  `;
  function renderMealWithID(meal) {
    return meal.map((mealDetail) => {
      return ` 
     
      <li class="meal"> <img src="../images/${mealDetail.title}.jpg" alt="Meal with title displayed" width ="180" height="150"></li>
      <li class="meal"> Title : ${mealDetail.title} </li>
      <li class="meal"> Description : ${mealDetail.description} </li>
       <li class="meal"> Price :${mealDetail.price} kr </li>
       <li class="meal"> Location :${mealDetail.location} </li>
       <li class="meal">Maximum Reservation : ${mealDetail.max_reservation} </li>
       `;
       
    });
  }
};
