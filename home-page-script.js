const recipeObject = {
  id: 1,
  title: "Rainbow",
  picture_url: "https://yoshimisushi.dk/media/gson03jf/nr-70-1.jpg",
  ingredients: [
    { NAME: "surimi", AMOUNT: "2 pieces" },
    { NAME: "cucumber", AMOUNT: "3 slices" },
    { NAME: "avocado", AMOUNT: "4 slices" },
    { NAME: "shrimp", AMOUNT: "2 pieces" },
    { NAME: "tuna", AMOUNT: "2 pieces" },
    { NAME: "salmon", AMOUNT: "2 pieces" },
  ],
  description: "surimi, agurk, toppet m.avocado, reje, tun og laks",
};

document.querySelector("#create-page").addEventListener("click", function () {
  window.location.href = "recipe-form.html";
});

function displayRecipe(recipe) {
  document.querySelector(".recipe-name").innerHTML = recipe.title;
  document.querySelector(".recipe-img").src = recipe.picture_url;
  document.querySelector(".recipe-description").innerHTML = recipe.description;
  const ingredientList = document.querySelector(".ingredient-list");

  recipe.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    if (typeof ingredient.AMOUNT !== "string") {
      li.innerHTML = `${ingredient.NAME}: not provided`;
    } else {
      li.innerHTML = `${ingredient.NAME}: ${ingredient.AMOUNT}`;
    }

    ingredientList.appendChild(li);
  });
}

displayRecipe(recipeObject);
