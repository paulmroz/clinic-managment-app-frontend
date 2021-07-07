import { expect } from 'chai'
import {shallowMount} from '@vue/test-utils'
import Register from '@/pages/auth/Register.vue'

describe('Register.vue', () => {
    it('renders tag \'Rejestracja \' ', () => {
        const wrapper = shallowMount(Register)
        expect(wrapper.find('.card-header').text()).equal("Rejestracja Powrót do logowania")
        wrapper.destroy()
    })



    it('renders inavlid-feedback', () => {
        const wrapper = shallowMount(Register)
        expect(wrapper.find('.invalid-feedback').exists()).to.equal(false)
        wrapper.destroy()
    })



})