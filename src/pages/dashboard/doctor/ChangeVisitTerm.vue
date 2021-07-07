<template>
  <div>
    <spinner v-if="isLoading"/>
    <div v-else>
      <h3>Zmień termin wizyty</h3>
      <validation-observer v-slot="{invalid}">
        <form @submit.prevent="saveVisit">
          <validation-provider v-slot="{errors}" rules="required">

            <div class="form-group" v-if="visit">

              <label for="scheduledFor">Termin</label>
              <datepicker v-model="visit.scheduledFor" id="scheduledFor" :language="pl"
                          format="yyyy-MM-dd"/>
              <span class="invalid-feedback">
                            {{ errors[0]}}
                        </span>
            </div>
          </validation-provider>

          <validation-provider v-slot="{errors}" rules="required">

            <div class="form-group" v-if="visit">

              <label>Godzina</label>
              <br>
              <vue-timepicker format="HH" v-model="visitTime" id="visitTime"></vue-timepicker>
              <span class="invalid-feedback">
                            {{ errors[0] }}
                        </span>
            </div>
          </validation-provider>

          <div>
            <button type="submit" class="btn btn-primary" :disabled="invalid">Zapisz</button>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../../components/shared/Spinner";
import {pl} from "vuejs-datepicker/dist/locale";
import moment from "moment";
import {NOTIFICATIONS_PUSH} from "@/store/mutations.type";
import {mapGetters} from "vuex";
export default {
  name: "ChangeVisitTerm",
  components: {Spinner},
  data() {
    return {
      pl: pl,
      isLoading: true,
      visit: null,
      visitTime: ''
    }
  },
  computed:{
    ...mapGetters(['authorities']),
  },
  mounted() {
    this.isLoading = true;
    axios.get(`/visits/${this.$route.params.id}`)
        .then(response => {
          this.visit = response.data;
          this.visitTime = moment(this.visit.scheduledFor).format('HH:mm');
        })
        .finally(() => this.isLoading = false);
  },
  methods: {
    saveVisit() {
      this.isLoading = true;
      const request = {
        scheduledFor: `${moment(this.visit.scheduledFor).format('YYYY-MM-DD')} ${this.visitTime}:00`
      }
      axios.put(`/doctor/visits/${this.$route.params.id}/change-date`, request)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Poprawnie zmieniono date'})
            if(this.authorities.includes('ROLE_DOCTOR')) {
              this.$router.push({name: 'dashboard.visits.doctor.list'})
            } else {
              this.$router.push({name: 'dashboard.visits.list'})
            }
          })
          .catch((response) => {
            this.$store.commit(NOTIFICATIONS_PUSH, {
              type: 'danger',
              message: response.response.data.message
            })
          })
          .finally(() => this.isLoading = false);
    }
  }
}
</script>

<style scoped>
</style>