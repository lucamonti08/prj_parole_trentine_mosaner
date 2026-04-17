/* ============================================================
   FILE: progetto.js
   Gestisce:
   - form suggerisci parola
   - form admin
   ============================================================ */


/* ------------------------------------------------------------
   ELEMENTI FORM SUGGERISCI
   ------------------------------------------------------------ */
var formSuggerisci = document.getElementById("formSuggerisci");
var sugDialetto = document.getElementById("suggerisciDialetto");
var sugItaliano = document.getElementById("suggerisciItaliano");
var sugCategoria = document.getElementById("suggerisciCategoria");
var sugEsempio = document.getElementById("suggerisciEsempio");


/* ------------------------------------------------------------
   EVENTO: invio form suggerisci parola
   ------------------------------------------------------------ */
formSuggerisci.addEventListener("submit", function (e) {

    e.preventDefault(); // evita ricarica pagina

    // controlli semplici
    if (
        sugDialetto.value.trim() === "" ||
        sugItaliano.value.trim() === "" ||
        sugCategoria.value === "" ||
        sugEsempio.value.trim() === ""
    ) {
        alert("Compila tutti i campi.");
        return;
    }

    // dati da inviare al database
    var dati = {
        dialetto: sugDialetto.value,
        italiano: sugItaliano.value,
        categoria: sugCategoria.value,
        esempio: sugEsempio.value
    };

    console.log("Suggerimento pronto per il database:", dati);

    alert("Grazie! Il tuo suggerimento è stato inviato.");

    formSuggerisci.reset();
});


/* ------------------------------------------------------------
   ELEMENTI FORM ADMIN
   ------------------------------------------------------------ */
var formAdmin = document.getElementById("formAdmin");
var adminEmail = document.getElementById("adminEmail");
var adminPassword = document.getElementById("adminPassword");


/* ------------------------------------------------------------
   EVENTO: invio form admin
   ------------------------------------------------------------ */
formAdmin.addEventListener("submit", function (e) {

    e.preventDefault();

    if (adminEmail.value.trim() === "" || adminPassword.value.trim() === "") {
        alert("Inserisci email e password.");
        return;
    }

    // in futuro: controllo credenziali nel database
    console.log("Tentativo login admin:", adminEmail.value);

    alert("Accesso effettuato (simulato).");
});
