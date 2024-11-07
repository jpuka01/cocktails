document.addEventListener("DOMContentLoaded", () => {
    const cocktailsContainer = document.getElementById("cocktails");

    // Fetch data from the API
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
        .then(response => response.json())
        .then(data => {
            const drinks = data.drinks;

            // Loop through each drink and display its detail
            drinks.forEach(drink => {
                const drinkDiv = document.createElement("div");
                drinkDiv.classList.add("cocktail");

                drinkDiv.innerHTML = `
                    <h2>${drink.strDrink}</h2>
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
                    <p><strong>Category:</strong> ${drink.strCategory}</p>
                    <p><strong>IBA:</strong> ${drink.strIBA || "N/A"}</p>
                    <p><strong>Alcoholic:</strong> ${drink.strAlcoholic}</p>
                    <p><strong>Glass:</strong> ${drink.strGlass}</p>
                    <p><strong>Instructions:</strong> ${drink.strInstructions}</p>
                    <ul>
                        ${getIngredients(drink)}
                    </ul>
                `;

                cocktailsContainer.appendChild(drinkDiv);
            });
        })
        .catch(error => console.error("Error fetching data: ", error));

    // Helper function to get the ingredients
    function getIngredients(drink) {
        let ingredients = "";
        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];
            if (ingredient) {
                ingredients += `<li>${measure || ""} ${ingredient}</li>`;
            }
        }
        return ingredients;
    }
});
