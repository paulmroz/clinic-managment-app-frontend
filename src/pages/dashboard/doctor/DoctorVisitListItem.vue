<template>
  <tr>
    <td>{{ visit.id }}</td>
    <td>{{ visit.name }}</td>
    <td>{{ scheduledForFormatted}}</td>
    <td>{{ visit.client.user.firstName }} {{ visit.client.user.lastName }}</td>
    <td>
      <router-link class="btn btn-info m-1" :to="{name: 'dashboard.visits.doctor.preview', params: {id: visit.id}}">
        Podgląd
      </router-link>
      <router-link class="btn btn-info m-1" :to="{name: 'dashboard.visits.doctor.change-term', params: {id: visit.id}}">
        Zmień termin
      </router-link>
      <router-link class="btn btn-info m-1" :to="{name: 'dashboard.visits.doctor.add-details', params: {id: visit.id}}">
        Dodaj szczegóły
      </router-link>
    </td>
  </tr>
</template>

<script>

import moment from "moment";

export default {
  name: "DoctorVisitListItem",
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