window.handleReservationsRequest = async () => {
  const getReservationResponse = await fetch(`/api/reservations`);
  const getReservation = await getReservationResponse.json();

  document.body.innerHTML = `
      <html lang ="en">
      <head>
      <meta name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
      <title>Mealsharing</title>
    
       
        </head>
        <body>
    <div class="menu-container">
      <div>
        <img src="/images/meal-icon.jpg" alt="Logo of the meal sharing app" class="logo">
          </div>
            <div class ="menu">
              <ul class="main-nav">
              <li><a href="/" data-navigo >Home</a></li>
              <li><a href="/reviews" data-navigo >Reviews</a></li>
               <li><a href="/reservations" data-navigo>Reservations</a></li>
             </ul>
     </div>
    </div>
    
  
    <div>${renderReservation(getReservation)}</div>
    <div> <a href="/" data-navigo >Home</a> </div>
    <footer>          
    <p>&copy; 2020 Mealsharing app project done by Anna John George </p>
  </footer> 
      </body>
      </html>`;
};
function renderReservation(reservationFromDB) {
  return reservationFromDB.map((reservation) => {
    return `
    <li class="reservation"> Name : ${reservation.name} </li>
    <li class="reservation"> Email address : ${reservation.emailaddress} </li>
     <li class="reservation"> Phone Number : ${reservation.phonenumber} </li>
     <li class="reservation"> Number of Guests : ${reservation.number_of_guests} </li>
     <li class="reservation"><a href = "/meal/${reservation.meal_id}">  Meal ID : ${reservation.meal_id} </a></li>
   
     `;
  });
}
