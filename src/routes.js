// routes.js
import SearchPage from './views/SearchPage.vue';
import LandingPage from './views/LandingPage.vue';
import CreatePage from './views/CreatePage.vue';
import ImportPage from './views/ImportPage.vue';
import BulkUpdatePage from './views/BulkUpdatePage.vue';
import SoftwarePage from './views/SoftwarePage.vue';


const routes = [
    { path: '/', component: LandingPage, name: 'landing' },
    { path: '/search', component: SearchPage, name: 'search' },
    { path: '/create', component: CreatePage, name: 'create' },
    { path: '/import', component: ImportPage, name: 'import' },
    { path: '/bulk_update', component: BulkUpdatePage, name: 'bulk_update' },
    { path: '/software', component: SoftwarePage, name: 'software' },
];

export default routes;