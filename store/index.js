import * as React from 'react'
import dva from './dva-no-router'
import { Provider, connect } from 'react-redux'

const    model = {
  namespace: 'common',
  state: {
    hello: '123'
  },
  effects: {
    *hello() {
      //
    }
  }
}

const checkServer = () =>
  Object.prototype.toString.call(global.process) === '[object process]'

export const CTRIP_DVA_STORE = 'CTRIP_DVA_STORE'

const createStore = (initSate) => {
  const app = dva(initSate || {})
  if (Array.isArray(model)) {
    model.forEach((item) => {
      app.model(item)
    })
  } else {
    app.model(model)
  }
  app.router(() => {})
  app.start()
  return app._store
}

const getStore = (initState) => {
  const isServer = checkServer()
  if (isServer) {
    return createStore(initState)
  }
  if (!window[CTRIP_DVA_STORE]) {
    window[CTRIP_DVA_STORE] = createStore(initState)
  }

  return window[CTRIP_DVA_STORE]
}

const withDva = (...args) => {
  return (MyApp) => {
    const ComponentWithDva = (props = {}) => {
      const { store, initProps, initState, dvaRef , ...MyAppProps} = props
      const ConnectedComponent = connect(...args)(MyApp)
      const dvaStore = store && store.dispatch ? store : getStore(initState)
      // return React.createElement(
      //   Provider,
      //   { store: dvaStore },
      //   React.createElement(ConnectedComponent, {...initProps, ...MyAppProps, ref: dvaRef })
      // )
      return (
        <Provider store={dvaStore}>
          <ConnectedComponent
            ref={dvaRef}
            {...initProps}
            {...MyAppProps}
          />
        </Provider>
      )
    }
    ComponentWithDva.getInitialProps = async (props = {}) => {
      const store = getStore(props.req)
      const isServer = checkServer()
      const initProps = MyApp.getInitialProps
        ? await MyApp.getInitialProps({ ...props, store, isServer })
        : {}
      return {
        store,
        initProps,
        initState: store.getState(),
      }
    }
    return ComponentWithDva
  }
}

const dvaWrapper = (chooseState) => {
  return (myApp) => React.memo(withDva((state) => chooseState(state))(myApp))
}

export { dvaWrapper }

export default withDva
