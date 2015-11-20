


$.fn.sliderize = function (opts) {
  opts = opts || {}
  var min = opts.min || Infinity
  var max = opts.max || -Infinity
  var div = opts.div || 1000
  console.log('sliderizing', this)
  var $el = $(this)

  var _val = 50;

  var val = function (d) {
    if (opts.rate) d = opts.rate(d, _val)
    _val += d / div
    var dsp
    if (opts.display) dsp = opts.display(_val)
    else dsp = _val
    $el.val(dsp)
  }

  val(0)


  $el.on('click', function (e) {
    console.log('click', e)
  })

  $el.on('mousewheel', function (e) {
    e.preventDefault()
    console.log('mousewheel', e, e.deltaX, e.deltaMode)
    var d = e.deltaX
    val(d)
  })
}

sliders = $('[data-slider]')
sliders.sliderize({
  min: 0,
  rate: function (d, v) {
    var y = Math.pow(Math.abs(v), 1/6) * 100
    y = d < 0 ? -y : y
    console.log(v, y, d)
    return d + y
    // console.log(y, d, v)
    // var y = v
    // return d * y
  },
  display: function (v) {
    var a = Math.abs(v)
    if (a > 60*24*365) {
      return Math.floor(v/60/24/365) + 'y'
    }
    if (a > 60*24*30) {
      return Math.floor(v/60/24/30) + 'mo'
    }
    if (a > 60*24*7) {
      return Math.floor(v/60/24/7) + 'w'
    }
    if (a > 60*24) {
      return Math.floor(v/60/24) + 'd'
    }
    if (a > 60) {
      return Math.floor(v/60) + 'h'
    }
    return Math.floor(v) + 'm'
  }
})
