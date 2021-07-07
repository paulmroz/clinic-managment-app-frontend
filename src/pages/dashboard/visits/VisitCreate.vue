<template>
  <div>
    <spinner v-if="isLoading"/>
    <div v-else>
      <validation-observer v-slot="{invalid}">
        <form @submit.prevent="submitForm">
          <validation-provider v-slot="{errors}" rules="required">
            <div class="form-group">
              <label for="name">Krótki opis problemu</label>
              <input type="text" class="form-control" name="name"
                     id="name" :class="{'is-invalid':errors.length}"
                     v-model="visit.name">
              <span class="invalid-feedback">
                {{ errors[0]}}
              </span>
            </div>
          </validation-provider>

          <validation-provider v-slot="{errors}" rules="required">
            <div class="form-group">
              <label for="scheduledFor">Data wizyty</label>
              <datepicker v-model="visit.scheduledFor" class="" id="scheduledFor" :language="pl"
                          format="yyyy-MM-dd"/>
              <span class="invalid-feedback">
                {{ errors[0]}}
              </span>
            </div>
          </validation-provider>

          <validation-provider v-slot="{errors}" rules="required">
            <div class="form-group">
              <label for="scheduledFor">Godzina wizyty</label>
              <br>
              <vue-timepicker format="HH" v-model="visitTime" id="visitTime"></vue-timepicker>

              <span class="invalid-feedback">
                {{ errors[0]}}
              </span>
            </div>
          </validation-provider>

          <validation-provider v-slot="{errors}" rules="required"  v-if="!isClient">
            <div class="form-group">
              <label for="scheduledFor">Opłacona:</label>
              <br>
              <div>
                <label  for="ispayed">&nbsp;Tak</label>
                <input class="ml-3" type="checkbox" id="ispayed" :value="true" v-model="visit.isPayed">
              </div>

              <span class="invalid-feedback">
                {{ errors[0]}}
              </span>
            </div>
          </validation-provider>


          <div class="form-group">
            <validation-provider v-slot="{errors}" rules="required">
              <label for="doctor-select">Doktor</label>
              <select class="form-control" id="doctor-select" v-model="visit.doctorId">
                <option :value="null">Wybierz...</option>
                <option v-for="doctor of doctors" :key="`doctor-${doctor.id}`" :value="doctor.id">
                  {{ doctor.user.firstName }} {{ doctor.user.lastName }} / Specjalizacja: {{doctor.specialization}}
                </option>
              </select>
              <span class="invalid-feedback">
                {{ errors[0]}}
              </span>
            </validation-provider>
          </div>

            <div class="form-group">
              <validation-provider v-slot="{errors}" rules="required" v-if="!isClient">
                <label for="client">Klient</label>
                <select class="form-control" id="client" v-model="visit.clientId">
                  <option :value="null">Wybierz...</option>
                  <option v-for="client of clients" :key="`client-${client.id}`" :value="client.id">
                    {{ client.user.firstName }} {{ client.user.lastName }}
                  </option>
                </select>
                <span class="invalid-feedback">
                {{ errors[0]}}
              </span>
              </validation-provider>
            </div>

          <validation-provider v-slot="{errors}">
            <label for="services">Rodzaj wizyty</label>
            <select class="form-control" name="services" id="services" v-model="visit.price">
              <option :value="null"></option>
              <option v-for="treatment in treatments" :key="`treatment-value-${treatment.id}`"  :value="treatment.cost">{{treatment.name}}/Cena: {{treatment.cost}}zł</option>
            </select>
            <span class="invalid-feedback">
              {{ errors[0]}}
            </span>
          </validation-provider>

          <div>
            <button type="submit" class="btn btn-primary mt-3" :disabled="invalid">Zapisz</button>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Spinner from "../../../components/shared/Spinner";
import {pl} from "vuejs-datepicker/dist/locale";
import moment from "moment";
import {NOTIFICATIONS_PUSH} from "@/store/mutations.type";
import {mapGetters} from "vuex";
export default {
  name: "VisitCreate",
  components: {Spinner},
  data() {
    return {
      isLoading: true,
      clients: [],
      doctors: [],
      pl: pl,
      visitTime: '',
      visit: {
        name: null,
        priority: null,
        scheduledFor: null,
        doctorId: null,
        clientId: null,
        price:null,
        isPayed:'false',
        externalId:null,
      },
      user:null,
      treatments:[]
    }
  },
  mounted() {
    const doctorPromise = axios
        .get('/doctors')
        .then(response => this.doctors = response.data);
    const clientPromise = axios
        .get('/clients')
        .then(response => this.clients = response.data);
    Promise.all([doctorPromise, clientPromise])
        .finally(() => this.isLoading = false);

    axios
        .get('user/current')
        .then(response => this.user = response.data)
        .finally(() => this.isLoading = false);

    this.fetchTreatments();
  },
  computed: {
    ...mapGetters(['authorities']),
    isClient(){
      return this.authorities.includes('ROLE_CLIENT')
    },
  },
  methods: {
    submitForm() {
      this.isLoading = true;
      const request = {
        ...this.visit, ...{
          scheduledFor: this.visit.scheduledFor ? `${moment(this.visit.scheduledFor).format('YYYY-MM-DD')} ${this.visitTime}:00` : null,
          clientId: this.visit.clientId ? this.visit.clientId: this.user.client.id,
        }
      }
      axios.post('/visits', request)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Poprawnie dodano wizytę'})
            if(this.user.client){
              this.$router.push({name: 'dashboard.visits.client.list'})
            } else {
              this.$router.push({name: 'dashboard.visits.list'})
            }

          })
          .catch((error) => this.$store.commit(NOTIFICATIONS_PUSH, {
            type: 'danger',
            message: error.response.data.message
          }))
          .finally(() => this.isLoading = false);
    },

    fetchTreatments() {
      this.isLoading = true;
      axios.get('/treatments')
          .then(response => this.treatments = response.data)
          .finally(() => this.isLoading = false)
    }
  }
}
</script>

<style scoped>
</style>