import { createWebHistory, createRouter } from 'vue-router'
import HomeView from "@/Shared/Presentation/home-view.page.vue";
import ExperienceView from "@/Experience/Presentation/experience-view.page.vue";
import ExperienceForm from "@/Experience/Presentation/experience-form.component.vue";

const routes = [
    { path: '/', component: HomeView },
    { path: '/manageExperience', component: ExperienceView, exact: true },
    { path: '/manageExperience/create', component: ExperienceForm, exact: true },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;