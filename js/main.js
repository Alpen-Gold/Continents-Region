const myModal = new bootstrap.Modal(document.querySelector("#exampleModal"), {
  keyboard: false,
});

const myModalRepulic = new bootstrap.Modal(
  document.querySelector("#exampleModalRepublic"),
  {
    keyboard: false,
  }
);

const myModalPut = new bootstrap.Modal(
  document.querySelector("#exampleModalPut"),
  {
    keyboard: false,
  }
);

const myModalHistory = new bootstrap.Modal(
  document.querySelector("#exampleModalHistory"),
  {
    keyboard: false,
  }
);
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
let setNewRepublicBtn = document.querySelector("#setNewRepublicBtn");
let bgModalRepublic = document.getElementById("bg-modal-republic");
let bgModalPost = document.getElementById("bg-modal-post");
let bgModalHistory = document.getElementById("bg-modal-history");
let historybtn = document.querySelector("#historyBtn");
let historyText = document.querySelector("#historyText");
let tbodyHistory = document.querySelector("#tbodyHistory");
let postTitle = document.querySelector(".postTitle");
// ----------------------------------------

// -----------------------------------------
let historyLocal;
let putName;
// -----------------------------------------

// error
let errorHTML = `
<div class="text-center fs-1">
<i class="fa-solid fa-xmark fa-xl text-danger"></i>
<span class="text-danger fw-bold">Error</span>
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
              
            > <div class="card-animat">
              
            <img src="${item.flags.png}" alt="" class="img-animat" onclick="setModal('${item.name.common}')"/>
            </div>

            
            
            <div class="common">
            <h5> ${item.name.common} </h5>   

            <div class="d-flex align-items-center justify-content-end gap-2">
            
            <span class="all-light" onclick="setModal('${item.name.common}')">
            <i class="fa-solid fa-eye"></i>
            </span>

            <span class="all-light" onclick="putModal('${item.name.common}')">
            <i class="fa-solid fa-pen"></i>
            </span>

            </div>
               
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
let setModal = async (item) => {
  let respons = await axios.get(`https://restcountries.com/v3.1/name/${item}`);

  console.log(respons);
  let modalTitle = document.querySelector("#exampleModalLabel");
  modalTitle.innerHTML = respons.data[0].name.common;

  let borders = document.querySelector("#borders");
  respons.data[0].borders !== undefined
    ? (borders.innerHTML = respons.data[0].borders)
    : (borders.innerHTML = "No borders");

  let continents = document.querySelector("#continents");
  continents.innerHTML = respons.data[0].continents;

  let capital = document.querySelector("#capital");
  capital.innerHTML = respons.data[0].capital[0];

  let languages = document.querySelector("#languages");
  languages.innerHTML = "";
  for (const item in respons.data[0].languages) {
    languages.innerHTML += ` ,`;
    languages.innerHTML += respons.data[0].languages[item];
  }

  let maps = document.querySelector("#maps");
  maps.innerHTML = `<a href="${respons.data[0].maps.googleMaps}" target="_blank">Maps</a>`;

  let region = document.querySelector("#region");
  region.innerHTML = respons.data[0].region;

  let fifa = document.querySelector("#fifa");
  respons.data[0].fifa !== undefined
    ? (fifa.innerHTML = respons.data[0].fifa)
    : (fifa.innerHTML = `No Fifa`);

  let flag = document.querySelector("#flag");
  flag.src = respons.data[0].flags.png;

  let pGerb = document.querySelector("#pGerb");
  let gerb = document.querySelector("#gerb");
  respons.data[0].coatOfArms.png !== undefined
    ? (gerb.src = respons.data[0].coatOfArms.png)
    : (pGerb.innerHTML = "No gerb");

  myModal.show();
};
// MODAL show() end

// btn serch start
let btnSearch = async () => {
  let great = true;

  let strInput = String(inputSearch.value);
  let respons = await getRegions();
  // console.log(respons);
  if (inputSearch.value !== "") {
    allProduct.innerHTML = "";
    respons.map((item, index) => {
      if (item.name.common.startsWith(String(strInput))) {
        allProduct.innerHTML += `
  
        <div class="wrappen col-12 col-sm-6 col-xl-4 py-3 ">
        <div
          class=" d-flex flex-column  align-items-center justify-content-between card-republik"
          
        > <div class="card-animat">
          
        <img src="${item.flags.png}" alt="" class="img-animat" onclick="setModal('${item.name.common}')"/>
        </div>

        
        
        <div class="common">
        <h5> ${item.name.common} </h5>   

        <div class="d-flex align-items-center justify-content-end gap-2">
        
        <span class="all-light" onclick="setModal('${item.name.common}')">
        <i class="fa-solid fa-eye"></i>
        </span>

        <span class="all-light" onclick="putModal('${item.name.common}')">
        <i class="fa-solid fa-pen"></i>
        </span>

        </div>
           
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

// put modal
let putModal = async (item) => {
  console.log(item);
  try {
    putName = item;
    let respons = await axios.get(
      `https://restcountries.com/v3.1/name/${item}`
    );

    console.log(respons.data);
    console.log(Object.values(respons.data[0].languages));
    document.querySelector("#newRepublicPut").value =
      respons.data[0].name.common;
    document.querySelector("#newCapitalPut").value = respons.data[0].capital[0];
    document.querySelector("#newPopulationPut").value =
      respons.data[0].population;
    document.querySelector("#newFlagPut").files[0];
    document.querySelector("#newFifaPut").value =
      respons.data[0].fifa !== undefined ? respons.data[0].fifa : `No Fifa`;
    document.querySelector("#newLangugesPut").value = Object.values(
      respons.data[0].languages
    );

    myModalPut.show();
  } catch (error) {
    console.log("error :" + error);
  }
};
// put modal end

// new put modal
let putModalBtn = async () => {
  myModalPut.hide();

  let newRepublicPut = document.querySelector("#newRepublicPut").value;
  let newCapitalPut = document.querySelector("#newCapitalPut").value;
  let newPopulationPut = document.querySelector("#newPopulationPut").value;
  let newFlagPut = document.querySelector("#newFlagPut").files[0];
  let newFifaPut = document.querySelector("#newFifaPut").value;
  let newLangugesPut = document.querySelector("#newLangugesPut").value;

  try {
    let respons = await axios.put(
      `https://restcountries.com/v3.1/name/${putName}`,
      {
        republicName: String(newRepublicPut),
        capital: String(newCapitalPut),
        population: +newPopulationPut,
        flag: String("Flag berilishi kerak"),
        fifa: String(newFifaPut),
      }
    );

    return respons;
  } catch (error) {
    console.log("error" + error);
  }
};

// value no null
let inputValueNull = () => {
  let newRepublic = document.querySelector("#newRepublic").value;
  let newCapital = document.querySelector("#newCapital").value;
  let newPopulation = document.querySelector("#newPopulation").value;
  let newFlag = document.querySelector("#newFlag").files[0];
  let newFifa = document.querySelector("#newFifa").value;
  let newLanguges = document.querySelector("#newLanguges").value;

  if (
    newRepublic !== "" &&
    newCapital !== "" &&
    newPopulation !== 0 &&
    newFifa !== "" &&
    newLanguges !== ""
  ) {
    return true;
  } else {
    return false;
  }
};
// clear modal input
let clearModalInput = () => {
  document.querySelector("#newRepublic").value = "";
  document.querySelector("#newCapital").value = "";
  document.querySelector("#newPopulation").value = "";
  document.querySelector("#newFifa").value = "";
  document.querySelector("#newLanguges").value = "";
};
// end

// modal new republic
let newRepublicBtn = () => {
  myModalRepulic.show();
};

setNewRepublicBtn.addEventListener("click", async () => {
  let newRepublic = document.querySelector("#newRepublic").value;
  let newCapital = document.querySelector("#newCapital").value;
  let newPopulation = document.querySelector("#newPopulation").value;
  let newFlag = document.querySelector("#newFlag").files[0];
  let newFifa = document.querySelector("#newFifa").value;
  let newLanguges = document.querySelector("#newLanguges").value;

  if (inputValueNull()) {
    clearModalInput();
    myModalRepulic.hide();
    try {
      const formData = new FormData();
      formData.append("photo", newFlag);

      let historyData = {
        republic: newRepublic,
        capital: newCapital,
        population: newPopulation,
        fifa: newFifa,
        languages: newLanguges,
      };
      localStorage.setItem("history", JSON.stringify(historyData));

      console.log(formData);
      let respons = await axios.post("https://restcountries.com/v3.1/create", {
        name: String(newRepublic),
        capital: String(newCapital),
        population: +newPopulation,
        flag: formData,
        fifa: String(newFifa),
      });
      return respons;
    } catch (error) {
      console.log("error :" + error);
    }
  } else {
    postTitle.innerHTML = "Write something in the input ";
    console.log("text kiriting ;");
  }
});
// ====================================================================================================

let count = 0;
historybtn.addEventListener("click", () => {
  let historyArray = JSON.parse(localStorage.getItem("history"));
  console.log(historyArray);
  tbodyHistory.innerHTML += `
  
  <tr>
    <th scope="row">${count + 1}</th>
    <td>${historyArray.republic}</td>
    <td>${historyArray.capital}</td>
    <td>${historyArray.population}</td>
    <td>${historyArray.fifa}</td>
    <td>${historyArray.languages}</td>
  </tr>

  `;
  count++;
  myModalHistory.show();
});

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

  bgModalRepublic.style.backgroundColor = "#1E2536";
  bgModalRepublic.style.color = "white";

  bgModalPost.style.backgroundColor = "#1E2536";
  bgModalPost.style.color = "white";

  bgModalHistory.style.backgroundColor = "#1E2536";
  bgModalHistory.children[1].children[0].children[0].style.color = "white";
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

  bgModalRepublic.style.backgroundColor = "white";
  bgModalRepublic.style.color = "black";

  bgModalPost.style.backgroundColor = "white";
  bgModalPost.style.color = "black";

  bgModalHistory.style.backgroundColor = "white";
  bgModalHistory.children[1].children[0].children[0].style.color = "black";
});
// click light end

// ==========
setRegions();
// ==========
