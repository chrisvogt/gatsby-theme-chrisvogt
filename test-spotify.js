const html =
  '<iframe style="border-radius: 12px" width="100%" height="152" title="Spotify Embed: Prelude for Piano No. 11 in F-Sharp Minor" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" src="https://open.spotify.com/embed/track/4iV5W9uYEdYUVa79Axb7Rh?utm_source=oembed"></iframe>'

console.log('Original:', html)

let modified = html.replace(/(src="[^"]*)/, '$1&autoplay=1')
console.log('After src mod:', modified)

if (!modified.includes('allow="autoplay')) {
  modified = modified.replace(/allow="([^"]*)"/, 'allow="$1; autoplay"')
}
console.log('Final:', modified)
