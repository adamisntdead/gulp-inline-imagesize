const probe = require('probe-image-size')
const fs = require('fs')
const path = require('path')

// module.exports = (path, contents) => {
//   const matches = contents.match( /<img[^\>]+src=['"](?!http:|https:|\/\/|data:image)([^"']+)["'][^\>]*>/gm)
//   matches.forEach(tag => {
//     if (tag.match(/(height|width)=/)) return

//     const src = tag.match(/src=['"]([^"']+)["']/m)[1]
//     const imgpath = path.replace(/[^\/]+$/, '') + src
//     const dims = probe.sync(fs.readFileSync(imgpath))

//     if (!dimensions) return

//     const replacement = tag.replace(/^<img/, "<!--" + dimensions.width + "x" + dimensions.height + "-->\n" + "<img data-width data-height")

//     contents = contents.replace(tag, replacement)
//   })

//   return contents
// }

module.exports = (filepath, contents) => {
  // Match image tags
  const matches = contents.match(
    /<img[^\>]+src=['"](?!http:|https:|\/\/|data:image)([^"']+)["'][^\>]*>/gm
  )
  // Get the sources from the image
  const sources = matches.map(tag => tag.match(/src=['"]([^"']+)["']/m)[1])
  // Get the dimensions of each image
  const dimensions = sources
    .map(src => path.join(path.dirname(filepath), src))
    .map(src => probe.sync(fs.readFileSync(src)))

  // Add a comment before each image with the dimensions
  matches
    .map((tag, i) => [
      tag,
      tag.replace(
        /^<img/,
        `<!-- ${dimensions[i].width} x ${dimensions[i].height} -->\n<img`
      )
    ])
    .forEach(replacement => {
      contents = contents.replace(...replacement)
    })

  return contents
}
