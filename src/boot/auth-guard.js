import { useAuthStore } from '../stores/auth';

export default async ({ router }) => {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;
    if (to.meta.requiresAuth && !isAuthenticated) {
      next('/login');
    } else if ((to.meta.requiresGuest || to.path == '/') && isAuthenticated) {
      next('/chat-screen');
    } else {
      next();
    }
  });
};
