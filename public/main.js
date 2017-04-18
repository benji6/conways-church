const length = 16

const state = Array.from({length}, () => Array.from({length}, () => 0))

state[0][1] = 1
state[0][2] = 1
state[0][3] = 1
state[1][3] = 1
state[2][3] = 1
state[3][3] = 1
state[3][2] = 1
state[3][1] = 1
state[4][1] = 1
state[6][2] = 1

const loop = xss => {
  for (let i = 0; i < xss.length; i++) {
    const xs = xss[i]
    for (let j = 0; j < xs.length; j++) {
      let totalLiveNeighbours

      if (i === 0) {
        totalLiveNeighbours = xss[i][j - 1] + xss[i][j + 1] +
        xss[i + 1][j - 1] + xss[i + 1][j] + xss[i + 1][j + 1]
      } else if (i === length - 1) {
        totalLiveNeighbours = xss[i - 1][j - 1] + xss[i - 1][j] + xss[i - 1][j + 1] +
          xss[i][j - 1] + xss[i][j + 1]
      } else {
        totalLiveNeighbours = xss[i - 1][j - 1] + xss[i - 1][j] + xss[i - 1][j + 1] +
          xss[i][j - 1] + xss[i][j + 1] +
          xss[i + 1][j - 1] + xss[i + 1][j] + xss[i + 1][j + 1]
      }
      const x = xss[i][j]

      if (x === 1) {
        if (totalLiveNeighbours < 2 || totalLiveNeighbours > 3) xss[i][j] = 0
      } else if (totalLiveNeighbours === 3) xss[i][j] = 1
    }
  }
}

const render = xss => document.body.innerHTML = xss.reduce((acc, xs) => `${acc}<div class="row">${xs.reduce((acc, x) => `${acc}<div class="cell${x ? ' cell--active' : ''}"></div>`, '')}</div>`, '')

render(state)

setInterval(() => {
  loop(state)
  render(state)
}, 500)
