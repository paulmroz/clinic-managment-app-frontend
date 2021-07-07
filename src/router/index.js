import Vue from "vue";
import Router from "vue-router";
import Login from "../pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import UserList from "../pages/dashboard/users/UserList";
import RouterPath from "../components/shared/RouterPath";
import UserPreview from "../pages/dashboard/users/UserPreview";
import store from '../store';
import Profile from "../pages/dashboard/Profile";
import UserCreate from "../pages/dashboard/users/UserCreate";
import ProfileEdit from "../pages/dashboard/ProfileEdit";
import UserEdit from "../pages/dashboard/users/UserEdit";
import ClientsList from "../pages/dashboard/clients/ClientsList";
import ClientCreate from "../pages/dashboard/clients/ClientCreate";
import ClientPreview from "../pages/dashboard/clients/ClientPreview";
import ClientEdit from "../pages/dashboard/clients/ClientEdit";
import VisitList from "../pages/dashboard/visits/VisitList";
import VisitCreate from "../pages/dashboard/visits/VisitCreate";
import VisitPreview from "../pages/dashboard/visits/VisitPreview";
import ClientVisitList from "../pages/dashboard/client/ClientVisitList";
import ClientVisitListForPersonel from "../pages/dashboard/client/ClientVisitListForPersonel";
import DoctorVisitsList from "../pages/dashboard/doctor/DoctorVisitsList";
import ChangeVisitTerm from "../pages/dashboard/doctor/ChangeVisitTerm";
import AddDetails from "../pages/dashboard/doctor/AddDetails";
import DoctorVisitPreview from "../pages/dashboard/doctor/DoctorVisitPreview";
import TreatmentsCreate from "@/pages/dashboard/treatments/TreatmentsCreate";
import TreatmentsEdit from "@/pages/dashboard/treatments/TreatmentsEdit";
import TreatmentsList from "@/pages/dashboard/treatments/TreatmentsList";
import FillData from "@/pages/auth/FillData";
import DoctorList from "../pages/dashboard/doctors/DoctorList";
Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: '/dashboard'
    },
    {
      path: '/filldata',
      name: 'auth.filldata',
      component: FillData,
      beforeEnter(to, from, next) {
        store.getters['isAuthenticated'] ? next() : next({name: 'dashboard'})
      }
    },
    {
      path: '/register',
      name: 'auth.register',
      component: Register,
      beforeEnter(to, from, next) {
        !store.getters['isAuthenticated'] ? next() : next({name: 'dashboard'})
      }
    },
    {
      path: '/login',
      name: 'auth.login',
      component: Login,
      beforeEnter(to, from, next) {
        !store.getters['isAuthenticated'] ? next() : next({name: 'dashboard'})
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/dashboard/profile',
      component: Dashboard,

      children: [
        {
          path: 'profile',
          component: RouterPath,
          children: [
            {
              path: '',
              name: 'dashboard.profile',
              component: Profile
            },
            {
              path: 'edit',
              name: 'dashboard.profile.edit',
              component: ProfileEdit
            }
          ]
        },
        {
          path: 'doctors',
          component: RouterPath,
          children: [
            {
              path: '',
              name: 'dashboard.doctors.list',
              component: DoctorList
            },
          ]
        },
        {
          path: 'users',
          component: RouterPath,
          children: [
            {
              path: '',
              name: 'dashboard.users.list',
              component: UserList
            },
            {
              path: 'create',
              name: 'dashboard.users.create',
              component: UserCreate
            },
            {
              path: ':id/preview',
              name: 'dashboard.users.preview',
              component: UserPreview
            },
            {
              path: ':id/edit',
              name: 'dashboard.users.edit',
              component: UserEdit
            }
          ]
        },
        {
          path: 'treatments',
          component: RouterPath,
          children: [
            {
              path: '',
              name: 'dashboard.treatments.list',
              component: TreatmentsList
            },
            {
              path: 'create',
              name: 'dashboard.treatments.create',
              component: TreatmentsCreate
            },
            {
              path: ':id/edit',
              name: 'dashboard.treatments.edit',
              component: TreatmentsEdit
            },
          ]
        },
        {
          path: 'clients',
          component: RouterPath,
          children: [
            {
              path: '',
              name: 'dashboard.clients.list',
              component: ClientsList
            },
            {
              path: 'create',
              name: 'dashboard.clients.create',
              component: ClientCreate
            },
            {
              path: ':id/preview',
              name: 'dashboard.clients.preview',
              component: ClientPreview
            },
            {
              path: ':id/edit',
              name: 'dashboard.clients.edit',
              component: ClientEdit
            },
          ]
        },
        {
          path: 'visits',
          component: RouterPath,
          children: [
            {
              path: 'client',
              component: RouterPath,
              children: [
                {
                  path: '',
                  name: 'dashboard.visits.client.list',
                  component: ClientVisitList
                },
                {
                  path: '',
                  name: 'dashboard.visits.client.listforpersonel',
                  component: ClientVisitListForPersonel
                }
              ]
            },
            {
              path: 'doctor',
              component: RouterPath,
              children: [
                {
                  path: '',
                  name: 'dashboard.visits.doctor.list',
                  component: DoctorVisitsList
                },
                {
                  path: ':id/change-term',
                  name: 'dashboard.visits.doctor.change-term',
                  component: ChangeVisitTerm
                },
                {
                  path: ':id/add-details',
                  name: 'dashboard.visits.doctor.add-details',
                  component: AddDetails
                },
                {
                  path: ':id',
                  name: 'dashboard.visits.doctor.preview',
                  component: DoctorVisitPreview
                },
              ]
            },
            {
              path: '',
              name: 'dashboard.visits.list',
              component: VisitList
            },
            {
              path: 'create',
              name: 'dashboard.visits.create',
              component: VisitCreate
            },
            {
              path: ':id',
              name: 'dashboard.visits.preview',
              component: VisitPreview
            }
          ]
        }
      ]
    }
  ]
});

export default router;