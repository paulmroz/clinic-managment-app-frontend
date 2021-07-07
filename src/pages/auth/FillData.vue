<template>
  <main class="login-form bg-white">
    <div class="col-md-6">
      <notifications-list/>
      <div class="card mt-5 mb-5">
        <div class="card-header h3">
          Uzupełnij Dane
        </div>
        <div class="text-light bg-dark">
          <div class="container">
            <validation-observer v-slot="{invalid}">
              <form @submit.prevent="submitForm" class="mt-3">

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
                  <button type="submit" class="btn btn-success" :disabled="invalid">Zapisz</button>
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
//import moment from "moment";
import axios from "axios";
import {NOTIFICATIONS_PUSH} from "@/store/mutations.type";

export default {
  name: "FillData",
  components: {NotificationsList},

  data() {
    return {
      pl: pl,
      userLoaded: null,
      isLoading: true,
      user: {
        city: null,
        street: null,
        houseNumber: null,
        phoneNumber: null,
        bornAt: null,
      }

    }
  },

  mounted() {
    this.isLoading = true;
    axios
        .get('user/current')
        .then(response => this.userLoaded = response.data)
        .finally(() => this.isLoading = false)
  },
  methods: {
    submitForm() {
      this.isLoading = true;
      // const request = {
      //   ...this.user, ...{
      //     bornAt: this.user.bornAt ? moment(this.user.bornAt).format('YYYY-MM-DD') : null
      //   }
      // }
      axios.put('user/change/fb', this.user)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Rejestracja przebiegła pomyślnie'})
            this.$router.push({name: 'dashboard'})
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