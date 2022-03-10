this.lingo = this.lingo || {};

this.lingo.game = function (glob) {

  "use strict";

  console.log("Implement game here");

  function addKeyFunction(e, a, s) {
    return a && addDictToElement(e.prototype, a), s && addDictToElement(e, s), e
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

  function addKeyValueToDict(e /* dict */, a /* string */, s /* integer */) {
        return a in e ? Object.defineProperty(e, a, {
            value: s,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[a] = s, e
    }

  function NotInitializedError(e) {
    if (void 0 === e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called");
    return e;
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
  var alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Buttons
  var button = document.createElement("template");
  button.innerHTML = "<button>key</button>\n";

  var spacer = document.createElement("template");
    spacer.innerHTML = `<div class="spacer"></div>`;

  // Game board

  // Game Tile

  var gameTileElement = document.createElement("template");
  gameTileElement.innerHTML = `
    <style>
    .tile {
      width: 100%; display: inline-flex; justify-content: center;
      align-items: center; font-size: 2rem; line-height: 2rem;
      font-weight: bold; vertical-align: middle; box-sizing: border-box;
      color: var(--tile-text-color); text-transform: uppercase;
      user-select: none;
    }
    :host { display: inline-block; }
    .tile { border: 2px solid var(--color-tone-4); }
    .tile::before { /* Magic ? */
      content: '';
      display: inline-block;
      padding-bottom: 100%;
    }
    </style>
    <div class="tile" data-state="empty" data-animation="idle"></div>
  `;

  var gameTile = function(htmlElement) {
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
      value: function() {
        var e = this;
        this.shadowRoot.appendChild(gameTileElement.content.cloneNode(!0))
      }
    }]);

    return returnFunction;
  }(SomethingElement(HTMLElement));

  customElements.define("game-tile", gameTile);

  // Game Row

  var gameRowElement = document.createElement("template");
  gameRowElement.innerHTML = `
    <style>
    :host { display: block; }
    .row {
      display: grid; grid-template-columns: repeat(5, 1fr); grid-gap: 5px;
    }
    </style>
    <div class="row"></div>
  `;

  var gameRow = function(htmlElement) {
    setPrototype(returnFunction, htmlElement);
    var element = constructElement(returnFunction);

    function returnFunction() {
      var e;
      isInstanceOf(this, returnFunction);
      (e = element.call(this)).attachShadow({ mode: "open" });
      e._letters = "";
      return e;
    }

    addKeyFunction(returnFunction , [{
      key: "connectedCallback",
      value: function() {
        var e = this;
        e.shadowRoot.appendChild(gameRowElement.content.cloneNode(!0))
        this.$row = this.shadowRoot.querySelector(".row")
        for (var count = 0; count < 5 /* this._length */; count++) {
          var tile = document.createElement("game-tile");
          this.$row.appendChild(tile);
        }
        this.$tiles = this.shadowRoot.querySelectorAll("game-tile");
      }
    }, {
      key: "attributeChangedCallback",
      value: function(e, a, s) {
        console.log("attribute changed");
        switch (e) {
          case "letters":
            this._letters = s || "";
            break;
          case "length":
            this._length = parseInt(s, 10);
            break;
        }
        this._update();
      }
    }, {
      key: "_update",
      value: function() {
        var e = this;
        if (this.$row) {
          this.$tiles.forEach((function(tile, index) {
            var letter = e._letters[index];
            letter ?
              tile.setAttribute("letter", letter) :
              tile.removeAttribute("letter");
          }))
        }
      }
    }], [{
      key: "observedAttributes",
      get: function() {
        return ["letters", "length"];
      }
    }]

  );

    return returnFunction;
  }(SomethingElement(HTMLElement));

  customElements.define("game-row", gameRow);

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
    <div id="keyboard"></div>
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
      key: "dispatchKeyPressEvent",
      value: function(e) {
        this.dispatchEvent(new CustomEvent("game-key-press", {
          bubbles: !0,
          composed: !0,
          detail: {
            key: e
          }
        }));
      }
    },{
      key: "connectedCallback",
      value: function () {
        var lThis = this;
        this.shadowRoot.appendChild(keyboardHTMLElement.content.cloneNode(!0));

        this.$keyboard = this.shadowRoot.getElementById("keyboard");
        this.$keyboard.addEventListener("click", function(a) {
          var target  = a.target.closest("button");
          if (target) {
            if (lThis.$keyboard.contains(target)) {
               lThis.dispatchKeyPressEvent(target.dataset.key);
             }
           }
         });

         window.addEventListener("keydown", (function(a) {
           if (!0 !== a.repeat) {
             var s = a.key;
             if (alphabet.includes(s.toLowerCase()) || "Backspace" === s || "Enter" === s) {
               lThis.dispatchKeyPressEvent(s);
             }
           }
         }));

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
              letter.firstElementChild.dataset.key = e;
              if (e.length > 1) {
                letter.firstElementChild.classList.add("one-and-a-half");
              }
              row.appendChild(letter);
            }
          });
          lThis.$keyboard.appendChild(row);
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
      #game {
  			width: 100%;
  			max-width: var(--game-max-width);
  			margin: 0 auto;
  			height: calc(100% - var(--header-height) - var(--keyboard-height));
  			display: flex;
  			flex-direction: column;
      }
      #board-container {
  			display: flex;
  			justify-content: center;
  			align-items: center;
  			flex-grow: 1;
  			overflow: hidden;
  		}
  		#board {
  			display: grid;
  			grid-template-rows: repeat(6, 1fr);
  			grid-gap: 5px;
  			padding:10px;
  			box-sizing: border-box;
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
    <div id="game">
      <div id="board-container">
        <div id="board">
        </div>
      </div>
    </div>
    <game-keyboard></game-keyboard>
  `;

  var gameRoot = function (htmlElement) {

    setPrototype(returnFunction, htmlElement);
    var element = constructElement(returnFunction);

    function returnFunction() {
      var e;
      isInstanceOf(this, returnFunction);
      (e = element.call(this)).attachShadow({ mode: "open" });

      addKeyValueToDict(NotInitializedError(e), "tileIndex", 0);
      addKeyValueToDict(NotInitializedError(e), "rowIndex", 0);
      addKeyValueToDict(NotInitializedError(e), "boardState", void 0);

      // Most state is stored in the game-root element
      e.boardState = new Array(6).fill("");

      return e;
    }

    addKeyFunction(returnFunction , [
      {
        key: "showHelpModal",
        value: function () {
          console.log("help");
        }
      }, {
        key: "addLetter",
        value: function(letter) {
          console.log("Adding letter: " + letter);
          this.boardState[this.rowIndex] += letter;
          var row = this.$board.querySelectorAll("game-row");
          row[this.rowIndex].setAttribute("letters",
            this.boardState[this.rowIndex]);
          this.tileIndex += 1;
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

          this.addEventListener("game-key-press", (function(e) {
            var letter = e.detail.key;
            this.addLetter(letter);
          }));

          this.$board = this.shadowRoot.querySelector("#board");

          for (var c = 0; c < 6; c++) {
            var u = document.createElement("game-row");
            // u.setAttribute("letters", this.boardState[c]);
            u.setAttribute("length", 5);
            // this.evaluations[c] && (u.evaluation = this.evaluations[c]),

            this.$board.appendChild(u)
          }
          this.sizeBoard();
        }
      }, {
        key: "sizeBoard",
        value: function() {
          console.log("Resizing....");
          var e = this.shadowRoot.querySelector("#board-container");
          var a = Math.min(Math.floor(e.clientHeight * (5 / 6)), 350);
          var s = 6 * Math.floor(a / 5);
          this.$board.style.width = "".concat(a, "px");
          this.$board.style.height = "".concat(s, "px");
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
