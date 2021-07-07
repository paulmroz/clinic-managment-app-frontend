<template>
  <tr>
    <td>{{ visit.id }}</td>
    <td>{{ visit.name }}</td>
    <td>{{ scheduledForFormatted }}</td>
    <td>{{ visit.client.user.firstName }} {{ visit.client.user.lastName }}</td>
    <td>{{ visit.doctor.user.firstName }} {{ visit.doctor.user.lastName }}</td>
    <td>
      <router-link class="btn btn-info" :to="{name: 'dashboard.visits.preview', params: {id: visit.id}}">
        Podgląd
      </router-link>

      <router-link class="btn btn-info mt-1"
                   :to="{name: 'dashboard.visits.doctor.change-term', params: {id: visit.id}}">
        Zmień termin
      </router-link>
    </td>
  </tr>
</template>

<script>
import moment from "moment";
export default {
  name: "VisitListItem",
  props: {
    visit: {
      required: true,
      type: Object
    }
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