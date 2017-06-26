import React from 'react'

const DeployContractButton = ({ onDeployContractClick }) => 
    <a href="#" onClick={(event) => onDeployContractClick(event)}>Deploy Contract</a>

export default DeployContractButton
