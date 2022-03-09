this.lingo = this.lingo || {};

this.lingo.game = function (glob) {

  "use strict";

  console.log("Implement game here");

  function addKeyFunction(e, a, s) {
    return a && addDictToElement(e.prototype, a), s && t(e, s), e
  }

  function addDictToElement(elementToBuild, functionDict) {
    for (var s = 0; s < functionDict.length; s++) {
      var t = functionDict[s];
      t.enumerable = t.enumerable || !1,
      t.configurable = !0,
      "value" in t && (t.writable = !0),
      Object.defineProperty(elementToBuild, t.key, t)
    }
  }

  function isReflectAvailable() {
    if ("undefined" == typeof Reflect || !Reflect.construct) {
      // Only undefined in Internet explorer
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
      return !1; // false
    }
    if (Reflect.construct.sham) {
      return !1; // false
    }

    if ("function" == typeof Proxy) return !0; // True

    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
    } catch (e) {
      return !1 // False
    }
  }

  function set__proto__(returnFunction, htmlElement) {
    return function (returnFunction, htmlElement) {
      return returnFunction.__proto__ = htmlElement, returnFunction;
    }(returnFunction, htmlElement);
  }

  function setPrototype(returnFunction, htmlElement) {
    if ("function" != typeof htmlElement && null !== htmlElement)
    throw new TypeError("Super expression must either be null or a function");

    returnFunction.prototype = Object.create(htmlElement.prototype, {
      constructor: {
        value: returnFunction,
        writable: !0, // true
        configurable: !0 // true
      }
    });
    set__proto__(returnFunction, htmlElement)
  }

  function ReflectConstructApply(e, a, s) {
    var res = Reflect.construct.apply(null, arguments);
    return res;
    // return (c = isReflectAvailable() ? Reflect.construct : function(e, a, s) {
    //   var t = [null];
    //   t.push.apply(t, a);
    //   var n = new(Function.bind.apply(e, t));
    //   return s && l(n, s.prototype), n
    // }).apply(null, arguments)
  }

  function isInstanceOf(e, a) {
    if (!(e instanceof a))
    throw new TypeError("Cannot call a class as a function")
  }

  function getPrototypeOf(returnFunction) {
    if (Object.setPrototypeOf) {
      return Object.getPrototypeOf (returnFunction);
    } else {
      return function(returnFunction) {
        return returnFunction.__proto__ || Object.getPrototypeOf(returnFunction);
      } (returnFunction);
    }
    // var result = (
    //   i = Object.setPrototypeOf ?
    //         Object.getPrototypeOf :
    //         function(returnFunction) {
    //           return returnFunction.__proto__ || Object.getPrototypeOf(returnFunction)
    //         }
    // ) (returnFunction);
    // return result;
  }

  function constructElement(returnFunction) {
    return function() {
      var htmlElement;
      addDictToElement = getPrototypeOf(returnFunction);

      if (isReflectAvailable()) {
        var n = getPrototypeOf(this).constructor;
        htmlElement = Reflect.construct(
          addDictToElement, /* target */
          arguments, /* argument list */
          n /* new target, constructor whose prototype is going to be used */ )
      } else htmlElement = addDictToElement.apply(this, arguments);

      isInitialized(this, htmlElement)
      return htmlElement;
    }
  }

  function isInitialized(e, a) {
    var result = (!a || "object" != typeof a && "function" != typeof a ? NotInitializedError(e) : a);
    return result;
  }

  function SomethingElement(e) {

    var returnElement = function (htmlElement) {
      function t() {
        return ReflectConstructApply(
          htmlElement, arguments, getPrototypeOf(this).constructor);
        }

        t.prototype = Object.create(htmlElement.prototype, {
          constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        })

        return set__proto__(t, e);
    }(e);
    return returnElement;
  }

  // Building the game

  var keyboardLetterPattern = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["-", "a", "s", "d", "f", "g", "h", "j", "k", "l", "-"],
    ["ENTER", "z", "x", "c", "v", "b", "n", "m", "BACK"]
  ];

  // Buttons
  var button = document.createElement("template");
  button.innerHTML = "<button>key</button>\n";

  var spacer = document.createElement("template");
    spacer.innerHTML = `<div class="spacer"></div>`;

  // Keyboard
  var keyboardHTMLElement = document.createElement("template");

  keyboardHTMLElement.innerHTML = `
    <style>
		  :host {
  			height: var(--keyboard-height);
  		}
  		#keyboard {
  			/* margin: 0 8px; */
  			user-select: none;
  		}
  		.row {
  			display: flex;
  			width: 100%;
  			margin: 0 auto 8px;
  			/* https://stackoverflow.com/questions/46167604/ios-html-disable-double-tap-to-zoom */
  			touch-action: manipulation;
  		}
		  button {
        font-family: inherit;
			  font-weight: bold;
  			border: 0;
  			padding: 0;
  			margin: 0 6px 0 0;
  			height: 58px;
  			border-radius: 4px;
  			cursor: pointer;
  			user-select: none;
  			background-color: var(--key-bg);
  			color: var(--key-text-color);
  			flex: 1;
  			display: flex;
  			justify-content: center;
  			align-items: center;
  			text-transform: uppercase;
  			-webkit-tap-highlight-color: rgba(0,0,0,0.3);
      }
      .half {    flex: 0.5;  }
      .one-and-a-half {    flex: 1.5;  }
    </style>
  `;

  var keyboard = function(htmlElement) {

    setPrototype(returnFunction, htmlElement);
    var element = constructElement(returnFunction);

    function returnFunction() {
      var e;
      isInstanceOf(this, returnFunction);
      (e = element.call(this)).attachShadow({ mode: "open" });
      return e;
    }

    addKeyFunction(returnFunction , [{
      key: "connectedCallback",
      value: function () {
        var lThis = this;
        this.shadowRoot.appendChild(keyboardHTMLElement.content.cloneNode(!0));

        keyboardLetterPattern.forEach(function(line) {
          var row = document.createElement("div");
          row.classList.add("row");
          line.forEach(function(e) {
            if (e === "-") {
              var sp = spacer.content.cloneNode(!0);
              sp.firstElementChild.classList.add("half");
              row.appendChild(sp);
            } else {
            var letter;
              letter = button.content.cloneNode(!0);
              letter.firstElementChild.textContent = e;
              if (e.length > 1) {
                letter.firstElementChild.classList.add("one-and-a-half");
              }
              row.appendChild(letter);
            }
          });
          lThis.shadowRoot.appendChild(row);
        });

      }
    }]);

    return returnFunction;
  }(SomethingElement(HTMLElement));

  customElements.define("game-keyboard", keyboard);

  // Game root

  var gameRootElement = document.createElement("template");
  gameRootElement.innerHTML = `
    <style>
      header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        padding: 0 16px;
        height: var(--header-height);
        color: var(--color-tone-1);
        border-bottom: 1px solid var(--color-tone-4);
      }
      header .title {
        font-weight: 700;
        font-size: 37px;
        line-height: 100%;
        letter-spacing: 0.01em;
        text-align: center;
        left: 0;
        right: 0;
        pointer-events: none;
      }
      game-keyboard {
  			width: 100%;
  			max-width: var(--game-max-width);
  			margin: 0 auto;
  			height: calc(100% - var(--header-height));
  			display: flex;
  			flex-direction: column;
  		}
    </style>
    <header>
      <div class="menu-left">
				<button id="help-button" class="icon" aria-label="Help" tabindex="-1">
					?
				</button>
			</div>
      <div class="title">Lingo</div>
      <div class="menu-right">
				<button id="statistics-button" class="icon" aria-label="Statistics" tabindex="-1">
					S
				</button>
			</div>
    </header>
    <p>Text from innerHTML</p>
    <game-keyboard></game-keyboard>
  `;

  var gameRoot = function (htmlElement) {

    setPrototype(returnFunction, htmlElement);
    var element = constructElement(returnFunction);

    function returnFunction() {
      var e;
      isInstanceOf(this, returnFunction);
      (e = element.call(this)).attachShadow({ mode: "open" });
      return e;
    }

    addKeyFunction(returnFunction , [
      {
        key: "showHelpModal",
        value: function () {
          console.log("help");
        }
      }, {
        key: "connectedCallback",
        value: function () {
          var gameRootThis = this;
          this.shadowRoot.appendChild(gameRootElement.content.cloneNode(!0));
          this.shadowRoot.getElementById("help-button").
             addEventListener("click", (function(e) {
               gameRootThis.showHelpModal();
             }));
        }
      }
    ]);

    return returnFunction;
  }(SomethingElement(HTMLElement));

  customElements.define("game-root", gameRoot);

  // Return all relevant objects
  glob.Game = gameRoot;
  return glob;

}({});
