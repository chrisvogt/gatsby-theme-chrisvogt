const { configure, mount, render, shallow } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

configure({
  adapter: new Adapter()
})

// loader shim
global.___loader = { enqueue: () => {} }

global.mount = mount
global.render = render
global.shallow = shallow

console.error = message => {
  throw new Error(message)
}
