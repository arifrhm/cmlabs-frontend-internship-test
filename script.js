// Load Categories
document.addEventListener("DOMContentLoaded", function() {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => response.json())
        .then(data => {
            const categories = data.categories;
            const container = document.getElementById('category-container');
            categories.forEach(category => {
                const card = document.createElement('div');
                card.className = "border rounded-lg overflow-hidden shadow-lg bg-white text-center hover:shadow-2xl transition-shadow duration-300 cursor-pointer mx-2"; // Added mx-2 for margin
                card.innerHTML = `
                    <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-full h-32 sm:h-40 object-cover">
                    <div class="p-4">
                        <h2 class="text-lg font-bold text-gray-800">${category.strCategory}</h2>
                    </div>
                `;
                card.onclick = () => {
                    window.location.href = `category.html?c=${category.strCategory}`;
                };
                container.appendChild(card);
            });
        });
});

// Load Meals by Category
if (window.location.href.includes('category.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('c');

    // Set the category name in both breadcrumb and main section
    document.getElementById('current-category').textContent = categoryName; // Update breadcrumb
    document.getElementById('category-name').textContent = categoryName; // Update header

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            const mealContainer = document.getElementById('meal-container');

            if (meals) {
                meals.forEach(meal => {
                    const mealCard = document.createElement('div');
                    mealCard.className = "border rounded-lg p-4 text-center cursor-pointer";
                    mealCard.innerHTML = `
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="mb-2 mx-auto">
                        <h2 class="text-lg font-bold">${meal.strMeal}</h2>
                    `;
                    mealCard.onclick = () => {
                        window.location.href = `meal.html?id=${meal.idMeal}`;
                    };
                    mealContainer.appendChild(mealCard);
                });
            } else {
                mealContainer.innerHTML = `<p class="text-center">No meals found in this category.</p>`;
            }
        })
        .catch(error => console.error('Error fetching meals:', error));
}


// Load Meal Details (optional)
if (window.location.href.includes('meal.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('id');
    
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            document.getElementById('meal-title').textContent = meal.strMeal;
            document.getElementById('meal-image').src = meal.strMealThumb;
            document.getElementById('meal-description').textContent = meal.strInstructions;
            document.getElementById('meal-video').src = meal.strYoutube.replace("watch?v=", "embed/");
        });
}


