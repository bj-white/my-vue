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

  function cached (fn) {
    var cache = Object.create(null);
    return function cachedFn (str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str))
    }
  }

  function polyfillBind (fn, ctx) {
    function boundFn (a) {
      var l = arguments.length;
      return l
        ? l > 1
          ? fn.apply(ctx, arguments)
          : fn.call(ctx, a)
        : fn.call(ctx)
    }
    boundFn._length = fn.length;
    return boundFn
  }

  function nativeBind (fn, ctx) {
    return fn.bind(ctx)
  }

  var bind = Function.prototype.bind
    ? nativeBind
    : polyfillBind;

  var camelizeRE = /-(\w)/g;
  var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
  });

  function toNumber () {}

  function toString () {}

  function looseEqual () {}

  function looseIndexOf () {}

  var no = function () { return false; };

  var _toString = Object.prototype.toString;

  function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
  }

  var identity = function (_) { return _; };

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

  function isPrimitive (value) {
    return (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'symbol' ||
      typeof value === 'boolean'
    )
  }

  function isTrue (v) {
    return v === true
  }

  function isDef (v) {
    return v !== undefined && v !== null
  }

  function isUndef (v) {
    return v === undefined || v === null
  }

  var config = ({
    optionMergeStrategies: Object.create(null),
    silent: false,
    mustUseProp: no,
    isReservedTag: no,
    isReservedAttr: no,
    getTagNamespace: noop,
    parsePlatformTagName: identity,
  });

  var ASSET_TYPES = [
    'component',
    'directive',
    'filter'
  ];

  var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch'
  ];

  var SSR_ATTR = 'data-server-rendered';

  var hasProto = '__proto__' in {};

  var inBrowser = typeof window !== 'undefined';
  var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
  var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');

  var nativeWatch = ({}).watch;

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

  function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
  }

  var strats = config.optionMergeStrategies;

  function mergeDataOrFn (parentVal, childVal, vm) {
    if (!vm) {
      if (!childVal) {
        return parentVal
      }
      if (!parentVal) {
        return childVal
      }
      return function mergedDataFn () {
        return mergeData(
          typeof childVal === 'function' ? childVal.call(this, this) : childVal,
          typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
        )
      }
    } else {
      return function mergedInstanceDataFn () {
        var instanceData = typeof childVal === 'function'
          ? childVal.call(vm, vm)
          : childVal;
        var defaultData = typeof parentVal === 'function'
          ? parentVal.call(vm, vm)
          : parentVal;
        if (instanceData) {
          return mergeData(instanceData, defaultData)
        } else {
          return defaultData
        }
      }
    }
  }

  function mergeData (to, from) {
    if (!from) { return to }
    console.log('todo....................');
  }

  strats.data = function (parentVal, childVal, vm) {
    if (!vm) {
      if (childVal && typeof childVal !== 'function') {
        return parentVal
      }
      return mergeDataOrFn(parentVal, childVal)
    }
    return mergeDataOrFn(parentVal, childVal, vm)
  };

  function mergeHook (parentVal, childVal) {
    var res = childVal
      ? parentVal
        ? parentVal.concat(childVal)
        : Array.isArray(childVal)
          ? childVal
          : [childVal]
      : parentVal;
    return res
      ? dedupeHooks(res)
      : res
  }

  function dedupeHooks (hooks) {
    var res = [];
    for (var i = 0; i < hooks.length; i++) {
      if (res.indexOf(hooks[i]) === -1) {
        res.push(hooks[i]);
      }
    }
    return res
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });

  function mergeAssets (parentVal, childVal, vm, key) {
    var res = Object.create(parentVal || null);
    if (childVal) {
      return extend(res, childVal)
    } else {
      return res
    }
  }

  ASSET_TYPES.forEach(function (type) {
    strats[type + 's'] = mergeAssets;
  });

  strats.watch = function (parentVal, childVal, vm, key) {
    if (parentVal === nativeWatch) { parentVal = undefined; }
    if (childVal === nativeWatch) { childVal = undefined; }
    if (!childVal) { return Object.create(parentVal || null) }
    if (!parentVal) { return childVal }
    var ret = {};
    extend(ret, parentVal);
    for (var key$1 in childVal) {
      var parent = ret[key$1];
      var child = childVal[key$1];
      if (parent && !Array.isArray(parent)) {
        parent = [parent];
      }
      ret[key$1] = parent
        ? parent.concat(child)
        : Array.isArray(child) ? child : [child];
    }
    return ret
  };

  strats.props =
  strats.methods =
  strats.inject =
  strats.computed = function (parentVal, childVal, vm, key) {
    if (!parentVal) { return childVal }
    var ret = Object.create(null);
    extend(ret, parentVal);
    if (childVal) { extend(ret, childVal); }
    return ret
  };
  strats.provide = mergeDataOrFn;

  var defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  };

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
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField (key) {
      var strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);
    }
    return options
  }

  function normalizeProps (options, vm) {
    var props = options.props;
    if (!props) { return }
    var res = {};
    var i, val, name;
    if (Array.isArray(props)) {
      i = props.length;
      while (i--) {
        val = props[i];
        if (typeof val === 'string') {
          name = camelize(val);
          res[name] = { type: null };
        }
      }
    } else if (isPlainObject(props)) {
      for (var key in props) {
        val = props[key];
        name = camelize(key);
        res[name] = isPlainObject(val)
          ? val
          : { type: val };
      }
    }
    options.props = res;
  }

  function normalizeInject (options, vm) {
    var inject = options.inject;
    if (!inject) { return }
    console.log('todo.............');
  }

  function normalizeDirectives (options) {
    var dirs = options.directives;
    if (dirs) {
      console.log('todo.............');
    }
  }

  var timerFunc;

  var callbacks = [];
  var pending = false;

  function flushCallbacks () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    timerFunc = function () {
      p.then(flushCallbacks);
      if (isIOS) { setTimeout(noop); }
    };
  } else {
    console.log('todo.............');
  }

  function nextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          console.log(e);
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      console.log('todo.............');
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }

  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

  function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }

  var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
  function parsePath (path) {
    if (bailRE.test(path)) {
      return
    }
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }

  /**
   * Check if a string starts with $ or _
   */
  function isReserved (str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F
  }

  function invokeWithErrorHandling (handler, context, args, vm, info) {
    var res;
    try {
      res = args ? handler.apply(context, args) : handler.call(context);
      if (res) {
        console.log('todo..........');
      }
    } catch (e) {
      console.log('todo...........');
    }
    return res
  }

  var uid = 0;
  var Dep$1 = function Dep () {
    this.id = uid++;
    this.subs = [];
  };

  Dep$1.prototype.addSub = function addSub (sub) {
    this.subs.push(sub);
  };

  Dep$1.prototype.removeSub = function removeSub (sub) {
    remove(this.subs, sub);
  };
    
  Dep$1.prototype.depend = function depend () {
    if (Dep$1.target) {
      Dep$1.target.addDep(this);
    }
  };

  Dep$1.prototype.notify = function notify () {
    var subs = this.subs.slice();
    for (var i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  };

  Dep$1.target = null;
  var targetStack = [];

  function pushTarget (target) {
    targetStack.push(target);
    Dep$1.target = target;
  }

  function popTarget () {
    targetStack.pop();
    Dep$1.target = targetStack[targetStack.length - 1];
  }

  window.Dep = Dep$1;

  function createTextVNode (val) {
    return new VNode(undefined, undefined, undefined, String(val))
  }

  function createEmptyVNode () {
    console.log('todo........');
  }

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
    // console.log(tag, data, children, text, elm, context, componentOptions, asyncFactory)
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  };

  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);

  var methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
  ];

  methodsToPatch.forEach(function (method) {
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break
        case 'splice':
          inserted = args.slice(2);
          break
      }
      if (inserted) { ob.observeArray(inserted); }
      ob.dep.notify();
      return result
    });
  });

  function set (target, key, val) {}

  function del (target, key) {}

  function defineReactive (obj, key, val, customSetter, shallow) {
    var dep = new Dep$1();
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
        if (Dep$1.target) {
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
        childOb = !shallow && observe(newVal);
        dep.notify();
      }
    });
  }

  function protoAugment (target, src) {
    target.__proto__ = src;
  }

  var Observer = function Observer (value) {
    this.value = value;
    this.dep = new Dep$1();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      }
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  };

  Observer.prototype.walk = function walk (obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  };

  Observer.prototype.observeArray = function observeArray (items) {
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  };

  var shouldObserve = true;

  function toggleObserving (value) {
    shouldObserve = value;
  }

  function observe (value, asRootData) {
    if (!isObject(value) || value instanceof VNode) {
      return
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (
      shouldObserve &&
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

  function validateProp (key, propOptions, propsData, vm) {
    var prop = propOptions[key];
    var absent = !hasOwn(propsData, key);
    var value = propsData[key];
    var booleanIndex = getTypeIndex(Boolean, prop.type);
    if (booleanIndex > -1) {
      if (absent && !hasOwn(prop, 'default')) {
        value = false;
      } else if (value === '' || value === hyphenate(key)) {
        console.log('todo...............');
      }
    }
    if (value === undefined) {
      value = getPropDefaultValue(vm, prop, key);
      var prevShouldObserve = shouldObserve;
      toggleObserving(true);
      observe(value);
      toggleObserving(prevShouldObserve);
    }
    return value
  }

  function getPropDefaultValue (vm, prop, key) {
    if (!hasOwn(prop, 'default')) {
      return undefined
    }
    var def = prop.default;
    if (vm && vm.$options.propsData &&
      vm.$options.propsData[key] === undefined &&
      vm._props[key] !== undefined
    ) {
      return vm._props[key]
    }
    return typeof def === 'function' && getType(prop.type) !== 'Function'
      ? def.call(vm)
      : def
  }

  var functionTypeCheckRE = /^\s*function (\w+)/;

  function getType (fn) {
    var match = fn && fn.toString().match(functionTypeCheckRE);
    return match ? match[1] : ''
  }

  function isSameType (a, b) {
    return getType(a) === getType(b)
  }

  function getTypeIndex (type, expectedTypes) {
    if (!Array.isArray(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1
    }
    for (var i = 0, len = expectedTypes.length; i < len; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i
      }
    }
    return -1
  }

  var activeInstance = null;

  function setActiveInstance (vm) {
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    return function () {
      activeInstance = prevActiveInstance;
    }
  }

  function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
      var vm = this;
      var prevEl = vm.$el;
      var prevVnode = vm._vnode;
      var restoreActiveInstance = setActiveInstance(vm);
      vm._node = vnode;
      if (!prevVnode) {
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
      } else {
        console.log('todo..........');
      }
      restoreActiveInstance();
      if (prevEl) {
        prevEl.__vue__ = null;
      }
      if (vm.$el) {
        vm.$el.__vue__ = vm;
      }
      if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
        console.log('todo...............');
      }
    };
    Vue.prototype.$forceUpdate = function () {};
    Vue.prototype.$destroy = function () {};
  }

  function mountComponent (vm, el, hydrating) {
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
    }
    callHook(vm, 'beforeMount');

    var updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };

    new Watcher(vm, updateComponent, noop, {
      before: function before () {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, 'beforeUpdate');
        }
      }
    }, true);
    hydrating = false;
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }

    return vm
  }

  function initLifecycle (vm) {
    var options = vm.$options;
    var parent = options.parent;
    if (parent && !options.abstract) {
      console.log('todo............');
    }

    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }

  function callHook (vm, hook) {
    pushTarget();
    var handlers = vm.$options[hook];
    if (handlers)  {
      for (var i = 0, j = handlers.length; i < j; i++) {
        invokeWithErrorHandling(handlers[i], vm, null);
      }
    }
    popTarget();
  }

  var has = {};
  var flushing = false;
  var queue = [];
  var waiting = false;
  var index = 0;
  var activatedChildren = [];

  var currentFlushTimestamp = 0;

  var getNow = Date.now;

  if (inBrowser && !isIE) {
    var performance = window.performance;
    if (
      performance &&
      typeof performance.now === 'function' &&
      getNow() > document.createEvent('Event').timeStamp
    ) {
      getNow = function () { return performance.now(); };
    }
  }

  function resetSchedulerState () {
    index = queue.length = activatedChildren.length = 0;
    has = {};
    waiting = flushing = false;
  }

  function flushSchedulerQueue () {
    currentFlushTimestamp = getNow();
    flushing = true;
    var watcher, id;
    queue.sort(function (a, b) { return a.id - b.id; });
    for (index = 0; index < queue.length; index++) {
      watcher = queue[index];
      if (watcher.before) {
        watcher.before();
      }
      id = watcher.id;
      has[id] = null;
      watcher.run();
    }

    var activatedQueue = activatedChildren.slice();
    var updatedQueue = queue.slice();

    resetSchedulerState();

    callActivatedHooks(activatedQueue);
    callUpdatedHooks(updatedQueue);
  }

  function callUpdatedHooks (queue) {
    var i = queue.length;
    while (i--) {
      var watcher = queue[i];
      var vm = watcher.vm;
      if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'updated');
      }
    }
  }

  function callActivatedHooks (queue) {
    for (var i = 0; i < queue.length; i++) {
      console.log('todo....................');
    }
  }

  function queueWatcher (watcher) {
    var id = watcher.id;
    if (has[id] == null) {
      has[id] = true;
      if (!flushing) {
        queue.push(watcher);
      } else {
        console.log('todo..........');
      }
      if (!waiting) {
        waiting = true;
        nextTick(flushSchedulerQueue);
      }
    }
  }

  var uid$1 = 0;
  var Watcher = function Watcher (vm, expOrFn, cb, options, isRenderWatcher) {
    this.vm = vm;
    if (isRenderWatcher) {
      vm._watcher = this;
    }
    vm._watchers.push(this);
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = uid$1++;
    this.active = true;
    this.dirty = this.lazy;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    this.expression =  expOrFn.toString()
      ;
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = noop;
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get();
  };

  Watcher.prototype.get = function get () {
    pushTarget(this);
    var value;
    var vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      throw e
    } finally {
      popTarget();
      this.cleanupDeps();
    }
    return value
  };

  Watcher.prototype.evaluate = function evaluate () {
    this.value = this.get();
    this.dirty = false;
  };

  Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var i = this.deps.length;
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };

  Watcher.prototype.addDep = function addDep (dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };

  Watcher.prototype.update = function update () {
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };

  Watcher.prototype.run = function run () {
    if (this.active) {
      var value = this.get();
      if (
        value !== this.value ||
        isObject(value) ||
        this.deep
      ) {
        var oldValue = this.value;
        this.value = value;
        if (this.user) {
          var info = "callback for watcher \"" + (this.expression) + "\"";
          invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm);
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };

  Watcher.prototype.teardown = function teardown () {
    if (this.active) {
      console.log('todo............');
    }
  };

  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };

  function stateMixin (Vue) {
    var dataDef = {};
    dataDef.get = function () { return this._data };
    var propsDef = {};
    propsDef.get = function () { return this._props };
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);

    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;

    Vue.prototype.$watch = function (expOrFn, cb, options) {
      var vm = this;
      if (isPlainObject(cb)) {
        console.log('todo............');
      }
      options = options || {};
      options.user = true;
      var watcher = new Watcher(vm, expOrFn, cb, options);
      if (options.immediate) {
        pushTarget();
        invokeWithErrorHandling(cb, vm, [watcher.value]);
        popTarget();
      }
      return function unwatchFn () {
        watcher.teardown();
      }
    };
  }

  function initState (vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) { initProps(vm, opts.props); }
    if (opts.methods) { initMethods(vm, opts.methods); }
    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true);
    }
    if (opts.computed) { initComputed(vm, opts.computed); }
    if (opts.watch && opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch);
    }
  }

  function initWatch (vm, watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        console.log('todo................');
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }

  function createWatcher (vm, expOrFn, handler, options) {
    if (isPlainObject(handler)) {
      console.log('todo.............');
    }
    if (typeof handler === 'string') {
      console.log('todo.............');
    }
    return vm.$watch(expOrFn, handler, options)
  }

  function initData (vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {};
    if (!isPlainObject(data)) {
      data = {};
    }
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var i = keys.length;
    while (i--) {
      var key = keys[i];
      if (props && hasOwn(props, key)) {
        console.log('todo...........');
      } else if (!isReserved(key)) {
        proxy(vm, '_data', key);
      }
    }
    observe(data, true);
  }

  function getData (data, vm) {
    pushTarget();
    try {
      return data.call(vm, vm)
    } catch (e) {
      console.log(e);
      return {}
    } finally {
      popTarget();
    }
  }

  function initMethods (vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {
      vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
    }
  }

  function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function initProps (vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props = vm._props = {};
    var keys = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    if (!isRoot) {
      toggleObserving(false);
    }
    for (var key in propsOptions) {
      keys.push(key);
      var value = validateProp(key, propsOptions, propsData, vm);
      defineReactive(props, key, value);
      if (!(key in vm)) {
        proxy(vm, '_props', key);
      }
    }
    toggleObserving(true);
  }

  var computedWatcherOptions = { lazy: true };

  function initComputed (vm, computed) {
    var watchers = vm._computedWatchers = Object.create(null);
    var isSSR = isServerRendering();
    for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get;
      if (!isSSR) {
        watchers[key] = new Watcher(
          vm,
          getter || noop,
          noop,
          computedWatcherOptions
        );
      }
      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      }
    }
  }

  function defineComputed (target, key, userDef) {
    var shouldCache = !isServerRendering();
    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = shouldCache
        ? createComputedGetter(key)
        : createGetterInvoker();
      sharedPropertyDefinition.set = noop;
    } else {
      console.log('todo.............');
    }
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function createComputedGetter (key) {
    return function computedGetter () {
      var watcher = this._computedWatchers && this._computedWatchers[key];
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          console.log('todo..............');
        }
        return watcher.value
      }
    }
  }

  function createGetterInvoker (fn) {
    console.log('todo.................');
  }

  function eventsMixin (Vue) {
    Vue.prototype.$on = function () {};
    Vue.prototype.$once = function () {};
    Vue.prototype.$off = function () {};
    Vue.prototype.$emit = function () {};
  }

  function initEvents (vm) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      console.log('todo...............');
    }
  }

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

  function normalizeChildren (children) {
    return isPrimitive(children)
      ? [createTextVNode(children)]
      : Array.isArray(children)
        ? normalizeArrayChildren()
        : undefined
  }

  function normalizeArrayChildren (children) {
    console.log('todo................');
  }

  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;

  function createElement (context, tag, data, children, normalizationType, alwaysNormalize) {
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = undefined;
    }
    if (isTrue(alwaysNormalize)) {
      normalizationType = ALWAYS_NORMALIZE;
    }
    return _createElement(context, tag, data, children, normalizationType)
  }

  function _createElement (context, tag, data, children, normalizationType) {
    if (isDef(data) && isDef(data.__ob__)) {
      console.log('todo..............');
    }
    if (isDef(data) && isDef(data.is)) {
      console.log('todo..............');
    }
    if (!tag) {
      console.log('todo..............');
    }
    if (Array.isArray(children) && typeof children[0] === 'function') {
      console.log('todo..............');
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      console.log('todo.............');
    }
    var vnode, ns;
    if (typeof tag === 'string') {
      ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
      if (config.isReservedTag(tag)) {
        vnode = new VNode(
          config.parsePlatformTagName(tag),
          data,
          children,
          undefined,
          undefined,
          context
        );
      } else {
        console.log('todo..............');
      }
    } else {
      console.log('todo..................');
    }
    if (Array.isArray(vnode)) {
      console.log('todo..........');
    } else if (isDef(vnode)) {
      if (isDef(ns)) { applyNS(); }
      if (isDef(data)) { registerDeepBindings(); }
      return vnode
    } else {
      console.log('todo................');
    }
  }

  function applyNS (vnode, ns, force) {
    console.log('todo................');
  }

  function registerDeepBindings (data) {
    console.log('todo................');
  }

  var currentRenderingInstance = null;

  function renderMixin (Vue) {
    installRenderHelpers(Vue.prototype);
    Vue.prototype.$nextTick = function (fn) {
      return nextTick(fn, this)
    };
    Vue.prototype._render = function () {
      var vm = this;
      var ref = vm.$options;
      var render = ref.render;
      var _parentVnode = ref._parentVnode;
      
      if (_parentVnode) {
        console.log('todo.........');
      }

      vm.$vnode = _parentVnode;
      var vnode;
      try {
        currentRenderingInstance = vm;
        vnode = render.call(vm._renderProxy, vm.$createElement);
      } catch (e) {
        console.log('todo.............');
      } finally {
        currentRenderingInstance = null;
      }
      if (Array.isArray(vnode) && vnode.length === 1) {
        vnode = vnode[0];
      }
      if (!(vnode instanceof VNode)) {
        console.log('todo................');
      }
      vnode.parent = _parentVnode;
      return vnode
    };
  }

  function initRender (vm) {
    vm._vnode = null;
    vm._staticTrees = null;
    var options = vm.$options;
    var parentVnode = vm.$vnode = options._parentVnode;
    var renderContext = parentVnode && parentVnode.context;
    vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
  }

  function initInjections (vm) {
    var result = resolveInject(vm.$options.inject);
    if (result) {
      console.log('todo..........');
    }
  }

  function resolveInject (inject, vm) {
    if (inject) {
      console.log('todo............');
    }
  }

  function initProvide (vm) {
    var provide = vm.$options.provide;
    if (provide) {
      console.log('todo............');
    }
  }

  var uid$2 = 0;

  function initMinix (Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm._uid = uid$2++;
      vm._isVue = true;
      if (options && options._isComponent) {
        console.log('todo.............');
      } else {
        vm.$options = mergeOptions(
          resolveConstructorOptions(vm.constructor),
          options || {},
          vm
        );
      }
      /* // todo...........
      if ("development" !== 'production') {
        initProxy(vm)
      } else {
        vm._renderProxy = vm
      } */
      vm._renderProxy = vm;
      vm._self = vm;
      initLifecycle(vm);
      initEvents(vm);
      initRender(vm);
      callHook(vm, 'beforeCreate');
      initInjections(vm);
      initState(vm);
      initProvide(vm);
      callHook(vm, 'created');

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
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

  function Vue (options) {
    this._init(options);
  }

  initMinix(Vue);
  stateMixin(Vue);
  eventsMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

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
      defineReactive: defineReactive,
      Watcher: Watcher
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

  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

  var emptyNode = new VNode('', {}, []);

  function createPatchFunction (backend) {
    var i, j;
    var cbs = {};

    var modules = backend.modules;
    var nodeOps = backend.nodeOps;

    for (i = 0; i < hooks.length; ++i) {
      cbs[hooks[i]] = [];
      for (j = 0; j < modules.length; ++j) {
        if (isDef(modules[j][hooks[i]])) {
          cbs[hooks[i]].push(modules[j][hooks[i]]);
        }
      }
    }

    function emptyNodeAt (elm) {
      return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }

    function setScope (vnode) {
      var i;
      if (isDef(i = vnode.fnScopeId)) {
        console.log('todo............');
      } else {
        var ancestor = vnode;
        while (ancestor) {
          if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
            console.log('todo...............');
          }
          ancestor = vnode.parent;
        }
      }
      if (
        isDef(i = activeInstance) &&
        i !== vnode.context &&
        i !== vnode.fnContext &&
        isDef(i = i.$options._scopeId)
      ) {
        console.log('todo...............');
      }
    }

    function createElm (
      vnode,
      insertedVnodeQueue,
      parentElm,
      refElm,
      nested,
      ownerArray,
      index
    ) {
      if (isDef(vnode.elm && isDef(ownerArray))) {
        console.log('todo................');
      }
      vnode.isRootInsert = !nested;
      if (createComponent(vnode)) {
        return
      }

      var data = vnode.data;
      var children = vnode.children;
      var tag = vnode.tag;
      
      if (isDef(tag)) {
        vnode.elm = vnode.ns
          ? nodeOps.createElementNS(vnode.ns, tag)
          : nodeOps.createElement(tag, vnode);
        setScope(vnode);

        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          console.log('todo............');
        }
        insert(parentElm, vnode.elm, refElm);
      } else if (isTrue(vnode.isComment)) {
        console.log('todo....................');
      } else {
        vnode.elm = nodeOps.createTextNode(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      }
    }

    function createChildren (vnode, children, insertedVnodeQueue) {
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; ++i) {
          createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children);
        }
      } else {
        console.log('todo..................');
      }
    }

    function insert (parent, elm, ref) {
      if (isDef(parent)) {
        if (isDef(ref)) {
          if (nodeOps.parentNode(ref) === parent) {
            nodeOps.insertBefore(parent, elm, ref);
          }
        } else {
          nodeOps.appendChild(parent, elm);
        }
      }
    }

    function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      var i = vnode.data;
      if (isDef(i)) {
        console.log('todo...................');
      }
    }

    function invokeDestroyHook (vnode) {
      var i, j;
      var data = vnode.data;
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.destroy)) {
          console.log('todo...............');
        }
        for (i = 0; i < cbs.destroy.length; ++i) {
          cbs.destroy[i](vnode);
        }
      }
      if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          console.log('todo.................');
        }
      }
    }

    function removeVnodes (vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (isDef(ch)) {
          if (isDef(ch.tag)) {
            removeAndInvokeRemoveHook(ch);
            invokeDestroyHook(ch);
          } else {
            console.log('todo..............');
          }
        }
      }
    }

    function createRmCb (childElm, listeners) {
      function remove () {
        if (--remove.listeners === 0) {
          removeNode(childElm);
        }
      }
      remove.listeners = listeners;
      return remove
    }

    function removeAndInvokeRemoveHook (vnode, rm) {
      if (isDef(rm) || isDef(vnode.data)) {
        var i;
        var listeners = cbs.remove.length + 1;
        if (isDef(rm)) {
          console.log('todo..............');
        } else {
          rm = createRmCb(vnode.elm, listeners);
        }
        if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
          console.log('todo.......................');
        }
        for (i = 0; i < cbs.remove.length; ++i) {
          console.log('todo..............');
        }
        if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
          console.log('todo...............');
        } else {
          rm();
        }
      } else {
        removeNode(vnode.elm);
      }
    }

    function removeNode (el) {
      var parent = nodeOps.parentNode(el);
      if (isDef(parent)) {
        nodeOps.removeChild(parent, el);
      }
    }

    return function patch (oldVnode, vnode, hydrating, removeOnly) {
      if (isUndef(vnode)) {
        console.log('todo......................');
      }

      var isInitialPatch = false;
      var insertedVnodeQueue = [];

      if (isUndef(oldVnode)) {
        console.log('todo..............');
      } else {
        var isRealElement = isDef(oldVnode.nodeType);
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
          console.log('todo...........');
        } else {
          if (isRealElement) {
            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
              console.log('todo..............');
            }
            if (isTrue(hydrating)) {
              console.log('todo..................');
            }
            oldVnode = emptyNodeAt(oldVnode);
          }

          var oldElm = oldVnode.elm;
          var parentElm = nodeOps.parentNode(oldElm);
          
          createElm(
            vnode,
            insertedVnodeQueue,
            oldElm._leaveCb ? null : parentElm,
            nodeOps.nextSibling(oldElm)
          );
          
          if (isDef(vnode.parent)) {
            console.log('todo...............');
          }

          if (isDef(parentElm)) {
            removeVnodes([oldVnode], 0, 0);
          } else if (isDef(oldVnode.tag)) {
            console.log('todo...............');
          }
        }
      }

      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
      return vnode.elm
    }

    function invokeInsertHook (vnode, queue, initial) {
      if (isTrue(initial) && isDef(vnode.parent)) {
        console.log('todo....................');
      } else {
        for (var i = 0; i < queue.length; ++i) {
          console.log('todo................');
        }
      }
    }
  }

  function createElement$1 (tagName, vnode) {
    var elm = document.createElement(tagName);
    if (tagName !== 'select') {
      return elm
    }
    console.log('todo................');
  }

  function tagName (node) {
    return node.tagName
  }

  function parentNode (node) {
    return node.parentNode
  }

  function nextSibling (node) {
    return node.nextSibling
  }

  function createElementNS (namespace, tagName) {
    console.log('todo.........................');
  }

  function createTextNode (text) {
    return document.createTextNode(text)
  }

  function insertBefore (parentNode, newNode, reference) {
    parentNode.insertBefore(newNode, reference);
  }

  function appendChild (node, child) {
    node.appendChild(child);
  }

  function removeChild (node, child) {
    node.removeChild(child);
  }

  var nodeOps = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createElement: createElement$1,
    tagName: tagName,
    parentNode: parentNode,
    nextSibling: nextSibling,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    insertBefore: insertBefore,
    appendChild: appendChild,
    removeChild: removeChild
  });

  var platformModules = [];

  var directives = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives (vnode) {
      updateDirectives(vnode, emptyNode);
    }
  };

  function updateDirectives (oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
      _update();
    }
  }

  function _update (oldVnode, vnode) {
    console.log('todo.................');
  }

  var ref = {
    create: function create () {},
    update: function update () {},
    destroy: function destroy (vnode) {
      registerRef(vnode);
    }
  };

  function registerRef (vnode, isRemoval) {
    var key = vnode.data.ref;
    if (!isDef(key)) { return }
    console.log('todo..................');
  }

  var baseModules = [
    ref,
    directives
  ];

  var modules = platformModules.concat(baseModules);

  var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

  var mustUseProp = function () {};
  var isReservedAttr = makeMap('style,class');

  var isHTMLTag = makeMap(
    'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot'
  );

  var isSVG = makeMap(
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
    true
  );

  var isReservedTag = function (tag) {
    return isHTMLTag(tag) || isSVG(tag)
  };

  function getTagNamespace (tag) {
    if (isSVG(tag)) {
      return 'svg'
    }
    if (tag === 'math') {
      return 'math'
    }
  }
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

  Vue.prototype.$mount = function (el, hydrating) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating)
  };

  return Vue;

})));
