<template>
  <div>
    <spinner v-if="isLoading"/>
    <div v-if="!isLoading">
      <visit-details :visit="visit"/>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../../components/shared/Spinner";
import VisitDetails from "../../../components/shared/VisitDetails";

export default {
  name: "VisitPreview",
  components: {VisitDetails, Spinner},
  data() {
    return {
      isLoading: true,
      visit: null,
    }
  },
  mounted() {
    this.isLoading = true;
    axios.get(`/visits/${this.$route.params.id}`)
        .then(response => this.visit = response.data)
        .finally(() => this.isLoading = false);
  }
}
</script>

<style scoped>

</style>