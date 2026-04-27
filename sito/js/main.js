/* ------------------------------------------------------------
   ELEMENTI DELLA PAGINA
   ------------------------------------------------------------ */
var campoRicerca = document.getElementById("campoRicerca");
var btnCerca = document.getElementById("btnCerca");
var radioDialetto = document.getElementById("radioDialetto");
var radioItaliano = document.getElementById("radioItaliano");
var areaRisultati = document.getElementById("areaRisultati");

var filtriCategoria = document.querySelectorAll(".filtro");
var filtriLettere = document.querySelectorAll(".lettera");
var parolePopolari = document.querySelectorAll(".tag_parola");


/* ------------------------------------------------------------
   FUNZIONE: mostra messaggio nell'area risultati
   ------------------------------------------------------------ */
function mostraMessaggio(testo, tipo) {
    areaRisultati.innerHTML = "<div class='" + tipo + "'>" + testo + "</div>";
}


/* ------------------------------------------------------------
   FUNZIONE: genera una scheda risultato
   ------------------------------------------------------------ */
function creaScheda(parola) {
    var html = "";

    html += "<div class='scheda-risultato'>";
    html += "<div class='ris-parola'>" + parola.dialetto + "</div>";
    html += "<div class='ris-categoria'>" + parola.categoria + "</div>";
    html += "<div class='ris-traduzione'>" + parola.italiano + "</div>";
    html += "<div class='ris-esempio'>" + parola.esempio + "</div>";
    html += "</div>";

    return html;
}


/* ------------------------------------------------------------
   FUNZIONE: esegue la ricerca
   ------------------------------------------------------------ */
function eseguiRicerca() {

    var testo = campoRicerca.value.trim().toLowerCase();

    if (testo === "") {
        mostraMessaggio("Inserisci una parola da cercare.", "msg-errore");
        return;
    }

    var risultati = [];

    // ricerca dialetto → italiano
    if (radioDialetto.checked) {
        risultati = dizionario.filter(function (p) {
            return p.dialetto.toLowerCase().includes(testo);
        });
    }

    // ricerca italiano → dialetto
    if (radioItaliano.checked) {
        risultati = dizionario.filter(function (p) {
            return p.italiano.toLowerCase().includes(testo);
        });
    }

    // se nessun risultato
    if (risultati.length === 0) {
        mostraMessaggio("Nessun risultato trovato.", "msg-ricerca");
        return;
    }

    // stampa risultati
    var html = "";
    risultati.forEach(function (p) {
        html += creaScheda(p);
    });

    areaRisultati.innerHTML = html;
}


/* ------------------------------------------------------------
   EVENTO: click sul bottone CERCA
   ------------------------------------------------------------ */
btnCerca.addEventListener("click", eseguiRicerca);


/* ------------------------------------------------------------
   EVENTO: invio con ENTER
   ------------------------------------------------------------ */
campoRicerca.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        eseguiRicerca();
    }
});


/* ------------------------------------------------------------
   FILTRI CATEGORIA
   ------------------------------------------------------------ */
filtriCategoria.forEach(function (btn) {

    btn.addEventListener("click", function () {

        // rimuove attivo da tutti
        filtriCategoria.forEach(function (b) {
            b.classList.remove("attivo");
        });

        // attiva il cliccato
        btn.classList.add("attivo");

        var cat = btn.getAttribute("data-cat");

        if (cat === "tutti") {
            mostraMessaggio("Seleziona una parola o usa la ricerca.", "msg-ricerca");
            return;
        }

        var risultati = dizionario.filter(function (p) {
            return p.categoria === cat;
        });

        var html = "";
        risultati.forEach(function (p) {
            html += creaScheda(p);
        });

        areaRisultati.innerHTML = html;
    });
});


/* ------------------------------------------------------------
   FILTRI ALFABETICI
   ------------------------------------------------------------ */
filtriLettere.forEach(function (lettera) {

    lettera.addEventListener("click", function () {

        var iniziale = lettera.getAttribute("data-lettera").toLowerCase();

        var risultati = dizionario.filter(function (p) {
            return p.dialetto.toLowerCase().startsWith(iniziale);
        });

        if (risultati.length === 0) {
            mostraMessaggio("Nessuna parola che inizia con " + iniziale.toUpperCase(), "msg-ricerca");
            return;
        }

        var html = "";
        risultati.forEach(function (p) {
            html += creaScheda(p);
        });

        areaRisultati.innerHTML = html;
    });
});


/* ------------------------------------------------------------
   PAROLE POPOLARI
   ------------------------------------------------------------ */
parolePopolari.forEach(function (tag) {

    tag.addEventListener("click", function () {

        var parola = tag.getAttribute("data-parola");

        // inserisce la parola nel campo
        campoRicerca.value = parola;

        // esegue la ricerca
        eseguiRicerca();

        // scroll automatico alla sezione della ricerca
        document.getElementById("sezioneRicerca").scrollIntoView({
            behavior: "smooth"
        });
    });
});


/* ------------------------------------------------------------
   PAROLA DEL GIORNO (placeholder)
   ------------------------------------------------------------ */
function parolaDelGiorno() {
    // in futuro verrà presa dal database
    console.log("Funzione parola del giorno pronta per il database.");
}

parolaDelGiorno();
