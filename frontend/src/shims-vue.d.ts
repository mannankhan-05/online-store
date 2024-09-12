/* eslint-disable */

import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { RouteLocationNormalizedLoaded, Router } from "vue-router";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<any>; // Ensure Vuex store is recognized
    $router: Router; // Vue Router instance
    $route: RouteLocationNormalizedLoaded; // Current route
  }
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.png" {
  const value: string;
  export default value;
}
