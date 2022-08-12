// convert today date to input format
const today = new Date().toISOString().split("T")[0];
start_date.value = today; // donner la valeur de today à input
start_date.min = today; // pas de date antérieur possible

// tomorrow date calc
let tomorrow = new Date(); // date du jour
tomorrow.setDate(tomorrow.getDate() + 1);
// console.log(tomorrow); // Fri Aug 12 2022 22:31:50 GMT+0200 (heure d’été d’Europe centrale)

// transformer le format (convert to input format)
let tomorrowFormat = tomorrow.toISOString().split("T")[0];
// console.log(tomorrowFormat); // 2022-08-12
end_date.value = tomorrowFormat;
end_date.min = tomorrowFormat;

// à chaque changement sur l'input on déclenche l'évenement
start_date.addEventListener("change", (e) => {
  // récupérer la date dans l'input start_date
  let day = new Date(e.target.value); // ce qui est tapé dans l'input est e.target.value ou start_date.value
  if (end_date.value <= start_date.value) {
    day.setDate(day.getDate() + 1);
    end_date.value = day.toISOString().split("T")[0];
  }
});

end_date.addEventListener("change", (e) => {
  let day = new Date(e.target.value); // se réccupérer la date

  if (end_date.value <= start_date.value) {
    day.setDate(day.getDate() - 1); // remettre au jour précédent (hier)
    start_date.value = day.toISOString().split("T")[0];
    // location.reload();
  }
});

// soustraire des dates
const bookingCalc = () => {
  let diffTime = Math.abs(
    // transformer en valeur absolue (seconds), produit un chiffre de la soustraction des 2 dates
    new Date(end_date.value) - new Date(start_date.value)
  );
  // transformer en jour
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  totalPerNight.textContent = diffDays * nightPrice.textContent;
};

start_date.addEventListener("change", bookingCalc);
end_date.addEventListener("change", bookingCalc);
bookingCalc(); // affiche 46€ à l'ouverture de la page
