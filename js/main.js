const myModal = new bootstrap.Modal(document.querySelector("#exampleModal"), {
  keyboard: false,
});

// by id class....

let allProduct = document.querySelector("#all-product");
let asia = document.querySelector("#asia");
let africa = document.querySelector("#africa");
let europe = document.querySelector("#europe");
let australiaOceania = document.querySelector("#australia-oceania");
let allContinent = document.querySelector("#all-continent");
let inputSearch = document.querySelector("#inputSearch");
let bgImg = document.getElementById("bg-img");
let buttons = document.querySelectorAll(".all-light");
let bgNav = document.getElementById("bg-navbar");
let regionNavbar = document.querySelectorAll(".region-navbar");
let commons = document.querySelectorAll(".common");
let bgModal = document.getElementById("bg-modal");
let dark = document.getElementById("dark");
let light = document.getElementById("light");
// ----------------------------------------

// error
let errorHTML = `
<div class="spinner-border text-danger" role="status">
<span class="visually-hidden">Loading...</span>
</div>
`;

// no text error
let errorTextHTML = `
<div class="text-center fs-1">
<i class="fa-solid fa-xmark fa-xl text-danger"></i>
<span class="text-danger fw-bold">write the text</span>
</div>
`;

// Сorrectly text
let errorСorrectlyHTML = `
<div class="text-center fs-1">
<i class="fa-solid fa-xmark fa-xl text-danger"></i>
<span class="text-danger fw-bold">write the text correctly</span>
</div>
`;

// spinner loading
let loadingHTML = `
<div class="text-center">
<span class="loader"></span>
</div>
`;
// url by
let url = "https://restcountries.com/v3.1/all";

// start project ==============================================

//  get URL by
let getRegions = async () => {
  let repons = await axios.get(url);

  return repons.data;
};

// set project card
let setRegions = async () => {
  try {
    allProduct.innerHTML = loadingHTML;
    let repons = await getRegions();
    allProduct.innerHTML = "";
    repons.map((item, index) => {
      allProduct.innerHTML += `
  
      <div class="wrappen col-12 col-sm-6 col-xl-4 py-3 ">
            <div
              class=" d-flex flex-column  align-items-center justify-content-between card-republik"
              onclick="setModal(${index})"
            > <div class="card-animat">
            
            <img src="${item.flags.png}" alt="" class="img-animat"/>
            </div>

              <div class="common">
               <h3> ${item.name.common} </h3>
              </div>
            </div>
          </div>

  `;
    });
  } catch (error) {
    console.log("error :" + error);
    allProduct.innerHTML = errorHTML;
  }
};
// set project end

// MODAL show()
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
  languages.innerHTML = "";
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
// MODAL show() end

// btn serch start
let btnSearch = async () => {
  let great = true;

  if (inputSearch.value !== "") {
    let respons = await getRegions();

    console.log(respons);

    respons.map((item, index) => {
      if (item.name.common === inputSearch.value) {
        allProduct.innerHTML = `
  
     <div class="wrappen col-12 col-sm-6 col-xl-4 py-3 ">
            <div
              class=" d-flex flex-column  align-items-center justify-content-between card-republik"
              onclick="setModal(${index})"
            >
              <img src="${item.flags.png}" alt="" />

              <div class="common">
               <h3> ${item.name.common} </h3>
              </div>
            </div>
          </div>

  `;
        great = false;
      }
    });

    if (great) {
      allProduct.innerHTML = errorСorrectlyHTML;
    }
  } else {
    allProduct.innerHTML = errorTextHTML;
  }
};
// btn search end

// click (all continens)
allContinent.addEventListener("click", () => {
  url = "https://restcountries.com/v3.1/all";
  setRegions();
});
// -end-

// click (asia)
asia.addEventListener("click", () => {
  url = "https://restcountries.com/v3.1/region/asia";
  setRegions();
});
// -end-

// click (europe)
europe.addEventListener("click", () => {
  url = "https://restcountries.com/v3.1/region/europe";
  setRegions();
});
// -end-

// click (africa)
africa.addEventListener("click", () => {
  url = "https://restcountries.com/v3.1/region/africa";
  setRegions();
});
// -end-

// click (australia/oceania)
australiaOceania.addEventListener("click", () => {
  url = "https://restcountries.com/v3.1/region/oceania";
  setRegions();
});
// -end-

//  click dark
dark.addEventListener("click", () => {
  document.body.style.background = "#0F111A";
  bgNav.style.background = "#1E2536";
  buttons.forEach(function (button) {
    button.classList.add("all-dark");
  });

  regionNavbar.forEach(function (nav) {
    nav.style.color = "white";
  });

  bgModal.style.backgroundColor = "#1E2536";
  bgModal.style.color = "white";
});
// click dark end

// click light
light.addEventListener("click", () => {
  document.body.style.background = "#0d9898";
  bgNav.style.background = "white";
  buttons.forEach(function (button) {
    button.className = "all-light";
  });

  regionNavbar.forEach(function (nav) {
    nav.style.color = "black";
  });

  bgModal.style.backgroundColor = "white";
  bgModal.style.color = "black";
});
// click light end

// ==========
setRegions();
// ==========
