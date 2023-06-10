export const debounce = <F extends (...args: Array<any>) => void>(func: F, wait: number): ((...args: Array<any>) => void) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Array<any>): void => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
};
