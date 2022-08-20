const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');
const source = fs.readFileSync(inboxPath,'utf-8');

// File and No. of contracts to be compiled to be passed to the solc
module.exports = solc.compile(source,1).contracts[':Inbox']; 










/* Why no directly import the Inbox file */

/* Directly importing it using require will result in js compilation of 
he file which will throw an error as the file is written in solidity */


/* Why use Path library */

/* Path library ensures cross platform compatibility between windows and unix
systems */
