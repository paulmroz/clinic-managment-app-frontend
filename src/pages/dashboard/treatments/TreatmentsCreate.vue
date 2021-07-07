<template>
  <div>
    <div>
      <spinner v-if="isLoading"/>
      <div v-else>
        <h3>Dodaj nową usługę:</h3>
        <div class="container">
          <validation-observer v-slot="{invalid}">
            <form @submit.prevent="saveRoom">
              <validation-provider v-slot="{errors}" rules="required">
                <div class="form-group">
                  <label for="specialization">Nazwa usługi</label>
                  <input type="text" class="form-control" name="specialization" id="specialization"
                         :class="{'is-invalid':errors.length}" v-model="treatment.name">
                  <span class="invalid-feedback">
                    {{ errors[0]}}
                  </span>
                </div>
              </validation-provider>

              <validation-provider v-slot="{errors}" :rules="`required`">
                <div class="form-group">
                  <label for="bedsNumber">Cena(zł):</label>
                  <input type="number" step="1" min="1" class="form-control" name="bedsQuantity" id="bedsNumber"
                         :class="{'is-invalid':errors.length}" v-model="treatment.cost">
                  <span class="invalid-feedback">
                    {{ errors[0]}}
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
    </div>
  </div>
</template>

<script>
import Spinner from "../../../components/shared/Spinner";
import {pl} from "vuejs-datepicker/dist/locale";
import axios from "axios";
import {NOTIFICATIONS_PUSH} from "@/store/mutations.type";
export default {
  name: "TreatmentsCreate",
  components: {Spinner},
  data() {
    return {
      pl: pl,
      isLoading: false,
      treatment: {
        name:null,
        cost: null,
      }
    }
  },
  methods: {
    saveRoom() {
      this.isLoading = true;
      const request = {
        ...this.treatment
      };
      axios.post('/treatments', request)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Poprawnie dodano usługę'})
            this.$router.push({name: 'dashboard.treatments.list'})
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