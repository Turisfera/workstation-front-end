import { createRouter, createWebHistory } from 'vue-router'
import TheLogin          from '@/Security/Presentation/the-login.component.vue'
import TheRegisterComponent          from '@/Security/Presentation/the-register.component.vue'
import DefaultLayout     from '@/Shared/Presentation/default-layout.page.vue'
import HomeView          from '@/Shared/Presentation/home-view.page.vue'
import UserHome          from '@/Shared/Presentation/home-view.page.vue'
import ExperienceView    from '@/Experience/Presentation/experience-view.page.vue'
import ExperienceForm    from '@/Experience/Presentation/experience-form.component.vue'
import ExperienceDelete  from '@/Experience/Presentation/experience-delete.component.vue'
import AgencyProfilePage from '@/Agency/Presentation/agency-profile.page.vue'
import ReservationsView  from '@/Reservations/Presentation/reservations-view.page.vue'
import ExperienceSearchResults from "@/Experience/Presentation/experience-search-results.page.vue";
import ExperienceAdvancedSearch from "@/Experience/Presentation/experience-advanced-search.page.vue";
import SearchView       from "@/Experience/Presentation/search-view.page.vue";
import QueryView        from "@/Queries/Presentation/query-view.vue";

const routes = [
    {
        path: '/login',
        component: TheLogin,
        meta: { layout: 'auth' }
    },
    {
        path: '/register',
        component: TheRegisterComponent,
        meta: { layout: 'auth' }
    },
    {
        path: '/',
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '',                     name: 'Home',           component: HomeView },
            { path: 'user/home',            name: 'UserHome',       component: UserHome },
            { path: 'manageExperience',     name: 'ExperienceList', component: ExperienceView },
            { path: 'manageExperience/create',  name: 'ExperienceCreate', component: ExperienceForm },
            {
                path: 'manageExperience/delete/:id',
                name: 'ExperienceDelete',
                component: ExperienceDelete,
                props: true
            },
            {
                path: 'manageExperience/update/:id',
                name: 'ExperienceEdit',
                component: ExperienceForm,
                props: true
            },            { path: 'agency/home',          name: 'AgencyHome',     component: HomeView },
            { path: 'agency/profile',       name: 'AgencyProfile',  component: AgencyProfilePage },            { path: 'reservations',         name: 'Reservations',   component: ReservationsView },
            { path: 'search',               name: 'ExperienceSearch', component: ExperienceAdvancedSearch},
            { path: 'search-results',       name: 'ExperienceSearchResults', component: ExperienceSearchResults},
            { path: 'busqueda',            name: 'SearchView', component: SearchView },
            { path: 'queries',              name: 'Queries', component: QueryView },
        ]
    },
    { path: '/:catchAll(.*)', redirect: '/login' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.meta.requiresAuth && !token) {
        return next('/login')
    }
    next()
})

export default router
