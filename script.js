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