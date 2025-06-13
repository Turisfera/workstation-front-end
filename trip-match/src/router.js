import { createRouter, createWebHistory } from 'vue-router';
import AgencyLayoutPage from '@/Shared/Presentation/agency-layout.page.vue';
import TouristLayout from '@/Shared/Presentation/tourist-layout.page.vue';
import TheLogin from '@/Security/Presentation/the-login.component.vue';
import TheRegisterComponent from '@/Security/Presentation/the-register.component.vue';
import AgencyHomePage from '@/Shared/Presentation/agency-home.page.vue';
import TouristHomePage from '@/Shared/Presentation/tourist-home.page.vue';
import ExperienceSearchResults from "@/Experience/Presentation/experience-search-results.page.vue";
import ExperienceView from '@/Experience/Presentation/experience-view.page.vue';
import ExperienceForm from '@/Experience/Presentation/experience-form.component.vue';
import ExperienceDelete from '@/Experience/Presentation/experience-delete.component.vue';
import AgencyProfilePage from '@/Agency/Presentation/agency-profile.page.vue';
import ReservationsView from '@/Reservations/Presentation/reservations-view.page.vue';
import QueryView from "@/Queries/Presentation/query-view.vue";
import FavoritesView from '@/Favorites/Presentation/favorites-view.page.vue';
import ItinerariesView from '@/Itineraries/Presentation/itineraries-view.page.vue';
import UserProfileView from '@/UserProfile/Presentation/user-profile-view.page.vue';

const routes = [
    { path: '/login', component: TheLogin, meta: { layout: 'auth' } },
    { path: '/register', component: TheRegisterComponent, meta: { layout: 'auth' } },

    {
        path: '/agency',
        component: AgencyLayoutPage,
        meta: { requiresAuth: true, role: 'agency' },
        children: [
            { path: 'home', name: 'AgencyHome', component: AgencyHomePage },
            { path: 'manageExperience', name: 'ExperienceList', component: ExperienceView },
            { path: 'manageExperience/create', name: 'ExperienceCreate', component: ExperienceForm },
            { path: 'manageExperience/delete/:id', name: 'ExperienceDelete', component: ExperienceDelete, props: true },
            { path: 'manageExperience/update/:id', name: 'ExperienceEdit', component: ExperienceForm, props: true },
            { path: 'profile', name: 'AgencyProfile', component: AgencyProfilePage },
            { path: 'reservations', name: 'Reservations', component: ReservationsView },
            { path: 'queries', name: 'Queries', component: QueryView },
        ]
    },

    {
        path: '/',
        component: TouristLayout,
        meta: { requiresAuth: true, role: 'tourist' },
        children: [
            { path: '', name: 'TouristHome', component: TouristHomePage },
            { path: 'favorites', name: 'Favorites', component: FavoritesView },
            { path: 'itineraries', name: 'Itineraries', component: ItinerariesView },
            { path: 'profile', name: 'UserProfile', component: UserProfileView },
            {
                path: 'experience/:id',
                name: 'ExperienceDetail',
                component: () => import('@/Experience/Presentation/experience-detail-view.page.vue'),
                props: true
            }
        ]
    },

    {
        path: '/search',
        component: TouristLayout,
        meta: { requiresAuth: true },
        children: [
            { path: '', name: 'ExperienceSearch', component: ExperienceSearchResults }
        ]
    },

    { path: '/:catchAll(.*)', redirect: '/login' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const isAgency = localStorage.getItem('isAgency') === 'true';
    if (to.meta.requiresAuth && !token) {
        return next('/login');
    }
    if (to.meta.role) {
        const userRole = isAgency ? 'agency' : 'tourist';
        if (to.meta.role !== userRole) {
            return next(isAgency ? '/agency/home' : '/');
        }
    }
    next();
});

export default router;