import {ExelComponent} from '@core/ExelComponent';
import {$} from '@core/dom'

export class Formula extends ExelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
`
  }

  init() {
    super.init()
    const $formula = this.$root.find('#formula')
    this.$on('table:input', (text) => {
      $formula.text(text)
    })
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.$emit('formula:focus', event)
    }
  }
}
