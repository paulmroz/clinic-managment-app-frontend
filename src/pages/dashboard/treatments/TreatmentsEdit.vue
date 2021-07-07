<template>
<div>
<spinner v-if="isLoading"/>
<div v-else>
  <h3>Edytuj usługę:</h3>
  <treatments-form @formSubmitted="saveTreatment" :treatment="treatment"/>
</div>
</div>
</template>

<script>
import axios from "axios";
import Spinner from "../../../components/shared/Spinner";
import TreatmentsForm from "@/components/treatments /TreatmentsForm";
import {NOTIFICATIONS_PUSH} from "@/store/mutations.type";
export default {
  name: "TreatmentsEdit",
  components: {TreatmentsForm, Spinner},
  data() {
    return {
      isLoading: true,
      treatment: null
    }
  },
  mounted() {
    axios.get(`/treatments/${this.$route.params.id}`)
        .then(response => {
          this.treatment = response.data
        })
        .finally(() => this.isLoading = false);
  },
  methods: {
    saveTreatment(room) {
      axios.put(`/treatments/${this.$route.params.id}`, room)
          .then(() => {
            this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Poprawnie edytowano usługe'})
            this.$router.push({name: 'dashboard.treatments.list'})
          })
          .catch(() => this.$store.commit(NOTIFICATIONS_PUSH, {type: 'danger', message: 'Usługa o podanej nazwie już istnieje'}))
          .finally(() => this.isLoading = false);
    }
  }
}
</script>

<style scoped>
</style>