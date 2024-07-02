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

  var has = {};
  var flushing = false;
  var waiting = false;

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

  function flushSchedulerQueue () {
    currentFlushTimestamp = getNow();
    flushing = true;
  }

  function queueWatcher (watcher) {
    console.log(watcher);
    var id = watcher.id;
    if (has[id] == null) {
      has[id] = true;
      if (!flushing) ; else {
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
    this.expression =  '';
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
    console.log('todo..................');
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

  var computedWatcherOptions = {};

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

  function lifecycleMixin (Vue) {
    Vue.prototype._update = function () {};
    Vue.prototype.$forceUpdate = function () {};
    Vue.prototype.$destroy = function () {};
  }

  function mountComponent () {}

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

  function renderMixin (Vue) {
    installRenderHelpers(Vue.prototype);
    Vue.prototype.$nextTick = function () {};
    Vue.prototype._render = function () {};
  }

  function initRender (vm) {
    vm._vnode = null;
    vm._staticTrees = null;
    var options = vm.$options;
    var parentVnode = vm.$vnode = options._parentVnode;
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
      if ("production" !== 'production') {
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

      /* // todo.............
      if (vm.$options.el) {
        vm.$mount(vm.$options.el)
      } */
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
