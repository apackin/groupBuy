import { connect } from 'react-redux'
import DeployContractButton from './DeployContractButton'
import { deployContract } from './DeployContractActions'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeployContractClick: (event) => {
      event.preventDefault();

      dispatch(deployContract())
    }
  }
}

const DeployContractContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeployContractButton)

export default DeployContractContainer
