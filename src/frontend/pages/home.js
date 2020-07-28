window.handleHomeRequest = () => {
  document.body.innerHTML = `
  <html lang ="en">
  <head>
  <meta name='viewport'
      content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
  <title>Mealsharing</title>

   
    </head>
    <body>
      <nav>
        <div class="menu-container">
          <div>
            <img src="/images/meal-icon.jpg" alt="Logo of the meal sharing app" class="logo">
              </div>
             
                <div class ="menu">
                  <ul class="main-nav">
                    <li><a href="/" data-navigo >Home</a></li>
                    <li><a href="/reviews" data-navigo> Reviews</a></li>
                     <li><a href="/reservations" data-navigo >Reservations</a></li>
                 </ul>
         </div>
        </div>
        </nav>
        <header>
      <div class="main-text-box">
     
      <p>The fondest memories are made</p>
      <p>when gathered around the table</p>
       
         <a class="btn" href="/meals" data-navigo >View Menu</a>
      
         
 </header>
 
 <footer>          
  <p>&copy; 2020 Mealsharing app project done by Anna John George </p>
</footer>          

 
  </body>
  </html>
  `;

  // if any links are added to the dom, use this function
  // make the router handle those links.
  router.updatePageLinks();
};
