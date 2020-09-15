import {$} from '@core/dom'

export function resizingHandler(event, $root) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = event.target.dataset.resize

  if (type === 'col') $resizer.addClass('line-col')
  else $resizer.addClass('line-row')

  let value
  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({
        right: -delta + 'px'
      })
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({
        bottom: -delta + 'px'
      })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    if (type === 'col') {
      $parent.css({
        width: value + 'px'
      })
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
      $resizer.removeClass('line-col')
      $resizer.css({
        right: 0 + 'px'
      })
    } else {
      $resizer.removeClass('line-row')
      $parent.css({
        height: value + 'px'
      })
      $resizer.css({
        bottom: 0 + 'px'
      })
    }
  }
}
