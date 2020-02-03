'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').attr('hidden', true)
    renderQuest();
    $('.quest').attr('hidden', false)
}

function renderQuest() {
    $('.quest h2').text( getCurrQuestTxt());

}

function onUserResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            // TODO: improve UX
        } else {
            alert('I dont know...teach me!')
            $('.quest').attr('hidden', true);
            $('.new-quest').attr('hidden', false);
        }
    } else {
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess() {
    var newQuestTxt = $('#newQuest').val();
    var newGuessTxt = $('#newGuess').val();
    addGuess(newQuestTxt, newGuessTxt, gLastRes);
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').attr('hidden', true);
    $('.game-start').attr('hidden', false);
    gLastRes = null;
    restartGame();
}

