window.handleReviewsRequest = async () => {
  const getMealResponse = await fetch("/api/meals");
  const getMeal = await getMealResponse.json();
  const getReviewResponse = await fetch("/api/reviews");
  const getReview = await getReviewResponse.json();

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
  
    <div>${renderReview(getReview)}</div>
    
   <div class="add-form" >
   <div>Add A Review</div>
  <form action="../../api/reviews" method="post">
  <label for="meal_id">Meal ID:</label>
  <input type="text" id="meal_id" name="MealID"><br><br>
  <label for="title">Title:</label>
  <input type="text" id="title" name="Title"><br><br>
  <label for="description">Description:</label>
  <input type="text" id="description" name="Description"><br><br>
  <label for="stars">Rating</label>
  <input type="text" id="stars" name="Rating"><br><br>
  <input type="submit" class="btn" value="Add Review">
   </form>
   </div>
   </div>
   <footer>          
   <p>&copy; 2020 Mealsharing app project done by Anna John George </p>
 </footer> 
 </body>
 </html>
   `;
};
function renderReview(reviewsFromDB) {
  return reviewsFromDB.map((review) => {
    return `
        <li class="review"> Title : ${review.title} </li>
        <li class="review"> Description : ${review.description} </li>
         <li class="review"><a href ="/meal/${review.meal_id}" >Meal ID : ${review.meal_id}</a>  </li>
         <li class="review"> Rating : ${review.stars} </li>
        `;
  });
}
