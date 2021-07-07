<template>
  <main class="login-form bg-white">
    <div class="col-md-6">
      <notifications-list/>
      <div class="card mt-5 mb-5">
        <div class="card-header h3 d-flex justify-content-between align-items-center">
          <p>Rejestracja</p>
          <div>
            <router-link class="btn btn-info" :to="{name: 'auth.login'}">
              Powrót do logowania
            </router-link>
          </div>
        </div>
        <div class="text-light bg-dark">
          <div class="container">
            <validation-observer v-slot="{invalid}">
              <form @submit.prevent="submitForm" class="mt-3">
                <validation-provider v-slot="{errors}" rules="required" v-if="!isProfile">
                  <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="text" class="form-control" name="email" id="email"
                           :class="{'is-invalid':errors.length}" v-model="user.email">
                    <span class="invalid-feedback">
                      {{ errors[0] }}
                    </span>
                  </div>
                </validation-provider>

                <validation-provider v-slot="{errors}" :rules="!user.id ? `required` : ''">
                  <div class="form-group">
                    <label for="password">Hasło</label>
                    <input type="password" class="form-control" name="password" id="password" ref="password"
                           :class="{'is-invalid':errors.length}" v-model="user.password">
                    <span class="invalid-feedback">
                      {{ errors[0] }}
                    </span>
                  </div>
                </validation-provider>

                <validation-provider v-slot="{errors}" :rules="!user.id ? `required` : ''">
                  <div class="form-group">
                    <label for="passwordConfirmation">Potwierdź hasło:</label>
                    <input type="password" class="form-control" name="passwordConfirmation"
                           id="passwordConfirmation" :class="{'is-invalid':errors.length}"
                           v-model="user.passwordConfirmation">
                    <span class="invalid-feedback">
                      {{ errors[0] }}
                    </span>
                  </div>
                </validation-provider>

                <validation-provider v-slot="{errors}" rules="required">
                  <div class="form-group">
                    <label for="firstName">Imię:</label>
                    <input type="text" class="form-control" name="firstName"
                           id="firstName" :class="{'is-invalid':errors.length}"
                           v-model="user.firstName">
                    <span class="invalid-feedback">
                      {{ errors[0] }}
                    </span>
                  </div>
                </validation-provider>

                <validation-provider v-slot="{errors}" rules="required">
                  <div class="form-group">
                    <label for="lastName">Nazwisko:</label>
                    <input type="text" class="form-control" name="lastName"
                           id="lastName" :class="{'is-invalid':errors.length}"
                           v-model="user.lastName">
                    <span class="invalid-feedback">
                      {{ errors[0] }}
                    </span>
                  </div>
                </validation-provider>

                <div class="form-group">
                  <label for="city">Miasto:</label>
                  <input type="text" class="form-control" name="city"
                         id="city"
                         v-model="user.city">
                </div>

                <div class="form-group">
                  <label for="street">Ulica:</label>
                  <input type="text" class="form-control" name="street"
                         id="street"
                         v-model="user.street">
                </div>

                <div class="form-group">
                  <label for="houseNumber">Numer domu:</label>
                  <input type="text" class="form-control" name="houseNumber"
                         id="houseNumber"
                         v-model="user.houseNumber">
                </div>

                <div class="form-group">
                  <label for="phoneNumber">Numer telefonu:</label>
                  <input type="text" class="form-control" name="phoneNumber"
                         id="phoneNumber"
                         v-model="user.phoneNumber">
                </div>

                <div class="form-group text-dark" v-if="!isProfile">
                  <validation-provider v-slot="{errors}" rules="required">
                    <label for="bornAt" class="text-white">Data urodzenia:</label>
                    <datepicker v-model="user.bornAt" class="" id="bornAt" :language="pl"
                                format="yyyy-MM-dd"/>
                    <span class="invalid-feedback">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>

                <div class="d-flex justify-content-end mb-3">
                  <button type="submit" class="btn btn-success" :disabled="invalid">Zarejestruj się</button>
                </div>

              </form>
            </validation-observer>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>

import NotificationsList from "@/components/shared/notifications/NotificationsList";
import {pl} from "vuejs-datepicker/dist/locale";
import moment from "moment";
import axios from "axios";
import {NOTIFICATIONS_PUSH} from "@/store/mutations.type";

export default {
  name: "Register.vue",
  components: {NotificationsList},

  data() {
    return {
      pl: pl,
    }
  },
  props: {
    isProfile: {
      default: false,
      type: Boolean
    },
    user: {
      type: Object,
      default: () => ({
        email: null,
        password: null,
        passwordConfirmation: null,
        firstName: null,
        lastName: null,
        roles: "ROLE_USER,ROLE_CLIENT",
        phoneNumber: null,
        type: "client",
        bornAt: null,
        specialization: null,
      })
    }
  },
  methods: {
    submitForm() {
      this.isLoading = true;
      const request = {
        ...this.user, ...{
          bornAt: this.user.bornAt ? moment(this.user.bornAt).format('YYYY-MM-DD') : null
        }
      }
      axios.post('/users', request)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Rejestracja przebiegła pomyślnie'})
            this.$router.push({name: 'auth.login'})
          })
          .catch((error) => this.$store.commit(NOTIFICATIONS_PUSH, {type: 'danger', message: error.response.data.message}))
          .finally(() => this.isLoading = false);
    }
  },
}
</script>

<style scoped lang="sass">
.login-form
  display: flex
  align-items: center
  justify-content: center
</style>