const assert = require('assert');
const ganache = require('ganache-cli');
const { beforeEach } = require('mocha');
const Web3 = require('web3'); //Constructor Function
const web3 = new Web3(ganache.provider());
const { abi, evm }  = require('../compile');


let fetchedAccounts;
let inbox; // represent the object of the contract deployed in the network

beforeEach(async () => {
    //  Get a list of all the accounts 
    fetchedAccounts = await web3.eth.getAccounts();

    // Use one of the account to deploy the contract 
    inbox = await new web3.eth.Contract(abi)  // Informs the web3 about the methods the Inbox Contract has (Info about the instance)
        .deploy({data: evm.bytecode.object, arguments: ['Hi There!']})     // Tells the web3 we want to deploy a copy of the contract (Creates the instance)
        .send({from: fetchedAccounts[0], gas: '1000000'});      // Instructs the web3 to send the transaction to create the contract (Deploy in the network)
});

describe('Inbox',()=>{

    it('deploys a contract',() => {
        assert.ok(inbox.options.address); // Check whether the value exists (not null or undefined)
    });

    it('has a default message',async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message,'Hi There!');
    });

    it('can change message',async () => {
        await inbox.methods.setMessage('bye')
            .send({ from: fetchedAccounts[0] });

        const message = await inbox.methods.message().call();
        assert.equal(message,'bye');
    });
});











/* 

MOCHA TESTING SAMPLE

class Car{
    park(){
        return 'stopped';
    }

    drive(){
        return 'vroom';
    }
}



let car;

beforeEach(() => {
    car = new Car();
});

describe('Car',() => {
    // Contains test cases

    it('canPark',() => {
        assert.equal(car.park(),'stopped');
    }); // First Param describes the test function

    it('canDrive',()=>{
        assert.equal(car.drive(),'vroom');
    })

}) // Test Group Name

*/