let recipesObjectArray = [];
let ingredientPriceArray = [];

async function getIngredientPriceData() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/LinRuoyin/LinRuoyin.github.io/main/data/ingredients.json"
    );
    const priceData = await response.json();
    return priceData;
  } catch (err) {
    console.log("getIngredientPriceData", err.message);
  }
}

async function loadAndDisplayRecipes() {
  try {
    const recipeResponse = await fetch(
      "https://raw.githubusercontent.com/LinRuoyin/LinRuoyin.github.io/main/data/Recipe-app.json"
    );
    const recipeData = await recipeResponse.json();
    recipesObjectArray = recipeData;

    //add local user input data
    const userRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];

    recipesObjectArray = recipeData.concat(userRecipes);

    ingredientPriceArray = await getIngredientPriceData();

    sortRecipeByIngredientAmount();

    const priceMapObject = {};
    ingredientPriceArray.forEach((element) => {
      priceMapObject[element.name.toLowerCase()] = element.price;
    });

    recipesObjectArray.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const price = priceMapObject[ingredient.name.toLowerCase()] ?? "N/A";
        ingredient["price"] = price;
      });
    });
    console.log(recipesObjectArray);

    displayRecipe(recipesObjectArray);
  } catch (err) {
    console.log("loadAndDisplayRecipes", err.message);
  }
}

loadAndDisplayRecipes();

let totalSecond = 0;
const timer = document.querySelector("#timer");

setInterval(() => {
  totalSecond++;
  timer.innerHTML = formatTime(totalSecond);
}, 1000);

//sorting the recipe ingredients by ascending order
function sortRecipeByIngredientAmount() {
  recipesObjectArray.forEach((recipe) => {
    recipe.ingredients.sort((a, b) => {
      const numberA = parseFloat(a.amount) || 0;
      const numberB = parseFloat(b.amount) || 0;
      return numberA - numberB;
    });
  });
}

const recipeContainer = document.querySelector(".main");

function displayRecipe(recipeArray) {
  recipeArray.forEach((recipe) => {
    const isUserRecipe = recipe.id.toString().startsWith("user-");
    const recipeBox = document.createElement("div");
    recipeBox.classList.add("recipe-box");
    recipeBox.innerHTML = `
<h2 class="recipe-name ">${recipe.title}</h2>
<img class="recipe-img" src="${recipe.picture_url}" alt="${recipe.title}" >
<h2 class="ingredients basic-font-size">Ingredients:</h2>

<ul class="ingredient-list ingredient-ul"></ul>

<div class="card-bottom">
    <h2 class="description basic-font-size">Description:</h2>
    <p class="recipe-description basic-font-size">${recipe.description}</p> 
    ${
      isUserRecipe
        ? `<button class="delete-recipe-button" data-id="${recipe.id}">Delete</button>`
        : ""
    }
  </div>
  
`;

    const ingredientList = recipeBox.querySelector(".ingredient-list");

    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.innerHTML = `
    <span class="ingredient-name">${ingredient.name}: ${ingredient.amount}</span>
    <span class="ingredient-price">${ingredient.price} </span>
  `;
      ingredientList.appendChild(li);
    });

    recipeContainer.appendChild(recipeBox);
    const deleteBtn = recipeBox.querySelector(".delete-recipe-button");

    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        const idToDelete = deleteBtn.dataset.id;
        let userRecipes = JSON.parse(localStorage.getItem("userRecipes")) || [];
        userRecipes = userRecipes.filter(
          (recipe) => recipe.id.toString() !== idToDelete
        );
        localStorage.setItem("userRecipes", JSON.stringify(userRecipes));

        recipesObjectArray = recipesObjectArray.filter(
          (recipe) => recipe.id.toString() !== idToDelete
        );
        recipeContainer.innerHTML = "";
        displayRecipe(recipesObjectArray);
      });
    }
  });
}

function goBackToHomePage() {
  searchResult.innerHTML = "All recipes :";
  recipeContainer.innerHTML = "";
  displayRecipe(recipesObjectArray);
}

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResult = document.getElementById("search-result");
const ingredientPriceInfo = document.getElementById("ingredient-price-info");

//
function displaySearchedRecipes() {
  const keyword = searchInput.value.trim().toLowerCase();
  searchResult.innerHTML = `Search result for ${keyword}:`;
  const searchTitleCheckbox = document.getElementById("search-title");
  const searchIngredientCheckbox = document.getElementById("search-ingredient");
  searchInput.value = "";
  recipeContainer.innerHTML = "";
  ingredientPriceInfo.innerHTML = "";

  if (!keyword) {
    goBackToHomePage();
    return;
  }

  let filteredRecipe = [];

  if (searchTitleCheckbox.checked) {
    filteredRecipe = filteredRecipe.concat(
      recipesObjectArray.filter((recipe) =>
        recipe.title.toLowerCase().includes(keyword)
      )
    );
  }

  //if ingredient search checkbox is checked
  if (searchIngredientCheckbox.checked) {
    const matchedIngredientRecipes = recipesObjectArray.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.name.toLowerCase().includes(keyword)
      )
    );

    filteredRecipe = filteredRecipe.concat(matchedIngredientRecipes);

    const matchedIngredientObject = ingredientPriceArray.find(
      (element) => element.name.toLowerCase() === keyword
    );

    if (matchedIngredientObject) {
      ingredientPriceInfo.innerHTML = `${matchedIngredientObject.name} : ${matchedIngredientObject.price}`;
    }

    const uniqueID = new Set();
    const uniqueRecipe = filteredRecipe.filter((recipe) => {
      if (uniqueID.has(recipe.id)) {
        return false;
      } else {
        uniqueID.add(recipe.id);
        return true;
      }
    });

    if (!uniqueRecipe.length) {
      recipeContainer.innerHTML = "No recipes found:(";
      return;
    }
    displayRecipe(uniqueRecipe);
  }
}

searchButton.addEventListener("click", displaySearchedRecipes);
