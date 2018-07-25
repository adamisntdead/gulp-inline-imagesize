const sizes = require('../sizes')

const fileLocation = __dirname + '/tests'

test('Gets the size of a single image', () => {
  const sizes1 = sizes(fileLocation, '<img src="/images/200x300.jpg" />')
  const sizes2 = sizes(fileLocation, '<img src="/images/1000x1000.jpg" />')
  const sizes3 = sizes(fileLocation, '<img src="/images/5000x300.jpg" />')

  expect(sizes1).toBe('<!-- 200 x 300 -->\n<img src="/images/200x300.jpg" />')
  expect(sizes2).toBe('<!-- 1000 x 1000 -->\n<img src="/images/1000x1000.jpg" />')
  expect(sizes3).toBe('<!-- 5000 x 300 -->\n<img src="/images/5000x300.jpg" />')
})

test('Gets the size of multiple images', () => {
  const input = '<img src="/images/1000x1000.jpg">\n<img src="/images/200x300.jpg" />'
  const expectedOutput = [
    '<!-- 1000 x 1000 -->',
    '<img src="/images/1000x1000.jpg">',
    '<!-- 200 x 300 -->',
    '<img src="/images/200x300.jpg" />'
  ].join('\n')

  const contents = expect(sizes(fileLocation, input)).toBe(expectedOutput)
})

test("Throws an error when image doesn't exist", () => {
  const input = '<img src="/images/none.jpg" />'
  expect(() => {
    sizes(fileLocation, input)
  }).toThrow('ENOENT')
})

test('Handles image tags with other attributes', () => {
  const input1 = '<img src="/images/200x300.jpg" alt="An Amaaazing image" />'
  const input2 = '<img class="img-responsive" src="/images/200x300.jpg" alt="An Amaaazing image" />'
  const sizeString = '<!-- 200 x 300 -->'

  expect(sizes(fileLocation, input1)).toBe(sizeString + '\n' + input1)
  expect(sizes(fileLocation, input2)).toBe(sizeString + '\n' + input2)
})

test('Ignores image tags with no src attribute', () => {
  const input = '<img srcset="/images/200x300.jpg" />'

  expect(sizes(fileLocation, input)).toBe(input)
})

test('Ignores images with external srcs', () => {
  const input1 = '<img src="https://picsum.photos/200/300" />'
  const input2 = '<img src="http://picsum.photos/200/300" />'
  const input3 = '<img src="//picsum.photos/200/300" />'

  expect(sizes(fileLocation, input1)).toBe(input1)
  expect(sizes(fileLocation, input2)).toBe(input2)
  expect(sizes(fileLocation, input3)).toBe(input3)
})
