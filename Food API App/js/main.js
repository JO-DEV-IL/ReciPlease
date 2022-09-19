document.querySelector('button').addEventListener('click', getFetch)

function getFetch(e){
    e.preventDefault(); // For some reason wrapping the button in a form causes a fetch error because the page load disrupts the fetch attempt. This code stops that page refresh before the fetch occurs
    const searchValue = document.querySelector('input').value
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=$${searchValue}&app_id=51520325&app_key=a3fc59c754402a9017e2f971134a345f`
  
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            generateHTML(data.hits)
            console.log(data)
            // Code for displaying data here

        })
        .catch(err => {
            console.log(`error ${err}`)
        });
  }
  
  // Function to insert HTML for each array element in the API search using the map() method
  function generateHTML(results){
    let generatedHTML = ''
    results.map(result => {
        generatedHTML +=
        `
        <div class="item">
		    <img src="${result.recipe.image}" alt="">
			<div class="flex-container">
				<h1 class="title">${result.recipe.label}</h1>
				<a href="${result.recipe.url}" class="view-button">View Recipe</a>
			</div>
			<p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p>
		</div>
        
        `
    })
    const searchResultDiv = document.querySelector('.search-result') // References where to insert HTML
    searchResultDiv.innerHTML = generatedHTML // InnerHTML pushes HTML to the webpage
  }