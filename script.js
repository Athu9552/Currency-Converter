// const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// const dropdowns = document.querySelectorAll(".dropdown select");

// const btn = document.querySelector("form button");
// const fromCurrency = document.querySelector(".from select");
// const toCurrency = document.querySelector(".to select");

// for (let select of dropdowns) {
//   for (currencyCode in countryList) {
//     let newOption = document.createElement("option");
//     newOption.innerText = currencyCode;
//     newOption.value = currencyCode;
//     if (select.name === "from" && currencyCode === "INR") {
//       newOption.selected = "selected";
//     } else if (select.name === "to" && currencyCode === "USD") {
//       newOption.selected = "selected";
//     }
//     select.append(newOption);
//   }
//   select.addEventListener("change", (evt)=> {
//     updateFlag(evt.target);
//   });
// }

// const updateFlag = (element)=> {
//     let currencyCode = element.value;
//     let countryCode = countryList[currencyCode];
//     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//     let img = element.parentElement.querySelector("img");
//     img.src = newSrc;
// }

// btn.addEventListener("click", async (evt)=> {
//     evt.preventDefault();
//     let amount = document.querySelector(".amount input");
//     let amountVal = amount.value;
//     if(amountVal === "" || amountVal < 1){
//         amountVal = 1;
//         amount.value = "1";
//     }

//     const url = `${base_url}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`;
//     let response = await fetch(url);
//     let data = await response.json();
//     console.log(data);
    
// });

const base_url = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;

    if (select.name === "from" && currencyCode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currencyCode === "USD") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update flag
const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Fetch exchange rate
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;

  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amount.value = "1";
  }

  const url = `${base_url}/${fromCurrency.value.toLowerCase()}.json`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    // ✅ nested access
    let rate =
      data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];

    let finalAmount = (amountVal * rate).toFixed(2);

    msg.innerText = `${amountVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
  } catch (err) {
    msg.innerText = "⚠️ Failed to fetch exchange rate.";
    console.error("Fetch error:", err);
  }
});