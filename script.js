var score = 0;
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
        let config = []
        config_row.forEach(element => {
            config.push(element.dataset.value)
        });
        // console.log(config);
        appCard(config[0], config[1], config[2])
        if (currentView) {
            currentView.classList.remove("active");
        }
        const configView = document.getElementById("view-game");
        if (configView) {
            configView.classList.add("active");
        }
    }
}

function appCard(Mode, Duree, Difficulte) {
    score = 0;
    document.getElementById('hudScore').innerText = score;

    const canvas = document.getElementById('arenaCanvas');
    const ctx = canvas.getContext('2d');


    let radius = 30;
    if (Difficulte === 'Facile') radius = 40;
    if (Difficulte === 'Difficile') radius = 20;

    let targetX = 0;
    let targetY = 0;

    function drawTarget() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const min = radius + 10;
        const max = canvas.width - radius - 10;
        targetX = Math.floor(Math.random() * (max - min)) + min;
        targetY = Math.floor(Math.random() * (max - min)) + min;

        ctx.beginPath();
        ctx.arc(targetX, targetY, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#f7b731';
        ctx.shadowColor = 'rgba(247, 183, 49, 0.4)';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.closePath();
    }

    drawTarget();
    // return


    canvas.onclick = function (e) {
        console.log(10);
        
        return
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;


        const distance = Math.hypot(clickX - targetX, clickY - targetY);

        if (distance <= radius) {
            score++;
            document.getElementById('hudScore').innerText = score;
            drawTarget();
        }
    };


    for (let i = Duree; i >= 0; i--) {
        setTimeout(() => {
            let hudTime = document.getElementById('hudTime');
            hudTime.innerText = i;

            if (i === 0) {

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                canvas.onclick = null;

                document.getElementById('view-game').classList.remove('active');
                document.getElementById('resultScore').innerText = score;
                document.getElementById('resultScoreStat').innerText = score;
                document.getElementById('resultModeStat').innerText = Mode;
                document.getElementById('view-results').classList.add('active');
            }
        }, (Duree - i) * 1000);
    }
}
