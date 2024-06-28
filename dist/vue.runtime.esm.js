/*!
 * Vue.js v1.0.0
 * (c) 2014-2024 bj-white
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
  }

  function extend (to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to
  }

  function toNumber () {}

  function toString () {}

  function looseEqual () {}

  function looseIndexOf () {}

  var no = function () { return false; };

  var _toString = Object.prototype.toString;

  function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
  }

  function makeMap (str, expectsLowerCase) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()]; }
      : function (val) { return map[val]; }
  }

  function noop () {}

  function isObject (obj) {
    return obj !== null && typeof obj === 'object'
  }

  function remove (arr, item) {
    if (arr.length) {
      var index = arr.indexOf(item);
      if (index > -1) {
        return arr.splice(index, 1)
      }
    }
  }

  function mergeOptions (parent, child, vm) {
    if (typeof child === 'function') {
      child = child.options;
    }

    normalizeProps(child);
    normalizeInject(child);
    normalizeDirectives(child);

    if (!child._base) {
      if (child.extends) {
        console.log('todo.............');
      }
      if (child.mixins) {
        console.log('todo.............');
      }
    }

    var options = {};
    var key;
    for (key in parent) {
      console.log('todo.............');
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField (key) {
      console.log(key);
    }
    return options
  }

  function normalizeProps (options, vm) {
    var props = options.props;
    if (props) {
      console.log('todo.............');
    }
  }

  function normalizeInject (options, vm) {
    var inject = options.inject;
    if (inject) {
      console.log('todo.............');
    }
  }

  function normalizeDirectives (options) {
    var dirs = options.directives;
    if (dirs) {
      console.log('todo.............');
    }
  }

  function nextTick () {}

  var inBrowser = typeof window !== 'undefined';
  var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;

  var _isServer;
  var isServerRendering = function () {
    if (_isServer === undefined) {
      if (!inBrowser && !inWeex && typeof global !== 'undefined') {
        _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
      } else {
        _isServer = false;
      }
    }
    return _isServer
  };

  function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }

  var uid = 0;
  var Dep = function Dep () {
    this.id = uid++;
    this.subs = [];
  };

  Dep.prototype.addSub = function addSub (sub) {
    this.subs.push(sub);
  };

  Dep.prototype.removeSub = function removeSub (sub) {
    remove(this.subs, sub);
  };
    
  Dep.prototype.depend = function depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  };

  Dep.prototype.notify = function notify () {
    var subs = this.subs.slice();
    for (var i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  };

  Dep.target = null;

  window.Dep = Dep;

  function createTextVNode () {}

  function createEmptyVNode () {}

  var VNode = function VNode (
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.context = context;
    this.componentOptions = componentOptions;
    this.asyncFactory = asyncFactory;
  };

  function set (target, key, val) {}

  function del (target, key) {}

  function defineReactive (obj, key, val, customSetter, shallow) {
    var dep = new Dep();
    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return
    }
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
      val = obj[key];
    }
    var childOb = !shallow && observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
          }
        }
        return value
      },
      set: function (newVal) {
        var value = getter ? getter.call(obj) : val;
        if (newVal === value) {
          return
        }
        val = newVal;
        dep.notify();
      }
    });
  }

  var Observer = function Observer (value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) ; else {
      this.walk(value);
    }
  };

  Observer.prototype.walk = function walk (obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  };

  function observe (value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
      return
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (
      
      !isServerRendering() &&
      (Array.isArray(value) || isPlainObject(value)) &&
      Object.isExtensible(value) &&
      !value._isVue
    ) {
      ob = new Observer(value);
    }
    if (asRootData && ob) {
      ob.vmCount++;
    }
    return ob
  }

  var uid$1 = 0;

  function initMinix (Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm._uid = uid$1++;
      vm._isVue = true;
      if (options && options._isComponent) {
        console.log('todo.............');
      } else {
        vm.$options = mergeOptions(
          resolveConstructorOptions(vm.constructor),
          options || {});
      }
    };
  }

  function resolveConstructorOptions (Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
      console.log('todo.............');
    }
    return options
  }

  function stateMixin (Vue) {
    var dataDef = {};
    dataDef.get = function () { return this._data };
    var propsDef = {};
    propsDef.get = function () { return this._props };
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);

    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;
  }

  function eventsMixin (Vue) {
    Vue.prototype.$on = function () {};
    Vue.prototype.$once = function () {};
    Vue.prototype.$off = function () {};
    Vue.prototype.$emit = function () {};
  }

  function lifecycleMixin (Vue) {
    Vue.prototype._update = function () {};
    Vue.prototype.$forceUpdate = function () {};
    Vue.prototype.$destroy = function () {};
  }

  function mountComponent () {}

  function markOnce () {}

  function renderStatic () {}

  function renderList () {}

  function renderSlot () {}

  function resolveFilter () {}

  function checkKeyCodes () {}

  function bindObjectProps () {}

  function resolveScopedSlots () {}

  function bindObjectListeners () {}

  function bindDynamicKeys () {}
  function prependModifier () {}

  function installRenderHelpers (target) {
    target._o = markOnce;
    target._n = toNumber;
    target._s = toString;
    target._l = renderList;
    target._t = renderSlot;
    target._q = looseEqual;
    target._i = looseIndexOf;
    target._m = renderStatic;
    target._f = resolveFilter;
    target._k = checkKeyCodes;
    target._b = bindObjectProps;
    target._v = createTextVNode;
    target._e = createEmptyVNode;
    target._u = resolveScopedSlots;
    target._g = bindObjectListeners;
    target._d = bindDynamicKeys;
    target._p = prependModifier;
  }

  function renderMixin (Vue) {
    installRenderHelpers(Vue.prototype);
    Vue.prototype.$nextTick = function () {};
    Vue.prototype._render = function () {};
  }

  function Vue (options) {
    this._init(options);
  }

  initMinix(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

  var config = ({
    optionMergeStrategies: Object.create(null),
    silent: false,
    mustUseProp: no,
    isReservedTag: no,
    isReservedAttr: no,
    getTagNamespace: noop
  });

  var ASSET_TYPES = [
    'component',
    'directive',
    'filter'
  ];

  var KeepAlive = {
    name: 'keep-alive',
    abstract: true,
  };

  var builtInComponents = {
    KeepAlive: KeepAlive
  };

  function initUse (Vue) {
    Vue.use = function (plugin) {};
  }

  function initMixin (Vue) {
    Vue.mixin = function (mixin) {};
  }

  function initExtend (Vue) {
    Vue.cid = 0;
    Vue.extend = function (extendOptions) {};
  }

  function initAssetRegisters (Vue) {
    ASSET_TYPES.forEach(function (type) {
      Vue[type] = function () {};
    });
  }

  function initGlobalAPI (Vue) {
    var configDef = {};
    configDef.get = function () { return config; };
    Object.defineProperty(Vue, 'config', configDef);

    Vue.util = {
      extend: extend,
      mergeOptions: mergeOptions,
      defineReactive: defineReactive
    };

    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick;

    Vue.observable = function (obj) {
      observe(obj);
      return obj
    };

    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(function (type) {
      Vue.options[type + 's'] = Object.create(null);
    });

    Vue.options._base = Vue;

    extend(Vue.options.components, builtInComponents);

    initUse(Vue);
    initMixin(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
  }

  function FunctionalRenderContext () {}

  installRenderHelpers(FunctionalRenderContext.prototype);

  initGlobalAPI(Vue);

  Object.defineProperty(Vue.prototype, '$isServer', {
    get: isServerRendering
  });
  Object.defineProperty(Vue.prototype, '$ssrContext', {
    get: function get () {
      return this.$vnode && this.$vode.ssrContext
    }
  });
  Object.defineProperty(Vue, 'FunctionalRenderContext', {
    value: FunctionalRenderContext
  });

  Vue.version = '1.0.0';

  function createPatchFunction (backend) {
    return function patch () {}
  }

  var patch = createPatchFunction();

  var mustUseProp = function () {};
  var isReservedAttr = makeMap('style,class');

  var isReservedTag = function () {};
  function getTagNamespace () {}
  function isUnknownElement () {}

  function query (el) {
    if (typeof el === 'string') {
      var selected = document.querySelector(el);
      if (!selected) {
        return document.createElement('div')
      }
      return selected
    } else {
      return el
    }
  }

  var directive = {};

  var show = {};

  var platformDirectives = {
    model: directive,
    show: show
  };

  var Transition = {
    name: 'transition'
  };

  var TransitionGroup = {};

  var platformComponents = {
    Transition: Transition,
    TransitionGroup: TransitionGroup
  };

  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.isReservedAttr = isReservedAttr;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;

  extend(Vue.options.directives, platformDirectives);
  extend(Vue.options.components, platformComponents);

  Vue.prototype.__patch__ = inBrowser ? patch : noop;

  Vue.prototype.$mounted = function (el, hydrating) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent()
  };

  return Vue;

})));
