import { DomListener } from '@core/DOMListener'

export class ExelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
  }
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  init() {
    this.initDomListener()
  }

  destroy() {
    this.removeDomListener()
  }
}
