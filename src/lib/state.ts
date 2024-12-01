export interface BaseState {
  key: string;
}
export default class SaveableState<T extends BaseState> {
  constructor(private state: T) {}

  /**
   * @returns the current state
   */
  get() {
    return this.state;
  }

  /**
   * @param newParams  new parameters to update in the state
   * @returns a new StateContainer with the updated state
   */
  copy(newParams: Partial<Omit<T, 'key'>>) {
    this.state = { ...this.state, ...newParams };
    return this.state;
  }

  /**
   * @param key the key to save the state as in local storage
   * @param initialState the initial state to use if no state is found in local storage
   * @returns a new StateContainer with the saved state
   */
  static fromLocalStorage<T extends BaseState>(initialState: T) {
    const key = initialState.key;
    const savedState = localStorage.getItem(key);
    if (savedState) {
      return new SaveableState<T>({
        ...initialState,
        ...JSON.parse(savedState),
      });
    }
    return new SaveableState<T>(initialState);
  }

  /**
   * Saves the state in local storage
   */
  save() {
    localStorage.setItem(this.state.key, JSON.stringify(this.state));
  }

  /**
   * Updates the state and persists the changes
   * @param newParams the new parameters to update in the state
   * @returns the updated state
   */
  update(newParams: Partial<Omit<T, 'key'>>) {
    this.copy(newParams);
    this.save();
    return this.state;
  }
}
