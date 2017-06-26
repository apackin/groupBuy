import SingleSourceCreationTokenContract from '../../../../build/contracts/SingleSourceCreationToken.json'
import store from '../../../store'
import testKeys from '../../../testKeys'

const contract = require('truffle-contract')

export const CONTRACT_DEPLOYED = 'CONTRACT_DEPLOYED'
function contractDeployed(payload) {
  return {
    type: CONTRACT_DEPLOYED,
    payload,
  }
}


export function deployContract(contractOptions) {
  let web3 = store.getState().web3.web3Instance

  // Double-check web3's status.
  if (typeof web3 !== 'undefined') {

    return function(dispatch) {
      // Using truffle-contract we create the SingleSourceCreationToken object.
      const SingleSourceCreationToken = contract(SingleSourceCreationTokenContract)
      SingleSourceCreationToken.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        console.log(`deploy SingleSourceCreationTokenContract from ${coinbase}`);
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        SingleSourceCreationToken.new({from: coinbase})
        .then((SingleSourceCreationTokenInstance) => {
          console.log(SingleSourceCreationTokenInstance);
          // Test Transfer.
          return SingleSourceCreationTokenInstance.createTokens(testKeys.testAccounts[5], 5, {from: coinbase})
          .then(function(result) {
            // If no error, login user.
            dispatch(contractDeployed(result))
            return SingleSourceCreationTokenInstance
          })
        })
        .then((SingleSourceCreationTokenInstance) => {
          SingleSourceCreationTokenInstance.balanceOf(testKeys.testAccounts[5])
          .then(result => {
            dispatch(contractDeployed(result))            
          })
        })
        .catch(function(result) {
          // If error, go to signup page.
          throw result;
        })
      })
    }
  } else {
    console.error('Web3 is not initialized.');
  }
}