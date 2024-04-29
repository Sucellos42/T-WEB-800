import { useGeneralStore } from '~/stores/general/general.store.ts';


export function isResponsiveGuard(to, from, next) {
    const isResponsive = useGeneralStore().getIsResponsive;
    if (!isResponsive) {
        next({ path: '/' });
    } else {
        next();
    }
}