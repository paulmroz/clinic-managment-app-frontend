<template>
  <main class="login-form bg-dark">
    <div class="col-md-6">
      <notifications-list/>
      <div class="card">
        <div class="card-header h3">
          Logowanie
        </div>

        <div class="card-body p-5 text-light bg-dark">
          <validation-observer v-slot="{invalid}">
            <form @submit.prevent="submitForm" class="d-flex flex-column justify-content-center">
              <validation-provider rules="required" v-slot="{errors}">
                <div class="form-group row">
                  <label for="email_address" class="col-md-4 col-form-label text-md-right">
                    Email
                  </label>
                  <div class="col-md-6">
                    <input type="text"  id="email_address" class="form-control" name="email-address"
                           required autofocus v-model="email" :class="{'is-invalid':errors.length}">
                    <div class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </div>

                </div>
              </validation-provider>

              <validation-provider rules="required" v-slot="{errors}">
                <div class="form-group row">
                  <label for="password" class="col-md-4 col-form-label text-md-right">Hasło</label>
                  <div class="col-md-6">
                    <input type="password" id="password" class="form-control" name="password"
                           required
                           v-model="password" :class="{'is-invalid':errors.length}">
                    <div class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </div>
                </div>
              </validation-provider>
              <div class="col-md-6 offset-md-4">
                <button type="submit" class="btn btn-primary ml-n1" :disabled="invalid">
                  Zaloguj
                </button>
              </div>
            </form>

          </validation-observer>
          <div class="border-top my-3"></div>
          <div class="d-flex align-items-center justify-content-center">
            <form class="d-flex justify-content-center align-items-center offset-md-2" action="http://localhost:8081/signin/facebook" method="POST">
              <img class="mr-2" src="https://www.liveartgroup.pl/wp-content/uploads/2020/02/FB-Icon.png" alt="fb-icon" width="40" height="40">
              <input type="hidden" name="scope" value="public_profile"  />
              <input type="submit" class="btn-info rounded p-2" value="Zaloguj się za pomocą Facebooka"/>
            </form>
            <span class="ml-3">lub</span>
            <div class="col-md-6">
              <router-link class="btn btn-success p-2" :to="{name: 'auth.register'}">
                Zarejestruj się!
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {LOGIN} from "@/store/actions.type";
import NotificationsList from "../../components/shared/notifications/NotificationsList";

export default {
  name: "Login",
  components: {NotificationsList},
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch(LOGIN, {email: this.email.trim(), password: this.password})
          .then(() => this.$router.push({name: 'dashboard.profile'}));
    }
  }
}
</script>

<style scoped lang="sass">
.login-form
  width: 100%
  height: 100%
  display: flex
  align-items: center
  justify-content: center
</style>
