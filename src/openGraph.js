const trimLastPart = [
  'og:image:url',
  'og:video:url',
  'og:audio:url',
  'og:locale:current',
  'music:album:url',
  'music:song:url',
  'video:actor:url'
]

class OpenGraph {
  constructor(properties, customNS) {
    this.properties = properties
    this.customNS = customNS
  }

  set(properties, customNS) {
    this.clear()

    let ns = ['og: http://ogp.me/ns#']
    if (properties.fb) ns.push('fb: http://ogp.me/ns/fb#')

    let type = properties.og && properties.og.type
    if (type && !type.includes(':')) {
      type = type.split('.')[0]
      ns.push(`${type}: http://ogp.me/ns/${type}#`)
    }

    if (customNS) ns = ns.concat(customNS)
    else if (this.customNS) ns = ns.concat(this.customNS)

    document.head.setAttribute('prefix', ns.join(' '))

    let meta = this.parse(properties)

    if (this.properties) {
      const exists = meta.map(m => m.property)
      const defaultMeta = this.parse(this.properties).filter(m => !exists.includes(m.property))
      if (defaultMeta.length) meta = meta.concat(defaultMeta)
    }

    for (const m of meta) this.insertElem(m)
  }

  clear() {
    document.head.removeAttribute('prefix')
    const els = document.head.querySelectorAll('meta[property]')
    for (const el of els) document.head.removeChild(el)
  }

  parse(obj, prefix = '') {
    let result = []

    for (const k in obj) {
      const v = obj[k]
      if (!v) continue

      let property = prefix ? prefix + ':' + k : k
      if (trimLastPart.includes(property)) property = prefix

      if (v.constructor === Object) {
        result = result.concat(this.parse(v, property))
      } else if (v.constructor === Array) {
        for (const item of v) {
          if (item.constructor === Object) {
            result = result.concat(this.parse(item, property))
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

  insertElem(attrs) {
    const meta = document.createElement('meta')

    for (const name in attrs) {
      meta.setAttribute(name, attrs[name])
    }

    document.head.appendChild(meta)
  }
}

export default OpenGraph
