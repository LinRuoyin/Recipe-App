function setUpDeleteIngredientButtons() {
  const allDeleteButtons = document.querySelectorAll(
    ".delete-ingredient-button"
  );

  allDeleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemDiv = button.closest(".ingredient-item");
      deleteIngredient(itemDiv);
    });
  });
}

function deleteIngredient(itemDiv) {
  const allItems = document.querySelectorAll(".ingredient-item");
  if (allItems.length > 5) {
    itemDiv.remove();
  } else {
    alert("Please keep at least 5 ingredients.");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setUpDeleteIngredientButtons();
});

function addIngredient() {
  const IngredientList = document.querySelector(".ingredient-list");

  const addDiv = document.createElement("div");
  addDiv.classList.add("ingredient-item");

  addDiv.innerHTML = `
 
            <input
              type="text"
              class="ingredient-name"
              placeholder="Ingredient"
              required
            />
            <input
              type="text"
              class="ingredient-amount"
              placeholder="Amount & Unit"
              required
            />
            <button class="delete-ingredient-button" id="delete-button">❌</button>
     `;

  const deleteButton = addDiv.querySelector(".delete-ingredient-button");
  deleteButton.addEventListener("click", () => {
    deleteIngredient(addDiv);
  });

  IngredientList.appendChild(addDiv);
}

document
  .querySelector("#add-ingredient-button")
  .addEventListener("click", addIngredient);

document.querySelector("#save-button").addEventListener("click", (e) => {
  const title = document.querySelector("#recipe-name").value;
  const pictureUrl = document.querySelector("#recipe-image").value;
  const description = document.querySelector("#recipe-description").value;
  const ingredientNames = document.querySelectorAll(".ingredient-name");
  const ingredientAmounts = document.querySelectorAll(".ingredient-amount");

  const ingredients = [];
  let hasEmptyIngredient=false
  ingredientNames.forEach((nameInput, index) => {
    const name = nameInput.value.trim()
    const amount = ingredientAmounts[index].value.trim()

if (name === "" || amount === ""){
  hasEmptyIngredient=true;
}else{
  ingredients.push({
    name: name,
    amount: amount,
  });}



  });

 

if(!title.trim()|| !pictureUrl.trim()||!description.trim()||hasEmptyIngredient){
  alert("Please fill in the form.")
  e.preventDefault();
  return
}



  const newRecipeData = {
    description: description,
    id: "user-" + Date.now(),
    ingredients: ingredients,
    picture_url: pictureUrl,
    title: title,
  };




  const existing = JSON.parse(localStorage.getItem("userRecipes")) || [];
  existing.push(newRecipeData);
  localStorage.setItem("userRecipes", JSON.stringify(existing));

  e.preventDefault();
  showSaveSuccessPopup();
});

function showSaveSuccessPopup() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = 9999;

  const popup = document.createElement("div");
  popup.style.backgroundColor = "#fff";
  popup.style.padding = "30px";
  popup.style.borderRadius = "12px";
  popup.style.boxShadow = "0 0 15px rgba(0,0,0,0.3)";
  popup.style.textAlign = "center";
  popup.innerHTML = `<p style="margin-bottom: 20px;">🎉 Recipe saved successfully!</p>`;

  const backBtn = document.createElement("button");
  backBtn.textContent = "Go to Homepage";
  backBtn.style.margin = "0 10px";
  backBtn.style.padding = "10px 16px";
  backBtn.style.cursor = "pointer";
  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  const stayBtn = document.createElement("button");
  stayBtn.textContent = "Stay Here";
  stayBtn.style.margin = "0 10px";
  stayBtn.style.padding = "10px 16px";
  stayBtn.style.cursor = "pointer";
  stayBtn.addEventListener("click", () => {
    document.body.removeChild(overlay);
    document.querySelector("form").reset()
  });

  popup.appendChild(backBtn);
  popup.appendChild(stayBtn);
  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}
