// Дані про команду супергероїв
const superHeroData = {
  squadName: "Super Hero Squad",
  homeTown: "Metro City",
  formed: 2022,
  members: [
    {
      name: "Molecule Man",
      secretIdentity: "Dan Jukes",
      age: 29,
      powers: ["Radiation resistance", "Turning tiny", "Radiation blast"]
    },
    {
      name: "Madame Uppercut",
      secretIdentity: "Jane Wilson",
      age: 39,
      powers: ["Million tonne punch", "Damage resistance", "Superhuman reflexes"]
    },
    {
      name: "Eternal Flame",
      secretIdentity: "Unknown",
      age: 1000000,
      powers: ["Immortality", "Heat Immunity", "Inferno", "Teleportation", "Interdimensional travel"]
    }
  ]
};

// Функція для заповнення заголовка сторінки
function populateHeader(data) {
  const header = document.querySelector("header");

  // Створення елемента h1
  const h1 = document.createElement("h1");
  h1.textContent = data.squadName;
  header.appendChild(h1);

  // Створення елемента p
  const p = document.createElement("p");
  p.textContent = `Hometown: ${data.homeTown} // Formed: ${data.formed}`;
  header.appendChild(p);
}

// Функція для створення інформаційних карток героїв
function showHeroes(data) {
  const section = document.querySelector("section");

  data.members.forEach(member => {
    // Створення картки героя
    const article = document.createElement("article");

    // Додавання імені героя
    const h2 = document.createElement("h2");
    h2.textContent = member.name;
    article.appendChild(h2);

    // Додавання секретної особистості
    const secretIdentity = document.createElement("p");
    secretIdentity.textContent = `Secret identity: ${member.secretIdentity}`;
    article.appendChild(secretIdentity);

    // Додавання віку
    const age = document.createElement("p");
    age.textContent = `Age: ${member.age}`;
    article.appendChild(age);

    // Додавання суперздібностей
    const powersTitle = document.createElement("p");
    powersTitle.textContent = "Superpowers:";
    article.appendChild(powersTitle);

    const powersList = document.createElement("ul");
    member.powers.forEach(power => {
      const listItem = document.createElement("li");
      listItem.textContent = power;
      powersList.appendChild(listItem);
    });
    article.appendChild(powersList);

    // Додавання картки героя до секції
    section.appendChild(article);
  });
}

// Виклик функцій
populateHeader(superHeroData);
showHeroes(superHeroData);
