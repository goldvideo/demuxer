/**
 * @fileOverview A simple multimap template.
 */

interface MapData {
    [index: string]: Array<any>;
}

export default class MultiMap {
    private map_: MapData;

    constructor() {
        this.map_ = {};
    }

    /**
     * Add a key, value pair to the map.
     * @param key
     * @param value
     */
    push(key: string, value: any) {
        if (Object.prototype.hasOwnProperty.call(this.map_, key)) {
            this.map_[key].push(value);
        } else {
            this.map_[key] = [value];
        }
    }

    /**
     * Get a list of values by key.
     * @param key
     */
    get(key: string): Array<any> {
        let list = this.map_[key];
        // slice() clones the list so that it and the map can each be modified
        // without affecting the other.
        return list ? list.slice() : null;
    }

    /**
     * Get a list of all values.
     */
    getAll(): Array<any> {
        let list = [];
        for (let key in this.map_) {
            list.push.apply(list, this.map_[key]);
        }
        return list;
    }

    /**
     * Remove a specific value, if it exists.
     * @param key
     * @param value
     */
    remove(key: string, value: any): void {
        let list = this.map_[key];
        if (list) {
            for (let i = 0; i < list.length; ++i) {
                if (list[i] == value) {
                    list.splice(i, 1);
                    --i;
                }
            }
        }
    }

    /**
     * Clear all keys and values from the multimap.
     */
    clear(): void {
        this.map_ = {};
    }

    /**
     * @param callback
     */
    forEach(callback: Function): void {
        for (let key in this.map_) {
            callback(key, this.map_[key]);
        }
    }
}
