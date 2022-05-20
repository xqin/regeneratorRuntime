import withDva from '/store'

const Demo = () => <h1>Hello World!!!</h1>

const dvaDemo = withDva((state) => {
  return {}
})(Demo)

export default dvaDemo
