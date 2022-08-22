const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'Add the mnemonic key here',
    'Add the Network Endpoint (Eg. infura rinkeby endpoint)',
); // Connect to the wallet and the required network(rinkeby)

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from the account: ',accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Hi There!']})
        .send({from: accounts[0], gas: '1000000'});

    console.log('Address of the contract: ',result.options.address);
    provider.engine.stop();
};
deploy();