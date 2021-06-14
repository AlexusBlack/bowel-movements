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

    let bowelMovements = {
        poos: getSaveVal('poos', 0),
        wees: getSaveVal('wees', 0),
        yestPoos: getSaveVal('yest-poos', 0),
        yestWees: getSaveVal('yest-wees', 0)
    };

    renderPooAndWee();
    yestPooValue.textContent = bowelMovements['yestPoos'];
    yestWeeValue.textContent = bowelMovements['yestWees'];

    addPooBtn.addEventListener('click', () => addBowelMovement('poos', 1));
    addWeeBtn.addEventListener('click', () => addBowelMovement('wees', 1));
    removePooBtn.addEventListener('click', () => addBowelMovement('poos', -1));
    removeWeeBtn.addEventListener('click', () => addBowelMovement('wees', -1));

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