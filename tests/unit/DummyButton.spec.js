import { mount } from '@vue/test-utils'
import DummyButton from '@/components/DummyButton'

let wrapper = null

beforeEach(() => (wrapper = mount(DummyButton)))
afterEach(() => wrapper.destroy())


describe('DummyButton', () =>{
    it('button click should increment the count', () =>{
        expect(wrapper.vm.count).toBe(0)
        const button = wrapper.find('button')
        button.trigger('click')
        expect(wrapper.vm.count).toBe(1) 
    })
    
    it('button click should increment the count text', async () => {
        expect(wrapper.text()).toContain('0')
        const button = wrapper.find('button')
        await button.trigger('click')
        expect(wrapper.text()).toContain('1')
    })
    
})
 