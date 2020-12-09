export interface Listener<T> {
    (value: T): void;
}
