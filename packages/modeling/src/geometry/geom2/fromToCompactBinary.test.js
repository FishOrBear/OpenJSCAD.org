const test = require('ava')

const { fromCompactBinary, toCompactBinary, fromPoints } = require('./index')

test('toCompactBinary: converts geom2 into a compact form', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const geom2 = fromPoints(points)
  const compacted = toCompactBinary(geom2)
  const expected = new Float32Array(
    [
      0, // type flag
      1, 0, 0, 0, // transforms matrix
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
      // geometry
      0, 0,
      1, 0,
      0, 1
    ]
  )

  t.deepEqual(Array.from(compacted), Array.from(expected))
  // check if fromCompactBinary can get back the same data as the original geometry
  t.deepEqual(fromCompactBinary(compacted), geom2)
})

test('fromCompactBinary: convert a compact form into a geom2', (t) => {
  const compacted = [
    0, // type flag
    1, 0, 0, 0, // matrix
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    // geometry
    0, 0,
    1, 0,
    0, 1
  ]
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = fromPoints(points)
  const geom2 = fromCompactBinary(compacted)

  t.deepEqual(geom2, expected)
})
