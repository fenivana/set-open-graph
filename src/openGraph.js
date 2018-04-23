const trimLastPart = [
  'og:image:url',
  'og:video:url',
  'og:audio:url',
  'og:locale:current',
  'music:album:url',
  'music:song:url',
  'video:actor:url'
]

function parse(obj, prefix = '') {
  let result = []

  for (const k in obj) {
    const v = obj[k]
    if (!v) continue

    let property = prefix ? prefix + ':' + k : k
    if (trimLastPart.includes(property)) property = prefix

    if (v.constructor === Object) {
      result = result.concat(parse(v, property))
    } else if (v.constructor === Array) {
      for (const item of v) {
        if (item.constructor === Object) {
          result = result.concat(parse(item, property))
        } else {
          result.push({ property, item })
        }
      }
    } else {
      result.push({ property, v })
    }
  }

  return result
}

function insertElem(attrs) {
  const meta = document.createElement('meta')

  for (const name in attrs) {
    meta.setAttribute(name, attrs[name])
  }

  document.head.appendChild(meta)
}

export function set(openGraph, namespace) {
  clear()

  let ns = ['og: http://ogp.me/ns#']
  if (openGraph.fb) ns.push('fb: http://ogp.me/ns/fb#')

  let type = openGraph.og && openGraph.og.type
  if (type && !type.includes(':')) {
    type = type.split('.')[0]
    ns.push(`${type}: http://ogp.me/ns/${type}#`)
  }

  if (namespace) ns = ns.concat(namespace)

  document.head.setAttribute('prefix', ns.join(' '))

  const meta = parse(openGraph)
  for (const m of meta) insertElem(m)
}

export function clear() {
  document.head.removeAttribute('prefix')
  const els = document.head.querySelectorAll('meta[property]')
  for (const el of els) document.head.removeChild(el)
}

export default { set, clear }
