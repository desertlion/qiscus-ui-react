import React from 'react'

const QiscusContext = React.createContext()

export const QiscusProvider = QiscusContext.Provider
export const QiscusConsumer = QiscusContext.Consumer

export default QiscusContext