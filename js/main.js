const myModal = new bootstrap.Modal(document.querySelector("#exampleModal"), {
  keyboard: false,
});

// ----------------

let allProduct = document.querySelector("#all-product");
let asia = document.querySelector("#asia");
let africa = document.querySelector("#africa");
let europe = document.querySelector("#europe");
let australiaOceania = document.querySelector("#australia-oceania");
let allContinent = document.querySelector("#all-continent");
let inputSearch = document.querySelector("#inputSearch");
// -------------------------------------------
let errorHTML = `
<div class="spinner-border text-danger" role="status">
<span class="visually-hidden">Loading...</span>
</div>
`;

let loadingHTML = `
<div class="spinner-border text-success" role="status">
<span class="visually-hidden">Loading...</span>
</div>
`;

let url = "https://restcountries.com/v3.1/all";
let getRegions = async () => {
  let repons = await axios.get(url);

  return repons.data;
};

let setRegions = async () => {
  try {
    allProduct.innerHTML = loadingHTML;
    let repons = await getRegions();
    allProduct.innerHTML = "";
    repons.map((item, index) => {
      allProduct.innerHTML += `
  
      <div class="wrappen col-4 py-3 ">
            <div
              class=" d-flex gap-3 align-items-center justify-content-between card-republik"
              onclick="setModal(${index})"
            >
              <img src="${item.flags.png}" alt="" />

              <div>
               <h3> ${item.name.common} </h3>
              </div>
            </div>
          </div>

  `;
    });
    console.log(repons);
  } catch (error) {
    console.log("error :" + error);
  }
};

let setModal = async (index) => {
  let respons = await getRegions();

  let modalTitle = document.querySelector("#exampleModalLabel");
  modalTitle.innerHTML = respons[index].name.common;

  let borders = document.querySelector("#borders");
  respons[index].borders !== undefined
    ? (borders.innerHTML = respons[index].borders)
    : (borders.innerHTML = "No borders");

  let continents = document.querySelector("#continents");
  continents.innerHTML = respons[index].continents;

  let capital = document.querySelector("#capital");
  capital.innerHTML = respons[index].capital[0];

  let languages = document.querySelector("#languages");
  for (const item in respons[index].languages) {
    languages.innerHTML += ` /`;
    languages.innerHTML += respons[index].languages[item];
  }

  let maps = document.querySelector("#maps");
  maps.innerHTML = `<a href="${respons[index].maps.googleMaps}">Maps</a>`;

  let region = document.querySelector("#region");
  region.innerHTML = respons[index].region;

  let fifa = document.querySelector("#fifa");
  respons[index].fifa !== undefined
    ? (fifa.innerHTML = respons[index].fifa)
    : (fifa.innerHTML = `No Fifa`);

  let flag = document.querySelector("#flag");
  flag.src = respons[index].flags.png;
  myModal.show();
};

// -----------------------------------

let btnSearch = async (index) => {
  console.log(inputSearch.value);
  let respons = await getRegions();

  console.log(respons);

  respons.map((item, index) => {
    if (item.name.common === inputSearch.value) {
      allProduct.innerHTML = `
  
     <div class="wrappen col-4 py-3 ">
        <div
          class=" d-flex gap-3 align-items-center justify-content-between card-republik"
          onclick="setModal(${index})"
        >
          <img src="${item.flags.png}" alt="" />

          <div>
          <h3> ${item.name.common} </h3>
          </div>
        </div>
      </div>

  `;
    }
  });
};

// ------------------------------
asia.addEventListener("click", () => {
  url = "https://restcountries.com/v3.1/region/asia";
  setRegions();
});

// ------------------------------

allContinent.addEventListener("click", () => {
  url = "https://restcountries.com/v3.1/all";
  setRegions();
});

// ------------------------------

europe.addEventListener("click", () => {
  url = "https://restcountries.com/v3.1/region/europe";
  setRegions();
});

// ------------------------------

africa.addEventListener("click", () => {
  url = "https://restcountries.com/v3.1/region/africa";
  setRegions();
});

// ------------------------------

australiaOceania.addEventListener("click", () => {
  url = "https://restcountries.com/v3.1/region/oceania";
  setRegions();
});

// ------------------------------

setRegions();
