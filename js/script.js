let tabUsers = null;
let tabEstatiscas = null;
let inputName = null;
let allUsers = [];
let countUsers = 0;
let countSexoF = 0;
let countSexoM = 0;
let countDob = 0;
let userFilter = [];
let button = null;
let media = 0;

window.addEventListener("load", () => {
  inputName = document.querySelector("#inputName");
  tabUsers = document.querySelector("#tabUsers");
  tabEstatiscas = document.querySelector("#tabEstatiscas");
  button = document.querySelector("#button");
  allUsers = [];
  countUsers = document.querySelector("#countUsers");
  getData();
});

async function getData() {
  let url =
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo";
  const res = await fetch(url);
  const data = await res.json();
  allUsers = data.results.map(function (person) {
    return {
      name: person.name.first + " " + person.name.last,
      picture: person.picture.thumbnail,
      gender: person.gender,
      dob: person.dob.age,
    };
  });
  button.classList.add("disabled");
  userFilter = allUsers;
  sortUsers();
  filterUser();
  renderAllPeople();
}

function sortUsers() {
  allUsers = allUsers.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

const filterUser = () => {
  userFilter = allUsers.filter(
    (user) =>
      user.name.toLowerCase().search(inputName.value.toLowerCase()) !== -1
  );
  userFilter.sort((a, b) => a.name.localeCompare(b.name));
  renderAllPeople();
  handleCalculate();
};

function renderAllPeople() {
  inputName.focus();
  inputName.addEventListener("keyup", (event) => {
    button.classList.remove("disabled");
    if (inputName.value.trim() === "") {
      button.classList.add("disabled");
      userFilter = allUsers;
      handleCalculate();
      renderAllPeople();
    }

    if (event.key === "Enter" && event.target.value.trim() !== "") {
      filterUser();
    }
  });

  button.addEventListener("click", (event) => {
    filterUser();
  });

  let usersHTML = "<div>";

  userFilter.forEach((user) => {
    const { name, picture, dob } = user;

    const userHTML = `
      <div class= "rowUser" >
      <div> <img src ="${picture}" alt="${name}"/></div>
        <div> ${name}</div>
        <div> ${dob} anos </div>
      </div>
      `;
    usersHTML += userHTML;
  });

  usersHTML += "</div>";
  countUsers.textContent =
    userFilter.length === 100
      ? userFilter.length + " Usuaŕios(s)"
      : userFilter.length
      ? ` ${userFilter.length} Usuaŕios(s) encontrado(s)`
      : "Nenhum usuário encontrado!";
  tabUsers.innerHTML = usersHTML;
}
function renderEstatiscas() {
  let estatiscasHTML = `<div>
          <p>
           Pessoas do sexo Masculino: ${countSexoM}
          </p>
          <p>
            Pessoas do sexo Feminino: ${countSexoF}
          </p>
          <p>
            Soma das idades: ${countDob}
          </p>
          <p>
            Média das idades: ${media}
          </p>
      </div>`;

  tabEstatiscas.innerHTML = estatiscasHTML;
}

function handleCalculate() {
  countSexoF = userFilter.filter((user) => user.gender === "female").length;
  countSexoM = userFilter.filter((user) => user.gender === "male").length;
  countDob = userFilter.reduce((acumulator, current) => {
    return acumulator + current.dob;
  }, 0);
  media = (countDob / (countSexoF + countSexoM)).toFixed(2);
  renderEstatiscas();
}
//sdsdsdsdsdsdsdsds