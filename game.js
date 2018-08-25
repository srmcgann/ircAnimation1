(() => {
  Draw = () => {
    x.globalAlpha = .25
    x.fillRect(0, 0, c.width, c.height)
    x.globalAlpha = 1
    let X = 0
    let Y = 0
    let ox = -81
    let oy = 0
    let v = t
    let segs = 20
    let radius = 55
    let g = S(v) < oldG ? S(v + (gg += .06)) : S(v + (gg = 0))
    oldG = S(v)
    let segLength = .1 + Math.pow(.55 + (gg<1 ? g : 0) / 2, 25)
    if( gg > .8 && gg < 1.25) circles.push({X:cx+ox, Y:cy+oy, radius})
    for (let j = 0; j < segs; ++j) {
      let r = radius + segLength * j 
      for (let i = 0; i < 3; ++i) {
        x.beginPath()
        x.strokeStyle = `hsla(${360 / segs * j  - t * 1e3}, 50%, 80%, ${j / segs * segLength / 2})`
        x.lineWidth = (segs - j) / segs * 99
        let p = Math.PI * 2 / 3 * i - v + C(v) - j / 20 * C(v)
        X = cx + S(p) * r + ox
        Y = cy + C(p) * r + oy
        x.moveTo(X, Y)
        X = cx + S(p) * (r + segLength) + ox
        Y = cy + C(p) * (r + segLength) + oy
        x.lineTo(X, Y)
        x.stroke()
      }
    }
    for(let i = 0; i < circles.length; ++i) {
      x.lineWidth = circles[i].radius / 3
      x.beginPath()
      x.strokeStyle = `hsla(${360 / circles.length * i  + t * 800}, 99%, 50%, ${.8 / (circles[i].radius / 8)})`
      x.arc(circles[i].X, circles[i].Y, circles[i].radius, 0, 7)
      x.stroke()
      circles[i].radius += circles[i].radius / 15
      if(circles[i].radius > 2e3) circles.splice(i, 1)
    }
    x.drawImage(logo, cx - logo.width / 2, cy - logo.height / 2)
    
    t+=1/60
    requestAnimationFrame(Draw);
  }
  let c=document.getElementById("canvas")
  let x=c.getContext("2d")
  c.width = c.clientWidth
  c.height = c.clientHeight
  let S = Math.sin
  let C = Math.cos
  let t = 0
  let oldG = gg = 0
  let cx = c.width / 2
  let cy = c.height / 2
  let circles = []
  window.addEventListener('resize', e => {
    c.width = c.clientWidth
    c.height = c.clientHeight
    cx = c.width / 2
    cy = c.height / 2
  })
  let logo = new Image()
  logo.onload = e => { Draw() }
  logo.src = 'irc.png'
})()