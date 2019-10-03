function newSessionFunctions () {
  thisObject = {
    runSession: runSession,
    stopSession: stopSession
  }

  return thisObject

  function runSession (node, functionLibraryProtocolNode, callBackFunction) {
    node.payload.uiObject.run(callBackFunction)

    let key = node.name + '-' + node.type + '-' + node.id

    /* Raise event to run the session */
    let event = {
      session: JSON.stringify(functionLibraryProtocolNode.getProtocolNode(node, false, false, true)),
      definition: getDefinition()
    }

    systemEventHandler.raiseEvent(key, 'Run Session', event)

    function getDefinition () {
      let definitionNode = canvas.strategySpace.workspace.getProtocolDefinitionNode()
      definitionNode.uiCurrentValues = getUICurrentValues()
      return JSON.stringify(definitionNode)
    }
  }

  function stopSession (node, functionLibraryProtocolNode, callBackFunction) {
    let key = node.name + '-' + node.type + '-' + node.id
    systemEventHandler.raiseEvent(key, 'Stop Session')

    node.payload.uiObject.stop(callBackFunction)
  }
}
