<template>
  <div>

    <div>
      <h3>Dane wizyty</h3>

      <table class="table table-dark table-striped table-inverse table-responsive">
        <tbody>
        <tr>
          <td scope="row">Nazwa</td>
          <td>{{ visit.name }}</td>
        </tr>
        <tr>
          <td scope="row">Data</td>
          <td>{{ visitDateFormatted }}</td>

        </tr>
        <tr>
          <td scope="row">Sczegóły</td>
          <td>{{ visit.details }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div>
      <h3>Dane Doktora:</h3>

      <user-details :user="visit.doctor.user">
        <tr>
          <td>Specjalizacja</td>
          <td>{{ visit.doctor.specialization }}</td>
        </tr>
      </user-details>
    </div>


    <div>
      <h3>Dane Klienta:</h3>

      <user-details :user="visit.client.user">
        <tr>
          <td>Urodzony dnia</td>
          <td>{{ visit.client.bornAt }}</td>
        </tr>
      </user-details>
    </div>
  </div>

</template>

<script>
import UserDetails from "./UserDetails";
import moment from "moment";

export default {
  name: "VisitDetails",
  components: {UserDetails},
  props: {
    visit: {
      type: Object,
      required: true
    }
  },

  computed:{
    visitDateFormatted() {
      return moment(this.visit.scheduledFor).format('YYYY-MM-DD HH:mm');
    }
  }
}
</script>

<style scoped>

</style>

