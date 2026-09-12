Storage()
function Storage() {
    let t = []
    localStorage.setItem('myTasksList', JSON.stringify(t));

}
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
    // -------------------------------------------------------------------------------------------------------------Classique
    if (Mode == "Classique") {
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
            // console.log(10);

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
            return
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
                    Historique()
                    Historique_rander()
                }
            }, (Duree - i) * 1000);
        }
    }

    // -------------------------------------------------------------------------------------------------------------Précision
    if (Mode == "Précision") {


        let Rates = 0
        let Precision = 0
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
            // console.log(10);

            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const clickX = (e.clientX - rect.left) * scaleX;
            const clickY = (e.clientY - rect.top) * scaleY;


            const distance = Math.hypot(clickX - targetX, clickY - targetY);

            if (distance <= radius) {
                score = score + 3;
                Precision++;
                document.getElementById('hudScore').innerText = score;
                drawTarget();
            } else if (distance > radius) {
                const Precision_1 = Math.hypot(0 - targetX, 0 - targetY);
                const Precision_2 = Math.hypot(500 - targetX, 500 - targetY);
                const Precision_3 = Math.hypot(0 - targetX, 500 - targetY);
                const Precision_4 = Math.hypot(500 - targetX, 0 - targetY);
                let Precision = [Precision_1, Precision_2, Precision_3, Precision_4]
                let max = Math.max(...Precision);

                if (distance <= (max / 3)) {
                    score = score - 1;
                    Rates++;
                    document.getElementById('hudScore').innerText = score;
                    drawTarget();

                } else if (distance > (max / 3) || distance <= ((max / 3) * 2)) {
                    score = score - 2;
                    Rates++;
                    document.getElementById('hudScore').innerText = score;
                    drawTarget();

                } else if (distance > ((max / 3) * 2)) {
                    score = score - 3;
                    Rates++;
                    document.getElementById('hudScore').innerText = score;
                    drawTarget();

                }

            }
            return
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
                    Historique()
                    Historique_rander()
                }
            }, (Duree - i) * 1000);
        }

    }

    // ----------------------------------------------------------------------------------------------------------Défi
    if (Mode == "Défi") {

        let Rates = 0
        let Precision = 0
        score = 0;
        document.getElementById('hudScore').innerText = score;

        const canvas = document.getElementById('arenaCanvas');
        const ctx = canvas.getContext('2d');


        let radius = 30;
        if (Difficulte === 'Facile') radius = 40;
        if (Difficulte === 'Difficile') radius = 20;
        // drawTarget_duree(radius)

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
            // console.log(10);

            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const clickX = (e.clientX - rect.left) * scaleX;
            const clickY = (e.clientY - rect.top) * scaleY;


            const distance = Math.hypot(clickX - targetX, clickY - targetY);

            if (distance <= radius) {
                score = score + 3;
                Precision++;
                document.getElementById('hudScore').innerText = score;
                // drawTarget();
            } else if (distance > radius) {
                const Precision_1 = Math.hypot(0 - targetX, 0 - targetY);
                const Precision_2 = Math.hypot(500 - targetX, 500 - targetY);
                const Precision_3 = Math.hypot(0 - targetX, 500 - targetY);
                const Precision_4 = Math.hypot(500 - targetX, 0 - targetY);
                let Precision = [Precision_1, Precision_2, Precision_3, Precision_4]
                let max = Math.max(...Precision);

                if (distance <= (max / 3)) {
                    score = score - 1;
                    Rates++;
                    document.getElementById('hudScore').innerText = score;
                    drawTarget_duree(radius)


                } else if (distance > (max / 3) || distance <= ((max / 3) * 2)) {
                    score = score - 2;
                    Rates++;
                    document.getElementById('hudScore').innerText = score;
                    drawTarget_duree(radius)


                } else if (distance > ((max / 3) * 2)) {
                    score = score - 3;
                    Rates++;
                    document.getElementById('hudScore').innerText = score;
                    drawTarget_duree(radius)


                }

            }
            return
        };
        for (let i = Duree; i >= 0; i--) {
            // drawTarget_duree(radius)
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
                    document.getElementById('resultAccStat').innerText = Precision;
                    document.getElementById('resultMissesStat').innerText = Rates;
                    document.getElementById('view-results').classList.add('active');
                    Historique()
                    Historique_rander()
                }
                // drawTarget_duree(radius)
            }, (Duree - i) * 1000);

        }

    }
}


function drawTarget_duree(radius) {
    console.log(10);
    
    const canvas = document.getElementById('arenaCanvas');
    const ctx = canvas.getContext('2d');
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

    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 1000);
}

function Historique() {
    let resultScore = document.getElementById('resultScore').innerText;
    let resultModeStat = document.getElementById('resultModeStat').innerText;
    let resultAccStat = document.getElementById('resultAccStat').innerText;
    let resultMissesStat = document.getElementById('resultMissesStat').innerText;
    console.log(resultScore);
    console.log(resultModeStat);
    console.log(resultAccStat);
    console.log(resultMissesStat);
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}`;
    let obj = {
        resultScore: resultScore,
        resultModeStat: resultModeStat,
        resultAccStat: resultAccStat,
        resultMissesStat: resultMissesStat,
        date: formattedDateTime
    }

    let b = localStorage.getItem('myTasksList')
    console.log(b);

    let currentArray = JSON.parse(b)

    const maxElements = 5;
    currentArray.push(obj);
    if (currentArray.length > maxElements) {
        currentArray.shift();
    }
    localStorage.setItem('myTasksList', JSON.stringify(currentArray));
    console.log(formattedDateTime);
}
function Historique_rander() {
    let historyList = document.getElementById('historyList');
    let storedData = localStorage.getItem('myTasksList');
    let historyArray = storedData ? JSON.parse(storedData) : [];
    historyList.innerHTML = '';
    if (historyArray.length === 0) {
        historyList.innerHTML = '<p>لا يوجد سجل ألعاب سابق</p>';
        return;
    }
    historyArray.forEach((item) => {
        let itemDiv = document.createElement('div');
        itemDiv.className = 'history-item';
        itemDiv.innerHTML = `
    <div class="card-header">
        <span class="mode-badge">${item.resultModeStat}</span>
        <span class="date">${item.date}</span>
    </div>
    <div class="card-stats">
        <div class="stat-box">
            <span class="label">النقاط</span>
            <span class="value score-val">${item.resultScore}</span>
        </div>
        <div class="stat-box">
            <span class="label">الدقة</span>
            <span class="value">${item.resultAccStat}</span>
        </div>
        <div class="stat-box">
            <span class="label">الأخطاء</span>
            <span class="value miss-val">${item.resultMissesStat}</span>
        </div>
    </div>
`;
        historyList.appendChild(itemDiv);
    });
}