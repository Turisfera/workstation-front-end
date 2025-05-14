import { createWebHistory, createRouter } from 'vue-router'
import HomeView from "@/Shared/Presentation/home-view.page.vue";
import ExperienceView from "@/Experience/Presentation/experience-view.page.vue";
import ExperienceForm from "@/Experience/Presentation/experience-form.component.vue";
import ExperienceDelete from "@/Experience/Presentation/experience-delete.component.vue";
import AgencyProfilePage from '@/Agency/Presentation/agency-profile.page.vue';
import ReservationsView from "@/Reservations/Presentation/reservations-view.page.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/manageExperience', component: ExperienceView, exact: true },
    { path: '/manageExperience/create', component: ExperienceForm, exact: true },
    { path: '/manageExperience/delete/:id', component: ExperienceDelete, props: true },
    { path: '/manageExperience/update/:id', component: ExperienceForm, name: "updateArticle", props: true},
    { path: '/agency/profile',     name: 'AgencyProfile',       component: AgencyProfilePage },
    { path: '/reservations', component: ReservationsView, exact: true },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;