# Recipe-App

2025.3.17 replaced the code below with shorter codes in index.html
    const recipeName = document.createElement("h1");
    recipeName.classList.add("recipe-name");
    recipeName.innerHTML = dish.title;
    const recipeImg = document.createElement("img");
    recipeImg.classList.add("recipe-img");
    recipeImg.src = dish.picture_url;
    recipeImg.alt = "Recipe Image";
    const recipeIngredients = document.createElement("h1");
    recipeIngredients.innerHTML = "Ingredients";
    recipeIngredients.classList.add("ingredients");
    const ingredientList = document.createElement("ul");
    ingredientList.classList.add("ingredient-list");
    dish.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      if (typeof ingredient.amount !== "string") {
        li.innerHTML = `${ingredient.name}: not provided`;
      } else {
        li.innerHTML = `${ingredient.name}: ${ingredient.amount}`;
      }
      ingredientList.appendChild(li);
    });

    const recipeDescription = document.createElement("h1");
    recipeDescription.innerHTML = "Description";
    recipeDescription.classList.add("description");
    const recipeDescriptionText = document.createElement("p");
    recipeDescriptionText.classList.add("recipe-description");
    recipeDescriptionText.innerHTML = dish.description;

    recipeBox.appendChild(recipeName);
    recipeBox.appendChild(recipeImg);
    recipeBox.appendChild(recipeIngredients);
    recipeBox.appendChild(ingredientList);
    recipeBox.appendChild(recipeDescription);
    recipeBox.appendChild(recipeDescriptionText);
    recipeContainer.appendChild(recipeBox);
