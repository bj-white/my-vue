/*!
 * Vue.js v1.0.0
 * (c) 2014-2024 Evan You
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

  var uid = 0;

  function initMinix (Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm._uid = uid++;
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

  function set (target, key, val) {}

  function del (target, key) {}

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

  function installRenderHelpers (target) {}

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

  return Vue;

})));
