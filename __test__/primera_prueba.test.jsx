
import {shallow} from 'enzyme';
import PrimeraPrueba from '../pages/primera_prueba.jsx'

describe('Probando componente Crear curso',() => {
  test('Probando renderizado de componente',() => {
    const wrapper = shallow(<PrimeraPrueba/>)
    console.log(wrapper.html());
  })
})

