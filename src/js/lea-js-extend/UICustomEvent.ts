// This TypeScript is for development only.
// This will make the VSCode aware of types.
// This has nothing to do with the runtime on client, and will not be used by Closure Compiler.

interface ILeaEventCallback<T> {
  (sender: any): any;
  (eventArgs: T): T;
}

interface ILeaEventHandler<T> {
  /**
   * Registers an event listener. In case the callback was already registered before, do nothing, meaning no callback duplication possible.
   * @param {ILeaEventCallback<T>} callback The callback which will be invoked when the event is dispatched.
   */
  register(callback: ILeaEventCallback<T>): void;

  /**
   * Unregisters an event listener. In case the callback hasn't been registered before, do nothing, meaning no-op.
   * @param {ILeaEventCallback<T>} callback The callback which will be unregistered.
   * @returns {boolean} Returns true if the callback is found and is unregistered. Otherwise, false.
   */
  unregister(callback: ILeaEventCallback<T>): boolean;

  /**
   * Unregisters an event listener. In case the callback hasn't been registered before, do nothing, meaning no-op.
   */
  unregisterAll(): void;

  /**
   * Dispatch the event with the 'eventArgs' object to all the registered event handlers. If there's no event handlers registered, do nothing, meaning no-op.
   * @param {T} eventArgs The event arguments to be passed to the registered handlers.
   * @returns {boolean} Returns true if there are any event handlers which are dispatched. Otherwise, false.
   */
  invoke(eventArgs: T): boolean;
}

interface LeaEventHandlerConstructor {
  new <T = any>(values?: readonly T[] | null): ILeaEventHandler<T>;
  readonly prototype: ILeaEventHandler<any>;
}
declare var ILeaEventHandler: LeaEventHandlerConstructor;
