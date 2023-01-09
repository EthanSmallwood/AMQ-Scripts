// ==UserScript==
// @name         AMQ Skin Counter
// @namespace    https://github.com/Mxyuki/AMQ-Scripts
// @version      0.3
// @description  Display in the skin Area, The Number of skin you have, The total number of skin in the game, And the percentage of skin you possess
// @author       Mxyuki
// @match        https://animemusicquiz.com/*
// @downloadURL  https://github.com/Mxyuki/AMQ-Scripts/raw/main/amqSkinCounter.user.js
// @updateURL    https://github.com/Mxyuki/AMQ-Scripts/raw/main/amqSkinCounter.user.js
// ==/UserScript==

if (document.getElementById("startPage")) return;

let loadInterval = setInterval(() => {
    if (document.getElementById("loadingScreen").classList.contains("hidden")) {
        setup();
        clearInterval(loadInterval);
    }
}, 500);

function setup(){

    var total = 0;
    var total2 = 0;
    var collection = 0;

    if($('#swRightColumnTotalSkinArea')) $('#swRightColumnTotalSkinArea').remove();

    $('.swTopBarAvatarImageContainer > .swTopBarUnlockStatusContainer > .swTopBarUnlockStatusAmountContainerOuter > .swTopBarUnlockStatusAmountContainer > .swTopBarUnlockStautsNumberContainer > .swTopBarUnlockStatusUnlocked').each(function() {
        total += parseInt($(this).text());
    });

    $('.swTopBarAvatarImageContainer > .swTopBarUnlockStatusContainer > .swTopBarUnlockStatusAmountContainerOuter > .swTopBarUnlockStatusAmountContainer > .swTopBarUnlockStautsNumberContainer > .swTopBarUnlockStatusTotal').each(function() {
        total2 += parseInt($(this).text());
    });

    total = total - 45;
    total2 = total2 - 105;
    collection = ((total/total2)*100).toFixed(2);

    console.log(total + " / " + total2);
    console.log("Collection : " + ((total/total2)*100).toFixed(2) + "%");

    $('#swRightColumnBottomInner').prepend(`
        <div id="swRightColumnTotalSkin" style="margin-bottom: 10px">
            <div id="swRightColumnTotalSkinArea" class="text-center" style="margin-top: -20px;">
                <h1 style="font-size: 25px;">Total Skins:</h1>
                 ${total} / ${total2} | ${collection} %
            </div>
        </div>
    `);
}

new Listener("ticket roll result", (payload) => {
    setTimeout(function() {
        setup();
    }, 20000);
}).bindListener();

new Listener("unlock avatar", (payload) => {
    setup();
}).bindListener();
