import { ObjectDirective } from 'vue';

const eventHandlers = new Map<HTMLElement, (event: MouseEvent) => void>();

export const clickOutside: ObjectDirective<HTMLElement, (event: MouseEvent) => void> = {
    beforeMount(el, binding) {
        const onClick = (event: MouseEvent) => {
            if (!(el === event.target || el.contains(event.target as Node))) {
                binding.value(event);
            }
        };
        eventHandlers.set(el, onClick);
        document.addEventListener('click', onClick);
    },
    unmounted(el) {
        const handler = eventHandlers.get(el);
        if (handler) {
            document.removeEventListener('click', handler);
            eventHandlers.delete(el);
        }
    },
};
