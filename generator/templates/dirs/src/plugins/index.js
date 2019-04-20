import Vue from 'vue';

import example from './example';

const plugins = [example];

export default function (app) {
    const inject = (name, plugin) => {
        const key = `$${name}`;
        app[key] = plugin;
        app.store[key] = plugin;

        Vue.use(() => {
            if (Vue.prototype.hasOwnProperty(key)) {
                return;
            }
            Object.defineProperty(Vue.prototype, key, {
                get() {
                    return this.$root.$options[key];
                },
            });
        });
    };

    const injectInProperties = (name, plugin) => {
        const key = `$${name}`;
        app[key] = plugin;
        app.store[key] = plugin;

        Vue.use(() => {
            if (Vue.prototype.hasOwnProperty(key)) {
                return;
            }
            Vue.mixin({
                data() {
                    return {
                        [key]: plugin,
                    };
                },
            });
            Object.defineProperty(Vue.prototype, key, {
                get() {
                    return plugin;
                },
            });
        });
    };

    plugins.forEach((plugin) => {
        plugin(app, inject, injectInProperties, Vue);
    });
}
