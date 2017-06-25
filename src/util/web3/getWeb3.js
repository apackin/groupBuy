import store from '../../store'
import Web3 from 'web3'

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function(dispatch) {
    var results

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      results = {
        web3Instance: new Web3(window.web3.currentProvider)
      }

      console.log('Injected web3 detected.');

      resolve(store.dispatch(web3Initialized(results)))
    } else {
      // Fallback to localhost if no web3 injection.

      var provider = new Web3.providers.HttpProvider('http://localhost:8545')

      results = {
        web3Instance: new Web3(provider)
      }

      console.log('No web3 instance injected, using Local web3.');

      resolve(store.dispatch(web3Initialized(results)))
    }
  })
})

export default getWeb3
