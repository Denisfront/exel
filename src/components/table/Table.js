import {ExelComponent} from '@core/ExelComponent';
import {createTable} from '@/components/table/table.template'
import {resizingHandler} from '@/components/table/resizing'
import {shouldResize} from '@/components/table/tabel.helperFunctions'

export class Table extends ExelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(100)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizingHandler(event, this.$root)
    }
  }
}
