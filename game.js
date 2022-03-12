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

  var AllWords = ["cigar", "rebut", "sissy", "humph", "awake", "blush",
    "focal", "evade", "naval", "serve", "heath", "dwarf", "erode", "world"];
  var Solutions = ["cigar", "rebut", "sissy", "humph", "awake", "blush",
    "focal", "evade", "naval", "serve", "heath", "dwarf", "erode", "world"];


  var keyboardLetterPattern = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["-", "a", "s", "d", "f", "g", "h", "j", "k", "l", "-"],
    ["ENTER", "z", "x", "c", "v", "b", "n", "m", "BACK"]
  ];
  var PRESENT = "present";
  var CORRECT = "correct";
  var ABSENT = "absent";
  var alphabet = "abcdefghijklmnopqrstuvwxyz";

  var stateOrder = {
        unknown: 0,
        absent: 1,
        present: 2,
        correct: 3
    };

    // Visualize paths:
    // https://svg-path-visualizer.netlify.app
    // Find paths
    // https://www.svgrepo.com/

    var iconSizes = {
      help: "0 0 22 22",
      settings: "0 0 45 45",
      graph: "0 0 300 300",
    };

    var iconPaths = {
      graph: `M287.183,243.393l-27.577-27.577c-5.857-5.857-15.355-5.857-21.213,0
        c-5.858,5.857-5.858,15.355,0,21.213l1.971,1.971 H62.577V51.212l1.971,
        1.971c5.858,5.859,15.355,5.858,21.213,0c5.858-5.857,5.858-15.355,0
        -21.213L58.183,4.393 c-5.857-5.857-15.355-5.857-21.213,0L9.393,31.97
        c-5.858,5.857-5.858,15.355,0,21.213c5.857,5.858,15.355,5.858,21.213,0
        l1.971-1.971V254c0,8.284,6.716,15,15,15h192.787l-1.971,1.971c-5.858,
        5.857-5.858,15.355,0,21.213 c5.858,5.859,15.355,5.858,21.213,0l27.577
        -27.577C293.042,258.749,293.042,249.25,287.183,243.393z M103.089,
        183.288c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h98c8.284,0,15
        -6.716,15-15c0-8.284-6.716-15-15-15 H103.089z M103.089,88.288h76c8.284,
        0,15-6.716,15-15c0-8.284-6.716-15-15-15h-76c-8.284,0-15,6.716-15,15
        C88.089,81.572,94.804,88.288,103.089,88.288z M88.089,135.788c0,8.284,
        6.716,15,15,15h165c8.284,0,15-6.716,15-15c0-8.284-6.716-15-15-15h-165
        C94.804,120.788,88.089,127.503,88.089,135.788z`,
      settings: `
        M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756
        c0.473-0.473,0.733-1.104,0.733-1.774 c0-0.669-0.262-1.301-0.733-1.773
        l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815
        C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52
        h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607  c-1.766,0.431-3.38,1.104
        -4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,
        8.205 C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,
        1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501 C1.117,
        18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438
        c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763 c-0.474,0.473-0.734,
        1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,
        0.733,1.772,0.733 s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,
        3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128
        c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869
        -1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735 c0.67,0,1.301
        -0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772
        c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77 c0.92-1.514,1.627-3.179,
        2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,
        44.837,18.443,43.454,18.443z M22.976,30.85c-4.378,0-7.928-3.517-7.928
        -7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85
        C30.906,27.334,27.355,30.85,22.976,30.85z
      `,
      help: `
        M12 6a3.939 3.939 0 0 0-3.934 3.934h2C10.066 8.867 10.934 8 12 8
        s1.934.867 1.934 1.934c0 .598-.481 1.032-1.216 1.626a9.208 9.208 0 0 0
        -.691.599c-.998.997-1.027 2.056-1.027 2.174V15h2l-.001-.633c.001
        -.016.033-.386.441-.793.15-.15.339-.3.535-.458.779-.631 1.958-1.584
        1.958-3.182A3.937 3.937 0 0 0 12 6zm-1 10h2v2h-2z M12 2C6.486 2 2 6.486
        2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589
        -8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z
      `,
    };

  // Buttons
  var button = document.createElement("template");
  button.innerHTML = "<button>key</button>\n";

  var spacer = document.createElement("template");
    spacer.innerHTML = `<div class="spacer"></div>`;

  // Store letter evaluation - used to color the keyboard

  function buildLetterEvaluation(boardState, evaluations) {
    var letterEvaluationDict = {};
    boardState.forEach((function(e, index) {
      if (evaluations[index]) {
        for (var j = 0; j < e.length; j++) {
          var o = e[j];
          var r = evaluations[index][j];
          var i = letterEvaluationDict[o] || "unknown";
          if (stateOrder[r] > stateOrder[i]) {
            letterEvaluationDict[o] = r;
          }
        }}
      }));
    return letterEvaluationDict;
  }

  // Icons

  var iconElement = document.createElement("template");
  iconElement.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 50 50" width="24">
      <path fill=var(--color-tone-1) />
    </svg>
  `;

  var icon = function(htmlElement) {
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
        this.shadowRoot.appendChild(iconElement.content.cloneNode(!0));
        var e = this.getAttribute("icon");
        this.shadowRoot.querySelector("path").setAttribute("d", iconPaths[e]);
        this.shadowRoot.querySelector("svg").setAttribute("viewBox", iconSizes[e]);
      }
    }]);

    return returnFunction;
  }(SomethingElement(HTMLElement));

  customElements.define("game-icon", icon);

  // Toast

  var toastElement = document.createElement("template");
  toastElement.innerHTML = `
  <style>
    .toast {
      position: relative;
      margin: 16px;
      background-color: var(--color-tone-1);
      color: var(--color-tone-7);
      padding: 16px;
      border: none;
      border-radius: 4px;
      opacity: 1;
      transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
      font-weight: 700;
    }
    .win {
      background-color: var(--color-correct);
      color: var(--tile-text-color);
    }
    .fade {
      opacity: 0;
    }
  </style>
  <div class="toast"></div>
  `;
  var gameToast = function(htmlElement) {
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
        this.shadowRoot.appendChild(toastElement.content.cloneNode(!0));
        var toastDiv = this.shadowRoot.querySelector(".toast");
        toastDiv.textContent = this.getAttribute("text");
        setTimeout((function () {
          toastDiv.classList.add("fade");
        }), 1e3);
        toastDiv.addEventListener("transitionend", (function (a) {
          e.parentNode.removeChild(e);
        }));
      }
    }]);

    return returnFunction;
  }(SomethingElement(HTMLElement));
  customElements.define("game-toast", gameToast);

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

    .tile::before { /* Magic ? */
      content: '';
      display: inline-block;
      padding-bottom: 100%;
    }
    .tile[data-state='empty'] { border: 2px solid var(--color-tone-4); }
    .tile[data-state='tbd'] {
      background-color: var(--color-tone-7);
      border: 2px solid var(--color-tone-3);
      color: var(--color-tone-1);
    }

    .tile[data-state='correct'] { background-color: var(--color-correct); }
    .tile[data-state='present'] { background-color: var(--color-present); }
    .tile[data-state='absent'] { background-color: var(--color-absent); }

    .tile[data-animation='pop'] {
      animation-name: PopIn; animation-duration: 500ms;
    }

    @keyframes PopIn {
      from {
        transform: scale(0.8); opacity: 0;
      }
      40% { transform: scale(1.1); opacity: 1;
      }
    }

    .tile[data-animation='flip-in'] {
      animation-name: FlipIn;
      animation-duration: 250ms;
      animation-timing-function: ease-in;
    }

    @keyframes FlipIn {
      0% { transform: rotateX(0); }
      100% { transform: rotateX(-90deg); }
    }

    .tile[data-animation='flip-out'] {
      animation-name: FlipOut;
      animation-duration: 250ms;
      animation-timing-function: ease-in;
    }

    @keyframes FlipOut {
      0% { transform: rotateX(-90deg); }
      100% { transform: rotateX(0);}
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

      addKeyValueToDict(NotInitializedError(e), "_letter", "");
      addKeyValueToDict(NotInitializedError(e), "_animation", "idle");
      addKeyValueToDict(NotInitializedError(e), "_reveal", !1);
      addKeyValueToDict(NotInitializedError(e), "_animation", "idle");
      addKeyValueToDict(NotInitializedError(e), "_last", !1);
      return e;
    }

    addKeyFunction(returnFunction , [
      {
        key: "last",
        set: function(e) {
          this._last = e;
        }
			}, {
      key: "connectedCallback",
      value: function() {
        var e = this;
        this.shadowRoot.appendChild(gameTileElement.content.cloneNode(!0));
        this.$tile = this.shadowRoot.querySelector(".tile");
        this.$tile.addEventListener("animationend", (function(a) {
          e._anmiation = "idle";
          if (a.animationName === "") {
            e._animation = "idle";
            e._update();
          } else if (a.animationName === "FlipIn") {
            e.$tile.dataset.state = e._state;
            e._animation = "flip-out";
          } else if (a.animationName === "FlipOut") {
            e._animation = "idle";
            if (e._last) {
              e.dispatchEvent(new CustomEvent("game-last-tile-revealed-in-row", {
                bubbles: !0,
                composed: !0
              }));
            }
          }
          e._update();
        }));
      }
    }, {
      key: "attributeChangedCallback",
      value: function(e, a, s) {
        switch (e) {
          case "letter":
            if (s === a) {
              break;
            }
            this._state = s ? "tbd" : "empty";
            this._letter = s;
            this._animation = s ? "pop" : "idle";
            break;
          case "evaluation":
            if (!s) break;
            this._state = s;
            break;
          case "reveal":
            this._animation = "flip-in";
            this._reveal = !0;
            break;
        }
        this._update();
      }
    }, {
      key: "_update",
      value: function () {
        console.log("Updating a letter");
        this.$tile.textContent = this._letter;
        if (["empty", "tbd"].includes(this._state)) {
          this.$tile.dataset.state = this._state;
        }
        this.$tile.dataset.animation = this._animation;
      }
    }], [{
      key: "observedAttributes",
      get: function() {
        return ["letter", "reveal", "evaluation"];
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
      e._evaluation = [];
      return e;
    }

    addKeyFunction(returnFunction , [{
      key: "evaluation",
      get: function() {
        return this._evaluation;
      },
      set: function(evaluation) {
        var currentRow = this;
        this._evaluation = evaluation;
        this.$tiles.forEach((function(tile, i) {
          tile.setAttribute("evaluation", currentRow._evaluation[i]);
          setTimeout((function() {
            tile.setAttribute("reveal", "");
          }), 300 * i);
        }));
      }
    },{
      key: "connectedCallback",
      value: function() {
        var e = this;
        e.shadowRoot.appendChild(gameRowElement.content.cloneNode(!0))
        this.$row = this.shadowRoot.querySelector(".row")
        for (var count = 0; count < 5 /* this._length */; count++) {
          var tile = document.createElement("game-tile");
          if (count === 4) {
            // last tile gets the attribute set
            tile.last = !0;
          }
          this.$row.appendChild(tile);
        }
        this.$tiles = this.shadowRoot.querySelectorAll("game-tile");
      }
    }, {
      key: "attributeChangedCallback",
      value: function(e, a, s) {
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

      button[data-state='correct'] {
        background-color: var(--key-bg-correct);
        color: var(--key-evaluated-text-color);
      }
      button[data-state='present'] {
        background-color: var(--key-bg-present);
        color: var(--key-evaluated-text-color);
      }
      button[data-state='absent'] {
        background-color: var(--key-bg-absent);
        color: var(--key-evaluated-text-color);
      }
      button.fade {
        transition: background-color 0.1s ease, color 0.1s ease;
      }
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
      key: "letterEvaluations",
      set: function(e) {
        this._letterEvaluations = e;
        this._update();
      }
    }, {
      key: "_update",
      value: function() {
        for (var e in this._letterEvaluations) {
          var a = this.$keyboard.querySelector('[data-key="'.concat(e, '"]'));
          a.dataset.state = this._letterEvaluations[e];
          a.classList.add("fade");
        }
      }
    }, {
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
      button.icon {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0 4px;
      }
      game-keyboard {
  			width: 100%;
  			max-width: var(--game-max-width);
  			margin: 0 auto;
  			height: calc(100% - var(--header-height));
  			display: flex;
  			flex-direction: column;
  		}
      .toaster {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, 0);
        pointer-events: none;
        width: fit-content;
      }
      #game-toaster {
        z-index: 1000;
      }
      #system-toaster {
        z-index: 4000;
      }
    </style>
    <header>
      <div class="menu-left">
				<button id="help-button" class="icon" aria-label="Help" tabindex="-1">
					<game-icon icon="graph"></game-icon>
				</button>
        <button id="test-button" class="icon" aria-label="Help" tabindex="-1">
					<game-icon icon="help"></game-icon>
				</button>
			</div>
      <div class="title">Lingo</div>
      <div class="menu-right">
				<button id="statistics-button" class="icon" aria-label="Statistics" tabindex="-1">
					<game-icon icon="settings"></game-icon>
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
    <div class="toaster" id="game-toaster"></div>
    <div class="toaster" id="system-toaster"></div>
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
      addKeyValueToDict(NotInitializedError(e), "evaluations", void 0);
      addKeyValueToDict(NotInitializedError(e), "$keyboard", void 0);
      addKeyValueToDict(NotInitializedError(e), "solution", "erode");

      // Most state is stored in the game-root element
      e.boardState = new Array(6).fill("");
      e.evaluations = new Array(6).fill(null)

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
          if (this.tileIndex < 5) {
            this.boardState[this.rowIndex] += letter;
            var row = this.$board.querySelectorAll("game-row");
            row[this.rowIndex].setAttribute("letters",
              this.boardState[this.rowIndex]);
            this.tileIndex += 1;
          }
        }
      }, {
        key: "removeLetter",
        value: function () {
          console.log("removeLetter");
          if (!(this.tileIndex <= 0)) {
            this.boardState[this.rowIndex] = this.boardState[this.rowIndex]
              .slice(0, this.boardState[this.rowIndex].length - 1);
            var row = this.$board.querySelectorAll("game-row")[this.rowIndex];
            this.boardState[this.rowIndex] ?
              row.setAttribute("letters", this.boardState[this.rowIndex]) :
              row.removeAttribute("letters");
            this.tileIndex -= 1;
          }
        }
      }, {
        key: "submitGuess",
        value: function() {
          console.log("Submiting guess");
          if (5 !== this.tileIndex) { // There isn't five letters in the current row
            this.addToast("Not enough letters");
            return this.$board.querySelectorAll("game-row")[this.rowIndex].setAttribute("invalid", ""); // set attribute shakes the row
          }
          // void this.addToast("Not enough letters"); // Create a toast with a message
          this.evaluateRow();
        }
      }, {
        key: "evaluateRow",
        value: function() {
          // Get the current row
          var currentRow = this.$board.querySelectorAll("game-row")[this.rowIndex];
          var currentString = this.boardState[this.rowIndex]; // current string to be evaluated
          if (currentString && !AllWords.includes(currentString) && !Solutions.includes(currentString)) {
            // Not in either word list
            // this.addToast("Not in word list");
            return currentRow.setAttribute("invalid", "");
          }

          var result = function(guess, solution) {
            var result = Array(solution.length).fill(ABSENT);
            var notCorrect = Array(solution.length).fill(!0);
            var notPresent = Array(solution.length).fill(!0);
            // Check for correct letters
            for (var o = 0; o < guess.length; o++) {
              if (guess[o] === solution[o] && notCorrect[o]) {
                result[o] = CORRECT;
                notCorrect[o] = !1;
                notPresent[o] = !1;
              }
            }

            for (var r = 0; r < guess.length; r++) {
              var i = guess[r];
              if (notCorrect[r])
              for (var l = 0; l < solution.length; l++) {
                var d = solution[l];
                if (notPresent[l] && i === d) {
                  result[r] = PRESENT;
                  notPresent[l] = !1;
                  break;
                }
              }
            }
            return result;
          }(currentString, this.solution);

          console.log(result);

          this.evaluations[this.rowIndex] = result;
          this.letterEvaluations = buildLetterEvaluation(
            this.boardState, this.evaluations
          );
          // This will trigger a UI update
          currentRow.evaluation = this.evaluations[this.rowIndex];
          this.rowIndex += 1;
          this.tileIndex = 0;

          // this.$keyboard.letterEvaluations = this.letterEvaluations;
        }
      }, {
        key: "addToast",
        value: function(e, a) {
          var s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          var t = document.createElement("game-toast");
          t.setAttribute("text", e);
          a && t.setAttribute("duration", a);
          if (s) {
            this.shadowRoot.querySelector("#system-toaster").prepend(t);
          } else {
            this.shadowRoot.querySelector("#game-toaster").prepend(t);
          }
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
            if (letter === "BACK" || letter === "Backspace") {
              this.removeLetter();
            } else if (letter === "ENTER" || letter === "Enter") {
              this.submitGuess();
            } else if (alphabet.includes(letter.toLowerCase())) {
              this.addLetter(letter);
            }
          }));

          this.addEventListener("game-last-tile-revealed-in-row",
            (function(e) {
              gameRootThis.$keyboard.letterEvaluations =
                gameRootThis.letterEvaluations;
            }));

          this.$board = this.shadowRoot.querySelector("#board");
					this.$keyboard = this.shadowRoot.querySelector("game-keyboard");

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
