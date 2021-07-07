<template>
  <div class="list-group">
    <router-link v-for="item of permittedItems"
                 :key="`menu-item-${item.name}`"
                 :to="{name: item.route}"
                 v-slot="{isActive, navigate}">
            <span class="list-group-item border rounded mt-1 border-dark list-group-item-action bg-secondary text-white" :class="{'active':isActive}" style="cursor: pointer"
                  @click="navigate">
                {{ item.name }}
            </span>
    </router-link>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "LeftMenu",
  data() {
    return {
      items: [
        {
          name: 'Użytkownicy',
          route: 'dashboard.users.list',
          role: 'ROLE_ADMIN'
        },
        {
          name: 'Zabiegi',
          route: 'dashboard.treatments.list',
          role: 'ROLE_ADMIN'
        },
        {
          name: 'Klienci',
          route: 'dashboard.clients.list',
          role: 'ROLE_DOCTOR'
        },
        {
          name: 'Klienci',
          route: 'dashboard.clients.list',
          role: 'ROLE_RECEPTIONIST'
        },
        {
          name: 'Lekarze',
          route: 'dashboard.doctors.list',
          role: 'ROLE_RECEPTIONIST'
        },
        {
          name: 'Wizyty',
          route: 'dashboard.visits.list',
          role: 'ROLE_RECEPTIONIST'
        },
        {
          name: 'Zaplanowane wizyty',
          route: 'dashboard.visits.doctor.list',
          role: 'ROLE_DOCTOR'
        },
        {
          name: 'Moje wizyty',
          route: 'dashboard.visits.client.list',
          role: 'ROLE_CLIENT'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['authorities']),
    permittedItems() {
      return this.items.filter(item => this.authorities.includes(item.role))
    }
  }
}
</script>

<style scoped>
</style>