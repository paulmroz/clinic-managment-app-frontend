<template>
  <div>
    <spinner v-if="isLoading"/>
    <div v-if="!isLoading">
      <h3>Dane klienta</h3>

      <user-details :user="client.user">
        <tr>
          <td>Urodzony dnia</td>
          <td>{{ client.bornAt }}</td>
        </tr>
      </user-details>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../../../components/shared/Spinner";
import UserDetails from "../../../components/shared/UserDetails";
export default {
  name: "ClientPreview",
  components: {UserDetails, Spinner},
  data() {
    return {
      isLoading: true,
      client: null
    }
  },
  mounted() {
    axios.get(`/clients/${this.$route.params.id}`)
        .then(response => this.client = response.data)
        .finally(() => this.isLoading = false);
  }
}
</script>

<style scoped>
</style>