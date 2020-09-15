import { DomListener } from '@core/DOMListener'

export class ExelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // Настраиваем наш компонент до init
  prepare() {}

  // Инициализируем компонент
  init() {
    this.initDomListener()
  }

  // Удаляем компонент
  destroy() {
    this.removeDomListener()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
