export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // Уведомляем слушателей если они есть
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // on, listen
  // Подписываемся на уведомление, либо добавляем нового слушателя
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// const emitter = new Emitter()
//
// const onSub = emitter.subscribe('denis', (...data) => console.log('Sub denis', data))
// emitter.subscribe('Natasha', (data) => console.log('Sub Natasha', data))
//
// console.log(emitter.emit('denis', 21, 22, 21, 3))
//
// onSub()
// console.log(emitter.emit('denis', 9999))
// console.log(emitter.emit('Natasha', 18))
