<template>
  <tr>
    <td>{{ client.id }}</td>
    <td>{{ client.user.firstName }}</td>
    <td>{{ client.user.lastName }}</td>
    <td>{{ clientbornAtDateFormatted }}</td>
    <td>
      <router-link class="btn btn-info" :to="{name: 'dashboard.clients.preview', params: {id: client.id}}">
        Podgląd
      </router-link>

      <router-link :to="{name: 'dashboard.clients.edit', params: {id: client.id}}"
                   class="btn btn-warning m-1">
        Edytuj
      </router-link>

      <router-link :to="{name: 'dashboard.visits.client.listforpersonel', params: {id: client.id}}"
                   class="btn btn-secondary m-1">
        Wizyty klienta
      </router-link>

    </td>
  </tr>
</template>

<script>
import moment from "moment";
export default {
  name: "ClientListItem",
  props: {
    client: {
      required: true,
      type: Object
    }
  },
  computed: {
    clientbornAtDateFormatted() {
      return !this.client.bornAt
          ? '-'
          : moment(this.client.bornAt).format('YYYY-MM-DD');
    },
  }
}
</script>

<style scoped>
</style>