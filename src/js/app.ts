// Import our CSS
import '../css/tailwind-base.pcss';
import '../css/app-base.pcss';
import '../css/tailwind-components.pcss';
import '../css/app-components.pcss';
import '../css/tailwind-utilities.pcss';
import '../css/app-utilities.pcss';

import App from "../vue/App.vue";

// App main
const main = async () => {
    // Async load the Vue 3 APIs we need from the Vue ESM
    const { createApp } = await import(/* webpackChunkName: "vue" */ 'vue');
    // Create our vue instance
    const app = createApp(App);

    // Mount the app
    const root = app.mount("#component-container");

    return root;
};

// Execute async function
main().then( (root) => {
});

// Accept HMR as per: https://webpack.js.org/api/hot-module-replacement#accept
if (module.hot) {
    module.hot.accept();
}
