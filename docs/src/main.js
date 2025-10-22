import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { installA11yDirectives } from 'vue-a11y-directives';
import App from './App.vue';

// Import pages
import Home from './pages/Home.vue';
import GettingStarted from './pages/GettingStarted.vue';
import Installation from './pages/Installation.vue';
import FocusDirective from './pages/directives/FocusDirective.vue';
import TrapFocusDirective from './pages/directives/TrapFocusDirective.vue';
import KeyboardDirective from './pages/directives/KeyboardDirective.vue';
import AnnounceDirective from './pages/directives/AnnounceDirective.vue';
import AriaDirective from './pages/directives/AriaDirective.vue';
import SkipLinkDirective from './pages/directives/SkipLinkDirective.vue';
import SkipDirective from './pages/directives/SkipDirective.vue';
import Examples from './pages/Examples.vue';
import ComplexScenarios from './pages/ComplexScenarios.vue';
import ScenariosDocumentation from './pages/ScenariosDocumentation.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/getting-started', component: GettingStarted },
  { path: '/installation', component: Installation },
  { path: '/directives/focus', component: FocusDirective },
  { path: '/directives/trap-focus', component: TrapFocusDirective },
  { path: '/directives/keyboard', component: KeyboardDirective },
  { path: '/directives/announce', component: AnnounceDirective },
  { path: '/directives/aria', component: AriaDirective },
  { path: '/directives/skip-link', component: SkipLinkDirective },
  { path: '/directives/skip', component: SkipDirective },
  { path: '/examples', component: Examples },
  { path: '/complex-scenarios', component: ComplexScenarios },
  { path: '/scenarios-documentation', component: ScenariosDocumentation }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

const app = createApp(App);
installA11yDirectives(app);
app.use(router);
app.mount('#app');
