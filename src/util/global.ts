/**
 * @file: global.js, created at Monday, 23rd December 2019 3:47:23 pm
 * @copyright Copyright (c) 2020
 * @author gem <gems.xu@gmail.com>
 */

/**
 * @description provide global scope.
 */
let global: any;

// see https://stackoverflow.com/a/11237259/589493
if (typeof window === 'undefined') {
    /* eslint-disable-next-line no-undef */
    global = self;
} else {
    global = window;
}

export default global;
