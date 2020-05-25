import MultiMap from './multi-map';

/**
 * Creates a new Binding_ and attaches the event listener to the event target.
 */
class Binding_ {
    target: any;
    type: string;
    listener: Function;

    /**
     * @param target - The event target.
     * @param type - The event type.
     * @param listener - The event listener.
     */
    constructor(target: any, type: string, listener: Function) {
        this.target = target;
        this.type = type;
        this.listener = listener;

        if (this.target.addEventListener) {
            this.target.addEventListener(type, listener, false);
        } else if (this.target.on) {
            this.target.on(type, listener, false);
        }
    }

    /**
     * Detaches the event listener from the event target.
     * This does nothing if the event listener is already detached.
     */
    off() {
        if (this.target.removeEventListener) {
            this.target.removeEventListener(this.type, this.listener, false);
        } else if (this.target.off) {
            this.target.off(this.type, this.listener, false);
        }

        this.target = null;
        this.listener = null;
    }
}

/**
 * Creates a new EventManager.
 * An EventManager maintains a collection of "event bindings" between event targets and event listeners.
 */
export default class EventManager {
    private bindingMap_: MultiMap;
    // static Binding_: Binding;

    constructor() {
        /**
         * Maps an event type to an array of event bindings.
         */
        this.bindingMap_ = new MultiMap();
    }

    /**
     * Detaches all event listeners.
     * @override
     */
    destroy(): void {
        this.removeAll();
        this.bindingMap_ = null;
    }

    /**
     * Attaches an event listener to an event target.
     * @param target - The event target.
     * @param type  - The event type.
     * @param listener  - The event listener.
     */
    on(target: any, type: string, listener: Function): EventManager {
        if (!this.bindingMap_) return;

        let binding = new Binding_(target, type, listener);
        this.bindingMap_.push(type, binding);

        return this;
    }

    /**
     * Attaches an event listener to an event target.
     * The listener will be removed when the first instance of the event is fired.
     * @param {EventTarget} target The event target.
     * @param {string} type The event type.
     * @param {function} listener The event listener.
     */
    once(target: any, type: string, listener: Function) {
        // Install a shim listener that will stop listening after the first event.
        this.on(
            target,
            type,
            function (event: any) {
                // Stop listening to this event.
                this.off(target, type);
                // Call the original listener.
                listener(event);
            }.bind(this)
        );
    }

    /**
     * Detaches an event listener from an event target.
     * @param {EventTarget} target The event target.
     * @param {string} type The event type.
     */
    off(target: any, type: string): void {
        if (!this.bindingMap_) return;

        let list = this.bindingMap_.get(type) || [];

        for (let i = 0; i < list.length; ++i) {
            let binding = list[i];

            if (binding.target == target) {
                binding.off();
                this.bindingMap_.remove(type, binding);
            }
        }
    }

    /**
     * Detaches all event listeners from all targets.
     */
    removeAll(): void {
        if (!this.bindingMap_) return;

        let list = this.bindingMap_.getAll();

        for (let i = 0; i < list.length; ++i) {
            list[i].off();
        }

        this.bindingMap_.clear();
    }
}

// EventManager.Binding_ = Binding;
