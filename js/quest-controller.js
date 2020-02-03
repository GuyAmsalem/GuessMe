'use strict';
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').attr('hidden', true);
    renderQuest();
    $('.quest').attr('hidden', false);
}

function renderQuest() {
    var quest = getCurrQuest();
    $('.quest h2').text(quest.txt);
}

function onUserResponse(res) {
    // If this node has no children
    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {
            $('.quest h2').text('Its a magic!:)');
            $('.game-buttons').attr('hidden', true);
        } else {
            $('.quest h2').text('I dont know...teach me!');
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

