function Nouvelle_partie() {
    const currentView = document.querySelector(".view.active");
    if (currentView) {
        currentView.classList.remove("active");
    }
    const configView = document.getElementById("view-config");
    if (configView) {
        configView.classList.add("active");
    }
}
function Nouvelle() {
    const currentView = document.querySelector(".view.active");
    if (currentView) {
        currentView.classList.remove("active");
    }

    const configView = document.getElementById("view-home");
    if (configView) {
        configView.classList.add("active");
    }
}
function selectPill(btn) {

    btn.parentElement.querySelector('.pill.active')?.classList.remove('active');

    btn.classList.add('active');
}
function HISTORY() {
    const currentView = document.querySelector(".view.active");
    if (currentView) {
        currentView.classList.remove("active");
    }
    const configView = document.getElementById("view-history");
    if (configView) {
        configView.classList.add("active");
    }
}

function Lancer_la_partie() {
    const currentView = document.querySelector(".view.active");
    const cfgPseudo = document.getElementById("cfgPseudo");
    if (!cfgPseudo.value == "") {
        Lancer()
    }

    function Lancer() {
        let config_row = document.querySelector(".config-row").parentElement.querySelectorAll('.pill.active')

        config_row.forEach(element => {
            console.log(element.dataset.value);

        });





        // if (currentView) {
        //     currentView.classList.remove("active");
        // }
        // const configView = document.getElementById("view-game");
        // if (configView) {
        //     configView.classList.add("active");
        // }
    }
}