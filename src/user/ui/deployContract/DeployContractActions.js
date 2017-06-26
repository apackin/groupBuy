import SimpleTokenContract from '../../../../build/contracts/SimpleToken.json'
import store from '../../../store'

const contract = require('truffle-contract')

const testAccounts = [
  "0x68073c50aa09b693384358a8311c3e24f899ebba",
  "0xa467a2e07d6d39f6a4cf17b6f788c01e54f21ad4",
  "0x2ee8d609a4b1700b233d1391285397e9b2ef9b47",
  "0x12ec469c9239b8e621e57695cec3b1969a3a4350",
  "0xa05b761f210d2ff3b3b5a4a0fa5a1328c5084040",
  "0x41f4311750b7abe26ddfd8fe51a4489503a9f689",
  "0x7feecae2e75bab4286d4837d5e9efca7aa0d9fb3",
  "0xa7b61b849214abb9957a2f65a50e751b0d631453",
  "0xbe680aa8bd8e4b5b7285273f05254bff32850351",
  "0xe145c6e5dadbb127dd277dbeceafbdc26d658346",
]

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
      // Using truffle-contract we create the SimpleToken object.
      const SimpleToken = contract(SimpleTokenContract)
      SimpleToken.setProvider(web3.currentProvider)

      // Get current ethereum wallet.
      web3.eth.getCoinbase((error, coinbase) => {
        console.log(`deploy SimpleTokenContract from ${coinbase}`);
        // Log errors, if any.
        if (error) {
          console.error(error);
        }

        SimpleToken.new({from: coinbase})
        .then((SimpleTokenInstance) =>
          // Test Transfer.
          SimpleTokenInstance.transfer(testAccounts[5], 50, {from: coinbase})
          .then(function(result) {
            // If no error, login user.
            dispatch(contractDeployed(result))
          })
        )
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