<template>
  <tr>
    <td>{{ visit.id }}</td>
    <td>{{ visit.name }}</td>
    <td>{{ scheduledForFormatted }}</td>
    <td>{{ visit.doctor.user.firstName }} {{ visit.doctor.user.lastName }}</td>
    <td>{{ visit.price }}</td>
    <td>
      <span class="text-success h4" v-if="visit.isPayed === 'true'">&#10003;</span>
      <span class="text-danger h4" v-if="visit.isPayed === 'false'">&#10005;</span>
    </td>
    <td>
      <button type="button" class="btn btn-primary" v-if="visit.isPayed === 'false'" @click="payForVisit(visit)">Opłać</button>
    </td>

  </tr>
</template>

<script>

import moment from "moment";
import {API_URL} from "@/common/config";
import axios from "axios";
import {NOTIFICATIONS_PUSH} from "@/store/mutations.type";


export default {
  name: "ClientVisitListItem",
  data(){
    return {
      apiUrl: API_URL
    }
  },
  props: {
    visit: {
      required: true,
      type: Object,
    }
  },

  methods: {
    payForVisit(visit) {
      axios.get(`/payment/${visit.id}/pay`)
          .then(
              response => window.location.href = response.data.redirectUrl,
              this.$store.commit(NOTIFICATIONS_PUSH, {type: 'success', message: 'Poprawnie opłacono wizyte'}),
          )
          .finally();
    },
  },
  computed: {
    scheduledForFormatted() {
      return !this.visit.scheduledFor
          ? '-'
          : moment(this.visit.scheduledFor).format('YYYY-MM-DD HH:mm');
    }
  }
}
</script>

<style scoped>

</style>