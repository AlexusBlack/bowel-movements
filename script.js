(function() {
    const lsp = 'bowel-tracker-'; // Local storage prefix
    const pooValue = document.querySelector('.value--poo');
    const weeValue = document.querySelector('.value--wee');
    const yestPooValue = document.querySelector('.value--yest-poo');
    const yestWeeValue = document.querySelector('.value--yest-wee');
    const resetTimeValue = document.querySelector('.value--reset-time');

    const addPooBtn = document.querySelector('.value__add--poo');
    const addWeeBtn = document.querySelector('.value__add--wee');
    const removePooBtn = document.querySelector('.value__remove--poo');
    const removeWeeBtn = document.querySelector('.value__remove--wee');

    const currentDataValue = document.querySelector('.current-date');
    currentDataValue.textContent = (new Date()).toDateString();

    let date = parseInt(getSaveVal('date', getNextMidnight()));
    saveVal('date', date);
    let bowelMovements = {
        poos: getSaveVal('poos', 0),
        wees: getSaveVal('wees', 0),
        yestPoos: getSaveVal('yest-poos', 0),
        yestWees: getSaveVal('yest-wees', 0)
    };

    if(Date.now() > date) {
        midnightSwitch();
    }
    renderTimeToMidnightSwitch();

    renderPooAndWee();
    yestPooValue.textContent = bowelMovements['yestPoos'];
    yestWeeValue.textContent = bowelMovements['yestWees'];

    addPooBtn.addEventListener('click', () => addBowelMovement('poos', 1));
    addWeeBtn.addEventListener('click', () => addBowelMovement('wees', 1));
    removePooBtn.addEventListener('click', () => addBowelMovement('poos', -1));
    removeWeeBtn.addEventListener('click', () => addBowelMovement('wees', -1));
    // simple date reset hack
    currentDataValue.addEventListener('click', () => localStorage.removeItem(lsp + 'date'));

    setInterval(function() {
        if(Date.now() > date) {
            midnightSwitch();
        }
        renderTimeToMidnightSwitch();
    }, 5000);

    function renderTimeToMidnightSwitch() {
        const timeLeftUnix = date - Date.now();
        const timeLeft = new Date(timeLeftUnix);
        // let floatHours = timeLeft / 60 / 60;
        // let intHours = parseInt(floatHours);
        // let minutes = (floatHours - intHours) * 60;
        resetTimeValue.textContent = timeLeft.getUTCHours() + ':' + timeLeft.getUTCMinutes();
    }

    function midnightSwitch() {
        saveVal('poos', 0);
        saveVal('wees', 0);
        saveVal('yest-poos', bowelMovements['poos']);
        saveVal('yest-wees', bowelMovements['wees']);
        localStorage.removeItem('date');
        document.location.reload();
    }

    function getNextMidnight() {
        const m = new Date();
        m.setHours(24,0,0,0); // next midnight
        return m.getTime();
    }

    function addBowelMovement(type, value) {
        bowelMovements[type] = parseInt(bowelMovements[type]) + value;
        if(bowelMovements[type] < 0) bowelMovements[type] = 0;

        saveVal(type, bowelMovements[type]);

        if(type == 'poos' || type == 'wees') {
            renderPooAndWee();
        }
    }

    function renderPooAndWee() {
        pooValue.textContent = bowelMovements['poos'];
        weeValue.textContent = bowelMovements['wees'];
    }

    function getSaveVal(name, def) {
        if(localStorage.getItem(lsp + name) !== null) {
            return localStorage.getItem(lsp + name);
        } else {
            return def;
        }
    }

    function saveVal(name, val) {
        localStorage.setItem(lsp + name, val);
    }
})();