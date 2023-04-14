// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract GaaS {
    struct GateEvaluation {
        address evaluatedAddress;
        string resultHash;
    }
    struct Gate {
        address creator;
        string configHash;
    }

    uint256 public lastGateId;
    // Map of gate identifiers to gate data
    mapping(uint256 => Gate) public gates;
    // Map of gate identifiers to evaluation results
    mapping(uint256 => GateEvaluation[]) public evaluations;
    // Map of gate creator addresses to gate identifiers
    mapping(address => uint256[]) public createdGates;
    // Map of addresses to performed evaluations
    mapping(address => uint256[]) public evaluationsPerformed;
    // Map of addresses to gate identifiers to evaluation identifiers
    mapping(address => mapping(uint256 => uint256[])) public evaluationIDs;

    event GateCreated(address creator, uint256 gateId);
    event EvaluationCompleted(address evaluatedAddress, uint256 gateId);

    function createGate(
        string calldata _configHash
    ) public returns (uint256) {
        Gate storage newGate = gates[lastGateId];
        newGate.creator = msg.sender;
        newGate.configHash = _configHash;

        createdGates[msg.sender].push(lastGateId);

        emit GateCreated(msg.sender, lastGateId);

        lastGateId++;
        return lastGateId-1;
    }

    function completeEvaluation(
        uint256 gateId,
        address _evaluatedAddress,
        string calldata _evaluationHash
    ) public returns (uint256) {
        evaluations[gateId].push(GateEvaluation(_evaluatedAddress, _evaluationHash));
        evaluationsPerformed[_evaluatedAddress].push(gateId);

        uint256 newEvaluationId = evaluations[gateId].length - 1;
        evaluationIDs[_evaluatedAddress][gateId].push(newEvaluationId);

        emit EvaluationCompleted(_evaluatedAddress, gateId);

        return newEvaluationId;
    }


    function getResponses(uint256 gateId) public view returns(GateEvaluation[] memory) {
        GateEvaluation[] memory returnVal = new GateEvaluation[](evaluations[gateId].length);
        for(uint i = 0; i < evaluations[gateId].length; i++) {
           returnVal[i] = evaluations[gateId][i];
        }
        return returnVal;
    }

    function getGate(uint256 gateId) public view returns(Gate memory) {
        return gates[gateId];
    }

    function getCreatedGates(address _address) public view returns(uint256[] memory) {
        uint256[] memory returnVal = new uint256[](createdGates[_address].length);
        for(uint i = 0; i < createdGates[_address].length; i++) {
           returnVal[i] = createdGates[_address][i];
        }
        return returnVal;
    }

    function getEvaluationIDs(address _address, uint256 gateId) public view returns(uint256[] memory) {
        uint256[] memory returnVal = new uint256[](evaluationIDs[_address][gateId].length);
        for(uint i = 0; i < evaluationIDs[_address][gateId].length; i++) {
           returnVal[i] = evaluationIDs[_address][gateId][i];
        }
        return returnVal;
    }
}
