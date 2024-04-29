import { useGeneralStore } from '~/stores/general/general.store.ts';


export function isResponsiveGuard(next: any) {
    const isResponsive = useGeneralStore().getIsResponsive;
    if (!isResponsive) {
        next({ path: '/' });
    } else {
        next();
    }
}
