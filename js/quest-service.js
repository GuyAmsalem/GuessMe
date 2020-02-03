'use strict';
const KEY = 'questsTree'
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function getCurrQuest() {
    return gCurrQuest;
}

function createQuestsTree() {
    if (loadFromStorage(KEY)) {
        gQuestsTree = loadFromStorage(KEY);
    } else {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        saveToStorage(KEY, gQuestsTree);
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null);
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    var newGuess = {
        txt: newQuestTxt,
        yes: createQuest(newGuessTxt),
        no: createQuest(gCurrQuest.txt)
    }
    gPrevQuest[lastRes] = newGuess;
    saveToStorage(KEY, gQuestsTree);
}

function restartGame() {
    gPrevQuest = null;
    gCurrQuest = gQuestsTree;
}


