import { createSSRApp } from 'vue';
import store from './store';
import App from './App.vue';
import { uniStorage } from './utils/storage';
// import share from './utils/share'; 全局分享

uniStorage();

export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  // app.mixin(share);
  return {
    app,
  };
}
