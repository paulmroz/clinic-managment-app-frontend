<template>
  <div class="container">
    <validation-observer v-slot="{invalid}">
      <form @submit.prevent="submitForm">
        <validation-provider v-slot="{errors}" rules="required" v-if="!isProfile">
          <div class="form-group">
            <label for="specialization">Nazwa usługi:</label>
            <input type="text" class="form-control" name="specialization" id="specialization"
                   :class="{'is-invalid':errors.length}" v-model="treatment.name">
            <span class="invalid-feedback">
              {{ errors[0]}}
            </span>
          </div>
        </validation-provider>

        <validation-provider v-slot="{errors}" :rules="!treatment.id ? `required` : ''">
          <div class="form-group">
            <label for="bedsQuantity">Cena:</label>
            <input type="number" min="0" class="form-control" name="bedsQuantity" id="bedsQuantity"
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
</template>

<script>
import {pl} from "vuejs-datepicker/dist/locale";
export default {
  name: "TreatmentsForm",
  data() {
    return {
      pl: pl,
    }
  },
  methods: {
    submitForm() {
      this.$emit('formSubmitted', this.treatment);
    }
  },
  props: {
    isProfile: {
      default: false,
      type: Boolean
    },
    treatment: {
      type: Object,
      default: () => ({
        name: null,
        cost: null,
      })
    }
  }
}
</script>

<style scoped>
</style>