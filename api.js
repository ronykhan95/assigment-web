const mealDetail = document.getElementById('mealDetail');
const mealsDiv = document.getElementById('meal-list');
const searchDiv = document.getElementById("searchDiv");
const inputName = document.getElementById("input-name");

const displayMeal = name => {
    if (name.length > 0) {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayAllMeal(data);
            })
    }
}

const displayAllMeal = meal => {
    const meals = meal.meals;
    if (meals === null) {
        alert('Please insert a valid name.');
    }
    else {
        let output = "";
        meals.forEach(meal => {
            const mealInfo = `
            <div class="meal-div">
            <a class="meal-details" meal-id="${meal.idMeal}" href="#">
            <img src="${meal.strMealThumb}"></img>
            <h3 class="meal-name">${meal.strMeal}</h3>
            </a>
            </div>
            `;
            output += mealInfo;
        });
        mealsDiv.innerHTML = output;

        let mealDetail = document.querySelectorAll('.meal-details');
        mealDetail.forEach(card => {
            card.addEventListener('click', function () {
                let id = this.getAttribute('meal-id');
                getMealDetail(id);
            })
        });
    }
}

const getMealDetail = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url).then(res => res.json())
        .then(data => {
            displayMealDetail(data);
        }
        )
}

const displayMealDetail = data => {
    let meal = data.meals[0];
    mealsDiv.style = 'display:none;';
    searchDiv.style = 'display:none;';
    mealDetail.style = 'display:flex';

    let template = `<div class="card">
                        <img class="card-img-top" src="${meal.strMealThumb}"/>
                        <h5 class="card-title text-center mt-2">${meal.strMeal}</h5>
                        <div class="card-body">
                            <h6>Ingredients</h6>
                            <ul id="ingredients">`;

    
    let listOfIngredients = '';
    for (let i = 1; i <= 20; i++) { 
        let indexOfIngredient = 'strIngredient' + i;
        let indexOfMeasure = 'strMeasure' + i;

        if (meal[indexOfIngredient] != null && meal[indexOfIngredient].length > 0) {
            listOfIngredients += `<li>${meal[indexOfMeasure]} ${meal[indexOfIngredient]} ${meal[indexOfIngredient].length}</li>`;
        }
    }
    template += listOfIngredients;
    template += `</ul></br><center><a class="mt-10 mb-10 btn btn-danger" href="#" onclick="back()">Back</a></center></div></div>`;


   
    mealDetail.innerHTML = template;
}

const back = () => {
    window.location.reload();
    inputName.value = "";
}

const searchMeal = () => {
    const inputName = document.getElementById("input-name").value;
    displayMeal(inputName);
}



