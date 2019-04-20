import internalComponents from './internal';
import externalComponents from './external';

export default function (Vue) {
    const allComponents = {};
    Object.keys(internalComponents).forEach((key) => {
        if (key in allComponents) throw new Error(`[Components] Component "${key}" was repeated from internal components`);
        allComponents[key] = internalComponents[key];
    });
    Object.keys(externalComponents).forEach((key) => {
        if (key in allComponents) throw new Error(`[Components] Component "${key}" was repeated from external components`);
        allComponents[key] = externalComponents[key];
    });

    Object.keys(allComponents).forEach((name) => {
        if (process.env.NODE_ENV === 'development') console.log(`component "${name}" loaded`);
        Vue.component(name, allComponents[name]);
    });
}
