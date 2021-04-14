// const outputWindows = require("./app")();
const MultiConsole = require("./MultiConsole");
MultiConsole.config({ openInBrowser: false, port: 80 });
// const mainConsole = new outputWindows.Console();

// MultiConsole.openBrowser();

const mainConsole = new MultiConsole("Main console");
const secondConsole = new MultiConsole();
const thirdConsole = new MultiConsole();
const fourthConsole = new MultiConsole("last console");

console.log({
    mainConsole: mainConsole.getId(),
    secondConsole: secondConsole.getId(),
    thirdConsole: thirdConsole.getId(),
    fourthConsole: fourthConsole.getId(),
});

mainConsole.log("Testing...");
secondConsole.info("Hello,");
mainConsole.warning("Is anybody there?");
mainConsole.log("Asked for a list of consoles");
mainConsole.clear();
fourthConsole.log({
    foo: "bar",
    abc: "xyz",
    numbers: [1, 2, 3, 4, 5, 6, 7],
});
fourthConsole.log("ooi");

const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomConsole = () => {
    switch (randomBetween(1, 4)) {
        case 1:
            return mainConsole;
            break;
        case 2:
            return secondConsole;
            break;
        case 3:
            return thirdConsole;
            break;
        case 4:
            return fourthConsole;
            break;
    }
};

let i = 0;

const randomLog = () => {
    switch (randomBetween(1, 6)) {
        case 1:
            randomConsole().log(`logging ${++i}th message to second console`);
            break;
        case 2:
            randomConsole().info(`logging ${++i}th message to second console`);
            break;
        case 3:
            randomConsole().success(`logging ${++i}th message to second console`);
            break;
        case 4:
            randomConsole().error(`logging ${++i}th message to second console`);
            break;
        case 5:
            randomConsole().warning(`logging ${++i}th message to second console`);
            break;
        case 6:
            randomConsole().clear();
            break;
    }
};

setInterval(() => {
    randomLog();
}, 2000);
