const recipesObjectArray = [
  {
    id: 1,
    title: "Gløgg",
    picture_url:
      "https://true-north-kitchen.com/wp-content/uploads/2020/12/swedish-glo%CC%88gg-1.jpg",
    ingredients: [
      { name: "Orange zest", amount: "0.5" },
      { name: "Water", amount: "200" },
      { name: "Sugar", amount: "275 g" },
      { name: "Whole cloves", amount: "5" },
      { name: "Cinnamon sticks", amount: "2" },
      { name: "Spice", amount: undefined },
      { name: "Bottle of red wine", amount: "1" },
      { name: "Raisins", amount: "100 g" },
      { name: "Slipped Almonds", amount: "50 g" },
    ],
    description: "Mix everything, heat it, and you are good to go!",
  },
  {
    id: 2,
    title: "Smørrebrød",
    picture_url:
      "https://images.food52.com/7inn08DiMvBhIQBLF0gDgieVNnU=/fit-in/1200x1200/5b89c0f4-250d-4810-bb03-75440a7327c0--2018-1206_sponsored_follow-your-heart_smorrebrod_3x2_rocky-luten_002_1-.jpg",
    ingredients: [
      { name: "Rye bread", amount: "2 slices" },
      { name: "Butter", amount: "20 g" },
      { name: "Herring", amount: "50 g" },
      { name: "Red onion", amount: "0.5" },
      { name: "Capers", amount: "1 tbsp" },
      { name: "Egg", amount: "1" },
    ],
    description:
      "Spread butter on rye bread and layer the toppings as you like!",
  },
  {
    id: 3,
    title: "Æbleskiver",
    picture_url:
      "https://spisbedre-production-app.imgix.net/images/recipes/klassiske-aebleskiver_11702.jpg?auto=format&ar=655%3A500&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5005652386656991&fp-z=1.0011317567567568&w=1446",
    ingredients: [
      { name: "Flour", amount: "250 g" },
      { name: "Milk", amount: "300 ml" },
      { name: "Eggs", amount: "3" },
      { name: "Sugar", amount: "2 tbsp" },
      { name: "Butter", amount: "50 g" },
      { name: "Baking powder", amount: "1 tsp" },
      { name: "Cardamom", amount: "0.5 tsp" },
      { name: "Salt", amount: "1 pinch" },
    ],
    description:
      "Mix all ingredients and cook in an æbleskiver pan until golden brown.",
  },
  {
    id: 4,
    title: "Rødgrød med fløde",
    picture_url:
      "https://meyers.dk/media/13095/roedgroed_med_floede.jpg?anchor=center&mode=crop&width=1260&format=jpeg&quality=80&rnd=132169219430000000",
    ingredients: [
      { name: "Strawberries", amount: "300 g" },
      { name: "Red currants", amount: "200 g" },
      { name: "Sugar", amount: "100 g" },
      { name: "Water", amount: "250 ml" },
      { name: "Cornstarch", amount: "2 tbsp" },
      { name: "Heavy cream", amount: "100 ml" },
    ],
    description:
      "Cook berries with sugar, thicken with cornstarch, and serve with cream.",
  },
  {
    id: 5,
    title: "Frikadeller",
    picture_url:
      "https://ff234d58.rocketcdn.me/wp-content/uploads/2020/10/IMG_1100-860x802.jpg",
    ingredients: [
      { name: "Ground pork", amount: "500 g" },
      { name: "Egg", amount: "1" },
      { name: "Milk", amount: "100 ml" },
      { name: "Onion", amount: "1" },
      { name: "Flour", amount: "2 tbsp" },
      { name: "Salt", amount: "1 tsp" },
      { name: "Pepper", amount: "0.5 tsp" },
      { name: "Butter", amount: "50 g" },
    ],
    description:
      "Mix the ingredients, form small patties, and fry until golden brown.",
  },
];


//Count the time that the user has been on the page
let totalSecond = 0
const timer= document.querySelector("#timer")
function countTime(totalSecond){
  let hour = String(parseInt(totalSecond / 3600)).padStart(2, "0");
  let minute= String(parseInt(totalSecond%3600/60)).padStart(2,'0')
  let second = String(parseInt(totalSecond%60)).padStart(2, "0");
  return `${hour}:${minute}:${second}`
}

setInterval(()=>{
totalSecond++
timer.innerHTML=countTime(totalSecond)
},1000)



//sorting the recipe ingredients by ascending order
recipesObjectArray.forEach((recipe) => {
  recipe.ingredients.sort((a, b) => {
    const numberA = parseFloat(a.amount) || 0;
    const numberB = parseFloat(b.amount) || 0;  
    return numberA - numberB;
  });
});



const recipeContainer = document.querySelector(".main");

function displayRecipe(recipe) {
  recipe.forEach((recipe) => {
    const recipeBox = document.createElement("div");
    recipeBox.classList.add("recipe-box");
    recipeBox.innerHTML = `
<h2 class="recipe-name ">${recipe.title}</h2>
<img class="recipe-img" src="${recipe.picture_url}" alt="${recipe.title}" >
<h2 class="ingredients basic-font-size">Ingredients:</h2>
<ul class="ingredient-list"></ul>
<h2 class="description basic-font-size">Description:</h2>
<p class="recipe-description basic-font-size">${recipe.description}</p>
`;

    const ingredientList = recipeBox.querySelector(".ingredient-list");

    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      // if (typeof ingredient.amount !== "string") {
      //   li.innerHTML = `${ingredient.name}: not provided`;
      // } else {
      //   li.innerHTML = `${ingredient.name}: ${ingredient.amount}`;
      // }
      li.innerHTML = `${ingredient.name}: ${ingredient.amount}`;
      ingredientList.appendChild(li);
    });

    recipeContainer.appendChild(recipeBox);
  });
}

displayRecipe(recipesObjectArray);

function goBackToHomePage() {
  searchResult.innerHTML = "All recipes :";
  recipeContainer.innerHTML = "";
  displayRecipe(recipesObjectArray);
}

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResult = document.getElementById("search-result");

//
function displaySearchedRecipes() {
  const keyword = searchInput.value.trim().toLowerCase();
  searchResult.innerHTML = `Search result for ${keyword}:`;
  searchInput.value = "";
  recipeContainer.innerHTML = "";

  if (!keyword) {
    goBackToHomePage();
    return;
  }

  const filteredRecipes = recipesObjectArray.filter((recipe) => {
    return recipe.title.toLowerCase().includes(keyword);
  });
  if (!filteredRecipes.length) {
    recipeContainer.innerHTML = "No recipes found :(";
    return;
  }

  displayRecipe(filteredRecipes);
}

searchButton.addEventListener("click", displaySearchedRecipes);
