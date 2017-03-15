;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-shouji" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M702.699388 60.945047 321.284238 60.945047c-57.463044 0-104.022314 46.591131-104.022314 104.018052l0 693.454702c0 57.426921 46.560293 104.019075 104.022314 104.019075l381.416174 0c57.463044 0 104.022314-46.592155 104.022314-104.019075L806.722726 164.963099C806.722726 107.537202 760.163456 60.945047 702.699388 60.945047zM477.317197 95.617731l69.349233 0c9.582632 0 17.336541 7.754614 17.336541 17.33583 0 9.582239-7.753909 17.336854-17.336541 17.336854l-69.349233 0c-9.581609 0-17.336541-7.754614-17.336541-17.336854C459.980656 103.372346 467.735588 95.617731 477.317197 95.617731zM511.992325 920.077116c-24.482581 0-44.324277-19.840884-44.324277-44.322461 0-24.480554 19.84272-44.322461 44.324277-44.322461 24.481557 0 44.324277 19.84293 44.324277 44.322461C556.317626 900.237255 536.473882 920.077116 511.992325 920.077116zM737.373493 771.736603c0 9.582239-7.753909 17.33583-17.336541 17.33583L303.946674 789.072433c-9.582632 0-17.337564-7.753591-17.337564-17.33583L286.60911 182.299953c0-9.582239 7.754932-17.33583 17.337564-17.33583l416.090278 0c9.582632 0 17.336541 7.754614 17.336541 17.33583L737.373493 771.736603z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-lock" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512.697383 960.606181c-166.605505 0-301.652248-131.37512-301.652248-293.471938 0-105.309464 57.235562-197.423395 142.885268-249.203712L353.930403 234.647181c0-93.826945 78.187757-169.890318 174.641529-169.890318 96.452749 0 174.657902 76.063373 174.657902 169.890318l0 205.048049c67.775616 53.81465 111.129007 135.698588 111.129007 227.437989C814.357817 829.231061 679.302889 960.606181 512.697383 960.606181zM639.699915 234.647181c0-59.725266-49.742914-108.111277-111.129007-108.111277-61.386092 0-111.131053 48.38601-111.131053 108.111277l0 154.196895c29.960359-9.714246 61.920258-15.177678 95.256504-15.177678 45.440935 0 88.364537 10.069333 127.002532 27.567869L639.698892 234.647181zM512.697383 420.001703c-140.28607 0-254.024507 110.647029-254.024507 247.131517 0 136.502907 113.737414 247.156076 254.024507 247.156076 140.288117 0 254.023484-110.654192 254.023484-247.156076C766.720867 530.649755 652.984477 420.001703 512.697383 420.001703zM512.697383 898.829186c-131.519406 0-238.149958-103.729479-238.149958-231.694943 0-127.949091 106.629529-231.671407 238.149958-231.671407 131.537825 0 238.152005 103.721293 238.152005 231.671407C750.848365 795.098683 644.234185 898.829186 512.697383 898.829186zM560.33331 605.355201c0-25.586748-21.334911-46.352701-47.63695-46.352701-26.301016 0-47.619554 20.765953-47.619554 46.352701 0 21.943778 15.998369 39.45971 37.049824 44.262086l-37.049824 141.108808 97.238648 0-41.744753-140.573619C542.97906 646.36829 560.33331 628.225071 560.33331 605.355201z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)