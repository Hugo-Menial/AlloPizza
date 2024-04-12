document.addEventListener("DOMContentLoaded", function () {
  const ajouterButtons = document.querySelectorAll(".ajouter");
  const retirerButtons = document.querySelectorAll(".retirer");
  const pizzas = document.querySelectorAll(".pizza");
  const historiqueListe = document.getElementById("historique-liste");
  const historique = document.getElementById("historique");

  function checkAndUpdateHistoriqueDisplay() {
    let totalCount = 0;
    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter) => {
      totalCount += parseInt(counter.textContent);
    });

    if (totalCount > 0) {
      historique.classList.add("visible");
    } else {
      historique.classList.remove("visible");
    }
  }

  function getSizeText(size) {
    if (size === "J") {
      return "Junior";
    } else if (size === "S") {
      return "Sénior";
    } else if (size === "M") {
      return "Méga";
    }
    return "";
  }

  function addRadioButtonGroup(listItem, index) {
    const radioButtonGroup = document.createElement("div");
    radioButtonGroup.classList.add("radio-button-group");
  
    const sizeContainer = document.createElement("div");
    sizeContainer.classList.add("size-container");
    listItem.appendChild(sizeContainer);
  
    ["J", "S", "M"].forEach((size) => {
      const radioButton = document.createElement("input");
      radioButton.type = "radio";
      radioButton.name = `size-${index}-${Date.now()}`;
      radioButton.value = size;
      radioButton.classList.add("radio-size");
      radioButton.addEventListener("change", function () {
        const sizeSpan = document.createElement("span");
        sizeSpan.textContent = `Taille: ${getSizeText(size)} `;
        sizeContainer.appendChild(sizeSpan);
        radioButtonGroup.remove();
      });
  
      const label = document.createElement("label");
      label.textContent = size;
      label.appendChild(radioButton);
  
      radioButtonGroup.appendChild(label);
    });
  
    listItem.appendChild(radioButtonGroup);
  }
  



  ajouterButtons.forEach((button, index) => {
    const counter = document.createElement("span");
    counter.textContent = "0";
    counter.classList.add("counter");
    button.insertAdjacentElement("afterend", counter);

    button.addEventListener("click", function () {
      counter.textContent = parseInt(counter.textContent) + 1;
      const pizzaName = pizzas[index].alt;
      const listItem = document.createElement("li");
      listItem.textContent = pizzaName;
      listItem.classList.add("historique-item", `historique-item-${index}`);

      addRadioButtonGroup(listItem, index);

      historiqueListe.appendChild(listItem);
      checkAndUpdateHistoriqueDisplay();
    });
  });

  retirerButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const counter = button.previousElementSibling;
      if (parseInt(counter.textContent) > 0) {
        counter.textContent = parseInt(counter.textContent) - 1;
        const pizzaName = pizzas[index].alt;
        const listItem = historiqueListe.querySelector(`.historique-item-${index}`);
        if (listItem) {
          historiqueListe.removeChild(listItem);
          checkAndUpdateHistoriqueDisplay();
        }
      }
    });
  });
});
