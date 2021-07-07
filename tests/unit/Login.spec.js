import { expect } from 'chai'
import {shallowMount} from '@vue/test-utils'
import Login from '@/pages/auth/Login.vue'

describe('Login.vue', () => {
  it('renders tag \'Logowanie\' ', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('.card-header').text()).equal("Logowanie")
    wrapper.destroy()
  })

  it('renders tag \'Email\'', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('.card-body').text()).equal("lub Zarejestruj się!")
    wrapper.destroy()
  })

  it('renders inavlid-feedback', () => {
    const wrapper = shallowMount(Login, {
      data() {
        return {
          email: null,
          password: null
        }
      }
    })
    expect(wrapper.find('.invalid-feedback').exists()).to.equal(false)
    wrapper.destroy()
  })



})

