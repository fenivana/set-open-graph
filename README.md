# set-open-graph
Setting Open Graph meta tags of the document.

## Usage

```js
import OpenGraph from 'set-open-graph'

// create an instance, set default properties
const openGraph = new OpenGraph({
  og: {
    site_name: 'Company Name',
    image: 'https://www.example.com/logo.png'
  }
})

openGraph.set({
  og: {
    title: 'Arrival of a Train at La Ciotat',
    description: 'L\'arrivée d\'un train en gare de La Ciotat is an 1895 French short black-and-white silent documentary film directed and produced by Auguste and Louis Lumière. Its first public showing took place in January 1896.',
    type: 'video.movie',
    locale: {
      current: 'en_US',
      alternate: [
        'zh_CN',
        'ja_JP'
      ]
    },
    url: 'http://examples.opengraphprotocol.us/video-movie.html',
    image: [
      {
        url: 'http://examples.opengraphprotocol.us/media/images/train.jpg',
        secure_url: 'https://d72cgtgi6hvvl.cloudfront.net/media/images/train.jpg',
        width: '500',
        height: '328',
        type: 'image/jpeg'
      },
      {
        url: 'http://examples.opengraphprotocol.us/media/images/75.png',
        secure_url: 'https://d72cgtgi6hvvl.cloudfront.net/media/images/75.png',
        width: '75',
        height: '75',
        type: 'image/png'
      },
      {
        url: 'http://examples.opengraphprotocol.us/media/images/50.png',
        secure_url: 'https://d72cgtgi6hvvl.cloudfront.net/media/images/50.png',
        width: '50',
        height: '50',
        type: 'image/png'
      }
    ]
  },

  video: {
    director: [
      'http://examples.opengraphprotocol.us/profile.html',
      'http://examples.opengraphprotocol.us/profile2.html'
    ],
    actor: [
      {
        url: 'http://examples.opengraphprotocol.us/profile.html',
        role: 'Role in Move'
      }
    ],
    writer: [
      'http://examples.opengraphprotocol.us/profile.html'
    ],
    series: 'http://www.imdb.com/title/tt1520211/',
    release_date: '1895-12-28',
    duration: '50',
    tag: [
      'La Ciotat',
      'train'
    ]
  }
})
```

The object key chain is concated to form the value of `property` of `<meta>`. Except these are renamed:

```
og:locale:current -> og:locale
og:image:url -> og:image
og:video:url -> og:video
og:audio:url -> og:audio
music:album:url -> music:album
music:song:url -> music:song
video:actor:url -> video:actor
```

## APIs

### new OpenGraph(defaults, customNS)

Creating an instance.

Params:

`defaults`: Object. Default properties. For example you can set `og:site_name` here so you don't need to set it every time when calling `openGraph.set()`.  
`customNS`: Object. Default custom namespace. e.g.:
```js
{
  my_namespace: 'http://example.com/ns#',
  another_namespace: 'http://example.com/ns/another#'
}
```

You can reset `defaults` and `customNS` by setting `this.defaults` and `this.customNS`.

### openGraph.set(properties, customNS)

Setting the open graph of the page. The meta elements will be inserted into document head.

### openGraph.clear()

Removing the meta elements from document head.

## License
[MIT](LICENSE)
