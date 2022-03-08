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

  // Keyboard
  var keyboardHTMLElement = document.createElement("template");

  keyboardHTMLElement.innerHTML = "<h1>KEYBOARD</h1>";

  var keyboard = function(e) {
    setPrototype(t, e);
    var a = constructElement(t);

    function t() {
      var e;
      isInstanceOf(this, t);
      (e = a.call(this)).attachShadow({ mode: "open" });

      return e;
    }

    addKeyFunction(t, [{
      key: "connectedCallback",
      value: function () {
        this.shadowRoot.appendChild(keyboardHTMLElement.content.cloneNode(!0));
      }
    }]);

    return t;
  }(SomethingElement(HTMLElement));

  customElements.define("game-keyboard", keyboard);

  // Game root

  var gameRootElement = document.createElement("template");
  gameRootElement.innerHTML = `
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

    addKeyFunction(returnFunction , [{
      key: "connectedCallback",
      value: function () {
        this.shadowRoot.appendChild(gameRootElement.content.cloneNode(!0));
      }
    }]);

    return returnFunction;
  }(SomethingElement(HTMLElement));

  customElements.define("game-root", gameRoot);

  // Return all relevant objects
  glob.Game = gameRoot;
  return glob;

}({});
