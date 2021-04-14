# MultiConsole

## Demo

### Now you can log multiple different logs to output window in a grouped manner. Reading console can never be better than this
&nbsp;

```const MultiWindow = require("multi-windows");
MultiWindow.config({
    port: 8080, // 3000 is default
    openInBrowser: false // true is default
})

const console1 = new MultiWindow("Primary Window");
const console2 = new MultiWindow();
const console3 = new MultiWindow();

console1.log("This is a sample log");
console1.info("This is a sample info");
console1.success("This is a sample success");
console1.warning("This is a sample warning");
console1.error("This is a sample error");

console2.success("First log");
console2.success("Second log");
console2.success("Third log");
console2.clear();
console2.warning("Fourth log (after console.clear())");
console2.success("Fifth log");

let i=0;
setInterval(() => {
    console3.success(`Log number ${++i}...`)
}, 2000)
```