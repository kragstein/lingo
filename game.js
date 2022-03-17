this.lingo = this.lingo || {};

this.lingo.game = function (glob) {

  "use strict";

  console.log("Welcome to Lingo, please read the source code. 🖥️👀");

  // Function magic to create new tags

  function addKeyFunction(e, a, s) {
    return a && addDictToElement(e.prototype, a), s &&
      addDictToElement(e, s), e;
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
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/.
      // ./Reference/Global_Objects/Reflect
      return !1; // false
    }
    if (Reflect.construct.sham) {
      return !1; // false
    }

    if ("function" == typeof Proxy) return !0; // True

    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(
        Boolean, [], (function() {}))), !0
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
        return returnFunction.__proto__ ||
          Object.getPrototypeOf(returnFunction);
      } (returnFunction);
    }
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
    var result = (!a || "object" != typeof a &&
      "function" != typeof a ? NotInitializedError(e) : a);
    return result;
  }

  function ConstructElement(lHTMLElement) {

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

        return set__proto__(t, lHTMLElement);
    }(lHTMLElement);
    return returnElement;
  }

  // Building the game

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

    // Solutions and words handling

    function wordToInt(word) {
      var result = 0;
      word.split("").forEach(
        function(c, i) {
          result += getIndex(c) * (26 ** i);
         }
      );
      return result;
    }

    function intToWord(val) {
      var result = "";
      var i = 5; // This eats the a at word end : log(26, val);
      for (i ; i > 0; i--) {
        var letterValue = Math.floor(val / (26**(i-1)));
        val -= letterValue * (26**(i-1));
        result = String.fromCharCode(97 + letterValue) + result;
      }
      return result;
    }

    function getIndex(letter) {
      return letter.charCodeAt()-97;
    }

    function log(base, number) {
      return Math.ceil(Math.log(number) / Math.log(base));
    }


    // Visualize paths:
    // https://svg-path-visualizer.netlify.app
    // Find paths
    // https://www.svgrepo.com/

    var iconSizes = {
      help: "0 0 22 22",
      settings: "0 0 45 45",
      graph: "0 0 300 300",
      reload: "0 0 500 500",
      close: "0 0 22 22",
    };

    var iconPaths = {
      graph: `M287.183,243.393l-27.577-27.577c-5.857-5.857-15.355-5.857
        -21.213,0 c-5.858,5.857-5.858,15.355,0,21.213l1.971,1.971 H62.577
        V51.212l1.971,1.971c5.858,5.859,15.355,5.858,21.213,0c5.858-5.857,5.858
        -15.355,0-21.213L58.183,4.393 c-5.857-5.857-15.355-5.857-21.213,0L9.393
        ,31.97c-5.858,5.857-5.858,15.355,0,21.213c5.857,5.858,15.355,5.858,
        21.213,0l1.971-1.971V254c0,8.284,6.716,15,15,15h192.787l-1.971,1.971c
        -5.858,5.857-5.858,15.355,0,21.213 c5.858,5.859,15.355,5.858,21.213,0
        l27.577-27.577C293.042,258.749,293.042,249.25,287.183,243.393z M103.089
        ,183.288c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h98c8.284,0,15
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
      reload: `
        M268.175,488.161c98.2-11,176.9-89.5,188.1-187.7c14.7-128.4-85.1-237.7
        -210.2-239.1v-57.6c0-3.2-4-4.9-6.7-2.9 l-118.6,87.1c-2,1.5-2,4.4,0,5.9
        l118.6,87.1c2.7,2,6.7,0.2,6.7-2.9v-57.5c87.9,1.4,158.3,76.2,152.3,165.6
		    c-5.1,76.9-67.8,139.3-144.7,144.2c-81.5,5.2-150.8-53-163.2-130c-2.3
        -14.3-14.8-24.7-29.2-24.7c-17.9,0-31.9,15.9-29.1,33.6 C49.575,418.961,
        150.875,501.261,268.175,488.161z
      `,
      close: `M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0
        0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29
        -4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z
      `
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"
      height="24" width="24">
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
        this.shadowRoot.querySelector("path")
          .setAttribute("d", iconPaths[e]);
        this.shadowRoot.querySelector("svg")
          .setAttribute("viewBox", iconSizes[e]);
      }
    }]);

    return returnFunction;
  }(ConstructElement(HTMLElement));

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
  }(ConstructElement(HTMLElement));
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
      addKeyValueToDict(NotInitializedError(e), "$tile", !1);
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
              e.dispatchEvent(new CustomEvent(
                "game-last-tile-revealed-in-row", {
                  bubbles: !0,
                  composed: !0
              }));
            }
          }
          e._update();
        }));
        e._update();
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
        var e = this;
        if (e.$tile) {
          e.$tile.textContent = e._letter;
          if (["empty", "tbd"].includes(e._state)) {
            e.$tile.dataset.state = e._state;
          }
          e.$tile.dataset.animation = e._animation;
        }
      }
    }], [{
      key: "observedAttributes",
      get: function() {
        return ["letter", "reveal", "evaluation"];
      }
    }]);

    return returnFunction;
  }(ConstructElement(HTMLElement));

  customElements.define("game-tile", gameTile);

  // Game Row

  var gameRowElement = document.createElement("template");
  gameRowElement.innerHTML = `
    <style>
      :host { display: block; }
      .row {
        display: grid; grid-template-columns: repeat(5, 1fr); grid-gap: 5px;
      }
      :host([invalid]) { animation-name: Shake; animation-duration: 600ms; }
      @keyframes Shake {
        10%,
        90% { transform: translateX(-1px); }
        20%,
        80% { transform: translateX(2px); }
        30%,
        50%,
        70% { transform: translateX(-4px); }
        40%,
        60% { transform: translateX(4px); }
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

        this.addEventListener("animationend", (function(a) {
          "Shake" === a.animationName && e.removeAttribute("invalid");
        }));
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
  }(ConstructElement(HTMLElement));

  customElements.define("game-row", gameRow);

  // Keyboard
  var keyboardHTMLElement = document.createElement("template");

  keyboardHTMLElement.innerHTML = `
    <style>
		  :host {
  			height: var(--keyboard-height);
  		}
  		#keyboard {
  			margin: 0 4px;
  			user-select: none;
  		}
  		.row {
  			display: flex;
  			width: 100%;
  			margin: 0 auto 8px;
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
      key: "reload",
      value: function() {
        this._letterEvaluations = {};
        for (const letter of alphabet) {
          var a = this.$keyboard
            .querySelector('[data-key="'.concat(letter, '"]'));
          a.removeAttribute("data-state");
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
             if (alphabet.includes(s.toLowerCase()) ||
                 "Backspace" === s || "Enter" === s) {
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
  }(ConstructElement(HTMLElement));

  customElements.define("game-keyboard", keyboard);

  // Modal display

  var gameModalElement = document.createElement("template");
	gameModalElement.innerHTML = `
		<style>
			.overlay {
				display: none;
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				justify-content: center;
				align-items: center;
				background-color: var(--opacity-50);
				z-index: 3000;
			}
			:host([open])
			.overlay { display: flex; }
			.content {
				position: relative;
				border-radius: 8px;
				border: 1px solid var(--color-tone-6);
				background-color: var(--modal-content-bg);
				color: var(--color-tone-1);
				box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);
				width: 90%;
				max-height: 90%;
				overflow-y: auto;
				animation: SlideIn 200ms;
				max-width: var(--game-max-width);
				padding: 16px;
				box-sizing: border-box;
			}
			.content.closing {
				animation: SlideOut 200ms;
			}
			.close-icon {
				width: 24px;
				height: 24px;
				position: absolute;
				top: 16px;
				right: 16px;
			}
			game-icon {
				position: fixed;
				user-select: none;
				cursor: pointer;
			}
			@keyframes SlideIn {
				0% {
					transform: translateY(30px);
					opacity: 0;
				}
				100% {
					transform: translateY(0px);
					opacity: 1;
				}
			}
			@keyframes SlideOut {
				0% {
					transform: translateY(0px);
					opacity: 1;
				}
				90% {
					opacity: 0;
				}
				100% {
					opacity: 0;
					transform: translateY(60px);
				}
			}
		</style>
		<div class="overlay">
			<div class="content">
				<slot></slot>
				<div class="close-icon">
					<game-icon icon="close"></game-icon>
				</div>
			</div>
		</div>
    `;

  var gameModal = function(htmlElement) {
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
        this.shadowRoot.appendChild(gameModalElement.content.cloneNode(!0));
        this.shadowRoot.querySelector(".close-icon").addEventListener("click",
          function () {
            e.shadowRoot.querySelector(".content").classList.add("closing");
        });
        this.addEventListener("close-modal-menu", (function(a) {
          e.shadowRoot.querySelector(".content").classList.add("closing");
        }));
        this.shadowRoot.addEventListener("animationend", (function(a) {
          "SlideOut" === a.animationName &&
          (e.shadowRoot.querySelector(".content").classList.remove("closing"),
          e.removeChild(e.firstChild), e.removeAttribute("open"))
        }));
      }
    }]);
    return returnFunction;
  }(ConstructElement(HTMLElement));
  customElements.define("game-modal", gameModal);

  // Full page menu

  var fullPageElement = document.createElement("template");
    fullPageElement.innerHTML = `
	<style>
		.overlay {
			display: none;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			justify-content: center;
			background-color: var(--color-background);
			animation: SlideIn 100ms linear;
			z-index: `.concat(2e3, `;
		}
		:host([open]) .overlay {
			display: flex;
		}
		.content {
			position: relative;
			color: var(--color-tone-1);
			padding: 0 32px;
			max-width: var(--game-max-width);
			width: 100%;
			overflow-y: auto;
			height: 100%;
			display: flex;
			flex-direction: column;
		}
		.content-container {
			height: 100%;
		}
		.overlay.closing {
			animation: SlideOut 150ms linear;
		}
		header {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
		}
		h1 {
			font-weight: 700;
			font-size: 16px;
			letter-spacing: 0.5px;
			text-transform: uppercase;
			text-align: center;
			margin-bottom: 10px;
		}
		game-icon {
			position: absolute;
			right: 0;
      top: 10px;
			user-select: none;
			cursor: pointer;
		}
		@media only screen and (min-device-width : 320px)
                       and (max-device-width : 480px) {
			.content {
				max-width: 100%;
				padding: 0;
			}
			game-icon {
				padding: 0 16px;
			}
		}
		@keyframes SlideIn {
			0% {
				transform: translateY(30px);
				opacity: 0;
			}
			100% {
				transform: translateY(0px);
				opacity: 1;
			}
		}
		@keyframes SlideOut {
			0% {
				transform: translateY(0px);
				opacity: 1;
			}
			90% {
				opacity: 0;
			}
			100% {
				opacity: 0;
				transform: translateY(60px);
			}
		}
	</style>
	<div class="overlay">
		<div class="content">
			<header>
				<h1><slot></slot></h1>
				<game-icon icon="close"></game-icon>
			</header>
			<div class="content-container">
				<slot name="content"></slot>
			</div>
		</div>
	</div>`);

  var fullPage = function(htmlElement) {

    setPrototype(returnFunction, htmlElement);
    var element = constructElement(returnFunction);

    function returnFunction() {
      var e;
      isInstanceOf(this, returnFunction);
      (e = element.call(this)).attachShadow({ mode: "open" });
      return e;
    }

    addKeyFunction(returnFunction, [{
      key: "connectedCallback",
      value: function() {
        var e = this;
        this.shadowRoot.appendChild(fullPageElement.content.cloneNode(!0));
				this.shadowRoot.querySelector("game-icon").addEventListener("click",
          function(a) {
            e.shadowRoot.querySelector(".overlay").classList.add("closing");
          });
        this.shadowRoot.addEventListener("animationend", (function(a) {
          "SlideOut" === a.animationName &&
          (e.shadowRoot.querySelector(".overlay").classList.remove("closing"),
          Array.from(e.childNodes).forEach((function(a) {
            e.removeChild(a)
          })), e.removeAttribute("open"))
        }))
      }
    }]);
    return returnFunction;
  }(ConstructElement(HTMLElement));
  customElements.define("full-page", fullPage);

  // Help menu

  var helpElement = document.createElement("template");
  helpElement.innerHTML = `
  <style>
  .instructions {
    font-size: 14px;
    color: var(--color-tone-1)
  }
  .examples {
    border-bottom: 1px solid var(--color-tone-4);
    border-top: 1px solid var(--color-tone-4);
  }
  .example {
    margin-top: 24px;
    margin-bottom: 24px;
  }
  game-tile {
    width: 40px;
    height: 40px;
  }
  section {
    padding: 16px;

  }
</style>
<section>
  <h1>Why this clone</h1>
  <div class="instructions">
  <p>This is a re-implementation of
    <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a> by
    Josh Wardle</p>
  <p>I wanted to understand how such an elegant UI was implemented in
  javascript.</p>
  <p>Be sure to inspect the source code</p>
  <p>Right-click ➜ Inspect</p>
  <p>It is meant to be readable</p>
  <p>The git repository will be available soon.</p>
  </div>

  <h1>How to Lingo</h1>
  <div class="instructions">
    <p>Guess the word in six tries.</p>
    <p>Each guess must be a valid five-letter word.
       Hit the enter button to submit.</p>
    <p>After each guess, the color of the tiles will change to show
       how close your guess was to the word.</p>
    <div class="examples">
      <p><strong>Examples</strong></p>
      <div class="example">
        <div class="row">
          <game-tile letter="c" evaluation="correct" reveal></game-tile>
          <game-tile letter="h"></game-tile>
          <game-tile letter="e"></game-tile>
          <game-tile letter="e"></game-tile>
          <game-tile letter="r"></game-tile>
        </div>
        <p>The letter <strong>C</strong> is in the
           word and in the correct spot.</p>
      </div>
      <div class="example">
        <div class="row">
          <game-tile letter="p"></game-tile>
          <game-tile letter="r" evaluation="present" reveal></game-tile>
          <game-tile letter="o"></game-tile>
          <game-tile letter="x"></game-tile>
          <game-tile letter="y"></game-tile>
        </div>
        <p>The letter <strong>R</strong>
          is in the word but in the wrong spot.</p>
      </div>
      <div class="example">
        <div class="row">
          <game-tile letter="b"></game-tile>
          <game-tile letter="e"></game-tile>
          <game-tile letter="a"></game-tile>
          <game-tile letter="t" evaluation="absent" reveal></game-tile>
          <game-tile letter="s"></game-tile>
        </div>
        <p>The letter <strong>T</strong> is not in the word in any spot.</p>
      </div>
    </div>
    <p>Click on the
      <game-icon style="margin-bottom: -7px;" icon="reload"></game-icon>
       to get a new word!</p>
  </div>
</section>
  `;

  var help = function(htmlElement) {
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
        this.shadowRoot.appendChild(helpElement.content.cloneNode(!0));
      }
    }]);

    return returnFunction;
  }(ConstructElement(HTMLElement));
  customElements.define("game-help", help);

  // Settings Menu

  var settingsElement = document.createElement("template");
  settingsElement.innerHTML = `
    <style>
      .setting {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #d4d5d9;
        padding: 16px 0;
      }
      .text {
        padding-right: 8px;
      }
      .content {
        position: relative;
        color: black;
        padding: 0 32px;
        max-width: var(--game-max-width);
        width: 100%;
        overflow-y: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      .title {
        font-size: 18px;
      }
      .description {
        font-size: 12px;
        color: #777b7d;
      }
      a, a:visited {
        color: #787c7e;
      }

    </style>
    <section>
      <div class="setting">
        <div class="text">
          <div class="title">Hard Mode</div>
          <div class="description">Description</div>
        </div>
      </div>
      <div class="setting">
        <div class="text">
          <div class="title">Dark Theme</div>
        </div>
      </div>
    </section>
    <section>
      <div class="setting">
        <div class="text">
          <div class="title">More ?</div>
        </div>
        <div class="control"><a href="./">Link</a></div>
      </div>
    </section>

  `;

  var settings = function(htmlElement) {
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
        this.shadowRoot.appendChild(settingsElement.content.cloneNode(!0));
      }
    }]);

    return returnFunction;
  }(ConstructElement(HTMLElement));
  customElements.define("game-settings", settings);

  // Game win menu

  var gameWinElement = document.createElement("template");
  gameWinElement.innerHTML = `
    <style>
      #results {
        display: grid;
        justify-content: center;
        align-items: center;
      }
      h1 {
        justify-content: center;
        display: flex;
      }
      button {
        padding: 0 20px 0;
        background-color: black;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }
    </style>
    <div id="results">
      <h1>WIN !</h1>
      <button><h3>Play again ?</h3></button>
    </div>
  `;

  var gameWin = function(htmlElement) {
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
        this.shadowRoot.appendChild(gameWinElement.content.cloneNode(!0));
        this.shadowRoot.querySelector("button")
          .addEventListener("click", function(a) {
            this.dispatchEvent(new CustomEvent(
              "reload-game", {
                bubbles: !0,
                composed: !0,
                detail: {
                  key: "new-word",
                }
            }));
            this.dispatchEvent(new CustomEvent(
              "close-modal-menu", {
                bubbles: !0,
                composed: !0,
            }));
          });

      }
    }]);

    return returnFunction;
  }(ConstructElement(HTMLElement));
  customElements.define("game-win", gameWin);

  // Game loose menu

  var gameLoseElement = document.createElement("template");
  gameLoseElement.innerHTML = `
    <style>
      #results {
        display: grid;
        justify-content: center;
        align-items: center;
      }
      h1 {
        justify-content: center;
        display: flex;
      }
      button {
        padding: 0 20px 0;
        background-color: black;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }
      #other {
        margin-top: 2em;
        margin-bottom: 1em;
      }
    </style>
    <div id="results">
      <h1>Lost !</h1>
      <button id="retry"><h3>Retry this?</h3></button>
      <button id="other"><h3>Another word?</h3></button>
    </div>
  `;

  var gameLose = function(htmlElement) {
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
        this.shadowRoot.appendChild(gameLoseElement.content.cloneNode(!0));
        this.shadowRoot.querySelector("#other")
          .addEventListener("click", function(a) {
            this.dispatchEvent(new CustomEvent(
              "reload-game", {
                bubbles: !0,
                composed: !0,
                detail: {
                  key: "new-word",
                }
            }));
            this.dispatchEvent(new CustomEvent(
              "close-modal-menu", {
                bubbles: !0,
                composed: !0,
            }));
          });
          this.shadowRoot.querySelector("#retry")
            .addEventListener("click", function(a) {
              this.dispatchEvent(new CustomEvent(
                "reload-game", {
                  bubbles: !0,
                  composed: !0,
                  detail: {
                    key: "same-word",
                  }
              }));
              this.dispatchEvent(new CustomEvent(
                "close-modal-menu", {
                  bubbles: !0,
                  composed: !0,
              }));
            });

      }
    }]);

    return returnFunction;
  }(ConstructElement(HTMLElement));
  customElements.define("game-lose", gameLose);

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
				<button id="test-button" class="icon" tabindex="-1">
					<game-icon icon="graph"></game-icon>
				</button>
        <button id="help-button" class="icon" tabindex="-1">
					<game-icon icon="help"></game-icon>
				</button>
			</div>
      <div class="title">Lingo</div>
      <div class="menu-right">
        <button id="reload-button" class="icon" tabindex="-1">
          <game-icon icon="reload"></game-icon>
        </button>
				<button id="settings-button" class="icon" tabindex="-1">
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
    <game-modal></game-modal>
    <full-page></full-page>
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
      addKeyValueToDict(NotInitializedError(e), "$board", void 0);
      addKeyValueToDict(NotInitializedError(e), "$game", void 0);
      addKeyValueToDict(NotInitializedError(e), "solution", "erode");
      addKeyValueToDict(NotInitializedError(e), "letterEvaluations", void 0);
      addKeyValueToDict(NotInitializedError(e), "currentString", void 0);
      addKeyValueToDict(NotInitializedError(e), "canInput", !0);

      // Most state is stored in the game-root element
      e.boardState = new Array(6).fill("");
      e.evaluations = new Array(6).fill(null)
      e.solution = intToWord(
        solutions[Math.floor(Math.random()*solutions.length)]);

      console.log("Oops:", e.solution);

      return e;
    }

    addKeyFunction(returnFunction , [
      {
        key: "showSettingsFullPage",
        value: function () {
          var modalDiv = this.shadowRoot.querySelector("full-page");
          var s = document.createTextNode("Settings");
          modalDiv.appendChild(s);
          var settings = document.createElement("game-settings");
          settings.setAttribute("page", "");
          settings.setAttribute("slot", "content");
          modalDiv.appendChild(settings);
          modalDiv.setAttribute("open", "");
        }
      }, {
        key: "showHelpFullPage",
        value: function () {
          // var modalDiv = this.querySelector("#game-help");
          var modalDiv = this.shadowRoot.querySelector("full-page")
          // No idea why we need to create a TextNode here,
          // The whole tag tree is messed up after...
          // var s = document.createTextNode("How to play");
          // modalDiv.appendChild(s);
          var t = document.createElement("game-help");
          t.setAttribute("page", "");
          t.setAttribute("slot", "content");
          modalDiv.appendChild(t);
          modalDiv.setAttribute("open", "");
        }
      }, {
        key: "reload",
        value: function(newWord) {
          this.boardState = new Array(6).fill("");
          var rows = this.$board.querySelectorAll("game-row");
          rows.forEach(function (row) {
            row.removeAttribute("letters");
          });
          if (newWord) {
            this.solution = intToWord(
              solutions[Math.floor(Math.random()*solutions.length)]);
          }
          this.rowIndex = 0;
          this.letterEvaluations = {};
          this.$keyboard.reload();
          this.canInput = !0;
          console.log("Oops:", this.solution);
        }
      }, {
        key: "addLetter",
        value: function(letter) {
          if (this.tileIndex < 5 && this.canInput) {
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
          if (5 !== this.tileIndex && this.canInput) { // not five letters in the current row
            this.addToast("Not enough letters");
            return this.$board.querySelectorAll("game-row")[this.rowIndex]
            .setAttribute("invalid", ""); // set attribute shakes the row
          }
          this.evaluateRow();
        }
      }, {
        key: "evaluateRow",
        value: function() {
          if (!this.canInput) {
            return;
          }
          var currentRow =
            this.$board.querySelectorAll("game-row")[this.rowIndex];
          this.currentString = this.boardState[this.rowIndex];
          if (this.currentString &&
              !allWords.includes(wordToInt(this.currentString)) &&
              !solutions.includes(wordToInt(this.currentString))) {
            // Not in either word list
            this.addToast("Not in word list");
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
          }(this.currentString, this.solution);

          this.evaluations[this.rowIndex] = result;
          this.letterEvaluations = buildLetterEvaluation(
            this.boardState, this.evaluations
          );
          // This will trigger a UI update
          currentRow.evaluation = this.evaluations[this.rowIndex];
          this.rowIndex += 1;
          this.tileIndex = 0;

          // if (solutions.includes(wordToInt(currentString))) {
          //   var modalDiv = this.shadowRoot.querySelector("game-modal")
          //   modalDiv.appendChild(document.createElement("game-win"));
          //   modalDiv.setAttribute("open", "");
          // }
        }
      }, {
        key: "addToast",
        value: function(e, a) {
          var s = arguments.length > 2 &&
            void 0 !== arguments[2] && arguments[2];
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
          this.shadowRoot.getElementById("settings-button").
             addEventListener("click", (function(e) {
               gameRootThis.showSettingsFullPage();
             }));
          this.shadowRoot.getElementById("help-button").
             addEventListener("click", (function(e) {
               gameRootThis.showHelpFullPage();
             }));
          this.shadowRoot.getElementById("reload-button").
              addEventListener("click", (function(e) {
                gameRootThis.reload(true);
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

          this.addEventListener("reload-game", function(e) {
            if (e.detail.key === "new-word") {
              this.reload(true);
            } else if (e.detail.key === "same-word") {
              this.reload(false);
            } else {
              this.reload(true);
            }
          });

          this.addEventListener("game-last-tile-revealed-in-row",
            (function(e) {
              gameRootThis.$keyboard.letterEvaluations =
                gameRootThis.letterEvaluations;
              if (this.solution === this.currentString) {
                this.canInput = !1;
                var modalDiv = this.shadowRoot.querySelector("game-modal")
                modalDiv.appendChild(document.createElement("game-win"));
                modalDiv.setAttribute("open", "");
              } else if (this.rowIndex > 5) {
                var modalDiv = this.shadowRoot.querySelector("game-modal")
                modalDiv.appendChild(document.createElement("game-lose"));
                modalDiv.setAttribute("open", "");
                this.canInput = !1;
              }
            }));

          this.$board = this.shadowRoot.querySelector("#board");
					this.$keyboard = this.shadowRoot.querySelector("game-keyboard");
          // this.$game = this.shadowRoot.querySelector("game-root");

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
  }(ConstructElement(HTMLElement));

  customElements.define("game-root", gameRoot);

  // Return all relevant objects
  glob.Game = gameRoot;
  glob.intToWord = intToWord;
  glob.wordToInt = wordToInt;
  return glob;

}({});

var solutions =
[7772858, 9034861, 11296186, 3471111, 2004236, 3529007, 5028457, 1881182,
5040945, 2208614, 3532887, 2584247, 5099444, 222414, 4804168, 1881080,
8758792, 3242877, 2161874, 6051661, 8020752, 3532883, 3518351, 9012876,
5282776, 6194554, 2144298, 11277720, 8717817, 11314213, 1886497, 8551691,
10658603, 4579668, 2373272, 7849051, 1444970, 7050884, 5413869, 6463770,
1855022, 11407268, 7854150, 10977685, 8827419, 2162292, 4618720, 2009480,
1062892, 1613315, 5639880, 6019999, 8761318, 3518195, 10994829, 3544637,
9010617, 1599928, 11168301, 11276234, 11022978, 8916897, 6239608, 6081741,
1851331, 9044040, 5105843, 8542380, 2052627, 5030260, 1909856, 8026594,
5331526, 2183922, 1444223, 341487, 4610611, 5567243, 7848746, 8920943,
820188, 11277723, 2048489, 5107191, 8981848, 8756000, 7848054, 5561822,
11314067, 11240903, 1613317, 8825700, 2976387, 219030, 8015343, 8760760,
1068966, 1945221, 11207770, 8889776, 1066729, 1378382, 2162004, 11008392,
10979324, 10980064, 1679423, 1602528, 457766, 1570198, 4604938, 8027876,
2066142, 3246835, 7849667, 681609, 11281455, 8810166, 3241525, 3247351,
8936267, 1444527, 8761326, 8924561, 213958, 1444448, 8558186, 5423320,
2976043, 6028259, 11416653, 1890542, 1576142, 1947250, 4610608, 7774443,
8685696, 7781722, 11239035, 8995143, 8999278, 11092331, 6091208, 7854657,
7216072, 2183861, 11162789, 8981666, 11103523, 11033678, 5225664, 6198355,
178173, 7847897, 7850926, 6540317, 1947261, 3245595, 3246949, 2171776,
4614664, 1888295, 2136672, 2206921, 2976195, 2204818, 8685432, 2044672,
8890002, 7844116, 3243842, 1376797, 4572907, 6631759, 5038457, 1063714,
2156452, 1063730, 5039809, 1863517, 2976240, 3234103, 7065736, 6199597,
2004107, 4618733, 2267748, 2097400, 11266342, 11144759, 2175420, 11277817,
1886508, 7919359, 5229997, 11061070, 8577885, 9008741, 8555917, 1936290,
7843179, 5035525, 7079376, 4798692, 1945222, 11269456, 4804101, 8028857,
11038430, 11081687, 1063363, 7776410, 2132304, 11381593, 8916819, 8929665,
4610777, 1872074, 7071404, 5229884, 7773186, 4605116, 8924928, 11154795,
1578150, 2984328, 8809851, 2153937, 9004696, 1669920, 8685549, 8780174,
5225758, 7841214, 2039263, 8023295, 2157807, 7840554, 311942, 6082353,
1063974, 220818, 4776618, 2003864, 1935755, 5226070, 8824523, 7844136,
6249145, 2206925, 2013415, 1525961, 5225888, 8911216, 2013312, 1908885,
11313549, 6253376, 1373814, 2062243, 3542528, 1670091, 8756142, 3541940,
2154423, 3246850, 10969835, 8578809, 8878914, 2144395, 7851742, 1983084,
2175386, 10307258, 10132685, 7912105, 3524968, 1945387, 9001800, 8938855,
11381530, 3471221, 1613305, 5220272, 11277715, 2206976, 11176007, 9043884,
2101469, 7853877, 5413608, 5039593, 219390, 10979285, 2126766, 7909712,
4605199, 1384882, 5043341, 4811952, 1872064, 2039016, 4642952, 2031692,
7909491, 7855489, 6514614, 1886652, 8911333, 2202708, 8984386, 10131004,
9004431, 6337024, 11313665, 11313543, 3515661, 200881, 380599, 6514981,
11276192, 11271631, 6081757, 7847379, 1935389, 9001160, 11204702, 8590041,
3247349, 1874553, 2984168, 11294159, 5039696, 1567200, 2204543, 2975857,
8129646, 8542228, 7847014, 6866202, 11046892, 1942363, 5836194, 3247889,
8765484, 299019, 8949332, 9401809, 5230030, 8023456, 4572908, 11363760,
2144469, 3542687, 3543023, 5739532, 1626747, 8823613, 3544482, 11304295,
7855135, 2154106, 8692299, 8023811, 2066350, 6614441, 6198634, 6337111,
6399018, 7851439, 9044550, 8692300, 5382208, 4804099, 2167586, 11020257,
11314073, 6709421, 5229981, 11158062, 3247355, 6740619, 11166174, 8764500,
921607, 7853214, 1567181, 2386571, 6699115, 4605203, 2091700, 1868849,
1374144, 4763608, 3544373, 5485752, 8809853, 1599703, 7853311, 1935514,
8124688, 11188181, 11144558, 4614667, 11270610, 10986041, 2167717, 1516658,
9015597, 1935608, 7854147, 2101298, 3242982, 6744828, 7075528, 8765426,
2386567, 7065996, 8981872, 11177350, 3546684, 2055239, 11077457, 6016686,
7771626, 8826890, 11314227, 2976040, 5943684, 5097727, 11152499, 3831760,
7846035, 5111008, 1869055, 2970935, 3105068, 8685709, 8830946, 2174038,
8834760, 6025574, 5039646, 11022973, 6337112, 10301794, 11205826, 7841461,
2280830, 2360776, 8765368, 2273169, 3770577, 5782688, 11168722, 7852086,
7110372, 8924571, 11269035, 8542224, 2041721, 11305123, 141511, 2277133,
133458, 2055241, 8690036, 8714007, 7850403, 2175552, 4610832, 1868925,
2009358, 3542622, 6856113, 8916458, 1936283, 11275972, 2162296, 8831342,
4891979, 11077318, 7167440, 1564334, 6249014, 2197115, 2062391, 2976264,
3318173, 3526704, 3542544, 11028943, 8018941, 11035395, 11219914, 1518993,
1063720, 5040676, 8765374, 8024411, 3246830, 1881040, 6084512, 9004922,
4874496, 5633215, 2206912, 5102856, 11186980, 8889405, 11077305, 9043819,
11277710, 4572820, 5097935, 11765802, 11173994, 11046739, 8949234, 1732198,
6741269, 5486861, 2021752, 8831649, 2127698, 11204705, 2167614, 5325884,
7845657, 2129601, 3478988, 3243827, 11241419, 5223184, 11168565, 2158167,
3241946, 8889421, 11163158, 10135469, 8755843, 2197448, 2056738, 4614576,
2197444, 2167664, 2204457, 7071238, 5624608, 11201337, 11314068, 2190463,
11022183, 3972712, 2150122, 2975908, 8760305, 5841044, 8984586, 4618944,
9035537, 3241952, 2135594, 2052637, 2024845, 8924918, 8121810, 5039963,
9002080, 124760, 7851847, 11034184, 7853467, 7842294, 8767269, 11205225,
2013458, 1613312, 2181810, 5942838, 5944759, 2062390, 2027174, 11314062,
7009188, 3318191, 2082758, 8471816, 8767410, 5949327, 7841022, 3243303,
8999199, 10979428, 114256, 1905760, 11304863, 4610856, 2174031, 6025402,
8765758, 6023385, 5950600, 11143299, 1605272, 2208494, 2154111, 11162806,
8881696, 2031770, 4605216, 11046887, 5035737, 6013896, 1980112, 11310376,
4610624, 10996599, 2583876, 8878992, 3234350, 8960150, 1942374, 1868921,
6327768, 11271629, 11058901, 11185985, 4605424, 2153920, 6927952, 8017126,
11204713, 1865981, 11416674, 11028947, 1863504, 6744663, 4798760, 5486860,
5040744, 1890307, 8022113, 2025634, 167193, 11022712, 2144456, 11171021,
2066313, 5177216, 8981447, 1880832, 7847895, 6199362, 6192512, 8755856,
5112279, 3247870, 11291243, 5112277, 2026978, 2013678, 4643212, 1871855,
2025300, 8934102, 6022710, 8881809, 1442224, 1670292, 8551845, 5387382,
11029986, 6337271, 6551131, 6013031, 1520175, 2167546, 3471219, 11060794,
8809852, 8765137, 8835549, 6744302, 2156299, 8024817, 4614820, 2167720,
11205238, 3533151, 2372944, 1886344, 7842136, 5738689, 7066064, 11278090,
5225992, 6248996, 2976142, 11103159, 7847027, 7851747, 149408, 2013700,
6327803, 8776422, 2027250, 3245685, 11145067, 7842047, 11155577, 9008564,
7844605, 7777911, 3243002, 2127052, 2156297, 2158163, 10522305, 7840469,
3246007, 8876482, 9043554, 11350734, 6097227, 1063887, 1447097, 10975206,
7079256, 11151983, 8545084, 7851744, 1894442, 2023218, 11314430, 2035125,
6198620, 8761759, 1863357, 10986051, 3529021, 5171629, 10583126, 4803943,
2984152, 5677584, 7216068, 4803944, 11008513, 1933872, 10968883, 2208609,
7844595, 8770624, 4825732, 5943680, 234080, 1935613, 5112297, 2048624,
4618788, 2975812, 11201728, 8018937, 5167700, 6337115, 1512229, 2154193,
4798449, 11241583, 1935909, 7839785, 11027964, 11035391, 5100092, 4605373,
11022182, 5223312, 11239699, 7846347, 2136750, 7769389, 31166, 8690388,
7855411, 11207775, 6198932, 2976119, 2066520, 11171212, 7776404, 11266776,
8765121, 2182664, 2378456, 1058628, 1877037, 8991208, 11764199, 8723186,
5331527, 2155889, 211209, 6023840, 1942165, 4891740, 5111607, 461829,
10054836, 215194, 9043936, 2208617, 3791546, 2976379, 1524489, 6081739,
11022701, 7079273, 6192230, 11028942, 1679368, 6093465, 3245488, 1767508,
8015774, 11176990, 11155884, 6081808, 11168199, 8544927, 6767203, 2984376,
2034311, 7846869, 4895810, 1609167, 4016458, 7855131, 1525347, 11314231,
2136230, 1981878, 299597, 1944853, 11050584, 7852703, 7841132, 4825488,
7853317, 11342385, 5109989, 4891983, 6512273, 6296369, 2140866, 2197126,
1977410, 1613318, 2206756, 1511979, 2101078, 11177448, 7853473, 10980060,
5943458, 5739527, 2162298, 7851751, 6018138, 11150846, 4608080, 8879159,
2162152, 4605242, 1519354, 2267616, 5113947, 9004784, 11168569, 1855236,
8916731, 2158173, 5181750, 346341, 10518005, 7853458, 2202694, 3236793,
11314325, 8547631, 5028473, 6023980, 11168563, 8809844, 7846029, 1872070,
8914286, 2191934, 8924752, 7853303, 7851443, 9010790, 6928238, 11045450,
1444380, 2044562, 11055419, 5742309, 1872367, 2127208, 11075443, 2202430,
7918848, 1626968, 2013536, 6516498, 10974967, 1941005, 5029526, 7171296,
2272834, 11173975, 3317819, 2199930, 4614663, 8911148, 2091992, 2154113,
11031651, 1446840, 5413853, 11289203, 11314747, 9046068, 8923045, 7003223,
4610764, 5236382, 6026769, 8026673, 11145998, 3318174, 2202421, 5036400,
4878528, 1963781, 11310676, 4607800, 2044681, 8542379, 7852274, 11278233,
8031573, 8720690, 8723654, 11171220, 8128331, 343944, 6025195, 5181542,
7771886, 7079516, 3318175, 5111242, 6190830, 6194206, 1935921, 5565515,
3247051, 6249534, 5178019, 5098994, 11205888, 6081974, 7012506, 6014232,
9043989, 7284279, 3544272, 5792480, 5180546, 7849055, 7852082, 1569856,
8955726, 8023664, 11314217, 11155879, 2197443, 8760497, 2044528, 8916732,
1374093, 5029952, 5030913, 9002142, 11269470, 11155208, 2126896, 2136568,
9004691, 5745845, 7848030, 7852248, 11169083, 5111351, 922602, 9043219,
8881800, 231634, 8755752, 820058, 11011369, 11184048, 5325647, 11168422,
3245855, 6512119, 150870, 2022228, 11020352, 1374075, 7774447, 6051673,
11271627, 5226016, 8551844, 1626899, 7840111, 7771496, 8835699, 4798535,
201001, 4798448, 11077159, 4572911, 3239596, 2980120, 5028197, 5222976,
1578170, 1832246, 1944863, 3674077, 11205532, 2158104, 11103145, 2154778,
6196806, 1921540, 3247883, 8930428, 2056693, 6337268, 5941826, 1886396,
10974981, 1886066, 203029, 3204933, 10065476, 11168407, 3515644, 8542248,
1675329, 4610781, 8028039, 11030002, 769575, 2361040, 6445195, 2129604,
11295978, 3234089, 242026, 1063038, 1455040, 6928092, 2174018, 2267752,
2386636, 4614823, 1380086, 4812213, 2980265, 1523559, 5100256, 2204443,
7855641, 5457577, 2027162, 5223106, 1933438, 11278094, 11313555, 5028463,
1881093, 3242985, 6016192, 5029140, 8924558, 2206752, 8718038, 6249022,
8999293, 4608024, 4713272, 11296180, 8925000, 7110524, 11312875, 3247887,
144000, 1899876, 10979358, 3546678, 1521697, 11168309, 4776894, 9003306,
5027951, 7854143, 9002060, 8685838, 7840198, 2136238, 11031663, 3867310,
3247205, 5739688, 3234365, 3247043, 2984252, 6051838, 11020273, 1609327,
6866644, 1910235, 5677169, 2188337, 5783094, 7842420, 6025310, 7855565,
11266427, 11177429, 4798693, 1523080, 11020263, 336849, 6740925, 1984283,
3542776, 8586241, 8876080, 2065299, 1602432, 5848079, 1570193, 6626375,
2481120, 1935763, 2976290, 5782625, 5038594, 6019121, 3544654, 5677531,
7842622, 8984600, 8030892, 1521560, 1886332, 1933848, 2150059, 11028957,
4618616, 4798705, 11102837, 3542623, 7844126, 2206909, 7846418, 3533366,
8916952, 2026852, 8686705, 11171290, 2970648, 8940119, 7770637, 6453540,
2127268, 6195542, 8776032, 7847235, 10061533, 5846846, 1909901, 4572976,
919654, 4874160, 8924839, 11241739, 5035643, 9004693, 11205221, 2091744,
8757009, 5099948, 8948966, 8925064, 2031216, 11434923, 2136344, 2017475,
8938202, 8692295, 11168717, 2153167, 7849038, 7841956, 7854809, 6423881,
1942679, 1863464, 5167890, 8991000, 7167256, 5043335, 8987035, 456523,
3243138, 6669539, 7110613, 2162149, 2022125, 4812069, 5387850, 11227702,
6928160, 2026804, 2004176, 5223351, 2197348, 1669825, 2154178, 2438708,
3515530, 5177251, 2126988, 2206664, 11076937, 11186460, 7066142, 2980094,
10989593, 7842974, 4605448, 8696498, 11143540, 8823935, 1942160, 2162126,
3541785, 9012805, 7066013, 6253408, 5028880, 6698028, 5097837, 4798539,
6239595, 7911241, 2031392, 11063782, 8831385, 2386728, 7852212, 8999027,
5382688, 3246937, 2157794, 6017766, 10307128, 11301484, 1919170, 11177184,
7840265, 5423329, 2360793, 6242696, 11286875, 11144917, 8756143, 9004342,
2132512, 2101456, 1174219, 11296651, 11174741, 11313229, 11306883, 2022950,
3521198, 7853306, 6014153, 5111341, 8128339, 8770869, 2101312, 11222614,
6512127, 4572751, 11314423, 11172774, 7770726, 1945063, 6337272, 1892495,
5282709, 4618632, 8962852, 6089930, 4614888, 11336968, 8578815, 7841154,
1444379, 2167792, 1915968, 1952290, 7071247, 6051659, 1602333, 1058991,
6857528, 1886330, 1515817, 2151713, 5035645, 1871963, 11035405, 8938272,
2267591, 11228026, 2156819, 2361035, 7853209, 8990826, 2158168, 11145068,
11151158, 11269133, 142752, 4812229, 8999040, 7771584, 4812046, 7048046,
11314421, 7841134, 193710, 8767567, 2183602, 2041964, 7849574, 5225928,
7851870, 7848270, 7839888, 3234105, 11161813, 11311824, 1444344, 11294146,
8121585, 4614706, 1374077, 1944968, 9010925, 273790, 11307088, 11143384,
7853463, 5284294, 8991156, 1626422, 8916445, 8924559, 8129867, 7909384,
10769463, 10135468, 2153183, 1446941, 4869088, 11172773, 5111613, 6026562,
1064536, 11154789, 11764039, 11058113, 1066687, 11296487, 5112295, 8881824,
10307077, 6512117, 11243462, 3515643, 2065926, 8999295, 5109212, 11016114,
2186881, 1868872, 8023815, 2175749, 7153632, 11035025, 3798461, 5233870,
11205573, 2192068, 7842963, 5223366, 2062262, 11295966, 5032605, 308547,
7849446, 3246839, 8809862, 4610763, 11279181, 11168567, 5028195, 8542384,
4605112, 215335, 7853468, 7842383, 7839954, 1067808, 7844748, 2976397,
1379417, 2175659, 6671659, 4868752, 7844749, 2147016, 2025817, 11210803,
4763280, 8999021, 11022717, 5028883, 2583742, 5111004, 8685535, 5028991,
3529024, 6019226, 11029170, 11314059, 11168214, 6651328, 11031761, 5112025,
2066056, 2021444, 6019735, 2157818, 2184005, 10300502, 681852, 11292595,
3522762, 7218294, 2155887, 2197538, 9042182, 2984454, 2004109, 1444383,
2132234, 8986944, 9043976, 11162880, 1964007, 1511837, 11186971, 5739683,
1605111, 3245859, 11181382, 6081452, 2976395, 11155471, 7852026, 7855802,
2022293, 8476862, 1886483, 5286246, 8016115, 10986047, 8999017, 5735270,
7852254, 2147177, 3548550, 5782790, 2144718, 11075874, 4812176, 7849259,
11160830, 1573798, 11304859, 4610504, 11311214, 5035526, 11201524, 3515504,
2004200, 8916813, 8949478, 1894609, 11336631, 1567198, 2047037, 6726211,
2272724, 2021440, 10135338, 1910108, 11152978, 2378372, 8913806, 1880924,
8914144, 5805945, 2013640, 7849261, 8824284, 247782, 8881814, 8585727,
3528920, 2021935, 4874290, 2980272, 11289577, 8984326, 11201520, 2162138,
6093585, 2030908, 3243299, 5112811, 7776407, 5110255, 1679774, 8685536,
6511920, 26225, 11059219, 11168409, 11168405, 3515315, 9043816, 1871847,
2162408, 8754205, 3854736, 8916455, 7847903, 6550286, 11308822, 6540820,
2004020, 2021921, 4579512, 5111249, 8995264, 6743895, 11185773, 3515491,
1456462, 11172256, 6253184, 11022982, 7079584, 2144387, 11314442, 11239406,
2540816, 7847702, 1602407, 323822, 4610521, 11312882, 1063360, 2126983,
611538, 6196624, 1855401, 2094692, 4605260, 1874917, 9034847, 7841380,
2174023, 3535603, 8913892, 6013250, 11166228, 1868768, 8933010, 3515488,
8026677, 1626743, 1890122, 10311229, 11307134, 8943027, 8949192, 7110629,
2127104, 7853890, 2155779, 3474340, 3991106, 11144555, 5282672, 6194971,
11029992, 10589878, 6085457, 11424249, 3246843, 7851762, 11239707, 6089486,
108486, 8831483, 10985695, 6522060, 2033616, 2378446, 8378345, 4798549,
1944977, 3247193, 5413852, 11297687, 6081600, 1055758, 2149697, 4605376,
1886566, 9004689, 6476082, 7841282, 8027552, 2193741, 1722895, 11242563,
7110238, 673584, 7842397, 6013320, 4871544, 7769375, 11168215, 1059790,
6244890, 2029215, 5387908, 11168411, 1894596, 8981726, 2021310, 7841224,
6081597, 5785616, 11201763, 8929310, 6303821, 9002152, 7176860, 1613301,
8826637, 6327805, 2167794, 11092310, 7841784, 5101097, 8545166, 1380835,
5735782, 1669904, 9044206, 8911147, 3526699, 2156286, 1732369, 2976342,
2062204, 2174035, 8587759, 6423878, 7847904, 6014144, 5800264, 1521895,
1065083, 8023210, 3529163, 2056836, 5038760, 1448694, 8823835, 11296325,
7845668, 11155875, 11423935, 1963999, 4825731, 11423733, 11304961, 2153182,
8911246, 11172790, 5030907, 5039585, 4812059, 5944849, 2070369, 5220402,
8911336, 2382294, 8588963, 11204921, 11052290, 7849265, 6017771, 5038604,
2183865, 2976338, 6018135, 11279402, 3542605, 7852125, 1886224, 6084966,
11205406, 3309813, 5633328, 6194304, 1444284, 11214947, 199129, 2028338,
10311470, 11103156, 1851349, 2144378, 7842956, 3544477, 3462920, 7841016,
310407, 1675254, 1447101, 4605200, 8022458, 3318189, 3309822, 9035774,
2023279, 7007252, 8770868, 8586096, 11039291, 5953759, 1513419, 7770173,
8545085, 3247039, 11294562, 346127, 11058703, 2039107, 7110758, 2540694,
8809858, 2013571, 11266339, 8981520, 11317142, 11032030, 7841800, 7849151,
11050273, 1941317, 8028870, 7065840, 11152497, 11178705, 1070491, 1599859,
681709, 11081879, 2175213, 5225925, 2097413, 6926505, 8023567, 5225932,
2156150, 211357, 231823, 4803857, 6551133, 299834, 5179513, 5846794,
1453921, 2066053, 8995222, 5105154, 2540865, 1669831, 5101434, 5039699,
11315267, 714733, 1861716, 5039689, 2894364, 2062208, 9043728, 8754878,
6697820, 11075275, 8203278, 7850405, 1942357, 1602581, 11314745, 8946299,
8547656, 8830996, 3509752, 3535034, 7777762, 7854151, 6198245, 7853201,
7853114, 4868960, 1976053, 7110472, 5107782, 2171642, 7846333, 2206490,
3544645, 7842298, 8911102, 5225927, 3515772, 4605268, 5422942, 5167791,
8776277, 6423571, 1871953, 5110260, 1872378, 4572928, 5111357, 6194207,
8020521, 8878932, 6598542, 2003955, 3094159, 1890434, 2044668, 2204454,
9043598, 2180420, 11152195, 2197512, 2183501, 4614560, 8809845, 6470225,
2066368, 3234107, 8773416, 9008823, 6327817, 11311197, 9004911, 79482,
2378680, 439701, 1935503, 4573055, 1670085, 8911480, 1056704, 6188105,
2021918, 5413851, 4812072, 11243249, 5847093, 2066301, 6019490, 8578972,
8999277, 11022563, 6025554, 8023307, 7852877, 3533240, 5220584, 5486928,
5032742, 7850923, 11166171, 5167805, 1952509, 11160876, 1868993, 6194825,
7079373, 11277824, 5167635, 5036891, 8685452, 11277813, 7854134, 8720846,
2175811, 11077051, 2097308, 10132790, 7844582, 11204819, 11239705, 11168213,
299800, 11266286, 5556420, 8551848, 5946642, 1444384, 6094158, 1063731,
187267, 2378524, 1525951, 4869064, 7079533, 11022394, 2157913, 6644423,
1521546, 2171848, 5181647, 6017971, 8551692, 7855126, 8764445, 2150057,
1599708, 8875987, 2976056, 8023305, 301900, 3309897, 114627, 2126987,
1613322, 2167460, 11151141, 1894650, 2156135, 46854, 11022195, 10757534,
11423937, 6081744, 8984642, 1945390, 5486708, 2028781, 6774214, 3529164,
8837119, 11241222, 7845675, 8718157, 2062360, 11149000, 4798695, 11022977,
3540425, 5800488, 2197111, 6423364, 8809857, 4798536, 9012893, 6019635,
2068249, 4825696, 1876594, 7839884, 1963791, 8694038, 7850754, 11313071,
11177288, 10654566, 11221210, 8916459, 6927848, 11152190, 11170610, 2210532,
2984155, 8806952, 1447087, 5167880, 8924995, 11184192, 11348534, 11041786,
2153285, 1876683, 2162360, 7171456, 11150840, 6199129, 8770872, 11028958,
2174017, 4886419, 1935499, 11172466, 3515790, 11046881, 2105430, 10301906,
8019414, 3241546, 1880919, 8809859, 2147086, 7851284, 3544488, 1732200,
5027414, 3236803, 2154024, 3541687, 5942159, 8833061, 5167792, 2066144,
2150206, 3469925, 6511927, 11022389, 3538514, 7854144, 1914447, 2437102,
2091989, 3536369, 4798656, 2267596, 8936330, 4618893, 4585994, 8588809,
11313659, 1908471, 11168721, 5035913, 6709416, 11278230, 1599864, 6564637,
6192758, 5114045, 8121530, 6081480, 5038917, 11047562, 7846545, 1863499,
10975146, 1055771, 6025205, 1373933, 3515544, 11143475, 3243304, 11168719,
2976016, 2975953, 4803960, 11278235, 8773329, 6249144, 11183031, 3242789,
2976216, 6194979, 2136360, 219036, 2277215, 7853885, 2037976, 2154112,
1067742, 6337269, 5944869, 8544824, 11241730, 6192518, 7853207, 11278083,
1933680, 10985678, 1525501, 8718298, 3546757, 11048235, 7771704, 1447084,
2044408, 11205820, 4812280, 1519875, 3246829, 1946886, 8027881, 4605356,
2209014, 2174703, 3247058, 3243293, 5107301, 5181878, 11231446, 7851856,
3542683, 11162800, 1447085, 2059166, 6337172, 214980, 9008757, 5949186,
2980009, 3243307, 11313551, 11211151, 1373980, 5331140, 1521693, 2970632,
7843290, 2202853, 11065138, 5167660, 1067260, 2386792, 6927935, 7841149,
36620, 6546077, 7219126, 6725649, 3515736, 242013, 11186974, 11241211,
11175749, 11296485, 1062117, 369622, 11314229, 1935913, 8128333, 7159024,
2173709, 3679078, 2062004, 11314331, 11168566, 8823453, 4607907, 6194297,
1683610, 6337267, 5846925, 8578653, 3515712, 11267675, 7851294, 343261,
8027053, 8924555, 1909770, 5107500, 8823724, 8545097, 2153940, 6427271,
7110680, 4572872, 11081680, 2976380, 8760630, 2066300, 2152243, 11296336,
1512048, 1871955, 3242995, 11022303, 11168734, 2136516, 6021357, 11363916,
1067898, 2976122, 3234099, 3546672, 1613307, 7079360, 5035907, 8932873,
5178955, 1865983, 2039103, 2175375, 1447048, 1513922, 6709646, 5038905,
2062000, 6574886, 6470377, 1670246, 7842112, 11178711, 7065622, 5495274,
11169560, 6598547, 8924573, 5945200, 5038337, 4614724, 312238, 6459546,
8946262, 11168426, 183575, 6202993, 8987022, 3538189, 6725907, 3246840,
11014184, 1521799, 4643072, 7851289, 9092791, 1863175, 3529011, 11314214,
6085727, 8720638, 7843333, 5041157, 1981714, 8826653, 345800, 8889478,
1935917, 7854149, 11297078, 5038765, 2197200];

var allWords = [1445964,3803852,3315780,4001244,35178,3690986,8260746,
8770450,175786,7065578,1599442,3515226,4886154,421850,
8226270,1441934,8296574,1899586,5486442,7771322,2023970,
8527090,8562242,8301306,7846358,8303334,8760310,10306998,
6528834,5616234,5176834,220402,6196242,1679210,2136186,
5495230,10978942,5635838,6092814,8377694,11049922,8835346,
242034,2069938,8573058,11877346,8312122,5816330,8366228,
3954652,8226972,11214892,758524,8527116,336700,7773376,
1446016,8300656,6648512,8283756,11025612,2975804,3889756,
1905020,7845708,8304036,1062724,1450072,8304712,4614428,
1573780,1452776,8307416,8483176,1454128,6094192,6199648,
8435180,8612318,8647470,8929362,10512554,1443338,7841002,
6540378,2023346,5556798,5945498,9215310,8477118,8564998,
5948878,6019182,10659246,6424782,6336902,2276846,1382498,
1452802,5847478,3845166,1156038,9012510,10138050,350246,
1458210,8312850,142064,8298004,8370336,8463624,1980108,
8483228,7921472,1564394,298922,8524490,7771426,4120350,
2136290,8834774,8483254,211068,3866876,8524516,8999068,
2197156,2267460,2059252,8527220,7843108,1972724,3958812,
6700668,11270428,8230456,198900,8477196,5805644,9004476,
339508,1905800,8760440,11045320,6651320,8584680,8233836,
1942980,2066012,8463676,1626612,152256,6092944,8483280,
1454908,8309548,242164,4003428,6857526,8913918,3309878,
1605006,2975934,8916622,1573910,5233774,9452014,8227804,
1443468,8298108,3904108,8473868,11269128,8229832,8809840,
1448876,1449552,7847216,1907204,114452,3858816,1452932,
7850596,8465756,3544476,8571212,3247036,8590140,7853300,
1914640,2038348,8301514,374738,119210,5955794,8298836,
196300,2059356,2976012,339612,8232588,6854926,4605198,
6608862,1599702,2056678,2970630,8454342,8911318,263926,
8489494,11266502,2162134,8647678,8226530,1899170,1513174,
8473270,72618,7841210,5275114,4607902,8263710,8316438,
8773414,3465462,8615230,2252718,8229234,5031078,8229910,
1515878,6085638,8018998,5839574,8231262,8319142,2062086,
9004606,427518,1975558,8478678,1799798,5455606,1905930,
5104762,8373898,1624714,5456282,3207230,8233966,3277534,
8304270,1730846,3101774,8288046,1450982,8305622,132782,
6091046,8481382,2224326,6533826,8484762,207142,8450286,
2140502,7783074,10982582,8348912,6081608,2162160,9034376,
5941676,8824140,8472620,11267204,20592,7841912,2059408,
8457072,8914048,8231288,1868776,3696680,1886352,6456112,
8284016,8301592,111176,6508840,2062112,6631872,8459776,
8530080,8233316,5949112,6195176,8480056,149708,1063660,
6547372,8411104,2031016,8991112,8129888,2206776,9078992,
1451684,5388708,8834956,4618744,8435440,228826,334282,
6522386,2022930,6188442,6698822,7771634,2024282,8914074,
8229962,6595394,3310034,2026986,8424650,216658,3872466,
6192498,2150018,7845994,8355698,8584186,8233342,5035862,
8234694,8691670,8235370,2031042,11188138,1840410,1841086,
7781774,8238750,1454414,8309054,8379358,311974,2139878,
11296974,312650,6203314,1863446,1933750,1511926,1793142,
8647782,4572854,4643158,8527454,8984430,11269310,7773038,
8371298,5946486,5278598,3520998,5805878,1890486,8288150,
7110558,8991190,5037266,10977954,5107570,6706986,4017858,
11329474,8307754,8308430,8378734,8484190,1454466,7852130,
1841840,8239504,18018,8401770,2039258,8524802,8226686,
1443026,3780634,8473426,8578882,529750,3957070,1374074,
1831050,5029882,7771738,8228714,38298,1426802,1883778,
11058450,1057706,2059538,266786,2129842,2164994,8562658,
9019634,5031234,5945186,5171842,2025738,5277298,6191250,
8933106,8581586,8687718,8231418,5102890,3837418,8424754,
8934458,3521050,1448434,1449110,8303750,1449786,7847450,
8761402,5175898,8234798,9043294,27482,132938,1521442,
8236150,6021574,3210766,8237502,8764782,8378110,11682398,
1453842,8308482,11050338,8378786,5040022,5110326,1067846,
8379462,1964898,8450442,5041374,1912846,8486270,8435570,
228956,6188572,8578908,1057056,1446432,8301072,8758048,
1448460,7846124,3909100,8478860,6021600,7849504,1065168,
1979120,8376784,6707064,3668444,5496348,8308508,11507340,
8941244,7852208,7922512,6305520,312780,10982764,5639660,
210028,8489702,11372166,3767166,8881782,11184238,8233498,
5949294,8234174,8480238,8270678,2013622,8411286,8446438,
11188294,11205870,11241022,152594,7007234,6867978,7781930,
8239582,1373476,7843472,8810152,8233524,1062516,3909828,
8479588,5175976,8305180,8568820,1839916,5038748,7780604,
8237580,3738124,8307884,1066572,8378188,5847244,8484996,
6097364,2021786,8911578,8999458,8422154,8457306,8527610,
8230170,2062346,6192706,2150226,6719986,2273258,8622250,
2284074,6240052,6732180,2197572,8647964,8421504,5100316,
6734884,2976324,11274900,1450592,7848256,8428940,4878588,
8422206,2027246,8424910,2976350,2167854,1449266,8303906,
5949398,6019702,1521598,2066454,8464118,8349224,422448,
7051304,2131376,8460088,8921120,8307988,1980628,8454706,
1886690,6456450,2062450,6194838,1064674,2031354,8464170,
2171962,3542890,3845738,6253650,11280386,11089754,2055690,
8453354,1441233,8418905,8226245,5097717,8296549,176437,
6644405,5378933,8577765,36505,6434169,11003929,124385,
8349953,8402681,11022181,8421609,8316829,11058685,8562893,
8352657,1972569,8564245,8581821,9038797,8424313,6244889,
321777,3538185,8564921,444809,2272713,5946773,304877,
3960685,8583173,1447993,6017753,8302633,305553,8233005,
8285733,11027589,1448669,8303309,8408765,11150621,8426341,
11168197,8443917,6651165,323805,3997189,6299645,8584525,
3681497,4578549,6441605,8269509,61517,3260349,8287085,
11028941,1450021,8304661,8339813,149397,8410117,8462845,
8568301,9482253,11310157,430613,8587229,1856973,8254637,
10996493,46645,1892125,6461885,8289789,11031645,1452725,
7850389,8307365,3755181,8324941,1066053,8412821,11154677,
8447973,11189829,8465549,11207405,8500701,310285,2138189,
6707949,11277709,2261221,5952857,1453401,6023161,7851065,
8308041,6532865,4265561,8413497,6198921,2156441,3984345,
6726201,11295961,346113,4001921,6743777,8571681,1454077,
8308717,8361445,4723213,346789,8572357,9486309,8291817,
8414849,4776617,8537881,6095493,8293169,8416201,8433777,
8468929,8539233,11316241,1457457,7855121,8312097,2037465,
8575737,7785493,6660629,8278401,8401433,11143289,8419009,
8436585,11178441,6626257,8454161,11196017,2126801,8524465,
3532881,8559617,11301473,8577193,9034169,10862073,7101485,
6856097,2005121,8402785,1373061,5099173,8298005,10125909,
5626453,2251861,3711345,8316257,8492017,8527169,11269025,
8562321,2991405,1375089,7772753,5558177,8932769,5839393,
1938873,11078393,8459569,3205697,3206373,7776133,10974965,
1905749,112997,8426445,6194293,8567053,1379145,8233785,
10659273,1730665,8287189,11029045,8304765,8761741,114349,
8375069,2065285,3893189,11204805,6740501,8568405,11310261,
8692789,10979021,8307469,8342621,6585021,8412925,2050413,
8448077,714637,5460157,8694817,10065745,1910481,8308145,
8835425,5742049,8940881,4002025,8571785,8238517,1454181,
8308821,8361549,1524485,6199701,346893,11314317,7853197,
8028957,2193725,11350821,8767825,2897441,8312877,5184349,
11423829,8366359,3814175,2970527,8559695,8421791,8938255,
242191,8573215,3234193,3849353,11160969,8244029,8296757,
11004137,8297433,1443469,7841133,8298109,8755085,8368413,
6188989,1567177,8527273,6489133,8317037,11058893,1515125,
1832169,8335289,11077145,127297,8809841,11165025,8475897,
9391877,1448201,7845865,8302841,1975481,6422885,10992645,
1448877,8303517,11080525,8408973,8426549,3207153,8233889,
6423561,5035733,3717533,8287293,7847893,8304869,8340021,
11081877,8832149,8410325,8568509,8340697,8920705,343617,
1451581,1627341,8289997,8413029,2032941,8430605,8483333,
8536061,2155973,11295493,8308249,8413705,5742153,7851949,
8308925,8484685,9398637,11296845,2174901,8572565,155013,
11350925,8312981,6854173,11423933,8243431,8278583,11020439,
7839183,8296159,2373047,8331311,8348887,6081583,8436767,
8981623,2144559,3515487,2162135,8559799,9016775,1722735,
6327647,8612527,8647679,7771583,8246135,3236975,8298863,
8914023,8984327,9001903,8562503,8650383,11184031,2976039,
3889991,8459751,11201607,8494903,9004607,2167543,8565207,
2202695,8252895,8270471,8340775,4825575,7110455,2136447,
8569263,8621991,11363847,8256951,1894439,8292103,11033959,
1455039,8309679,8766655,11051535,1525343,2052623,4812055,
8538167,2108055,8243509,8401693,8524725,8981701,8559877,
914993,4570801,8226609,5273841,8472673,36869,1864773,
3692677,1952653,8403045,1443625,8298265,1935753,3781233,
2023633,8492277,8562581,2639469,6489289,8317193,5945109,
11042149,11077301,1972933,2025661,2183845,8581509,75401,
8476729,8424677,2976117,4804021,2167621,1448357,3276261,
8302997,8478757,7776393,8233369,8286097,8303673,10658857,
8426705,8479433,8567313,8584889,8234045,1853957,6423717,
8251621,1872209,8287449,1450385,7848049,8305025,8340177,
1977665,8410481,2065545,11205065,448553,2276457,3665637,
10977253,8252973,11029981,1451061,11065133,11082709,8358429,
8411157,11153013,8428733,8446309,11188165,2980173,8463885,
1679549,8534189,2154101,8569341,11241569,4581617,5038593,
8237425,1892489,8290153,1453089,1910065,5108897,7850753,
8307729,6514977,1066417,8413185,8448337,240345,6198609,
8571369,11313225,11770201,1981045,8413861,11155717,6199285,
6304741,8238777,5110249,8309081,11103665,2175057,8572721,
11314577,1947245,8415213,8889765,8467941,1683605,3054533,
6253365,2158157,11297677,8573397,1526097,8697781,1456469,
7854133,8311109,8768085,1983749,8434141,2071629,8539597,
2159509,1457145,6026905,8311785,209249,11317281,7785181,
9156109,1457821,8330037,8347613,209925,8488221,11300381,
8488897,3656251,3234427,4605355,8718139,8278739,8296315,
8331467,5167787,8401771,11143627,2039259,2056835,4798691,
8454499,8911475,8999355,8559955,369539,4025347,8612683,
11372115,8647835,439843,2267747,5486859,1883779,8281443,
5557163,7842043,8299019,1514683,8369323,2041963,8457203,
8914179,2129843,8527507,2200147,8615387,8650539,7844747,
8301723,8336875,3837419,8407179,5225923,8442331,8459907,
8477483,2150123,8547787,3538627,8565363,9022339,2273155,
3243891,4614819,8288203,3314195,8340931,2048723,6618483,
1152347,1609323,5282707,8481539,2154179,11293699,8622147,
3318251,6095259,8837115,2035203,2052779,2984307,4900091,
9012875,8573475,8560033,2267825,5027933,8226765,18773,
1846677,10986197,8578285,9264425,6575297,8403201,9317153,
8228117,8368725,8474181,91781,1919685,3747589,6489445,
8317349,11059205,8475533,11305269,8424157,8529613,8407257,
9004841,8303153,8251101,11080837,8409285,201293,8426861,
2152229,6423873,8322081,3471105,8497841,11239697,8234877,
1872365,6442125,1889941,3260869,8287605,8744581,9201557,
11029461,8340333,11082189,149917,1995397,11134917,6582733,
8410637,8463365,8568821,11310677,431133,8657377,11241725,
5952701,8237581,8255157,8290309,8764861,3755701,3316301,
8343037,6093309,187773,2015677,8413341,8430917,8466069,
6655741,8501221,293229,6708469,8536373,11278229,328381,
2156285,10997689,8308561,8414017,11155873,9468577,4002441,
8572201,11314057,6481333,8309237,2034605,3458261,8572877,
11314733,9047429,5461925,11424245,229061,4095781,1443885,
8298525,1448617,8303257,8307989,8431021,3984969,8309341,
10982921,1441234,8226246,7839574,703718,1160694,2127374,
8226922,8402682,11144538,1900238,8297902,1935390,11074910,
1970542,8368206,2128726,37858,2146978,8299254,8316830,
1445290,7842954,8299930,8932666,10304270,8283706,8459466,
1675130,6192838,6298294,1447994,8302634,11044490,8320886,
1518974,2432926,10658494,8408766,200774,8426342,8443918,
11185774,8479070,271078,8496646,2204438,10939710,5948802,
8233682,8303986,8374290,8479746,3927562,6669418,8497322,
11239178,8585202,1450022,3277926,7847686,8304662,8339814,
1520326,237278,8462846,6722822,9007702,6740398,8568302,
11310158,8235710,1451374,8306014,10590894,8358742,11575150,
2031382,6196894,8481774,8938750,3964742,5388398,6866134,
6426734,8254638,10996494,3720030,8289790,11031646,1452726,
7850390,8307366,8764342,10592246,8412822,2032734,8430398,
8465550,11207406,714534,5741270,6198246,3930942,8500702,
8535854,2155766,345438,2173342,8571006,11348014,8237738,
6444986,1453402,8308042,8413498,11155354,8571682,8589258,
8308718,66250,8414850,1577786,8432426,8450002,8502730,
3968122,329890,8239766,1455430,5111238,7853094,8310070,
1982710,1456106,8416202,6202302,2267410,1512318,5028194,
5836690,1443366,7841030,8298006,8368310,23090,3854658,
8424418,534822,200878,3856686,8426446,5737318,8567054,
2153166,6740502,8568406,9482358,5335098,8306118,3702558,
1452830,8307470,1944958,152206,1066158,2067990,1171614,
8483230,8571110,11312966,2156546,346218,4002026,8308822,
5461510,2214006,1863240,4605096,6433000,6450576,8278480,
8770608,8366360,8419088,8436664,228672,2970528,4798432,
2091728,8489392,8946368,298976,2126880,4868736,8067568,
8524544,11266400,8559696,2197184,8594848,4956616,8612424,
422008,8647576,6927832,8316336,178648,196224,7050864,
6611464,8439368,2129584,8984224,3535664,11339408,8615128,
11356984,6403256,8231160,8248736,40744,3239576,6438408,
8266312,5102632,8406920,2026832,673480,6614168,7071144,
2061984,2975936,6631744,8459648,8494800,4874144,5331120,
5788096,6702048,8072976,8986928,9443904,8565104,2202592,
8600256,11342112,11869392,6442464,8270368,1890280,8340672,
5176992,6583072,11152832,202984,3858792,6600648,7075200,
8463704,2540592,4825472,5739424,6196400,8498856,343592,
9026136,9043712,10871616,4966080,8621888,8256848,101584,
2386464,8344728,8450184,5339232,8081088,2157976,8573216,
2037648,2055224,1615824,5273686,1443470,8298110,8421818,
11077146,148254,8426550,7776914,10589074,8726694,8304870,
8515782,8463730,3929798,8272422,8307574,8430606,3966302,
6445194,11296170,8571890,5039790,1454286,7851950,8308926,
8310278,8767254,1982918,11350926,3234272,1880920,8278584,
8296160,8331312,2039104,8436768,8454344,8489496,8946472,
6696744,8981624,11266504,8999200,8559800,9034352,2197288,
4025192,8612528,8647680,4607904,4643056,6927936,8316440,
8334016,4713360,8439472,2094536,8949176,2199992,8615232,
1446928,8301568,8776120,2044512,2062088,8916728,2097240,
8494904,8951880,8565208,5493464,8288048,2382512,8340776,
2013416,677640,7075304,4808000,8463808,7110456,8938360,
8498960,2171600,8569264,8129864,8586840,8621992,2259480,
8657144,2277056,8256952,8309680,11051536,4812056,2108056,
58476,8718062,11020518,193702,8419270,11161126,8946550,
756134,2162214,3990118,8559878,8244186,10986042,141650,
2022282,440442,8227286,3692678,6434534,8403046,11144902,
8473350,8227962,986650,1443626,6013386,7841290,8298266,
10583146,6189146,8281366,8317194,1972934,6191174,2183846,
462074,6016090,2079066,2993018,8476730,8319222,6051918,
8424678,8459830,8530134,8565286,1448358,8302998,8233370,
10992802,8286098,1449034,8303674,11045530,1062362,6089098,
8426706,11168562,2995722,8567314,447202,1836382,5035214,
8234046,1853958,3681862,6423718,8251622,10993478,7847374,
8304350,10659534,6617054,8444958,11186814,6669782,8497686,
8954662,2170326,8585566,1450386,8305026,11046882,8322602,
114610,1942514,6512274,149762,6090450,8410482,11152338,
2065546,8463210,2171002,6740762,8586242,6775914,3243814,
1451062,1908038,7848726,11047558,8323278,8411158,11153014,
8428734,11170590,677718,8446310,11188166,8499038,8956014,
9008742,8569342,2277134,5037242,10977930,1451738,6021498,
7849402,8306378,11241570,309298,11294298,4018510,5495570,
1857338,10996858,8290154,1453090,8307730,11049586,3773122,
152466,8413186,11155042,8448338,3896154,6638010,8465914,
9379866,8501066,2156130,6725890,996790,1453766,8308406,
8765382,11050262,1981046,346478,2174382,8572046,5953898,
1454442,8309082,8361810,347154,8572722,1894518,8503094,
769654,1683606,2140582,8538246,347830,3546662,1455794,
8310434,6095858,5041974,5955926,1456470,8416566,8434142,
8504446,11281454,1843818,5042650,1457146,8311786,613498,
9156110,1457822,7855486,9419750,1458498,6028258,8313138,
11054994,1985778,5027180,8243588,8331468,1055004,2882908,
2004108,2039260,8436924,8454500,2091988,8489652,11231508,
2127140,8612684,8647836,8281444,5100188,8299020,8439628,
231636,8492356,11234212,2217724,8615388,8231420,8248996,
8301724,8442332,2062244,8477484,2097396,8495060,2150124,
3538628,8565364,3700868,8270628,8780332,8340932,677796,
2048724,4808156,8463964,5282708,6196660,8499116,2136604,
9008820,9043972,8622148,2277212,4618876,6464356,8292260,
11034116,8309836,8766812,8784388,4812212,8028620,312756,
2158236,11297756,2210964,3548092,7855564,2059592,10986198,
528478,1442430,7840094,8297070,8824350,11022702,6489446,
8317350,8319378,2976274,3521130,8565442,8303154,3241942,
8760806,10588710,8426862,11168718,8444438,271598,3997710,
8567470,11309326,992890,11029462,3735422,8832462,8568822,
5107702,1522198,274302,11241726,8694558,8255158,3245998,
8290310,11032166,1453246,7850910,8307886,8764862,8325462,
152622,1980526,3861158,8430918,8466070,11207926,8536374,
3984190,9010926,996946,11103146,8414018,8501898,11243754,
6726722,5847922,3247350,7852262,8309238,11051094,6094662,
8379542,6744974,11314734,7219526,1912926,8313294,3247402,
6626778,8454682,1372906,8227546,6592978,7841550,10659118,
1836642,7777330,8234306,8304610,5281538,8572306,8309342,
6200222,8525012,8418907,18255,8297227,124387,8402683,
3200863,8227599,8473663,8316831,11058687,109515,11076939,
8475691,8423639,6578835,2061803,8916443,7845659,1448671,
8303311,8373615,2028679,8566951,5948803,7776707,8303987,
2046931,8462171,8497323,11239179,11011367,8339815,6547063,
8410119,11204703,8568303,2296375,8254639,11014071,1452727,
7850391,8307367,116951,8342519,1066055,8377671,8412823,
8465551,2138191,8571007,4106703,3791011,11102627,5039583,
1454079,7851743,8308719,8484479,6744455,1859003,8256667,
10998523,8291819,8889403,8537883,8573035,6025191,8837351,
3213707,8293171,1456107,6025867,8416203,8468931,8574387,
5956915,3250211,8927259,1458135,7855799,8312775,8278403,
7909307,8419011,8454163,2126803,6239587,8524467,11266323,
3515307,2197107,8612347,11354203,2742639,10985783,5097823,
8296655,8560295,1723231,8120895,8577871,2250511,1372387,
2286339,5942147,6574883,8402787,8473091,5028871,8281107,
11022963,11163571,8439291,8456867,8492019,2129507,8527171,
8562323,2199811,8597475,8686031,6489031,8369663,2991407,
8229731,5839395,8581251,1868571,8283811,11060819,8424419,
5805595,9004427,1448099,8302739,6580291,1448775,8303415,
8320991,8777967,8373719,8426447,11168303,8479175,3470015,
8567055,5948907,8304091,1062779,8831371,711259,3910091,
8479851,8954403,7777487,10976319,3242879,8304767,8761743,
8375071,8568407,11381243,8694143,10979023,1452831,8307471,
2894063,222511,8448079,8465655,11207511,8483231,6708055,
11277815,3544375,8606263,10593027,3791115,8378451,8413603,
2156547,8239871,5111343,8380479,6201055,8485935,8942911,
5955667,7783571,10525427,1456211,8311527,1984167,17761,
8401513,8419089,7949945,3683033,2030889,5229721,8428553,
3999401,8621889,4003457,8717907,8419115,2056603,6837275,
8244031,1442795,7840459,8297435,8807139,8402891,11144747,
8930171,335507,8561075,11302931,11022391,1970751,8473871,
9001151,8246059,8421819,2059307,8562427,8317039,8809843,
8232539,1448203,7845867,8302843,11044699,6458039,3856791,
8426551,6423563,7847219,8304195,8497531,7777591,1450231,
8304871,1942359,8340023,1063559,8410327,11152183,237487,
8480631,8568511,8428579,343619,11241415,6724383,5495415,
7850599,2015367,8413031,8430607,8571215,8237947,3703339,
8273099,11102835,8413707,2051195,5039791,8238623,1454287,
8308927,11296847,8572567,11419879,5955095,8239975,1455639,
8310279,8380583,242895,8486039,8943015,11350927,5955771,
1984271,8838911,8242003,6028103,6174821,8459701,8243511,
8559879,10986043,8296915,1969555,194379,299835,6697499,
8807295,8403047,8473351,8578807,11022547,8474027,8404399,
8527431,9001983,3535847,8317195,5945111,8300295,11042151,
6507543,11077303,1972935,6824587,8881655,11166535,8565287,
8478083,1870859,3698763,1449035,8303675,148411,8426707,
218715,8022459,8479435,8567315,5035215,1449711,8304351,
1063039,3207987,8234723,1907363,7848051,114611,8340179,
6582579,237643,2065547,11205067,11292947,8252975,1872887,
11029983,8411159,2031071,8428735,11170591,8446311,11188167,
238319,6249311,8534191,11416655,8236075,1451739,7849403,
8306379,1382787,29435,8255003,1910067,8307731,1066419,
8378035,8413187,11155043,8448339,11190195,8501067,8536219,
328227,2156131,8571371,11313227,3668343,8238103,1453767,
3281671,7851431,8308407,135567,5039947,1454443,7852107,
8309083,11314579,7782479,1876943,8274607,8415215,207223,
224799,8450367,8503095,312679,2158159,8573399,1455795,
6025555,7853459,8310435,1983075,7783831,8293535,1456471,
7854135,1983751,2036479,8434143,11175999,243727,8469295,
8504447,2159511,8574751,1457147,8311787,1984427,6027583,
11177351,1458499,7856163,8313139,8243589,4605357,6433261,
2373205,8331469,5167789,8436925,8911477,8489653,8559957,
2197445,8612685,8647837,7771741,4608061,1444381,7842045,
8299021,8334173,8404477,8914181,2129845,9002061,8650541,
8248997,1868909,8301725,11166613,8495061,8952037,1521445,
5177253,2013573,2031149,2048725,11205821,712949,2997829,
4825733,8499117,8956093,4931189,8622149,8257109,8344989,
8450445,2105509,2158237,11297757,11385637,1387597,8242237,
6425175,6618511,8278819,8419427,8454579,8524883,6416439,
5028611,8684419,8297747,8403203,11145059,8561387,11022703,
1443783,8298423,8422131,8562739,9019715,8317351,8580991,
2976275,8565443,8232851,1448515,8303155,183043,1871015,
8303831,148567,8426863,2152231,8234203,6423875,8251779,
184395,11151819,8497843,5493023,3243295,8305183,8340335,
11082191,8410639,6635463,11205223,3524511,8568823,3876707,
6618563,1451895,7849559,8306535,2031903,11171423,11241727,
5038751,8237583,1453247,8307887,11084895,8466071,1172031,
8483647,11225503,310807,8536375,11278231,9010927,5847247,
4107223,8414019,8572203,8311943,5027311,2021815,5677623,
8437055,2970919,5835807,530559,2027223,2062375,8278923,
8527691,6194139,5106455,8305287,8477017,2130756,1448672,
8303312,1450024,8289792,1452728,8430400,8465552,8922528,
9010408,1453404,7851068,8308044,2033412,8571684,1963784,
1455432,8310072,1441938,8753554,8463550,4825318,8278352,
1446020,8300660,8476420,8588636,213698,1445370,7843034,
8300010,2026730,8565002,1876658,8731298,8829344,11292688,
6025296,8468360,1444746,8278456,8527224,9001776,7772808,
1445448,7843112,8233840,2975938,7841136,8473872,2060660,
1448204,6193724,8285944,5109420,6456038,8232592,6081586,
1599706,8454346,3780482,6083614,3869714,1444902,1376626,
8916730,6019394,1943114,11082634,6091050,8498962,1908638,
6093754,2175658,5955174,6025478,7853382,8310358,8261036,
7769584,10968416,2988912,10300528,10757504,8578080,7841916,
1602436,3043668,11269236,8580108,8266444,8530084,8565236,
8233996,7847324,8761276,10132204,8655820,3823772,2980124,
2171628,2206780,8569968,2035076,2140532,1897172,8294836,
5782846,2162190,1443602,7841266,10126146,2181794,8615286,
10654778,919702,8830930,10132230,2997050,3841374,8428710,
5792310,8622046,5284634,10136286,11155694,153794,2140558,
6253342,3916410,5922778,8430764,6093832,8718090,8298970,
3203958,8230694,1622118,8019782,8266522,1890490,8956042,
8378062,8309812,1525476,141730,8597814,6191254,8476134,
8933110,8582266,41006,4610766,8266574,2976198,1450466,
8305106,2154182,1453170,8308486,8731662,6517086,8608630,
6025634,5181986,7770416,8930432,2027120,7775824,7846128,
8305132,8308512,1173332,7114020,6709772,1933858,2092042,
8560010,8457258,5031966,2061622,5453790,8266626,8234854,
6094638,2034582,8380194,1913578,227634,8353180,1448516,
1381592,8483648,5285492,8457310,8984590,8562766,2079250,
8424862,2167806,1960950,8527640,9002192,10304844,1448568,
8437082,8685850,8264026,5557322,2042122,5171326,8301882,
2062402,2976354,8565522,1890698,2048882,8464122,8693286,
8482374,1894754,8433026,769890,8542564,8527692,8569604,
8237688,8307992,1980632,7921320,2062454,10985681,1442589,
7840253,8297229,141965,335301,8560869,11022185,1443265,
7840929,8297905,1935393,8473665,231197,11268925,8316833,
11058689,6085357,8406741,8424317,2061805,8459469,8529773,
1447997,7845661,8302637,11044493,1975277,7915965,4120225,
8426345,1449349,8303989,5035529,8287089,8304665,114249,
6511913,8339817,8410121,6195545,8480425,5844025,7920021,
1382425,3702457,11014073,8289793,1452729,7850393,8307369,
2032737,8430401,8447977,8483129,6707953,2155769,8571009,
3703133,4001925,8571685,1454081,8308721,11173609,6726881,
399521,3317813,1577789,8467581,1683245,8573037,2210525,
8239769,5111241,7853097,8310073,8591289,8468933,11210789,
1456785,8311425,1457461,7855125,2072621,2142925,1458137,
8312777,8419013,2126805,8524469,8981445,2144381,8559621,
2267413,8297333,8807037,8824613,8402789,10582889,8245957,
8281109,8421717,8456869,8527173,2147085,2270117,2043657,
8916549,9004429,3241529,1519081,8426449,11168305,8567057,
11308913,5034957,8304093,11186557,8287193,11029049,8375073,
8410225,11204809,8568409,8287869,2382333,7850497,8307473,
152209,11172361,3878321,8448081,8465657,11207513,2156549,
346221,8571789,11313645,8238521,1454185,8308825,8027609,
346897,8572465,399625,7782221,8291925,1454861,1457565,
7855229,11177093,8312881,11423833,8524573,8559725,6697345,
8297437,1952501,9264117,6082861,8473197,8298113,1935601,
8473873,8316365,8913949,2129613,8527277,9001829,1444825,
7842489,8299465,8369769,11077149,8475901,1448205,8302845,
7776241,3241633,1448881,8303521,3804065,8408977,2028889,
6598649,8426553,3874369,8444129,8479281,5842881,44153,
8287297,1450233,8304873,8375177,8410329,11204913,8480633,
1679397,8359629,2190453,1452937,7850601,8307577,1980217,
8413033,8448185,8465761,11277921,3544481,8273101,8413709,
8571893,11313749,3247041,11173817,241545,2174905,8572569,
7853305,8310281,1456993,8311633,8838913,1567207,8243435,
2373051,8331315,8401619,5694915,8436771,11178627,2056683,
8454347,8489499,11266507,8559803,369387,6327651,8612531,
11354387,11371963,8647683,5486707,8228563,4643059,7841891,
8298867,8334019,2041811,8123107,8615235,4063051,6804907,
8650387,8266419,1446931,8301571,7071251,8442179,8494907,
8530059,4891827,2167547,8565211,9022187,8252899,8270475,
8305627,8340779,2980099,8498963,8534115,11275971,3524955,
343699,2171603,8621995,8256955,1455043,8309683,11051539,
11156995,7079363,8028467,8081195,11315179,9118179,11001515,
2108059,2178363,8419273,8436849,6066793,11042153,1972937,
2025665,9390009,8459157,8284073,8424681,8459833,8286101,
11045533,148413,1062365,1976317,8409133,11150989,8304353,
61885,8287453,9201405,8305029,11169917,8568669,8288129,
11029985,8428737,8569345,11311201,5495573,8255005,10996861,
6462253,8290157,5108901,8307733,10592613,8413189,11155045,
2050677,8448341,8571373,451261,2279165,328905,2156809,
8696433,8292185,7852785,8766737,2035129,8432793,8924921,
8538249,3546665,84869,8434145,3548017,1457149,8311789,
1984429,2037833,2072985,8243591,4605359,8718143,8331471,
5624767,1142887,2091991,8489655,8542383,2162295,3990199,
8559959,8577535,8647839,8299023,8755999,8826303,1584991,
231639,6189903,2129847,8562663,8248999,7844751,8301727,
8336879,2150127,9004767,3538631,8565367,9022343,2273159,
11869655,8305783,8340935,8463967,2136607,6249391,11276127,
3525111,8622151,11364007,8344991,7079519,3529167,9012879,
7855567,7769793,10986201,11284993,8403205,8578965,11022705,
11075433,8422133,6699685,8317353,11059209,5031317,11077461,
1973093,6542853,2025821,11165341,8581669,8372785,8426865,
1449869,7847533,8304509,8761485,3717849,8287609,11029465,
6512433,8340337,8410641,5038753,5952705,47169,8430921,
5284817,8536377,3544793,2279321,11418841,1453925,1910901,
5109733,8308565,5180037,8414021,8572205,11314061,6200121,
1458657,1915633,8313297,5184769,8297853,1448621,8303261,
8303937,8290417,2175321,18258,10985682,2021922,3710570,
8297906,1935394,1513570,8368210,1988122,6557882,6716066,
8316834,1445294,7842958,8299934,8283710,8459470,8529774,
339358,8564926,9021902,8477722,3206274,8233010,10517890,
77746,1448674,8303314,8426346,11168202,7108146,9041506,
6774202,8233686,10975542,25694,1853598,6423358,8251262,
1449350,8303990,11045846,1062678,6089414,2046934,11186454,
8497326,3242778,11028946,2363978,9675594,8339818,166978,
2539738,8568306,8428374,1451378,7849042,8306018,8481778,
11241210,1856978,6426738,8254642,64226,8307370,8377674,
8447978,3895794,2138194,3544274,5846730,8308046,8501382,
11243238,8571686,3246834,1454082,7851746,8308722,8361450,
8027506,3247510,11016102,8291822,1999614,8889406,8450006,
11191862,8502734,8537886,8555462,11420350,8942810,11017454,
8293174,8416206,8504086,11298670,5042966,5043642,7785498,
1458138,8312778,6203658,6660634,8419014,8454166,2126806,
8524470,8559622,8120898,8402790,8404142,8492022,9001726,
9004430,8565030,8285842,1905754,1519082,11168306,8567058,
5105262,219134,11186558,8936830,5035634,8234466,8304770,
8761746,1063458,3805314,7004146,11204810,254962,5738674,
6705354,8568410,11310266,360418,8585986,1890206,1521110,
3210434,1857082,8307474,2032842,8448082,11189938,2067994,
2156550,6726310,2174126,8571790,8238522,7219114,8450110,
5957022,7855230,8999100,8559700,9034252,4095396,8298764,
9001804,5236484,1442122,5097930,7839786,8296762,3850034,
8577978,8563106,8229838,1955206,8932878,2183694,8233218,
8285946,8760498,8426554,11168410,11238714,8567162,5105366,
2047142,8497534,11239390,3242986,1942362,8340026,8410330,
11204914,6846066,6197106,6671658,11241418,8290002,8430610,
8465762,6198458,8483338,8536066,3526906,8571218,6620958,
8448862,8571894,3247042,8308930,9012646,1455642,8310282,
6625690,1863348,8278588,11020444,4710660,7909492,8436772,
8454348,11266508,5835524,8120404,11407116,20572,1848476,
10987996,1883628,8281292,1444228,4643060,8298868,8755844,
8369172,8457052,8914028,8650388,5032436,8231268,8248844,
2378460,8776124,2009364,2044516,8442180,4891828,8565212,
11764044,5493468,3683140,8252900,10994756,1890388,2857068,
8446236,7110460,8498964,9008668,9043820,8621996,2277060,
1455044,7852708,8309684,11051540,8344836,2052628,8450292,
6200564,2175660,8573324,5325872,8067728,8524704,8559856,
6327704,8612584,8622048,8278666,8313818,8419274,11266586,
8559882,11301738,5941734,7769638,3674430,6416286,10986046,
8367222,8472678,8755246,6716430,8421978,8527434,9001986,
3535850,11304442,7842646,8317198,109882,8476058,7844674,
8372630,8286102,11027958,8303678,8321254,2099350,8497014,
6423722,7847378,272122,3243142,2364342,8340182,149766,
2434646,8410486,237646,2540102,8656550,6846222,10994834,
8288130,8323282,8340858,11153018,1574098,8428738,11170594,
8463890,11205746,8499042,11240898,8534194,11276050,11293626,
4580270,4720878,5038598,8237430,1453094,8307734,8378038,
8448342,11190198,8501070,2156134,11295654,8818114,2156810,
3247198,8361814,11103670,347158,3247874,8415218,312682,
8573402,11315258,5955930,8293538,8328690,8416570,8434146,
8469298,8311790,5640914,2037834,5027184,8243592,8278744,
2373208,6995696,211360,2039264,7066000,8436928,228936,
8454504,11231512,8595112,8647840,1848632,6418392,1866208,
4643216,8299024,1936512,6506272,6084448,8457208,2147424,
2200152,8615392,8650544,1868912,1886488,8284152,2378616,
8776280,8336880,2009520,8459912,8934464,8495064,8952040,
11236920,2150128,9004768,11289648,3538632,8565368,2273160,
8692456,11030064,8340936,8411240,220824,2066304,2540856,
11750680,8569424,2646312,11346432,8622152,8430844,5337468,
8257112,1455200,8309840,1929752,2052784,7079520,1613384,
1879728,1897304,2020336,2108216,8962856,6433342,229014,
6626678,8454582,8524886,8403206,11145062,8298426,8317354,
8230150,8284230,7071486,6702390,2749818,7776554,8233530,
8303834,8760810,8321410,11063266,8426866,3470434,8497170,
11239026,219550,3875358,8497846,11029466,1942674,11082194,
8410642,11152498,11205226,6092638,11032170,1945378,8430922,
11172778,8466074,11278234,3527218,8589106,11103150,206030,
2033934,3861838,11296486,8572206,11297162,347314,11314738,
1457982,2037990,8945358,2161022,2062378,8419534,8454686,
1442538,8297178,1567598,8497950,1837322,1977930,11205330,
8481050,449494,8482402,6672074,11241834,5038858,1453354,
8307994,6198874,8483754,8589210,8309346,1456058,8310698,
8313455,8524367,2021923,8577771,4641423,8402687,5028771,
1443267,8297907,3816027,9000947,8439191,8562223,8316835,
11568395,8562899,8335087,8230307,4610327,181175,8406743,
9320695,8424319,11166175,8459471,8916447,8529775,3538191,
8301963,8372267,3820083,5490479,8232335,77071,8302639,
5631087,8583855,5034179,1448675,7846339,8303315,95323,
8320891,1518979,6598443,8426347,218355,8443923,6194195,
8479075,2151715,8566955,376539,394115,5034855,25695,
1449351,8303991,11186455,447519,6863435,1871851,3242779,
8287091,3770059,8339819,8410123,11151979,325163,2153067,
8568307,2030711,220383,10520595,11170907,3929595,8587235,
5495211,8289795,1452731,8307371,5635819,8412827,8430403,
8447979,8465555,8483131,8500707,8571011,11102631,8413503,
8501383,346119,1454083,8308723,135883,8291823,8326975,
3317815,1577791,5690575,8432431,8889407,8467583,2157799,
7853099,8310075,1456111,8416207,8451359,2159151,1457463,
7855127,11053959,2037471,5957595,1458139,7855803,8312779,
8278407,1564375,8419015,2038927,8489319,11231175,2126807,
8524471,8999023,8559623,6011779,8296659,8807039,8402791,
7841035,11075019,8281111,11022967,8421719,2270119,2165339,
8563003,8283815,3309807,8424423,8529879,463171,304987,
1448779,8303419,6545819,8426451,8444027,8479179,8936155,
8496755,2204547,5034959,8304095,1062783,6089519,8497431,
11239287,3242883,8287195,1942259,237387,11204811,11275115,
8568411,7778843,8254747,10996603,8289899,8307475,8430507,
222515,8448083,8465659,8483235,11277819,2155875,11769947,
2261331,8501487,8571791,8308827,8361555,3247615,3317919,
84611,1456215,7853879,3319271,1386587,1456891,7854555,
8311531,5464219,1457567,8911247,8402895,1443475,7841139,
8298115,8439399,8352871,8809847,463275,305091,1448207,
7845871,8302847,3908847,7776243,3241635,6598651,8426555,
8567163,5842883,8584739,6423567,9148523,8287299,8340027,
11152187,11204915,8568515,8375855,11171115,1452939,1909915,
7850603,8307579,11296175,8571895,1963995,1455643,7853307,
8310283,6028107,1441603,11073251,8524731,11266587,8999283,
8472679,8403051,8578811,1373327,160583,8527435,5945115,
6015419,8335451,8353027,1446335,4610691,1447011,8407107,
2976123,2150051,8232699,1448363,8303003,11044859,8373307,
9322411,5842363,8286103,1449039,8303679,11045535,8409135,
201143,6598807,2046623,8444287,6194559,8479439,8567319,
8234051,1449715,8304355,11046211,1976995,2047299,5949847,
61887,8287455,1450391,7848055,8305031,3770423,8340183,
8410487,11152343,3243819,8288131,11029987,11047563,8323283,
185595,8411163,11153019,11170595,8463891,8499043,1679555,
8534195,3525035,8569347,11311203,2206835,4580271,1451743,
7849407,8306383,11241575,3210695,5038599,8237431,8378039,
8413191,2050679,8465919,9010775,11295655,1453771,5109579,
6023531,7851435,8308411,11050267,346483,8572051,3247199,
6024207,11314583,2386651,8327339,3318179,3968491,8538251,
8573403,84871,1455799,6025559,8310439,1860723,8311115,
2388003,8328691,8416571,8434147,2141939,6729275,1457151,
8311791,8242163,1457827,2037835,10986203,8403207,231043,
1725003,8527591,8317355,11059211,7843479,11077463,8582347,
8231503,8233531,8303835,8409291,11151147,6598963,8426867,
11168723,8234207,8322087,1063199,8497847,11239703,8410643,
8568827,8290315,8430923,11172779,310811,9010931,8571531,
11103151,8414023,8484327,153979,456827,11424251,8435707,
301451,8457391,1938047,2976383,8303263,8233635,2820227,
8303939,1062627,8462799,1890051,1521631,1452003,8306643,
133803,11101227,8482403,10522571,6199551,1964411,3681504,
8251264,4721894,8527124,1446024,8300664,8019448,7844364,
7845716,2028060,8463580,5039640,1067464,8589992,8911118,
8228358,8298662,8913822,1448754,8303394,202886,8428454,
8435214,7781574,6661468,1445452,8584688,5495394,8454324,
8559780,8463788,916950,5029734,5838230,8580086,1376630,
5032438,5840934,7846626,3540506,6503440,8436800,3954920,
5835552,7769588,1442228,1886360,6456120,8284024,2062120,
6631880,10132208,8831584,10659488,1451692,8376636,8939068,
6706916,3791328,11102944,8946530,5782850,2250750,5098738,
2022938,2989618,8578786,9035762,10126150,142982,1970886,
5275174,10301910,3956974,2181798,5785554,10654782,8475358,
302518,5945090,2025642,6192506,1448338,7846002,2028346,
1450366,8832286,765578,6304046,8765362,6673818,5110230,
5180534,8379366,311982,207202,2140562,6253346,9012778,
7783134,8838370,1056960,1513936,6083696,8238784,6197290,
1881082,8284154,2976202,1448442,6583338,2066306,8463970,
8226720,8301080,1449144,8303784,1837168,3738756,2034560,
8439686,7844130,1447194,8301834,8231582,10976818,308862,
2034690,1670378,8525018,8700102,8489217,8929293,5028097,
8402689,11144545,1443269,8297909,8228957,91269,8229633,
7842961,8335089,11076945,7913265,302857,8424321,7845665,
8302641,11044497,6862085,7108149,1853601,6423361,8251265,
9165217,8303993,11186457,6194873,8304669,8462853,11204709,
11310165,5950837,1451381,7849045,8306021,8412829,8430405,
8500709,345445,5389757,11049905,2103721,8501385,8484485,
8414857,8502737,8239773,5111245,5955569,1456113,1984069,
8454169,8559625,5097829,8368317,8421721,11163577,8492025,
8527177,2270121,8299365,8316941,1375773,8581933,464525,
6598549,8426453,1853705,11186561,11204813,8463633,1523141,
8412933,11277821,2156553,8571793,8589369,8308829,6199709,
2070025,1456217,1983497,193527,8471849,18469,8244037,
1442125,7839789,8296765,8317045,11077153,8932881,1375877,
8426557,8567165,11186665,11239393,6512125,8410333,2065397,
3893301,8463061,8290005,117165,2138405,8448865,1455645,
7853309,8310285,11052141,228835,1442281,8296921,6575149,
8403053,11144909,8473357,5099441,8650469,8459161,8459837,
1448365,8303005,11044861,5279933,1449041,8303681,8426713,
8567321,11309177,6195237,8480117,8305033,8340185,11310529,
8411165,5495577,5847097,8238785,11314585,6305425,5040629,
8344917,8415221,2035133,8538253,7783837,1456477,8434149,
11176005,1457829,8226773,8297077,8473513,8228125,11075437,
8474189,5031321,5839817,8583701,1448521,8303161,8584377,
6932909,7777233,10993641,8497849,6442133,8410645,11152501,
8306541,6197421,5038757,8694565,5109061,8307893,8572209,
8309245,11314741,8310597,1983237,210922,457662,7769278,
703726,124394,8402690,3657846,8297910,8368214,7912590,
8475698,8581154,5031478,4575178,8283714,8301290,8318866,
181178,8406746,8424322,8441898,2975762,8459474,8232338,
8372946,5491158,8303318,2432934,8373622,271086,8233690,
8303994,4718490,8374298,2046938,1836702,8234366,11028950,
3277934,8304670,114254,8339822,3822790,8568310,9587718,
8463530,8235718,8358750,4825974,10309686,8587238,9044214,
8237070,8694046,8412830,8465558,6655230,8483134,3966102,
9010414,11295294,8571014,11418326,135210,2050994,5039590,
8238422,8379030,4002606,3317818,3968130,9451842,11279746,
5040942,8239774,8240450,9154402,1456114,2037474,8487866,
8383086,6660638,8524396,7769382,703830,8402794,1935502,
11075022,3236802,8316266,8404146,8421722,213730,6628970,
8456874,8492026,8562330,2199818,7912694,356366,8529882,
6932494,5631870,8426454,11168310,8496758,11238614,8567062,
11308918,6423466,8251370,8497434,8954410,11239290,2293782,
3242886,6459294,8480534,2170750,8568414,8376430,8254750,
5108646,8325054,11154790,222518,2067998,8465662,8483238,
11277822,2208606,7780874,8571794,8238526,3246942,8308830,
5285758,5111350,5181654,8311534,1457570,7855234,3708728,
8313640,8454248,3462664,8559704,422016,4095400,55624,
3535672,8562408,167840,8534016,5844888,8292008,8682762,
4605130,2970562,1846374,3674278,3727006,8296766,194230,
8402898,11144754,6452638,11022398,5099286,1935606,8316370,
8527282,2199922,8597586,8809850,3908850,11045382,5631974,
8426558,8461710,8479286,8496862,8567166,11309022,6423570,
8234574,61734,8287302,11029158,8304878,8340030,6090302,
8410334,8480638,2136378,8306230,273998,8499566,10996710,
8413038,8465766,3966310,5953074,11296178,8571898,1454294,
7851958,8308934,1963998,8361662,5391318,8239982,8381266,
2970640,8489504,9019488,4610616,2817864,8407032,2980104,
2540704,1947176,11772160,8331372,8489556,5325876,8524708,
8120460,2214924,8298924,5223124,3520956,8565268,2202756,
8252956,8499020,7180820,8569324,9043876,2224388,8622052,
8257012,5339396,8081252,8538228,8573380,8454430,8489582,
5941738,8472682,8421982,8317202,337698,5031166,8230674,
6016098,8424010,2062174,8372634,5490846,8232702,7846030,
305926,5842366,8233378,8479442,9165582,9166258,6459554,
8410490,8411166,11153022,3964438,4650578,8359114,1996602,
274154,3667674,8237434,8694410,8307738,222778,8483498,
6304074,8588954,8308414,3247202,8484850,10312754,312686,
5027188,8243596,8770876,8366628,8823604,2970796,8454508,
11653340,9034516,8647844,6928100,2973500,2217732,238404,
2066308,6196668,3687356,4812220,8524838,1969718,8474190,
8579646,9581478,8370086,5101626,8231506,3961890,8584378,
4577726,5948654,8233534,3751654,8374818,8656034,8378198,
2138718,345966,8589110,6726730,8238942,3247358,8379550,
8590462,8594518,8542492,5223332,196622,4605546,8401962,
2970978,8524994,8560146,8472942,9001574,8303942,1976582,
6089366,10659126,2082038,1890054,8287718,8306646,1980638,
8309350,1964414,3954611,53415,141295,8366863,299479,
1442595,7840259,8297235,8754211,11039091,8402691,11022191,
1443271,7840935,8297911,8527075,6769475,5944755,5031479,
7773335,3239403,8266139,8283715,3309707,181179,8406747,
1675139,8529779,11271635,3538195,11306787,1448003,7845667,
8302643,8355371,6088067,323139,11027599,8426351,8233691,
8251267,10993123,1449355,7847019,8303995,148731,11186459,
8497331,3664607,8234367,3242783,1889431,8287095,8304671,
8410127,8568311,6091447,8376327,1996239,3245487,8289799,
11031655,1909711,8307375,6514623,8377679,8412831,11154687,
8465559,8922535,5846735,1453411,7851075,8308051,3984355,
9468067,11295971,8571691,3211687,1454087,6023847,10593607,
3791695,8361455,11103311,2016519,8589943,5954219,3247515,
8291827,8326979,1612947,312323,5040943,8239775,1455439,
7853103,8310079,312999,11350727,1456115,7853779,6096179,
8416211,8468939,11210795,1456791,7854455,8311431,11176319,
1457467,6097531,7222395,7785503,1458143,8312783,8488543,
4112119,6853975,8278411,11020267,8313563,8401443,8436595,
8454171,11196027,8489323,2126811,8524475,11266331,8559627,
11336635,2267419,6011783,11004043,8298015,11075023,5837375,
7771411,8404147,8492027,8527179,2147091,8562331,2270123,
2165343,8563007,7843067,8300043,1937531,6507291,8827323,
8529207,356367,8529883,3520723,5948915,1449459,5105267,
8304099,219139,2047043,8287199,8304775,8339927,8375079,
8480535,2153175,3998655,6740511,2065971,1521791,309047,
344199,1452839,8307479,8500815,8308155,8571795,3246943,
1963895,7219119,3247619,6446451,8291931,3317923,8239879,
1912519,8310183,6095607,8380487,8381163,8311535,8381839,
8312887,456415,11423839,228707,2056611,2970563,1669939,
8524579,8981555,7839791,299687,3955495,3780411,8807147,
8824723,8402899,7770839,8473879,8316371,8456979,8527283,
8580011,2199923,7842495,8299471,8563111,5944963,7843171,
1937635,2060667,1448211,7845875,8302851,6088275,8426559,
8479287,8567167,5949019,8233899,10518779,25907,3681715,
8251475,10993331,1449563,6019323,8304203,11046059,219243,
8462387,8479963,271971,8497539,922959,3242991,8287303,
11029159,1450239,8304879,11046735,114463,8340031,11081887,
6090303,8410335,11152191,8463063,11204919,8480639,8568519,
11310375,5844239,10870975,8463739,8235927,8306231,6091655,
8481991,11241423,8237279,8413039,8940319,8413715,2033627,
8501595,8571899,3668871,8238631,1454295,7851959,8308935,
6533759,8361663,2139759,1455647,6025407,8310287,8029071,
2141111,6626449,3234359,8278671,8313823,8436855,8454431,
8999287,2197375,7769643,1442283,8296923,8472683,8578139,
1952663,8350327,1970239,8367903,8403055,8473359,5836959,
6013395,8298275,8545015,8563267,5945119,8300303,11077311,
145039,1972943,3906303,6191183,8476063,5945795,8284079,
8459839,2097327,8530143,8303007,8426715,11168571,2995731,
8234055,1449719,8304359,7848059,114619,1942523,8340187,
10994839,1451071,11047567,97719,8323287,1978351,8411167,
11153023,8446319,8463895,11205751,8499047,1679559,8569351,
1451747,7849411,8306387,11241579,5038603,5952555,8290163,
11032019,5108907,8307739,1066427,8378043,1453775,5109583,
6023535,8308415,11296335,3212051,8238787,8309091,1067779,
8484851,329587,347163,2175067,6744827,8590307,1455127,
3318183,1982407,8380071,224807,1613311,8467951,2105439,
8503103,2140591,8538255,11280111,8573407,8697115,1455803,
8310443,11052299,1983083,5955935,1456479,8311119,1614663,
2071639,8469303,8504455,11281463,2159519,8574759,1457155,
8311795,6028267,3234515,8577619,1442439,8297079,299999,
8297755,8403211,2128579,8298431,1057119,8474191,91791,
8317359,1445819,7843483,8300459,8426871,8585055,8234211,
3682027,2047459,11186979,8497851,8234887,8305191,8762167,
3770583,8340343,8410647,8568831,6091967,1453255,7850919,
8307895,10592775,3773287,11084903,8413351,11278239,2209023,
7851595,11103155,8414027,8572211,8589787,83679,1454607,
7852271,8309247,11351247,1457311,7854975,8311951,8369463,
8437115,1670355,8981971,2144907,72291,1900195,300779,
8304619,8305295,8307999,1454035,8308675,6094099,8378979,
5285603,329171,1454711,8309351,1964415,1068039,347423,
1441244,2126708,8524372,8296560,8226932,1442596,7840260,
8297236,1952300,3780204,8349964,8402692,2022604,6188116,
1935400,1513576,2128736,5328244,1057952,8299940,8335092,
8932676,8581156,2078712,356264,391416,8283716,6578844,
8406748,2026660,5225492,8424324,8441900,8459476,2132116,
8529780,2149692,9004332,7775364,8302644,8372948,8478404,
5491160,7776040,8233016,10517896,8303320,1062008,4717816,
8373624,8426352,8443928,11185784,8566960,11308816,8584536,
376544,394120,8233692,25700,1906332,11045852,1976636,
8234368,8691344,3717336,536080,1450032,3277936,8304672,
8761648,8339824,8374976,11151984,237288,8480432,2153072,
342744,6740408,11310168,5387056,8585888,9149672,4018156,
1839408,3210336,8237072,8272224,11031656,8307376,1944864,
8342528,152112,1523040,187264,8412832,2032744,8430408,
11172264,8447984,6198256,8026160,310296,3966104,2155776,
8571016,11348024,8237748,1453412,7851076,8308052,11102636,
8413508,328548,11295972,8571692,11313548,8589268,3668664,
1454088,7851752,8308728,8361456,6094152,6603856,2174704,
8572368,452256,6849920,10998532,8291828,8432436,1612948,
3968132,11297324,8573044,11420356,6025200,1982720,6095504,
8380384,1456116,8416212,11158068,8468940,8539244,1456792,
8311432,8381736,5956924,8241804,1457468,8487868,9015148,
1458144,7855808,8312784,11054640,9050976,304238,8278412,
8419020,2056508,8454172,11196028,2126812,2144388,3532892,
8559628,8472424,8350068,8402796,3798560,2023384,8281116,
8527180,8562332,8316944,8459580,8916556,11201436,3538300,
182636,8233120,25128,8285848,1062112,4717920,8426456,
8567064,11308920,8304100,8479860,1379832,8287200,1450136,
8304776,1942264,8339928,325272,2153176,3524104,342848,
6740512,8585992,8586668,8621820,3245592,8272328,1892240,
1452840,5108648,7850504,8307480,5178952,8377784,8412936,
2032848,8430512,2155880,5039020,8237852,5109324,8308156,
11102740,1066844,2068676,6199036,11296076,6743892,1454192,
8308832,6533656,8361560,1067520,2438448,8379136,5285760,
2139656,2157908,1455544,8310184,1456220,8433892,8927372,
8312888,2284320,6854080,8077042,9385804,10299756,5800300,
5378476,8227140,1952508,8807148,8402900,11144756,8473204,
300364,11022400,11075128,8368424,8456980,2199924,8317048,
11058904,11304968,8335300,8230520,8371128,1448212,8302852,
305772,376076,3241640,8285952,7846552,8303528,8321104,
148264,6581080,8408984,2028896,8426560,8022312,8479288,
271296,8567168,11309024,11766000,1449564,6476300,7847228,
8304204,11292124,1836912,7777600,8234576,11011584,8287304,
1450240,8304880,1942368,8340032,11081888,8375184,2012672,
8410336,11204920,8480640,8568520,1452944,8307584,10592464,
1523248,6093008,8413040,11154896,11172472,8483344,8606376,
451112,3246372,6462780,8308260,6515508,8484020,328756,
8571900,11313756,3247048,7851960,8308936,8379240,2139760,
8572576,1457000,6026760,7854664,8311640,2177616,7221928,
6028112,11423944,2041870,8454432,8559888,10986052,8296924,
11038780,1969564,2022292,3780568,8350328,11092184,8403056,
7841300,8298276,1935764,3798820,8579492,8527440,8475388,
11077312,5102148,8476740,8529468,356628,8125220,2027024,
8424688,304576,2132480,8565296,8478092,8303008,8373312,
8478768,5034548,8233380,8286108,1449044,8303684,201148,
8426716,11168572,6739420,8567324,8655204,8304360,219400,
11186824,8585576,1380092,5035900,8234732,1889796,6459556,
7848060,6512284,8340188,1063724,1977676,8410492,8480796,
2171012,11310532,8252984,3243824,8288136,1451072,8411168,
203176,3858984,8428744,11170600,2980184,8463896,11205752,
8499048,8534200,11276056,8569352,2206840,1451748,7849412,
8306388,11048244,11241580,11294308,8587604,1839772,8237436,
8694412,10979292,5108908,8307740,152476,2068260,8465924,
310660,6708324,2156140,8571380,1453776,8308416,11050272,
8413872,6726576,2174392,8572056,1454452,6024212,8309092,
8766068,11050948,8361820,11103676,8379396,2175068,8572732,
11314588,8590308,452620,3247880,8309768,1578160,8432800,
8503104,9012808,11297688,1455804,8310444,8240816,1456480,
314040,8241492,1984436,8242168,2037840,8435504,1458508,
8313148,8488908,8764742,6522580,1056444,1513420,6083180,
8403212,8016540,6698340,1935920,7911760,301352,8317360,
3993664,110044,8335612,11077468,11166024,8284236,8424844,
8530300,9004852,4716984,8725664,1449200,8303840,11045696,
113424,1976480,201304,8426872,2152240,3523168,8445124,
8497852,11292436,8585732,114776,1942680,6512440,8340344,
8375496,8568832,9482784,8464052,8237592,1453256,8307896,
10592776,1523560,8413352,8430928,11172784,310816,2138720,
3966624,8536384,11278240,4001776,381120,7781292,47852,
1453932,7851596,8308572,8765548,135732,8835852,8414028,
8484332,2156972,11296492,3545476,8572212,3247360,1454608,
7852272,8309248,136408,8379552,6200128,8572888,1457312,
8311952,4587192,11424256,2035318,5220708,7776664,3208256,
8234992,1521636,221012,2101644,8499308,11241164,1524340,
3792320,8362080,11103936,8487816,8299238,8436493,8454069,
8296561,8366865,8402017,194025,703729,1952301,6522061,
2128061,8227609,2199717,4027621,8316841,8229637,11076949,
8018725,5031481,1376349,8318869,8406749,8424325,304213,
9443733,1448005,7845669,94653,8233017,1448681,200785,
1449357,7847021,8303997,219037,8585213,8234369,1871857,
11011377,9201049,237289,8480433,360321,8235721,1451385,
8306025,6653881,273793,2101697,11241217,8237073,6444321,
8272225,8289801,8307377,1066065,8377681,8412833,11154689,
2138201,3791021,3246841,8308729,8379033,11314225,3247517,
8924565,7782801,8310081,10137985,11350729,471861,8312785,
7926113,8383089,171795,1915901,8419021,8489325,8524477,
3532893,8559629,4640857,5097833,8402797,11022297,8281117,
1567085,2024061,670709,8439301,8492029,2147093,2270125,
6700629,8581261,8318973,9004437,2202525,8373729,11168313,
8233797,8462285,8954413,8304777,8463637,7849153,8833409,
5038345,8289905,187369,8412937,5284409,8571121,11769953,
11348129,8571797,8308833,7113665,8572473,11314329,8414965,
2052453,8450117,5111353,8310185,8591401,8258133,1456221,
5112029,1983501,11298781,8574501,8575177,8592753,6538441,
228657,3989921,220545,1913249,1372501,8807149,8402901,
5274373,5028985,1443481,8298121,8016905,8579337,8316373,
2199925,8299473,8317049,11058905,11304969,7843173,8352877,
5172297,463957,3205813,9146501,8426561,3681717,8251477,
8497541,7847905,8304881,6195761,8235929,11241425,468013,
8430617,11172473,3738501,2156661,8589477,7851961,8308937,
1524601,6199817,2139761,6709521,11279281,11314433,5041153,
1457001,7854665,8311641,1984281,5500833,3981913,8348977,
10986053,8403057,5029141,11022557,8298277,8579493,8421985,
8335457,10304645,8424689,11166545,8916817,8530145,8303685,
8426717,8479445,8234057,6019481,8304361,1063049,3910361,
8480121,8234733,1872221,8305037,8762013,8340189,8375341,
11205077,5457725,8252985,8832993,8411169,11153025,8463897,
8499049,5037253,152477,8378045,8413197,222781,8448349,
1453777,7851441,8308417,5039957,1454453,7852117,8309093,
5848453,1578161,2035137,8432801,8467953,11209809,8503105,
1842477,8240141,5849805,10982673,1456481,8434153,8574761,
11316617,5042661,8311797,9156121,1457833,8312473,10986209,
141817,124917,11022713,7841457,8298433,1971073,3640793,
8317361,1832493,1448525,8303165,201305,8426873,8251789,
6019637,11186981,11205233,8290321,11032177,8430929,8536385,
6727409,11297169,2373397,193973,2976389,329173,1448006,
7845670,5842006,1452738,8308054,8378358,8571694,6023850,
7851754,8361458,8310082,2970384,3201576,3851888,8650136,
8231016,1446680,8828600,8564960,8758972,8305376,2030744,
3858648,8428408,5485130,7843694,8300670,2131494,11271014,
7845722,81862,1383838,5953598,8238478,5461470,3862730,
8348692,8418996,6189548,5838028,5805580,9004412,5840732,
8533916,8129668,2037556,8435220,8647536,1444756,1972036,
2749436,7851884,8436650,1444106,8298746,6085522,5488614,
2202578,1448838,7846502,8303478,1062842,8307534,8231172,
2975948,1062868,2066052,142858,1448890,7846554,8410338,
8568522,2044472,3919722,8647666,8351578,8237334,8238686,
1970840,1057564,6084300,8914036,8474636,5838236,8477340,
8233304,9604232,7846632,1976248,11082644,1838344,8306312,
316694,7839898,8578090,8457086,8527390,8565246,3206594,
8604454,3210650,7840600,8297576,8754552,8578792,11163816,
8527416,11269272,5840992,8584200,10975212,1450372,1067756,
8824206,1446342,3470962,8568678,1451750,1980382,8308418,
1524758,1458510,8313150,8349004,8419308,8457164,2094652,
2976156,8482176,6093868,1454480,7852144,3234440,11003032,
8419360,2970800,8911488,2162304,1442364,8227376,6083104,
8474116,1374088,8299708,145120,1059072,2183936,3679248,
5102904,410112,8303764,6194644,7108596,7847464,8375420,
6091892,8378124,6533996,5041388,8488988,7770426,919166,
7844786,1063154,5281394,153258,153934,9315788,11266724,
7781944,8484984,8824362,8807462,8457294,164126,8409298,
8234214,11029474,8236242,1451906,1961610,8359274,1980538,
5109742,8572214,10998378,1454610,2140074,6709834,347322,
5114474,8489066,8419464,8422168,8457320,8527624,9004880,
3859168,6601024,2035320,1952874,8301866,1449254,7846918,
8760870,1450606,8307950,1980590,6023746,10300824,8527676,
2253044,8284316,8301892,2044836,8442500,7003296,7852352,
8527702,3834936,1986076,8418919,8454071,8226935,1442599,
7840263,8297239,11039095,124399,8402695,8472999,335311,
8560879,8368219,2023283,212955,2128739,3956643,5943407,
6453111,6189471,1445303,7842967,8299943,2025311,1621063,
3958671,8406751,8424327,8459479,2132119,8529783,321791,
2149695,182535,8233019,10974875,77755,1448683,8303323,
8760299,8373627,3839019,200787,8426355,11168211,8443931,
11185787,3926899,8496659,323819,271767,10519251,1871859,
61531,8287099,11028955,1450035,8304675,114259,8339827,
5633123,6582227,2065195,3893099,6740411,8568315,11310171,
3858623,6600479,8235723,10063627,8306027,3929603,11241219,
1839411,8237075,3245491,3720043,8289803,11031659,1452739,
6022499,6479475,8307379,9221331,9678307,1944867,6514627,
8377683,3843075,8412835,11154691,2032747,11172267,222419,
5284307,8500715,310299,8535867,4001259,8571019,2208507,
6778267,6480151,8308055,135215,5618927,187943,11243247,
2156455,8571695,1454091,6023851,7851755,8308731,8361459,
6094155,188619,11173619,2174707,8589947,8239103,8432439,
5954899,1455443,6025203,7853107,8310083,1525747,6095507,
8380387,8240455,10068359,1456119,7853783,8416215,11158071,
8433791,8468943,8311435,1457471,8030895,1703535,1933479,
8331143,8401447,11143303,8419023,8454175,2126815,8524479,
8981455,2144391,8559631,11301487,11336639,2267423,8226363,
8350071,2005135,8402799,11144655,8298019,8368323,6698603,
1865879,8404151,8421727,8456879,11216311,2094367,8492031,
8527183,11269039,2199823,11077055,8352775,8459583,2149799,
2272831,5947567,8302751,6088175,2080847,8233123,9147075,
8303427,8321003,8426459,218467,6194307,341499,8567067,
8287203,9201155,1450139,8304779,6512027,1977419,8375083,
8410235,237395,3893203,8568419,8463639,11205495,203595,
8481891,11241323,3982435,3667419,1874667,8272331,9203859,
11031763,81915,8307483,8377787,8412939,8448091,8465667,
2999531,8500819,11277827,2155883,9010523,8571123,2208611,
6778371,8606275,11348131,8483919,8571799,11313655,7781555,
7851859,8836115,2139659,3967563,4002715,6744571,1913199,
8838143,2160615,1933557,2970541,2126893,5782701,7841797,
2059293,6189653,2147173,5032341,3520805,11869405,10764145,
44813,6635813,8463717,8569173,8815913,8573229,209757,
2037661,3884519,8454279,5027635,5028311,8227143,11004151,
8402903,8930183,300367,5379831,1602343,8527287,8984263,
336871,8562439,6839991,8809855,11182615,2975975,8232551,
9146503,1448215,7845879,8302855,11044711,8373159,5385239,
1835563,2292539,6405323,7776251,9147179,10061131,3241643,
77963,1448891,3733771,7846555,8303531,8373835,8426563,
10307195,5842891,8584747,8233903,8497543,8234579,1450243,
8304883,6512131,8340035,6582435,8410339,237499,11204923,
6195763,8937619,342955,8568523,7215171,8463743,11205599,
8586775,2259415,8657079,5037099,8235931,1451595,8306235,
8763211,8376539,8833515,11241427,5388619,3667523,8430619,
8465771,2999635,6445207,8308263,11155575,8484023,11296183,
2174239,8238635,8361667,6199819,8941675,347011,8450223,
8311643,1458355,8312995,8225869,4605213,1933661,8454357,
8489509,3515501,5800381,8999213,8559813,9016789,11301669,
422125,8647693,8228573,1848485,8246149,231493,6189757,
3518205,8615245,40861,8301581,8442189,2976053,4803957,
8692309,8288061,2980109,4808013,4825589,8498973,8569277,
11768109,4931045,8622005,2259493,8657157,8309693,2386581,
8344845,8450301,11192157,8942429,6745429,7855421,3234363,
176139,2004043,11214543,8403059,11144915,5029143,11022559,
10583159,1935767,11075287,143015,8439563,8492291,8562595,
11042163,1937795,8476067,1446343,9338643,1605203,5033875,
1448371,8303011,11044867,1975651,1449047,7846711,8303687,
11045543,6546087,8373991,1993903,8409143,8426719,11168575,
8479447,8567327,8655207,1853971,8304363,11186827,8480123,
8497699,1872223,11011743,8287463,8305039,11046895,114623,
6512287,8340191,11082047,8410495,8568679,11310535,9588087,
8288139,1451075,8323291,11065147,8358443,168027,185603,
8411171,8428747,8463899,8499051,11240907,3964443,8991179,
8569355,2206843,11346363,8306391,274159,11294311,1839775,
5038607,1453103,7850767,8307743,1945231,11084751,6093167,
8413199,11155055,6638023,8465927,11207783,345815,8571383,
11313239,1453779,8308419,11050275,6533243,8572059,1841127,
3247207,1454455,8309095,6094519,6656951,11297015,6744831,
8572735,11314591,2386659,8327347,2017563,8415227,2035139,
7061875,8889779,2105443,8960083,8538259,8573411,5955939,
6096547,1614667,8469307,11211163,2141947,1457159,8311799,
8927635,9402187,2160875,11424103,5484169,8278753,9263009,
8436937,228945,2970801,8472089,2144729,2162305,8559969,
9016945,11301825,8577545,8647849,11023313,1444393,8299033,
2428649,8439641,11181497,8914193,6189913,7103865,8492369,
319529,2147433,9002073,2200161,11374833,8650553,5032601,
11008441,2361049,7844761,8301737,8336889,5225937,216777,
3872585,7071417,8442345,11184201,4804113,6192617,2150137,
8547801,8235489,8253065,8288217,5563937,8323369,8340945,
6091217,2013585,2031161,5229993,6618497,8446401,4808169,
8499129,2136617,6723953,8551857,9008833,11293713,6741529,
5388177,8622161,6372433,8925009,347921,7855577,2160953,
1725635,10058687,6192643,1837851,3665755,8235515,308739,
3250691,7117411,6434027,8297083,8367387,5942575,7840783,
8297759,177647,8403215,11022715,1935923,1057123,8017219,
11286355,8579651,8527599,91795,8317363,11077471,5171935,
8230835,3205451,8232187,8232863,1448527,7846191,8303167,
11045023,183055,8584383,6405635,8233539,1449203,7846867,
8303843,4718339,8374147,183731,8409299,3857115,8426875,
11168731,6616547,8497179,8585059,8234215,1977159,8497855,
8234891,1872379,114779,8340347,3823315,185083,8410651,
11152507,11205235,6740931,8568835,11310691,1838579,8236243,
8587763,64755,1453259,8307899,6093323,8378203,8430931,
11243091,8536387,11295819,11313395,8308575,2033943,1524915,
6200131,4003131,6744987,8572891,5114475,1450607,8560151,
8562855,5031431,8460103,6194827,1450659,8305299,1521639,
8569615,5038867,5952819,8308003,10592883,1066691,8483763,
1457419,8312059,1984699,8382363,11864465,8368220,8283720,
7317716,8691348,4720524,194236,8359120,222784,8278832,
2373296,8331560,7909736,8366712,11143720,2021776,8911568,
2127232,8542472,2162384,8560048,1793288,8647928,8824364,
5943928,2042056,231728,6242720,6365752,8650632,3239928,
8284240,2378704,8442424,234432,2062336,6632096,8460000,
8916976,6667248,8495152,9409104,2132640,8987280,9004856,
8565456,1380928,8288296,2435488,6091296,8833152,5230072,
4808248,8499208,3527228,2178608,8683237,1055253,8366869,
1442601,8297241,1952305,8402697,6188121,1935405,10653101,
6188797,8316845,8562909,8229641,1884705,1445305,1902281,
7842969,8299945,109529,8335097,11076953,8370249,8581161,
1445981,4012077,8230993,8283721,8406753,2026665,8424329,
2061817,8459481,1675145,339369,8564937,8231669,8301973,
1448009,1904985,7845673,8302649,147385,8372953,8583865,
8303325,5034865,1906337,8760977,1976641,6089425,8374305,
11186465,8497337,8585217,8234373,1871861,8287101,1907013,
114261,3770069,8339829,11081685,1520341,8374981,2012469,
8410133,8568317,1451389,7849053,8306029,1961093,2101701,
1452741,1909717,8307381,8412837,1453417,7851081,8308057,
8501393,2156457,346129,5039597,5953549,8238429,3246845,
1454093,5109901,7851757,8308733,135893,1963797,8361461,
6656589,8484493,8589949,8467593,6674841,1455445,5111253,
7853109,8310085,11051941,6095509,7853785,6096185,11175649,
8468945,1456797,8311437,3215073,8241809,1457473,2037481,
2072633,1458149,1915125,7855813,8312789,6660645,1423777,
8278417,8366297,8401449,6591121,8419025,2038937,8436601,
11178457,8454177,8489329,8524481,8999033,334065,2161969,
2197121,1846277,985053,1512333,8823949,7101501,11319741,
5028209,1864529,6434289,11004049,8824625,8402801,6188225,
335417,3991225,6733081,5942837,8280445,11022301,1443381,
8298021,142757,1513685,6997397,11162909,6188901,8473781,
10758661,11268365,810645,10864117,2251877,3236809,1883457,
8281121,8316273,11058129,8404153,11146009,8421729,8456881,
9001737,2199825,1444733,5100541,6489045,8369677,10654557,
11164261,11269717,7772769,8300049,6507297,1972689,215089,
232665,8475809,8124289,5558869,8318977,11060833,3837097,
8406857,4803777,8459585,1675249,9004441,2202529,2888669,
6192957,1448113,8302753,11044609,8760405,1976069,8830709,
6598557,5948921,6862873,6019225,8761081,10588985,10659289,
10976333,8287205,11046637,114365,2891373,6090205,2065301,
8480541,2170757,8568421,5176929,3050233,2822421,6091557,
203597,8481893,8938869,8499469,6706717,5952301,2894077,
8694833,10065761,10979713,1910497,8308161,10136065,1523825,
8835441,1629281,10311825,6743897,8571801,11313657,8589377,
2754821,10523413,5566981,153573,1981477,10769477,8767165,
1982829,5955681,10525441,1456225,8767841,6096289,6201745,
3547769,8311541,8312893,8228471,2041719,5838135,8301479,
2044423,2061999,11029815,677551,2066055,681607,2072815,
350367,8278521,8419129,8911257,334169,8226469,10985901,
8296773,1442809,7840473,8297449,11039305,8807153,6082873,
8402905,8298125,11075133,1056813,8421833,8439409,2199929,
7842501,8317053,2165453,8563117,11304973,8335305,5277081,
1448893,8303533,11045389,2028901,8426565,1836241,1449569,
7847233,8304209,8585425,8287309,11029165,8304885,8340037,
8410341,167873,8569201,1451597,8306237,8499573,8308265,
3791233,8413721,8501601,8589481,8308941,8572581,11419893,
8239989,1455653,5111461,6025413,8310293,5043185,8242693,
8278677,8436861,8454437,8524741,11266597,2162229,1442289,
8296929,2022297,8403061,1443641,8298281,11323381,8300985,
8284085,8424693,11166549,8459845,9004701,4576225,8372641,
1448373,7846037,8303013,2749673,8303689,8321265,8426721,
5035229,5949181,6476461,8497701,1889801,6459561,6477137,
8305041,6090465,2065561,2171017,8568681,8288141,8323293,
11065149,8411173,11153029,8446325,8463901,8499053,11240909,
326213,2154117,8569357,11311213,1451753,7849417,8306393,
11048249,2190621,5038609,8307745,1066433,1523409,1980385,
8571385,11313241,1453781,8308421,8765397,3791389,6093845,
8835701,4002301,8572061,5039961,5953913,8238793,3247209,
1454457,8309097,8379401,8432129,6199977,8484857,2175073,
6024893,8309773,2035141,8432805,8450381,8503109,11244965,
9012813,3546677,8573413,1455809,6025569,8310449,5955941,
1456485,5112293,6026245,1983765,2054069,1614669,3548029,
8574765,2072997,9015517,8770129,8840433,229025,3657021,
10986213,5098253,8297085,6082509,2022453,3850357,8578301,
1952825,8403217,8228133,8280861,8298437,1971077,8368741,
55969,8527601,1919701,8317365,1832497,5031329,11077473,
2976289,8460001,8355897,1449205,8303845,5035385,6423889,
6019641,8304521,11169409,11186985,6669953,8497857,11239713,
3243309,8287621,1450557,8305197,8340349,1063885,11205237,
8568837,11310693,151285,8501237,8589117,8238273,8308577,
11103161,8414033,223617,2156977,8572217,8361981,6094677,
11314749,8419545,8683861,1448633,8303273,2047569,8287725,
8569617,7849677,8331042,5027430,1441926,7839590,8296566,
123726,6081990,7909894,2021934,8929302,299486,2127390,
8402698,300162,6452438,8297918,1952982,9264598,8368222,
8473678,441446,1444630,8299270,8229642,7842970,8299946,
11076954,8475706,5839306,532030,602334,1868482,4610338,
8266146,8283722,110882,8424330,8441906,2061818,8459482,
8529786,9004338,3538202,9391686,3662586,7845674,8302650,
147386,8372954,3996530,5034190,8689998,6932398,8303326,
8760302,1062014,10658510,2028694,3874174,5280254,7108158,
271094,8496662,2151726,6739062,8566966,2186878,9041518,
5948818,8233698,25706,6423370,4648194,5105170,6019122,
8304002,11045858,9235530,11186466,3927578,8497338,8287102,
1450038,8304678,114262,3313094,6511926,8339830,6582230,
325174,6740414,8568318,202818,5950846,1521694,8024814,
5952198,8289806,1452742,1909718,1944870,6514630,6092806,
8377686,8412838,11154694,1628502,8483142,8588598,7851082,
6093482,2156458,3668670,10980286,1454094,5566878,8308734,
8379038,31114,3247522,3317826,8432442,8889418,8924570,
11279754,8573050,1455446,7853110,8310086,11051942,6095510,
3213722,1456122,7853786,8311438,1457474,7855138,1527778,
2072634,6202994,9015154,8312790,8243214,8278366,2372830,
8331094,5167414,193406,5220142,8436550,1599486,8454126,
263710,2091614,3919518,7153502,8524430,8981406,3532846,
8559582,9016558,1722518,7206230,8120182,8612310,8685318,
231262,1602190,9601298,6613378,5383058,391474,5631826,
11029686,8340558,2997454,8938142,273174,8498742,8569046,
3102910,7215694,7250846,8621774,468538,1839466,2753418,
5952250,8694106,10065034,10978986,5635882,7006810,714602,
1628554,2999482,10311098,3722126,6463982,8291886,2386350,
8784014,8344614,4776686,5233662,7061566,8432494,8450070,
8502798,2597262,8537950,2157862,347534,2175438,8573102,
11877390,8312166,6362608,6084096,8419026,2038938,8436602,
11178458,8454178,2126818,8524482,2144394,8559634,2267426,
5836030,6434290,8350074,8560986,7841046,8298022,1935510,
11075030,5837382,8281122,8404154,1567090,8421730,11163586,
8439306,8492034,11233890,8527186,7842398,7772770,3888474,
6630330,5276978,8475810,3959454,8318978,8424434,2061922,
8529890,2149802,5805610,11306898,444930,8478514,8566394,
3206390,8303430,8321006,200894,2028798,8426462,376654,
1906442,8304106,1976746,8374410,8234478,8287206,8304782,
3770174,237398,8023566,325278,3981086,2170758,3998662,
8568422,11345430,448310,1381190,5036998,1064822,11223750,
344206,8569774,925566,3667422,5038350,1452846,7850510,
8307486,8325062,1944974,1066174,6092910,8412942,6198366,
10311150,310406,2138310,8535974,11277830,6778374,11050018,
328658,1840870,5039702,6199718,8572478,5955682,7783586,
1456226,5112034,6025986,6096290,1456902,7854566,8311542,
6747278,8575182,6027338,8278496,8331224,8348800,6573624,
8858504,5677248,11160960,211112,8436680,1599616,8454256,
8489408,6239680,3515400,5378456,5870584,6327560,8612440,
422024,8647592,3780392,2287784,5029640,8228472,8281200,
5099944,1602320,8913936,5275704,1672624,2129600,6699360,
8562416,372000,6330264,8615144,3661416,5102648,7844504,
8301480,5225680,11166368,8442088,8459664,8494816,8072992,
8529968,3520808,6719640,9004520,2167456,8565120,8125720,
374704,2202608,8600272,6932580,816132,4648376,2082280,
8692208,1450896,7848560,8305536,3770928,8340688,3823656,
6565512,203000,5282464,6196416,8481296,2101208,8498872,
5335192,2171512,8569176,9026152,1767264,8621904,9571008,
1452924,8377868,10311228,4723412,5848276,7219204,2034960,
6147744,8432624,8467776,312512,2175568,8573232,8240640,
7855320,8419130,8244046,5449462,8297450,8807154,6575002,
8402906,11144762,8227822,1443486,7841150,8298126,125286,
1953190,2023494,1567194,8456986,8913962,3535706,8123042,
8563118,8352882,5171626,197618,232770,8458338,8477942,
8232554,7845882,8302858,8285958,1448894,6018654,7846558,
8303534,10588414,8408990,8426566,8479294,8567174,11309030,
376758,7776930,8233906,25914,8374514,8497546,5386594,
8287310,1450246,8304886,8340038,8357614,8410342,11152198,
8586102,1451598,8306238,11241430,1452950,1909926,8307590,
3351158,8377894,1171734,310510,7217878,5039130,8308266,
346338,8571906,7781662,1454302,8308942,1964006,188830,
7219230,8590158,7853318,7854670,8311646,6624350,2177622,
7785718,1458358,5114166,7856022,8312998,8331302,5167622,
1564542,4798526,8981614,8559790,9016766,8612518,5943670,
7771574,8281278,1444214,2358166,6013974,7841878,8298854,
8755830,2850294,8334006,6084278,2481198,5223054,5680030,
7050958,2059374,8457038,8474614,8492190,8527342,8562494,
8615222,8283982,1446918,8301558,11043414,6614262,8442166,
4803934,8459742,8916718,8477318,8494894,5331214,8073070,
2167534,8565198,2202686,11342206,5632034,5036478,11029894,
2382502,8340766,8428646,5282542,8991078,3524942,5952458,
4722138,8239366,8344822,1457734,7855398,11054230,8329950,
2143198,8540862,2178350,8243448,1880936,8296176,8331328,
1511840,2003968,8436784,2056696,4798552,8489512,8981640,
8559816,11301672,8612544,8647696,8246152,8281304,7841904,
8615248,8650400,7844608,11166472,8442192,2097256,8494920,
8951896,3520912,8565224,2202712,5950456,8252912,8305640,
8340792,1521304,1538880,6618344,5739544,8938376,8498976,
11240832,5792272,8569280,2206768,8622008,1802520,488376,
8256968,1455056,8309696,2386584,8344848,8836976,8450304,
769592,8538184,2158096,7855424,2108072,4570090,4710698,
5677378,8876210,5782834,2267634,4643098,8298906,4713402,
2006698,4871586,8615274,8073122,8530098,8565250,8340818,
6583218,8885674,8024450,8938402,2136490,3050442,9043858,
9079010,8344874,8538210,3529050,8573362,8243500,9227756,
8331380,8489564,2584028,4868908,8524716,11266572,3515556,
3533132,8612596,1373988,6857700,8246204,4607972,8281356,
1444292,8298932,5223132,8248908,4610676,8301636,8776188,
8336788,8494972,11236828,8987100,8565276,8252964,8288116,
4649884,6934764,8340844,2013484,1626812,4825644,5282620,
8938428,8569332,4966252,8622060,8257020,8344900,3529076,
8312452,8401710,8489590,2127078,8524742,2197382,8226626,
8227302,8297606,6575158,8403062,2022974,8227978,11022562,
1056970,5732186,7772354,8229330,337706,8563274,11305130,
7843334,8125226,8424694,11166550,8232034,8583554,3205974,
6018134,8303014,5279942,3206650,5948506,8233386,1888450,
3716354,6458210,8286114,1449050,3733930,7846714,8303690,
6194570,8479450,5843050,8584906,5949182,8234062,1872226,
1889802,8305042,8340194,11169930,2065562,11205082,2153442,
11292962,11047574,8411174,11153030,2031086,8428750,8446326,
8499054,2171694,8569358,8359122,11100978,8025178,11241586,
309314,5038610,8237442,6427114,8255018,64602,6462266,
8290170,1453106,1910082,5108914,7850770,8307746,10592626,
6514994,8465930,310666,345818,8571386,8588962,8361826,
5286026,1876958,8731598,3318190,8415230,8432806,8450382,
8503110,11244966,8538262,2158174,8573414,7783846,1878310,
1456486,2388014,8328702,2036494,8434158,8451734,1614670,
2071646,8504462,2159526,3548030,8242174,2037846,11792526,
6098578,11002984,6450800,1441640,7839304,8296280,8331432,
3779248,5167752,6081704,8823560,2004072,1564672,2021648,
5220480,8876288,8436888,2056800,2970752,8454464,1670128,
8524768,8981744,2162256,8559920,5378664,5413816,8612648,
1793160,8647800,439808,11864208,5029848,5943800,8685656,
8263832,8720808,5100152,7842008,5170456,7912312,8404440,
1567376,4766208,8474744,8562624,3096488,8615352,11357208,
5032552,40968,1886448,7844712,8301688,2378576,8319264,
2027056,8442296,234304,4804064,8459872,8987152,11272032,
8565328,11764160,8600480,10975268,2995764,1890504,8288168,
5739648,8024528,8938480,4878424,3525072,8569384,1382828,
2753756,8694444,1453132,10135676,8835052,1628892,2999820,
2191324,3105276,8292224,1455160,7852824,8309800,8344952,
2035168,2052744,11192264,8538288,347872,5043368,2143328,
470930,10067426,2826114,1525490,8837106,11578962,8243656,
1881144,8331536,11073392,2882976,2056904,2970856,3462984,
8489720,6239992,8067896,8524872,8560024,6292720,8612752,
8647904,5943904,7771808,1426872,1883848,8281512,4643280,
5557232,6014208,5170560,196552,2024456,5223288,2042032,
8439696,1602632,6629368,8457272,8914248,8492424,8949400,
2129912,8562728,8615456,11357312,8650608,3239904,1447152,
8301792,656232,2027160,2044736,8442400,11184256,269560,
2097464,2132616,4874472,7159352,8530280,2202920,11342440,
1837880,3665784,8235544,8692520,8253120,6934920,11082856,
8833128,6144000,220888,1609392,2980320,4808224,6179152,
4825800,8024632,2101520,8499184,8956160,8551912,8569488,
9026464,6302184,7216136,8130088,6337336,7251288,8622216,
1382932,1839908,2753860,4581764,6936948,10135780,152612,
2894468,5636324,7112708,10311540,11225492,5847236,8257176,
1894664,8292328,5234104,5691080,5708656,8450512,8468088,
277672,2105576,2140728,8995368,1457968,8312608,3865880,
6607736,2055552,11195072,2143432,2178584,3200046,8226782,
10986214,7840110,124246,3692850,8403218,11145074,2128586,
8280862,8017222,11286358,1883874,8914274,8527602,2165090,
8562754,11304610,5945282,8353194,8476226,8125382,8284242,
8916978,8565458,1904830,8355898,4928578,3698934,95854,
6493518,8409302,3470446,8585062,8374826,219562,8480282,
3471122,8497858,8375502,8410654,237814,8463382,7215486,
8306550,309470,3210862,5038766,8237598,8694574,8290326,
1453262,8307902,8325478,11067334,11084910,310822,1453938,
8308578,8589794,8028038,312174,347326,8243734,4605502,
8278886,1933950,8331614,5167934,6081886,2021830,11161350,
11178926,2970934,4798838,8454646,8489798,8946774,1670310,
2127286,2584262,8981926,8560102,5449150,8647982,5030030,
1883926,1444526,5100334,7842190,8299166,7912494,8879174,
2586966,8650686,8301870,8337022,2027238,8442478,4804246,
2097542,2132694,8547934,3538774,8565510,2202998,11869798,
8253198,2031294,6144078,8499262,8956238,8569566,6302262,
1846798,5168662,2075286,10300854,1900202,8297866,6188746,
8457402,7846298,8303274,8374254,3470550,377174,7777346,
3243414,8270150,8287726,1450662,8305302,3542206,1452014,
8306654,8359382,3210966,6023126,7113514,1964422,7853734,
8418923,333963,7839591,8296567,1512231,8366871,194031,
8015351,6292903,8577783,5942059,8297243,8754219,1952307,
6522067,8349971,8402699,8473003,8560883,8421627,144007,
11076955,214987,8230319,8529111,110883,8336451,6578851,
8424331,8459483,304219,3520627,8564939,8301975,8232347,
8302651,3785619,6088075,8372955,11149963,4577215,7319071,
7776047,8233023,8268175,11010031,77759,7846351,8303327,
8408783,11150639,8426359,218367,271095,4928735,8584543,
5034867,1449363,8304003,6089427,8374307,11186467,8497339,
8234375,114263,3770071,8339831,8357407,184567,8410135,
11151991,237295,11292599,3998559,6740415,11310175,8235727,
1451391,6021151,8306031,8763007,8376335,273799,8587247,
8237079,6461903,1452743,8307383,116967,1944871,8465567,
1171527,4827335,8483143,8500719,2138207,11277727,3983687,
8571023,11312879,7780779,1453419,7851083,8308059,8413515,
328555,2156459,6726219,7781455,7851759,8308735,8361463,
1981375,9398447,8572375,8589951,1859019,1577803,6200291,
2105083,8573051,3213047,8239783,7853111,3670699,8240459,
1456123,7853787,1983403,2159163,8574403,1456799,7854463,
8311439,8381743,5288367,6202319,8030223,8592655,315035,
456319,2284223,1880755,8278419,1441355,8401451,8419027,
8436603,8524483,8559635,2267427,8350075,11091931,335419,
8421731,8439307,1602243,2059219,8456883,11198739,8527187,
8316951,8335203,355699,8581267,8529215,1517067,8424435,
1604947,8459587,1835463,6440375,8303431,10588311,148167,
1062119,8426463,11168319,3909431,8479191,1449467,8304107,
3927683,8497443,8954419,2152507,3242895,8287207,9201159,
8304783,1942271,149519,2065303,6635063,11204823,6195663,
8568423,11310279,2188335,5036999,8235831,11223751,3667423,
8237183,1874671,4651679,8307487,1927399,8325063,117071,
8448095,2068007,8465671,11277831,8571127,205627,346235,
2174139,8571803,8308839,8361567,311759,3967567,3247627,
3317931,1456227,5112035,8838147,8241239,8311543,8575183,
4605113,3761465,5624521,2021441,3849345,228689,2056593,
2970545,8454257,10739137,5782705,8524561,8612441,11354297,
1848385,38057,1444137,4642969,8298777,6049049,1057465,
6084201,2481121,213817,8456961,10302441,5785409,7173913,
2164753,8615145,11357001,8336633,4768705,5225681,2062001,
8459665,5278409,5331137,8780089,2030905,3858809,6706121,
7163097,8586753,5423073,1839597,10065165,1523229,7006941,
2085661,8292017,8344745,171905,4811969,5339249,435545,
3883145,11194761,8454283,8524587,5028315,36731,1442811,
8297451,11092035,8402907,11144763,11022407,1443487,8298127,
8527291,8317055,8475239,8563119,8300155,6191035,8232555,
8302859,8373163,182747,4577423,1448895,7846559,8303535,
8426567,11168423,3540439,8567175,6423579,1449571,8304211,
6195091,8497547,8234583,8726711,8287311,79319,1450247,
8304887,1942375,8340039,8410343,11204927,8568527,11310383,
8376543,11241431,1452951,8307591,8430623,8483351,8536079,
3247055,7851967,8379247,2139767,11314439,7219231,6097747,
8470507,8312999,11423951,8278679,11020535,2267687,8403063,
11144919,8473367,1883043,8228655,8317211,11059067,8563275,
8580851,1832343,8230007,1445671,8300311,2183863,8476747,
2027031,8424695,2976135,2150063,8565303,10974567,1448375,
7846039,8303015,8478775,5948507,7776411,8233387,1449051,
8303691,8426723,11168579,8567331,8584907,5456379,5949183,
8251639,8304367,149103,11186831,8480127,3717707,6459563,
1450403,7848067,8305043,11046899,8340195,184931,8410499,
2065563,8586259,8428751,8446327,8463903,8569359,1451755,
1908731,4650587,7849419,8306395,1961459,3789363,8359123,
8376699,3912395,8482155,11241587,2190623,3210707,5952563,
8237443,8272595,8307747,1066435,3808291,8483507,8940483,
8536235,2156147,3984051,4898003,345819,2173723,8571387,
8238119,1453783,8308423,11103007,11296343,1454459,7852123,
8309099,11314595,8415231,8467959,8538263,2158175,11297695,
8573415,2281207,11420727,1456487,1983767,8469311,11211167,
2159527,11299047,8574767,2282559,11422079,1457839,7855503,
6203359,8488239,1458515,8313155,1985795,8243605,8278757,
3761725,4710829,8436941,4798709,7540565,8454517,8911493,
2092005,8489669,8946645,8542397,8559973,9016949,2197461,
2707165,8647853,4608077,1444397,6014157,8299037,91045,
2428653,8404493,214077,8439645,8545101,9002077,8562677,
8615405,2709869,8650557,919821,1886501,7844765,8301741,
2378629,6508989,8336893,2009533,1570133,5225941,8442349,
2062261,8459925,5278669,8020525,8477501,8495077,11236933,
9004781,1380853,4579685,8692469,4614837,1890557,8288221,
8340949,8376101,2013589,7075477,238413,1152365,2066317,
4808173,8463981,11680389,3542701,8569437,8622165,8657317,
1455213,8309853,6517101,8345005,5234053,7855581,2020349,
227597,8505893,1881119,3709023,8524847,1448479,31583,
6429247,8454595,8981875,3533315,1829119,7769807,8226783,
10986215,1442447,8297087,8403219,8229487,1919703,8317367,
8563431,11305287,303387,2027187,234435,5806027,9480763,
8303847,271615,3980151,1520187,11186987,8497859,11239715,
8234895,8287623,1450559,7848223,8305199,8340351,11205239,
4650743,4721047,2031919,2190779,8290327,8325479,11067335,
8413359,2050847,8448511,8466087,8923063,8501239,8536391,
11103163,8414035,11155891,1911591,4003135,11314751,8590471,
8311959,7855659,8296463,6081887,8419495,4798839,8560103,
8647983,5100335,6014287,6928239,7842191,4871847,7156727,
7844895,8337023,5226071,8881879,4804247,8460055,11201911,
2132695,7159431,2167847,8565511,7848951,7855711,8299219,
8527707,6368563,8303275,7846975,8497963,1890063,1450663,
8305303,5037519,1452015,8306655,11048511,1065343,8482415,
8499991,6742391,5952823,1453367,8308007,8483767,1964423,
8525029,8419002,8463618,3849320,1445464,5948326,9452034,
2144552,211218,8454362,213922,6089714,1380022,1836998,
7777686,8234662,5951134,8240070,1985042,1985718,3867052,
5098048,7839904,2022248,8472640,2127704,919692,4575500,
7317356,3207276,8234012,1449676,1451704,8359072,1978984,
11311840,3210656,8237392,8366534,8946542,5782862,11266574,
8577446,2742890,5941722,7769626,1442266,1512570,10757546,
6856350,8297582,142318,8473342,11215198,8578798,5486098,
1900594,8474018,3095762,3535838,10654794,2746270,8757262,
1621406,8933022,5839646,8687634,7000338,40918,8565278,
5490154,1448350,8759966,1518654,10061266,10975218,1449026,
8760642,1519330,5949158,10132246,10659526,10977922,2822658,
6021490,6091794,1453082,1523386,2894314,7007098,10065998,
10979950,1910734,10136302,10593278,1629518,10523650,6094498,
8768078,8838382,6201982,10300622,2250814,8474070,11268654,
1602530,8759342,10975270,1449078,8830998,1451782,5952590,
6304110,1910786,11050306,4583014,7852150,1981766,3726574,
3849606,8472094,2127158,3955062,2144734,2162310,10581890,
141746,1900698,5029902,8228734,6453558,1057726,231654,
8914198,1445750,7843414,8300390,5032606,2167718,5949262,
5035986,1450482,1451834,1840534,1524166,6199382,9171078,
8240226,8527552,79580,2190728,2140704,11280224,3957818,
5030006,8228838,207422,352893,1443281,8297921,5030813,
8581165,8424333,2132125,8529789,11271645,8232349,5174125,
8303329,8373633,2151729,8497341,11239197,61537,1450041,
8304681,8339833,8568321,1451393,7849057,8306033,5952201,
8237081,11031665,995769,8307385,152121,10662569,240001,
8588601,2208513,5038925,8308061,8571701,11313557,1067425,
8589953,3247525,2175389,8573053,2176741,8311441,2021365,
8419029,11160885,231317,8492037,8527189,11269045,8229749,
8300053,1972693,8475813,2043673,8424437,11166293,8459589,
11201445,7776153,8285857,8742833,8303433,8426465,5842793,
1836817,5035649,8287209,9201161,11046641,1942273,6090209,
8568425,8586001,8254761,310409,11277833,9010529,8571129,
9485081,275933,346237,8571805,3246953,1456905,7854569,
8311545,5183017,7926225,8419133,1599645,8296777,10581657,
11038633,1442813,8297453,11092037,8527293,8615173,11357029,
56337,8317057,8229853,144893,1888297,7846561,3856809,
8426569,6019333,5035753,8234585,44169,1450249,7847913,
8304889,10132793,1063577,8480649,8568529,1573957,8428597,
1452953,6479689,8307593,117177,1945081,1523257,8430625,
9485185,8237965,1453629,8308269,1980909,2068789,6199149,
6744005,1840977,8238641,10593825,6709529,347017,8239993,
8696969,67153,7853321,8310297,7926329,8031785,8369187,
8301587,8340795,8524745,458713,8297609,11022565,9387997,
6294621,214001,1972953,8284089,2027033,8495001,1835725,
7776413,1449053,8303693,8760669,8409149,341765,2169669,
3997573,8567333,376917,2204821,7847393,1454461,8309101,
1947265,9346761,1456489,7854153,5112973,1511245,1055023,
8424775,5739703,8587015,10414919,8622167,8335621,11077477,
8353197,11095053,6511097,8462033,377073,11314753,8260742,
2005038,6574798,8402702,8280346,11022202,1443282,7840946,
8297922,1935410,8368226,8561562,8316850,8562914,1445310,
8299950,109534,9565422,6648482,1886062,8318878,8775854,
8424334,8459486,8529790,2167278,8564942,8232350,1448014,
6017774,7845678,8302654,8320230,6457850,8285754,1448690,
7846354,8303330,1975970,8373634,8408786,200794,8426362,
11168218,11308826,1449366,8304006,8585222,8287106,1450042,
8304682,11046538,8339834,8410138,11151994,2030050,11169570,
237298,8568322,11310178,2276114,8324286,8254658,10996514,
8289810,1452746,8307386,11506218,8412842,8447994,8465570,
8500722,2138210,9010426,8571026,8308062,11102646,8448670,
8501398,11243254,8571702,6867506,8572378,2386302,3317830,
8414870,4776638,8432446,8537902,1455450,8310090,11051946,
8240462,8310766,8433798,1456802,7854466,8311442,1457478,
7926122,6660650,1564390,8419030,668014,8454182,8524486,
10985802,7839698,8807054,5099194,11075034,8281126,2006494,
8404158,8421734,8439310,8456886,11198742,8492038,11233894,
9001742,2164678,8562342,2165354,8563018,8283830,8424438,
8529894,2149806,2272838,8232454,8285858,2011226,8408890,
8865866,8426466,11168322,8567074,8251382,8287210,1942274,
11204826,8568426,8483250,3526818,8571806,8238538,11173730,
1456906,8311546,6608780,8436684,2970548,8489412,2126900,
334148,8559716,7206364,8120316,5029644,7771500,6013900,
6927852,8773332,4766004,5679956,8456964,8562420,8615148,
8650300,8283908,8776036,8336636,4768708,8442092,8459668,
8477244,8494820,8951796,8072996,8529972,3520812,8547548,
9004524,8565124,11306980,11869412,7075220,2540612,8938276,
8498876,5335196,8991004,6723700,8621908,7079276,8502932,
69156,36734,8402910,11144766,11022410,8298130,8421838,
1444842,8299482,11041338,1972122,11304978,5944974,109742,
11077166,8373166,6440482,8285962,1448898,8303538,113122,
8373842,165850,8426570,8567178,8497550,8287314,1450250,
8304890,11046746,1942378,8340042,11081898,8410346,237506,
8463074,8480650,2276322,1451602,7849266,8306242,1452954,
7850618,8307594,310514,1453630,8308270,135430,8817974,
8501606,8571910,5953762,1454306,8308946,1964010,8361674,
11103530,1455658,7853322,8310298,6028122,8313002,8278682,
1564650,8403066,1935774,5382022,8583558,7846042,182906,
8286118,8321270,11168582,2204822,8251642,10993498,6371010,
114630,3770438,8410502,11152358,8568686,8288146,1451082,
8323298,11065154,1574114,8428754,8463906,8499058,11240914,
2154122,3525050,11768194,8290174,8413206,8448358,11190214,
8571390,1456490,1913466,6026926,2970808,8489672,8946648,
8999376,2162312,5413872,8457224,4610784,1447104,7844768,
8301744,8565384,2013592,8938536,3542704,7855584,11022722,
8579658,8426882,9010946,8308582,9275262,11296502,156698,
1449314,8303954,8287730,8463490,1454722,8309362,985059,
149523,1063475,6195667,1066179,10768131,8588707,228875,
8647857,5948771,5562099,1062643,5280883,5456643,4002567,
8572327,8524384,8226268,18276,10985700,36528,177136,
8402704,8316852,7842976,8299952,8370256,6648484,1675152,
182544,10306320,8303332,6019128,11239200,6300344,8339836,
8410140,4825988,6196916,8499372,11241228,4581276,6444332,
8289812,7850412,99396,8412844,8465572,8535876,345460,
6743124,8308740,8291840,1577808,8502752,1456128,11052624,
8433800,8468952,11210808,8504104,2136210,1378440,1448744,
1608956,1382522,1452826,8278424,8348728,5677176,8454184,
1669848,8524488,3235464,8350080,11091936,8298028,8281128,
3518032,8335208,8408892,8426468,8444044,8496772,8567076,
342860,2170764,29196,8289916,8412948,8308168,8413624,
8571808,11313664,8379148,8572484,8414976,11156832,6025316,
8310196,6025992,1456908,8311548,2129554,1448224,8302864,
8426572,1872076,8306244,11241436,8290020,8413052,8536084,
3544500,8308948,1981588,8439494,2009382,8302942,8885680,
8306348,6416304,10986064,8403068,5099456,8351016,2023656,
8230012,1902652,8353044,1059004,6085740,8370620,4610708,
5947160,1448380,5104188,7846044,8303020,5385404,8409152,
11151008,5632820,8497708,1063736,8375352,8410504,8323300,
8499060,8307752,8413208,8501088,8415236,6253388,8538268,
8995244,2158180,1456492,8311132,1983772,8434164,454660,
8946650,8914202,1745898,3278390,2039308,9008894,8454600,
8227464,37048,3235880,6575320,8403224,11145080,8563436,
8230168,1448536,8303176,11150488,8478936,5948668,8303852,
6617232,11186992,8497864,6197436,11241748,345980,8571548,
8594532,299493,8402705,58161,11025585,2132129,8689329,
5948825,6423377,148745,166997,2170661,448213,2276117,
11241229,8324965,8377693,8379045,8311445,6097545,6027917,
8419033,985061,809301,8577893,8227725,8459593,6459309,
64349,8412949,8483253,8571809,8238541,8311549,8312901,
6618247,8753757,8317061,5944977,8233237,3241653,201005,
8426573,3681729,8251489,6441837,8269741,11011597,536301,
8304893,8340045,11081901,2012685,11152205,6671677,11241437,
5495437,8379253,5114173,8840285,2171623,11311143,70693,
8472697,8578153,6434557,1830997,5029829,8228661,5805877,
9004709,3681885,1837081,61905,1450409,7848073,8305049,
8410505,80157,11047581,1521389,8411181,8446333,8463909,
11311221,274169,6671833,5179225,8378057,6708337,8415237,
1913469,1983773,8585069,5951373,8236253,274325,8325485,
5641765,5031441,6191457,8304633,1063321];
