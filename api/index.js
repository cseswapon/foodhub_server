var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/@prisma/debug/dist/index.js
var require_dist = __commonJS({
  "node_modules/@prisma/debug/dist/index.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var index_exports = {};
    __export(index_exports, {
      Debug: () => Debug2,
      clearLogs: () => clearLogs,
      default: () => index_default2,
      getLogs: () => getLogs
    });
    module.exports = __toCommonJS(index_exports);
    var colors_exports = {};
    __export(colors_exports, {
      $: () => $,
      bgBlack: () => bgBlack,
      bgBlue: () => bgBlue,
      bgCyan: () => bgCyan,
      bgGreen: () => bgGreen,
      bgMagenta: () => bgMagenta,
      bgRed: () => bgRed,
      bgWhite: () => bgWhite,
      bgYellow: () => bgYellow,
      black: () => black,
      blue: () => blue,
      bold: () => bold,
      cyan: () => cyan,
      dim: () => dim,
      gray: () => gray,
      green: () => green,
      grey: () => grey,
      hidden: () => hidden,
      inverse: () => inverse,
      italic: () => italic,
      magenta: () => magenta,
      red: () => red,
      reset: () => reset,
      strikethrough: () => strikethrough,
      underline: () => underline,
      white: () => white,
      yellow: () => yellow
    });
    var FORCE_COLOR;
    var NODE_DISABLE_COLORS;
    var NO_COLOR;
    var TERM;
    var isTTY = true;
    if (typeof process !== "undefined") {
      ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
      isTTY = process.stdout && process.stdout.isTTY;
    }
    var $ = {
      enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
    };
    function init(x, y) {
      let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
      let open = `\x1B[${x}m`, close = `\x1B[${y}m`;
      return function(txt) {
        if (!$.enabled || txt == null) return txt;
        return open + (!!~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
      };
    }
    var reset = init(0, 0);
    var bold = init(1, 22);
    var dim = init(2, 22);
    var italic = init(3, 23);
    var underline = init(4, 24);
    var inverse = init(7, 27);
    var hidden = init(8, 28);
    var strikethrough = init(9, 29);
    var black = init(30, 39);
    var red = init(31, 39);
    var green = init(32, 39);
    var yellow = init(33, 39);
    var blue = init(34, 39);
    var magenta = init(35, 39);
    var cyan = init(36, 39);
    var white = init(37, 39);
    var gray = init(90, 39);
    var grey = init(90, 39);
    var bgBlack = init(40, 49);
    var bgRed = init(41, 49);
    var bgGreen = init(42, 49);
    var bgYellow = init(43, 49);
    var bgBlue = init(44, 49);
    var bgMagenta = init(45, 49);
    var bgCyan = init(46, 49);
    var bgWhite = init(47, 49);
    var MAX_ARGS_HISTORY = 100;
    var COLORS = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var argsHistory = [];
    var lastTimestamp = Date.now();
    var lastColor = 0;
    var processEnv = typeof process !== "undefined" ? process.env : {};
    globalThis.DEBUG ??= processEnv.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true;
    var topProps = {
      enable(namespace) {
        if (typeof namespace === "string") {
          globalThis.DEBUG = namespace;
        }
      },
      disable() {
        const prev = globalThis.DEBUG;
        globalThis.DEBUG = "";
        return prev;
      },
      // this is the core logic to check if logging should happen or not
      enabled(namespace) {
        const listenedNamespaces = globalThis.DEBUG.split(",").map((s) => {
          return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
        });
        const isListened = listenedNamespaces.some((listenedNamespace) => {
          if (listenedNamespace === "" || listenedNamespace[0] === "-") return false;
          return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
        });
        const isExcluded = listenedNamespaces.some((listenedNamespace) => {
          if (listenedNamespace === "" || listenedNamespace[0] !== "-") return false;
          return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
        });
        return isListened && !isExcluded;
      },
      log: (...args) => {
        const [namespace, format, ...rest] = args;
        const logWithFormatting = console.warn ?? console.log;
        logWithFormatting(`${namespace} ${format}`, ...rest);
      },
      formatters: {}
      // not implemented
    };
    function debugCreate(namespace) {
      const instanceProps = {
        color: COLORS[lastColor++ % COLORS.length],
        enabled: topProps.enabled(namespace),
        namespace,
        log: topProps.log,
        extend: () => {
        }
        // not implemented
      };
      const debugCall = (...args) => {
        const { enabled, namespace: namespace2, color, log } = instanceProps;
        if (args.length !== 0) {
          argsHistory.push([namespace2, ...args]);
        }
        if (argsHistory.length > MAX_ARGS_HISTORY) {
          argsHistory.shift();
        }
        if (topProps.enabled(namespace2) || enabled) {
          const stringArgs = args.map((arg) => {
            if (typeof arg === "string") {
              return arg;
            }
            return safeStringify(arg);
          });
          const ms = `+${Date.now() - lastTimestamp}ms`;
          lastTimestamp = Date.now();
          if (globalThis.DEBUG_COLORS) {
            log(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms));
          } else {
            log(namespace2, ...stringArgs, ms);
          }
        }
      };
      return new Proxy(debugCall, {
        get: (_, prop) => instanceProps[prop],
        set: (_, prop, value) => instanceProps[prop] = value
      });
    }
    var Debug2 = new Proxy(debugCreate, {
      get: (_, prop) => topProps[prop],
      set: (_, prop, value) => topProps[prop] = value
    });
    function safeStringify(value, indent = 2) {
      const cache = /* @__PURE__ */ new Set();
      return JSON.stringify(
        value,
        (key, value2) => {
          if (typeof value2 === "object" && value2 !== null) {
            if (cache.has(value2)) {
              return `[Circular *]`;
            }
            cache.add(value2);
          } else if (typeof value2 === "bigint") {
            return value2.toString();
          }
          return value2;
        },
        indent
      );
    }
    function getLogs(numChars = 7500) {
      const logs = argsHistory.map(([namespace, ...args]) => {
        return `${namespace} ${args.map((arg) => {
          if (typeof arg === "string") {
            return arg;
          } else {
            return JSON.stringify(arg);
          }
        }).join(" ")}`;
      }).join("\n");
      if (logs.length < numChars) {
        return logs;
      }
      return logs.slice(-numChars);
    }
    function clearLogs() {
      argsHistory.length = 0;
    }
    var index_default2 = Debug2;
  }
});

// node_modules/@prisma/driver-adapter-utils/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@prisma/driver-adapter-utils/dist/index.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var index_exports = {};
    __export(index_exports, {
      ColumnTypeEnum: () => ColumnTypeEnum,
      Debug: () => import_debug.Debug,
      DriverAdapterError: () => DriverAdapterError,
      bindAdapter: () => bindAdapter,
      bindMigrationAwareSqlAdapterFactory: () => bindMigrationAwareSqlAdapterFactory,
      bindSqlAdapterFactory: () => bindSqlAdapterFactory,
      err: () => err,
      isDriverAdapterError: () => isDriverAdapterError,
      mockAdapter: () => mockAdapter,
      mockAdapterErrors: () => mockAdapterErrors,
      mockAdapterFactory: () => mockAdapterFactory,
      mockMigrationAwareAdapterFactory: () => mockMigrationAwareAdapterFactory,
      ok: () => ok
    });
    module.exports = __toCommonJS(index_exports);
    var import_debug = require_dist();
    var DriverAdapterError = class extends Error {
      name = "DriverAdapterError";
      cause;
      constructor(payload) {
        super(typeof payload["message"] === "string" ? payload["message"] : payload.kind);
        this.cause = payload;
      }
    };
    function isDriverAdapterError(error) {
      return error["name"] === "DriverAdapterError" && typeof error["cause"] === "object";
    }
    function ok(value) {
      return {
        ok: true,
        value,
        map(fn) {
          return ok(fn(value));
        },
        flatMap(fn) {
          return fn(value);
        }
      };
    }
    function err(error) {
      return {
        ok: false,
        error,
        map() {
          return err(error);
        },
        flatMap() {
          return err(error);
        }
      };
    }
    var debug = (0, import_debug.Debug)("driver-adapter-utils");
    var ErrorRegistryInternal = class {
      registeredErrors = [];
      consumeError(id) {
        return this.registeredErrors[id];
      }
      registerNewError(error) {
        let i = 0;
        while (this.registeredErrors[i] !== void 0) {
          i++;
        }
        this.registeredErrors[i] = { error };
        return i;
      }
    };
    function copySymbolsFromSource(source, target) {
      const symbols = Object.getOwnPropertySymbols(source);
      const symbolObject = Object.fromEntries(symbols.map((symbol) => [symbol, true]));
      Object.assign(target, symbolObject);
    }
    var bindMigrationAwareSqlAdapterFactory = (adapterFactory) => {
      const errorRegistry = new ErrorRegistryInternal();
      const boundFactory = {
        adapterName: adapterFactory.adapterName,
        provider: adapterFactory.provider,
        errorRegistry,
        connect: async (...args) => {
          const ctx = await wrapAsync(errorRegistry, adapterFactory.connect.bind(adapterFactory))(...args);
          return ctx.map((ctx2) => bindAdapter(ctx2, errorRegistry));
        },
        connectToShadowDb: async (...args) => {
          const ctx = await wrapAsync(errorRegistry, adapterFactory.connectToShadowDb.bind(adapterFactory))(...args);
          return ctx.map((ctx2) => bindAdapter(ctx2, errorRegistry));
        }
      };
      copySymbolsFromSource(adapterFactory, boundFactory);
      return boundFactory;
    };
    var bindSqlAdapterFactory = (adapterFactory) => {
      const errorRegistry = new ErrorRegistryInternal();
      const boundFactory = {
        adapterName: adapterFactory.adapterName,
        provider: adapterFactory.provider,
        errorRegistry,
        connect: async (...args) => {
          const ctx = await wrapAsync(errorRegistry, adapterFactory.connect.bind(adapterFactory))(...args);
          return ctx.map((ctx2) => bindAdapter(ctx2, errorRegistry));
        }
      };
      copySymbolsFromSource(adapterFactory, boundFactory);
      return boundFactory;
    };
    var bindAdapter = (adapter2, errorRegistry = new ErrorRegistryInternal()) => {
      const boundAdapter = {
        adapterName: adapter2.adapterName,
        errorRegistry,
        queryRaw: wrapAsync(errorRegistry, adapter2.queryRaw.bind(adapter2)),
        executeRaw: wrapAsync(errorRegistry, adapter2.executeRaw.bind(adapter2)),
        executeScript: wrapAsync(errorRegistry, adapter2.executeScript.bind(adapter2)),
        dispose: wrapAsync(errorRegistry, adapter2.dispose.bind(adapter2)),
        provider: adapter2.provider,
        startTransaction: async (...args) => {
          const ctx = await wrapAsync(errorRegistry, adapter2.startTransaction.bind(adapter2))(...args);
          return ctx.map((ctx2) => bindTransaction(errorRegistry, ctx2));
        }
      };
      if (adapter2.getConnectionInfo) {
        boundAdapter.getConnectionInfo = wrapSync(errorRegistry, adapter2.getConnectionInfo.bind(adapter2));
      }
      return boundAdapter;
    };
    var bindTransaction = (errorRegistry, transaction) => {
      return {
        adapterName: transaction.adapterName,
        provider: transaction.provider,
        options: transaction.options,
        queryRaw: wrapAsync(errorRegistry, transaction.queryRaw.bind(transaction)),
        executeRaw: wrapAsync(errorRegistry, transaction.executeRaw.bind(transaction)),
        commit: wrapAsync(errorRegistry, transaction.commit.bind(transaction)),
        rollback: wrapAsync(errorRegistry, transaction.rollback.bind(transaction))
      };
    };
    function wrapAsync(registry, fn) {
      return async (...args) => {
        try {
          return ok(await fn(...args));
        } catch (error) {
          debug("[error@wrapAsync]", error);
          if (isDriverAdapterError(error)) {
            return err(error.cause);
          }
          const id = registry.registerNewError(error);
          return err({ kind: "GenericJs", id });
        }
      };
    }
    function wrapSync(registry, fn) {
      return (...args) => {
        try {
          return ok(fn(...args));
        } catch (error) {
          debug("[error@wrapSync]", error);
          if (isDriverAdapterError(error)) {
            return err(error.cause);
          }
          const id = registry.registerNewError(error);
          return err({ kind: "GenericJs", id });
        }
      };
    }
    var ColumnTypeEnum = {
      // Scalars
      Int32: 0,
      Int64: 1,
      Float: 2,
      Double: 3,
      Numeric: 4,
      Boolean: 5,
      Character: 6,
      Text: 7,
      Date: 8,
      Time: 9,
      DateTime: 10,
      Json: 11,
      Enum: 12,
      Bytes: 13,
      Set: 14,
      Uuid: 15,
      // Arrays
      Int32Array: 64,
      Int64Array: 65,
      FloatArray: 66,
      DoubleArray: 67,
      NumericArray: 68,
      BooleanArray: 69,
      CharacterArray: 70,
      TextArray: 71,
      DateArray: 72,
      TimeArray: 73,
      DateTimeArray: 74,
      JsonArray: 75,
      EnumArray: 76,
      BytesArray: 77,
      UuidArray: 78,
      // Custom
      UnknownNumber: 128
    };
    var mockAdapterErrors = {
      queryRaw: new Error("Not implemented: queryRaw"),
      executeRaw: new Error("Not implemented: executeRaw"),
      startTransaction: new Error("Not implemented: startTransaction"),
      executeScript: new Error("Not implemented: executeScript"),
      dispose: new Error("Not implemented: dispose")
    };
    function mockAdapter(provider) {
      return {
        provider,
        adapterName: "@prisma/adapter-mock",
        queryRaw: () => Promise.reject(mockAdapterErrors.queryRaw),
        executeRaw: () => Promise.reject(mockAdapterErrors.executeRaw),
        startTransaction: () => Promise.reject(mockAdapterErrors.startTransaction),
        executeScript: () => Promise.reject(mockAdapterErrors.executeScript),
        dispose: () => Promise.reject(mockAdapterErrors.dispose),
        [/* @__PURE__ */ Symbol.for("adapter.mockAdapter")]: true
      };
    }
    function mockAdapterFactory(provider) {
      return {
        provider,
        adapterName: "@prisma/adapter-mock",
        connect: () => Promise.resolve(mockAdapter(provider)),
        [/* @__PURE__ */ Symbol.for("adapter.mockAdapterFactory")]: true
      };
    }
    function mockMigrationAwareAdapterFactory(provider) {
      return {
        provider,
        adapterName: "@prisma/adapter-mock",
        connect: () => Promise.resolve(mockAdapter(provider)),
        connectToShadowDb: () => Promise.resolve(mockAdapter(provider)),
        [/* @__PURE__ */ Symbol.for("adapter.mockMigrationAwareAdapterFactory")]: true
      };
    }
  }
});

// node_modules/@prisma/adapter-pg/node_modules/postgres-array/index.js
var require_postgres_array = __commonJS({
  "node_modules/@prisma/adapter-pg/node_modules/postgres-array/index.js"(exports) {
    "use strict";
    var BACKSLASH = "\\";
    var DQUOT = '"';
    var LBRACE = "{";
    var RBRACE = "}";
    var LBRACKET = "[";
    var EQUALS = "=";
    var COMMA = ",";
    var NULL_STRING = "NULL";
    function makeParseArrayWithTransform(transform) {
      const haveTransform = transform != null;
      return function parseArray2(str) {
        const rbraceIndex = str.length - 1;
        if (rbraceIndex === 1) {
          return [];
        }
        if (str[rbraceIndex] !== RBRACE) {
          throw new Error("Invalid array text - must end with }");
        }
        let position = 0;
        if (str[position] === LBRACKET) {
          position = str.indexOf(EQUALS) + 1;
        }
        if (str[position++] !== LBRACE) {
          throw new Error("Invalid array text - must start with {");
        }
        const output = [];
        let current = output;
        const stack = [];
        let currentStringStart = position;
        let currentString = "";
        let expectValue = true;
        for (; position < rbraceIndex; ++position) {
          let char = str[position];
          if (char === DQUOT) {
            currentStringStart = ++position;
            let dquot = str.indexOf(DQUOT, currentStringStart);
            let backSlash = str.indexOf(BACKSLASH, currentStringStart);
            while (backSlash !== -1 && backSlash < dquot) {
              position = backSlash;
              const part2 = str.slice(currentStringStart, position);
              currentString += part2;
              currentStringStart = ++position;
              if (dquot === position++) {
                dquot = str.indexOf(DQUOT, position);
              }
              backSlash = str.indexOf(BACKSLASH, position);
            }
            position = dquot;
            const part = str.slice(currentStringStart, position);
            currentString += part;
            current.push(haveTransform ? transform(currentString) : currentString);
            currentString = "";
            expectValue = false;
          } else if (char === LBRACE) {
            const newArray = [];
            current.push(newArray);
            stack.push(current);
            current = newArray;
            currentStringStart = position + 1;
            expectValue = true;
          } else if (char === COMMA) {
            expectValue = true;
          } else if (char === RBRACE) {
            expectValue = false;
            const arr = stack.pop();
            if (arr === void 0) {
              throw new Error("Invalid array text - too many '}'");
            }
            current = arr;
          } else if (expectValue) {
            currentStringStart = position;
            while ((char = str[position]) !== COMMA && char !== RBRACE && position < rbraceIndex) {
              ++position;
            }
            const part = str.slice(currentStringStart, position--);
            current.push(
              part === NULL_STRING ? null : haveTransform ? transform(part) : part
            );
            expectValue = false;
          } else {
            throw new Error("Was expecting delimeter");
          }
        }
        return output;
      };
    }
    var parseArray = makeParseArrayWithTransform();
    exports.parse = (source, transform) => transform != null ? makeParseArrayWithTransform(transform)(source) : parseArray(source);
  }
});

// node_modules/@prisma/adapter-pg/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/@prisma/adapter-pg/dist/index.js"(exports, module) {
    "use strict";
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name2 in all)
        __defProp2(target, name2, { get: all[name2], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var index_exports = {};
    __export(index_exports, {
      PrismaPg: () => PrismaPgAdapterFactory
    });
    module.exports = __toCommonJS(index_exports);
    var import_driver_adapter_utils2 = require_dist2();
    var import_pg2 = __toESM2(__require("pg"));
    var name = "@prisma/adapter-pg";
    var FIRST_NORMAL_OBJECT_ID = 16384;
    var import_driver_adapter_utils = require_dist2();
    var import_pg = __toESM2(__require("pg"));
    var import_postgres_array = require_postgres_array();
    var { types } = import_pg.default;
    var { builtins: ScalarColumnType, getTypeParser } = types;
    var AdditionalScalarColumnType = {
      NAME: 19
    };
    var ArrayColumnType = {
      BIT_ARRAY: 1561,
      BOOL_ARRAY: 1e3,
      BYTEA_ARRAY: 1001,
      BPCHAR_ARRAY: 1014,
      CHAR_ARRAY: 1002,
      CIDR_ARRAY: 651,
      DATE_ARRAY: 1182,
      FLOAT4_ARRAY: 1021,
      FLOAT8_ARRAY: 1022,
      INET_ARRAY: 1041,
      INT2_ARRAY: 1005,
      INT4_ARRAY: 1007,
      INT8_ARRAY: 1016,
      JSONB_ARRAY: 3807,
      JSON_ARRAY: 199,
      MONEY_ARRAY: 791,
      NUMERIC_ARRAY: 1231,
      OID_ARRAY: 1028,
      TEXT_ARRAY: 1009,
      TIMESTAMP_ARRAY: 1115,
      TIMESTAMPTZ_ARRAY: 1185,
      TIME_ARRAY: 1183,
      UUID_ARRAY: 2951,
      VARBIT_ARRAY: 1563,
      VARCHAR_ARRAY: 1015,
      XML_ARRAY: 143
    };
    var UnsupportedNativeDataType = class _UnsupportedNativeDataType extends Error {
      // map of type codes to type names
      static typeNames = {
        16: "bool",
        17: "bytea",
        18: "char",
        19: "name",
        20: "int8",
        21: "int2",
        22: "int2vector",
        23: "int4",
        24: "regproc",
        25: "text",
        26: "oid",
        27: "tid",
        28: "xid",
        29: "cid",
        30: "oidvector",
        32: "pg_ddl_command",
        71: "pg_type",
        75: "pg_attribute",
        81: "pg_proc",
        83: "pg_class",
        114: "json",
        142: "xml",
        194: "pg_node_tree",
        269: "table_am_handler",
        325: "index_am_handler",
        600: "point",
        601: "lseg",
        602: "path",
        603: "box",
        604: "polygon",
        628: "line",
        650: "cidr",
        700: "float4",
        701: "float8",
        705: "unknown",
        718: "circle",
        774: "macaddr8",
        790: "money",
        829: "macaddr",
        869: "inet",
        1033: "aclitem",
        1042: "bpchar",
        1043: "varchar",
        1082: "date",
        1083: "time",
        1114: "timestamp",
        1184: "timestamptz",
        1186: "interval",
        1266: "timetz",
        1560: "bit",
        1562: "varbit",
        1700: "numeric",
        1790: "refcursor",
        2202: "regprocedure",
        2203: "regoper",
        2204: "regoperator",
        2205: "regclass",
        2206: "regtype",
        2249: "record",
        2275: "cstring",
        2276: "any",
        2277: "anyarray",
        2278: "void",
        2279: "trigger",
        2280: "language_handler",
        2281: "internal",
        2283: "anyelement",
        2287: "_record",
        2776: "anynonarray",
        2950: "uuid",
        2970: "txid_snapshot",
        3115: "fdw_handler",
        3220: "pg_lsn",
        3310: "tsm_handler",
        3361: "pg_ndistinct",
        3402: "pg_dependencies",
        3500: "anyenum",
        3614: "tsvector",
        3615: "tsquery",
        3642: "gtsvector",
        3734: "regconfig",
        3769: "regdictionary",
        3802: "jsonb",
        3831: "anyrange",
        3838: "event_trigger",
        3904: "int4range",
        3906: "numrange",
        3908: "tsrange",
        3910: "tstzrange",
        3912: "daterange",
        3926: "int8range",
        4072: "jsonpath",
        4089: "regnamespace",
        4096: "regrole",
        4191: "regcollation",
        4451: "int4multirange",
        4532: "nummultirange",
        4533: "tsmultirange",
        4534: "tstzmultirange",
        4535: "datemultirange",
        4536: "int8multirange",
        4537: "anymultirange",
        4538: "anycompatiblemultirange",
        4600: "pg_brin_bloom_summary",
        4601: "pg_brin_minmax_multi_summary",
        5017: "pg_mcv_list",
        5038: "pg_snapshot",
        5069: "xid8",
        5077: "anycompatible",
        5078: "anycompatiblearray",
        5079: "anycompatiblenonarray",
        5080: "anycompatiblerange"
      };
      type;
      constructor(code) {
        super();
        this.type = _UnsupportedNativeDataType.typeNames[code] || "Unknown";
        this.message = `Unsupported column type ${this.type}`;
      }
    };
    function fieldToColumnType(fieldTypeId) {
      switch (fieldTypeId) {
        case ScalarColumnType.INT2:
        case ScalarColumnType.INT4:
          return import_driver_adapter_utils.ColumnTypeEnum.Int32;
        case ScalarColumnType.INT8:
          return import_driver_adapter_utils.ColumnTypeEnum.Int64;
        case ScalarColumnType.FLOAT4:
          return import_driver_adapter_utils.ColumnTypeEnum.Float;
        case ScalarColumnType.FLOAT8:
          return import_driver_adapter_utils.ColumnTypeEnum.Double;
        case ScalarColumnType.BOOL:
          return import_driver_adapter_utils.ColumnTypeEnum.Boolean;
        case ScalarColumnType.DATE:
          return import_driver_adapter_utils.ColumnTypeEnum.Date;
        case ScalarColumnType.TIME:
        case ScalarColumnType.TIMETZ:
          return import_driver_adapter_utils.ColumnTypeEnum.Time;
        case ScalarColumnType.TIMESTAMP:
        case ScalarColumnType.TIMESTAMPTZ:
          return import_driver_adapter_utils.ColumnTypeEnum.DateTime;
        case ScalarColumnType.NUMERIC:
        case ScalarColumnType.MONEY:
          return import_driver_adapter_utils.ColumnTypeEnum.Numeric;
        case ScalarColumnType.JSON:
        case ScalarColumnType.JSONB:
          return import_driver_adapter_utils.ColumnTypeEnum.Json;
        case ScalarColumnType.UUID:
          return import_driver_adapter_utils.ColumnTypeEnum.Uuid;
        case ScalarColumnType.OID:
          return import_driver_adapter_utils.ColumnTypeEnum.Int64;
        case ScalarColumnType.BPCHAR:
        case ScalarColumnType.TEXT:
        case ScalarColumnType.VARCHAR:
        case ScalarColumnType.BIT:
        case ScalarColumnType.VARBIT:
        case ScalarColumnType.INET:
        case ScalarColumnType.CIDR:
        case ScalarColumnType.XML:
        case AdditionalScalarColumnType.NAME:
          return import_driver_adapter_utils.ColumnTypeEnum.Text;
        case ScalarColumnType.BYTEA:
          return import_driver_adapter_utils.ColumnTypeEnum.Bytes;
        case ArrayColumnType.INT2_ARRAY:
        case ArrayColumnType.INT4_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.Int32Array;
        case ArrayColumnType.FLOAT4_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.FloatArray;
        case ArrayColumnType.FLOAT8_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.DoubleArray;
        case ArrayColumnType.NUMERIC_ARRAY:
        case ArrayColumnType.MONEY_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.NumericArray;
        case ArrayColumnType.BOOL_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.BooleanArray;
        case ArrayColumnType.CHAR_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.CharacterArray;
        case ArrayColumnType.BPCHAR_ARRAY:
        case ArrayColumnType.TEXT_ARRAY:
        case ArrayColumnType.VARCHAR_ARRAY:
        case ArrayColumnType.VARBIT_ARRAY:
        case ArrayColumnType.BIT_ARRAY:
        case ArrayColumnType.INET_ARRAY:
        case ArrayColumnType.CIDR_ARRAY:
        case ArrayColumnType.XML_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.TextArray;
        case ArrayColumnType.DATE_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.DateArray;
        case ArrayColumnType.TIME_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.TimeArray;
        case ArrayColumnType.TIMESTAMP_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.DateTimeArray;
        case ArrayColumnType.TIMESTAMPTZ_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.DateTimeArray;
        case ArrayColumnType.JSON_ARRAY:
        case ArrayColumnType.JSONB_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.JsonArray;
        case ArrayColumnType.BYTEA_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.BytesArray;
        case ArrayColumnType.UUID_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.UuidArray;
        case ArrayColumnType.INT8_ARRAY:
        case ArrayColumnType.OID_ARRAY:
          return import_driver_adapter_utils.ColumnTypeEnum.Int64Array;
        default:
          if (fieldTypeId >= FIRST_NORMAL_OBJECT_ID) {
            return import_driver_adapter_utils.ColumnTypeEnum.Text;
          }
          throw new UnsupportedNativeDataType(fieldTypeId);
      }
    }
    function normalize_array(element_normalizer) {
      return (str) => (0, import_postgres_array.parse)(str, element_normalizer);
    }
    function normalize_numeric(numeric) {
      return numeric;
    }
    function normalize_date(date) {
      return date;
    }
    function normalize_timestamp(time) {
      return `${time.replace(" ", "T")}+00:00`;
    }
    function normalize_timestamptz(time) {
      return time.replace(" ", "T").replace(/[+-]\d{2}(:\d{2})?$/, "+00:00");
    }
    function normalize_time(time) {
      return time;
    }
    function normalize_timez(time) {
      return time.replace(/[+-]\d{2}(:\d{2})?$/, "");
    }
    function normalize_money(money) {
      return money.slice(1);
    }
    function normalize_xml(xml) {
      return xml;
    }
    function toJson(json) {
      return json;
    }
    var parsePgBytes = getTypeParser(ScalarColumnType.BYTEA);
    var normalizeByteaArray = getTypeParser(ArrayColumnType.BYTEA_ARRAY);
    function convertBytes(serializedBytes) {
      return parsePgBytes(serializedBytes);
    }
    function normalizeBit(bit) {
      return bit;
    }
    var customParsers = {
      [ScalarColumnType.NUMERIC]: normalize_numeric,
      [ArrayColumnType.NUMERIC_ARRAY]: normalize_array(normalize_numeric),
      [ScalarColumnType.TIME]: normalize_time,
      [ArrayColumnType.TIME_ARRAY]: normalize_array(normalize_time),
      [ScalarColumnType.TIMETZ]: normalize_timez,
      [ScalarColumnType.DATE]: normalize_date,
      [ArrayColumnType.DATE_ARRAY]: normalize_array(normalize_date),
      [ScalarColumnType.TIMESTAMP]: normalize_timestamp,
      [ArrayColumnType.TIMESTAMP_ARRAY]: normalize_array(normalize_timestamp),
      [ScalarColumnType.TIMESTAMPTZ]: normalize_timestamptz,
      [ArrayColumnType.TIMESTAMPTZ_ARRAY]: normalize_array(normalize_timestamptz),
      [ScalarColumnType.MONEY]: normalize_money,
      [ArrayColumnType.MONEY_ARRAY]: normalize_array(normalize_money),
      [ScalarColumnType.JSON]: toJson,
      [ArrayColumnType.JSON_ARRAY]: normalize_array(toJson),
      [ScalarColumnType.JSONB]: toJson,
      [ArrayColumnType.JSONB_ARRAY]: normalize_array(toJson),
      [ScalarColumnType.BYTEA]: convertBytes,
      [ArrayColumnType.BYTEA_ARRAY]: normalizeByteaArray,
      [ArrayColumnType.BIT_ARRAY]: normalize_array(normalizeBit),
      [ArrayColumnType.VARBIT_ARRAY]: normalize_array(normalizeBit),
      [ArrayColumnType.XML_ARRAY]: normalize_array(normalize_xml)
    };
    function mapArg(arg, argType) {
      if (arg === null) {
        return null;
      }
      if (Array.isArray(arg) && argType.arity === "list") {
        return arg.map((value) => mapArg(value, argType));
      }
      if (typeof arg === "string" && argType.scalarType === "datetime") {
        arg = new Date(arg);
      }
      if (arg instanceof Date) {
        switch (argType.dbType) {
          case "TIME":
          case "TIMETZ":
            return formatTime(arg);
          case "DATE":
            return formatDate(arg);
          default:
            return formatDateTime(arg);
        }
      }
      if (typeof arg === "string" && argType.scalarType === "bytes") {
        return Buffer.from(arg, "base64");
      }
      if (ArrayBuffer.isView(arg)) {
        return new Uint8Array(arg.buffer, arg.byteOffset, arg.byteLength);
      }
      return arg;
    }
    function formatDateTime(date) {
      const pad = (n, z = 2) => String(n).padStart(z, "0");
      const ms = date.getUTCMilliseconds();
      return pad(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + " " + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms ? "." + String(ms).padStart(3, "0") : "");
    }
    function formatDate(date) {
      const pad = (n, z = 2) => String(n).padStart(z, "0");
      return pad(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate());
    }
    function formatTime(date) {
      const pad = (n, z = 2) => String(n).padStart(z, "0");
      const ms = date.getUTCMilliseconds();
      return pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms ? "." + String(ms).padStart(3, "0") : "");
    }
    var TLS_ERRORS = /* @__PURE__ */ new Set([
      "UNABLE_TO_GET_ISSUER_CERT",
      "UNABLE_TO_GET_CRL",
      "UNABLE_TO_DECRYPT_CERT_SIGNATURE",
      "UNABLE_TO_DECRYPT_CRL_SIGNATURE",
      "UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY",
      "CERT_SIGNATURE_FAILURE",
      "CRL_SIGNATURE_FAILURE",
      "CERT_NOT_YET_VALID",
      "CERT_HAS_EXPIRED",
      "CRL_NOT_YET_VALID",
      "CRL_HAS_EXPIRED",
      "ERROR_IN_CERT_NOT_BEFORE_FIELD",
      "ERROR_IN_CERT_NOT_AFTER_FIELD",
      "ERROR_IN_CRL_LAST_UPDATE_FIELD",
      "ERROR_IN_CRL_NEXT_UPDATE_FIELD",
      "DEPTH_ZERO_SELF_SIGNED_CERT",
      "SELF_SIGNED_CERT_IN_CHAIN",
      "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
      "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
      "CERT_CHAIN_TOO_LONG",
      "CERT_REVOKED",
      "INVALID_CA",
      "INVALID_PURPOSE",
      "CERT_UNTRUSTED",
      "CERT_REJECTED",
      "HOSTNAME_MISMATCH",
      "ERR_TLS_CERT_ALTNAME_FORMAT",
      "ERR_TLS_CERT_ALTNAME_INVALID"
    ]);
    var SOCKET_ERRORS = /* @__PURE__ */ new Set(["ENOTFOUND", "ECONNREFUSED", "ECONNRESET", "ETIMEDOUT"]);
    function convertDriverError(error) {
      if (isSocketError(error)) {
        return mapSocketError(error);
      }
      if (isTlsError(error)) {
        return {
          kind: "TlsConnectionError",
          reason: error.message
        };
      }
      if (isDriverError(error)) {
        return {
          originalCode: error.code,
          originalMessage: error.message,
          ...mapDriverError(error)
        };
      }
      throw error;
    }
    function mapDriverError(error) {
      switch (error.code) {
        case "22001":
          return {
            kind: "LengthMismatch",
            column: error.column
          };
        case "22003":
          return {
            kind: "ValueOutOfRange",
            cause: error.message
          };
        case "22P02":
          return {
            kind: "InvalidInputValue",
            message: error.message
          };
        case "23505": {
          const fields = error.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ");
          return {
            kind: "UniqueConstraintViolation",
            constraint: fields !== void 0 ? { fields } : void 0
          };
        }
        case "23502": {
          const fields = error.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ");
          return {
            kind: "NullConstraintViolation",
            constraint: fields !== void 0 ? { fields } : void 0
          };
        }
        case "23503": {
          let constraint;
          if (error.column) {
            constraint = { fields: [error.column] };
          } else if (error.constraint) {
            constraint = { index: error.constraint };
          }
          return {
            kind: "ForeignKeyConstraintViolation",
            constraint
          };
        }
        case "3D000":
          return {
            kind: "DatabaseDoesNotExist",
            db: error.message.split(" ").at(1)?.split('"').at(1)
          };
        case "28000":
          return {
            kind: "DatabaseAccessDenied",
            db: error.message.split(",").find((s) => s.startsWith(" database"))?.split('"').at(1)
          };
        case "28P01":
          return {
            kind: "AuthenticationFailed",
            user: error.message.split(" ").pop()?.split('"').at(1)
          };
        case "40001":
          return {
            kind: "TransactionWriteConflict"
          };
        case "42P01":
          return {
            kind: "TableDoesNotExist",
            table: error.message.split(" ").at(1)?.split('"').at(1)
          };
        case "42703":
          return {
            kind: "ColumnNotFound",
            column: error.message.split(" ").at(1)?.split('"').at(1)
          };
        case "42P04":
          return {
            kind: "DatabaseAlreadyExists",
            db: error.message.split(" ").at(1)?.split('"').at(1)
          };
        case "53300":
          return {
            kind: "TooManyConnections",
            cause: error.message
          };
        default:
          return {
            kind: "postgres",
            code: error.code ?? "N/A",
            severity: error.severity ?? "N/A",
            message: error.message,
            detail: error.detail,
            column: error.column,
            hint: error.hint
          };
      }
    }
    function isDriverError(error) {
      return typeof error.code === "string" && typeof error.message === "string" && typeof error.severity === "string" && (typeof error.detail === "string" || error.detail === void 0) && (typeof error.column === "string" || error.column === void 0) && (typeof error.hint === "string" || error.hint === void 0);
    }
    function mapSocketError(error) {
      switch (error.code) {
        case "ENOTFOUND":
        case "ECONNREFUSED":
          return {
            kind: "DatabaseNotReachable",
            host: error.address ?? error.hostname,
            port: error.port
          };
        case "ECONNRESET":
          return {
            kind: "ConnectionClosed"
          };
        case "ETIMEDOUT":
          return {
            kind: "SocketTimeout"
          };
      }
    }
    function isSocketError(error) {
      return typeof error.code === "string" && typeof error.syscall === "string" && typeof error.errno === "number" && SOCKET_ERRORS.has(error.code);
    }
    function isTlsError(error) {
      if (typeof error.code === "string") {
        return TLS_ERRORS.has(error.code);
      }
      switch (error.message) {
        case "The server does not support SSL connections":
        case "There was an error establishing an SSL connection":
          return true;
      }
      return false;
    }
    var types2 = import_pg2.default.types;
    var debug = (0, import_driver_adapter_utils2.Debug)("prisma:driver-adapter:pg");
    var PgQueryable = class {
      constructor(client, pgOptions) {
        this.client = client;
        this.pgOptions = pgOptions;
      }
      provider = "postgres";
      adapterName = name;
      /**
       * Execute a query given as SQL, interpolating the given parameters.
       */
      async queryRaw(query) {
        const tag = "[js::query_raw]";
        debug(`${tag} %O`, query);
        const { fields, rows } = await this.performIO(query);
        const columnNames = fields.map((field) => field.name);
        let columnTypes = [];
        try {
          columnTypes = fields.map((field) => fieldToColumnType(field.dataTypeID));
        } catch (e) {
          if (e instanceof UnsupportedNativeDataType) {
            throw new import_driver_adapter_utils2.DriverAdapterError({
              kind: "UnsupportedNativeDataType",
              type: e.type
            });
          }
          throw e;
        }
        const udtParser = this.pgOptions?.userDefinedTypeParser;
        if (udtParser) {
          for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (field.dataTypeID >= FIRST_NORMAL_OBJECT_ID && !Object.hasOwn(customParsers, field.dataTypeID)) {
              for (let j = 0; j < rows.length; j++) {
                rows[j][i] = await udtParser(field.dataTypeID, rows[j][i], this);
              }
            }
          }
        }
        return {
          columnNames,
          columnTypes,
          rows
        };
      }
      /**
       * Execute a query given as SQL, interpolating the given parameters and
       * returning the number of affected rows.
       * Note: Queryable expects a u64, but napi.rs only supports u32.
       */
      async executeRaw(query) {
        const tag = "[js::execute_raw]";
        debug(`${tag} %O`, query);
        return (await this.performIO(query)).rowCount ?? 0;
      }
      /**
       * Run a query against the database, returning the result set.
       * Should the query fail due to a connection error, the connection is
       * marked as unhealthy.
       */
      async performIO(query) {
        const { sql, args } = query;
        const values = args.map((arg, i) => mapArg(arg, query.argTypes[i]));
        try {
          const result = await this.client.query(
            {
              text: sql,
              values,
              rowMode: "array",
              types: {
                // This is the error expected:
                // No overload matches this call.
                // The last overload gave the following error.
                // Type '(oid: number, format?: any) => (json: string) => unknown' is not assignable to type '{ <T>(oid: number): TypeParser<string, string | T>; <T>(oid: number, format: "text"): TypeParser<string, string | T>; <T>(oid: number, format: "binary"): TypeParser<...>; }'.
                //   Type '(json: string) => unknown' is not assignable to type 'TypeParser<Buffer, any>'.
                //     Types of parameters 'json' and 'value' are incompatible.
                //       Type 'Buffer' is not assignable to type 'string'.ts(2769)
                //
                // Because pg-types types expect us to handle both binary and text protocol versions,
                // where as far we can see, pg will ever pass only text version.
                //
                // @ts-expect-error
                getTypeParser: (oid, format) => {
                  if (format === "text" && customParsers[oid]) {
                    return customParsers[oid];
                  }
                  return types2.getTypeParser(oid, format);
                }
              }
            },
            values
          );
          return result;
        } catch (e) {
          this.onError(e);
        }
      }
      onError(error) {
        debug("Error in performIO: %O", error);
        throw new import_driver_adapter_utils2.DriverAdapterError(convertDriverError(error));
      }
    };
    var PgTransaction = class extends PgQueryable {
      constructor(client, options, pgOptions, cleanup) {
        super(client, pgOptions);
        this.options = options;
        this.pgOptions = pgOptions;
        this.cleanup = cleanup;
      }
      async commit() {
        debug(`[js::commit]`);
        this.cleanup?.();
        this.client.release();
      }
      async rollback() {
        debug(`[js::rollback]`);
        this.cleanup?.();
        this.client.release();
      }
    };
    var PrismaPgAdapter = class extends PgQueryable {
      constructor(client, pgOptions, release) {
        super(client);
        this.pgOptions = pgOptions;
        this.release = release;
      }
      async startTransaction(isolationLevel) {
        const options = {
          usePhantomQuery: false
        };
        const tag = "[js::startTransaction]";
        debug("%s options: %O", tag, options);
        const conn = await this.client.connect().catch((error) => this.onError(error));
        const onError = (err) => {
          debug(`Error from pool connection: ${err.message} %O`, err);
          this.pgOptions?.onConnectionError?.(err);
        };
        conn.on("error", onError);
        const cleanup = () => {
          conn.removeListener("error", onError);
        };
        try {
          const tx = new PgTransaction(conn, options, this.pgOptions, cleanup);
          await tx.executeRaw({ sql: "BEGIN", args: [], argTypes: [] });
          if (isolationLevel) {
            await tx.executeRaw({
              sql: `SET TRANSACTION ISOLATION LEVEL ${isolationLevel}`,
              args: [],
              argTypes: []
            });
          }
          return tx;
        } catch (error) {
          cleanup();
          conn.release(error);
          this.onError(error);
        }
      }
      async executeScript(script) {
        const statements = script.split(";").map((stmt) => stmt.trim()).filter((stmt) => stmt.length > 0);
        for (const stmt of statements) {
          try {
            await this.client.query(stmt);
          } catch (error) {
            this.onError(error);
          }
        }
      }
      getConnectionInfo() {
        return {
          schemaName: this.pgOptions?.schema,
          supportsRelationJoins: true
        };
      }
      async dispose() {
        return this.release?.();
      }
      underlyingDriver() {
        return this.client;
      }
    };
    var PrismaPgAdapterFactory = class {
      constructor(poolOrConfig, options) {
        this.options = options;
        if (poolOrConfig instanceof import_pg2.default.Pool) {
          this.externalPool = poolOrConfig;
          this.config = poolOrConfig.options;
        } else {
          this.externalPool = null;
          this.config = poolOrConfig;
        }
      }
      provider = "postgres";
      adapterName = name;
      config;
      externalPool;
      async connect() {
        const client = this.externalPool ?? new import_pg2.default.Pool(this.config);
        const onIdleClientError = (err) => {
          debug(`Error from idle pool client: ${err.message} %O`, err);
          this.options?.onPoolError?.(err);
        };
        client.on("error", onIdleClientError);
        return new PrismaPgAdapter(client, this.options, async () => {
          if (this.externalPool) {
            if (this.options?.disposeExternalPool) {
              await this.externalPool.end();
              this.externalPool = null;
            } else {
              this.externalPool.removeListener("error", onIdleClientError);
            }
          } else {
            await client.end();
          }
        });
      }
      async connectToShadowDb() {
        const conn = await this.connect();
        const database = `prisma_migrate_shadow_db_${globalThis.crypto.randomUUID()}`;
        await conn.executeScript(`CREATE DATABASE "${database}"`);
        const client = new import_pg2.default.Pool({ ...this.config, database });
        return new PrismaPgAdapter(client, void 0, async () => {
          await conn.executeScript(`DROP DATABASE "${database}"`);
          await client.end();
        });
      }
    };
  }
});

// src/index.ts
import express9 from "express";
import httpStatus10 from "http-status-codes";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/config/index.ts
import dotenv from "dotenv";
dotenv.config();
var config = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  BACKEND_URL: process.env.BACKEND_URL,
  APP_URL: process.env.APP_URL,
  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_PHONE: process.env.ADMIN_PHONE
};

// src/db/generated/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// src/db/generated/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config2 = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Categories {\n  id   String @id @default(uuid())\n  name String @unique()\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  meals Meal[]\n\n  @@map("categories")\n}\n\nenum UserRole {\n  customer\n  provider\n  admin\n}\n\nenum UserStatus {\n  activate\n  suspend\n}\n\nenum DietaryType {\n  veg\n  non_veg\n  vegan\n}\n\nenum PaymentMethod {\n  cod\n  online\n}\n\nenum OrderStatus {\n  placed\n  preparing\n  ready\n  delivered\n  cancelled\n}\n\nmodel Meal {\n  id String @id @default(uuid())\n\n  provider_id String\n  provider    Provider @relation(fields: [provider_id], references: [id], onDelete: Cascade)\n\n  category_id String\n  category    Categories @relation(fields: [category_id], references: [id], onDelete: Cascade)\n\n  name         String\n  description  String\n  price        Decimal     @db.Decimal(10, 2)\n  dietary_type DietaryType\n  is_available Boolean     @default(true)\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  orderItems Order_Item[]\n  reviews    Review[]\n\n  @@index([dietary_type])\n  @@index([name])\n  @@index([price])\n  @@map("meals")\n}\n\nmodel Order {\n  id      String @id @default(uuid())\n  user_id String\n  user    User   @relation(fields: [user_id], references: [id])\n\n  provider_id String\n  provider    Provider @relation(fields: [provider_id], references: [id], onDelete: Cascade)\n\n  total_price      Decimal       @db.Decimal(10, 2)\n  delivery_address String\n  payment_method   PaymentMethod\n\n  status       OrderStatus\n  cancelled_by String?\n\n  created_at DateTime     @default(now())\n  updated_at DateTime     @updatedAt()\n  orderItems Order_Item[]\n\n  @@index([status])\n  @@map("orders")\n}\n\nmodel Order_Item {\n  id      String @id @default(uuid())\n  orderId String\n  order   Order  @relation(fields: [orderId], references: [id])\n\n  meal_id String\n  meal    Meal   @relation(fields: [meal_id], references: [id])\n\n  quantity Int\n  price    Decimal @db.Decimal(10, 2)\n\n  @@map("order_items")\n}\n\nmodel Provider {\n  id String @id @default(uuid())\n\n  user_id String\n  user    User   @relation(fields: [user_id], references: [id], onDelete: Cascade)\n\n  restaurant_name String  @unique()\n  description     String\n  address         String\n  is_open         Boolean @default(true)\n\n  fb_link String\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  meals  Meal[]\n  orders Order[]\n\n  @@map("providers")\n}\n\nmodel Review {\n  id String @id @default(uuid())\n\n  meal_id String\n  meal    Meal   @relation(fields: [meal_id], references: [id])\n\n  rating Decimal @db.Decimal(10, 1)\n\n  comment String?\n\n  user_id String\n  user    User   @relation(fields: [user_id], references: [id])\n\n  is_visible Boolean @default(true)\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  @@map("reviews")\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id            String     @id\n  name          String\n  email         String\n  emailVerified Boolean    @default(false)\n  image         String?\n  createdAt     DateTime   @default(now())\n  updatedAt     DateTime   @updatedAt\n  role          UserRole   @default(customer)\n  phone         String\n  address       String?\n  status        UserStatus @default(activate)\n  sessions      Session[]\n  accounts      Account[]\n  provider      Provider[]\n  orders        Order[]\n  reviews       Review[]\n\n  @@unique([email])\n  @@map("users")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Categories":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoriesToMeal"}],"dbName":"categories"},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"provider_id","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"Provider","relationName":"MealToProvider"},{"name":"category_id","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Categories","relationName":"CategoriesToMeal"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Decimal"},{"name":"dietary_type","kind":"enum","type":"DietaryType"},{"name":"is_available","kind":"scalar","type":"Boolean"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"Order_Item","relationName":"MealToOrder_Item"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"}],"dbName":"meals"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"provider_id","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"Provider","relationName":"OrderToProvider"},{"name":"total_price","kind":"scalar","type":"Decimal"},{"name":"delivery_address","kind":"scalar","type":"String"},{"name":"payment_method","kind":"enum","type":"PaymentMethod"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"cancelled_by","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"orderItems","kind":"object","type":"Order_Item","relationName":"OrderToOrder_Item"}],"dbName":"orders"},"Order_Item":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrder_Item"},{"name":"meal_id","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrder_Item"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Decimal"}],"dbName":"order_items"},"Provider":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderToUser"},{"name":"restaurant_name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"is_open","kind":"scalar","type":"Boolean"},{"name":"fb_link","kind":"scalar","type":"String"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProvider"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToProvider"}],"dbName":"providers"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"meal_id","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"rating","kind":"scalar","type":"Decimal"},{"name":"comment","kind":"scalar","type":"String"},{"name":"user_id","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"is_visible","kind":"scalar","type":"Boolean"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"}],"dbName":"reviews"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"phone","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"provider","kind":"object","type":"Provider","relationName":"ProviderToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"}],"dbName":"users"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config2.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config2);
}

// src/db/generated/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/db/generated/enums.ts
var OrderStatus = {
  placed: "placed",
  preparing: "preparing",
  ready: "ready",
  delivered: "delivered",
  cancelled: "cancelled"
};

// src/db/generated/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/db/index.ts
var import_dist = __toESM(require_dist3(), 1);
var connectionString = `${config.DATABASE_URL}`;
var adapter = new import_dist.PrismaPg({ connectionString });
var db = new PrismaClient({ adapter });

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth = betterAuth({
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100
  },
  database: prismaAdapter(db, {
    provider: "postgresql"
  }),
  trustedOrigins: [config.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: ["customer", "provider", "admin"],
        required: false,
        defaultValue: "customer"
      },
      phone: {
        type: "string",
        required: true
      },
      address: {
        type: "string",
        required: false
      },
      status: {
        type: ["activate", "suspend"],
        required: false,
        defaultValue: "activate"
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false
  }
});

// src/routes/routes.ts
import express8 from "express";
import httpStatus9 from "http-status-codes";

// src/middleware/authGuard.ts
import httpStatus from "http-status-codes";
var authGuard = (...role) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(httpStatus.UNAUTHORIZED).send({
          success: false,
          statusCode: httpStatus.UNAUTHORIZED,
          message: "You'r unauthorize"
        });
      }
      if (role.length && !role.includes(session.user.role)) {
        return res.status(httpStatus.UNAUTHORIZED).send({
          success: false,
          statusCode: httpStatus.UNAUTHORIZED,
          message: "You'r role mismatch"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      next();
    } catch (error) {
      res.status(httpStatus.FORBIDDEN).send({
        status: false,
        statusCode: httpStatus.FORBIDDEN,
        message: "Forbidden"
      });
    }
  };
};

// src/module/user/user.route.ts
import express from "express";

// src/utils/sendResponse.ts
var sendResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data || void 0 || null
  });
};

// src/module/user/user.controller.ts
import httpStatus2 from "http-status-codes";

// src/utils/pagination.ts
var getPagination = (req) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

// src/module/user/user.service.ts
var UserServices = class {
  constructor() {
    this.db = db;
  }
  async getUserProfile(email) {
    const user = await this.db.user.findFirst({
      where: {
        email
      }
    });
    return user;
  }
  async getUsers(req) {
    const total = await this.db.user.count();
    const { page, limit, skip } = getPagination(req);
    const total_page = Math.ceil(total / limit);
    const users = await this.db.user.findMany({
      take: limit,
      skip,
      orderBy: {
        createdAt: "asc"
      }
    });
    return {
      users,
      meta: {
        total,
        total_page,
        page,
        limit,
        skip
      }
    };
  }
  async updateStatusRole(id, data) {
    const updateData = {};
    if (data.role === "admin") {
      throw Error("Change no role");
    }
    if (data.role !== void 0) {
      updateData.role = data.role;
    }
    if (data.status !== void 0) {
      updateData.status = data.status;
    }
    if (Object.keys(updateData).length === 0) {
      throw new Error("Nothing to update");
    }
    const user = await this.db.user.update({
      where: {
        id
      },
      data: updateData,
      select: {
        id: true,
        email: true,
        status: true,
        role: true
      }
    });
    return user;
  }
  async updateProfile(userId, data) {
    if (data.role || data.emailVerified || data.status) {
      return "This payload not supported";
    }
    const updateUser = await this.db.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        phone: true,
        address: true,
        email: true,
        role: true,
        updatedAt: true
      }
    });
    return updateUser;
  }
};

// src/utils/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/module/user/user.controller.ts
var UserController = class {
  constructor() {
    this.userService = new UserServices();
    this.getUserProfile = catchAsync(async (req, res) => {
      const user = await this.userService.getUserProfile(
        req.user.email
      );
      sendResponse(res, {
        success: true,
        statusCode: httpStatus2.OK,
        message: "My Profile",
        data: user
      });
    });
    this.getUsers = catchAsync(async (req, res) => {
      const { users, meta } = await this.userService.getUsers(req);
      sendResponse(res, {
        success: true,
        statusCode: httpStatus2.OK,
        message: "All Users",
        data: users,
        meta: {
          current_page: meta.page,
          limit: meta.limit,
          total: meta.total,
          total_page: meta.total_page
        }
      });
    });
    this.updateUser = catchAsync(async (req, res) => {
      const body = req.body;
      const id = req.params.id;
      if (req.user.role?.includes("admin") && req.user.id === id) {
        return sendResponse(res, {
          success: true,
          statusCode: httpStatus2.OK,
          message: "Admin can't change won status",
          data: null
        });
      }
      const updateUser = await this.userService.updateStatusRole(id, body);
      sendResponse(res, {
        success: true,
        statusCode: httpStatus2.OK,
        message: "User update successfully",
        data: updateUser
      });
    });
    this.updateProfile = catchAsync(async (req, res) => {
      const userId = req.user.id;
      const body = req.body;
      if (!body.name && !body.phone && !body.address) {
        return sendResponse(res, {
          success: false,
          statusCode: httpStatus2.BAD_REQUEST,
          message: "Nothing to update"
        });
      }
      const updatedUser = await this.userService.updateProfile(userId, body);
      sendResponse(res, {
        success: true,
        statusCode: httpStatus2.OK,
        message: "Profile updated successfully",
        data: updatedUser
      });
    });
  }
};

// src/module/user/user.route.ts
var userController = new UserController();
var router = express.Router();
router.get(
  "/users",
  authGuard("admin"),
  userController.getUsers.bind(userController)
);
router.patch(
  "/users/:id",
  authGuard("admin"),
  userController.updateUser.bind(userController)
);
var user_route_default = router;

// src/module/categories/categories.route.ts
import express2 from "express";

// src/module/categories/categories.service.ts
var CategoriesService = class {
  constructor() {
    this.db = db;
    this.getCategories = async (req) => {
      const total = await this.db.categories.count();
      const { page, limit, skip } = getPagination(req);
      const total_page = Math.ceil(total / limit);
      const categories = await this.db.categories.findMany({
        take: limit,
        skip,
        orderBy: {
          created_at: "asc"
        }
      });
      return {
        categories,
        meta: {
          total,
          total_page,
          current_page: page,
          limit,
          skip
        }
      };
    };
    this.getIdCategories = async (id) => {
      const categories = await this.db.categories.findFirst({
        where: {
          id
        }
      });
      return categories;
    };
    this.createCategories = async (data) => {
      const result = await this.db.categories.create({
        data
      });
      return result;
    };
    this.updateCategories = async (id, data) => {
      const categories = await this.db.categories.update({
        where: {
          id
        },
        data
      });
      return categories;
    };
    this.deleteCategories = async (id) => {
      return this.db.$transaction(async (t) => {
        const categories = await t.categories.findFirst({
          where: {
            id
          }
        });
        if (!categories) {
          return "Categories not found";
        }
        await t.categories.delete({
          where: {
            id
          }
        });
        return { message: "Successfully deleted" };
      });
    };
  }
};

// src/module/categories/categories.controller.ts
import httpStatus3 from "http-status-codes";
var CategoriesController = class {
  constructor() {
    this.categoriesService = new CategoriesService();
    this.getAllCategories = catchAsync(
      async (req, res, next) => {
        const result = await this.categoriesService.getCategories(req);
        sendResponse(res, {
          statusCode: httpStatus3.OK,
          success: true,
          message: "Retrieve all categories",
          data: result.categories,
          meta: result.meta
        });
      }
    );
    this.getSingleCategory = catchAsync(
      async (req, res, next) => {
        const { id } = req.params;
        const result = await this.categoriesService.getIdCategories(id);
        sendResponse(res, {
          statusCode: httpStatus3.OK,
          success: true,
          message: "Retrieve single category",
          data: result
        });
      }
    );
    this.createCategory = catchAsync(
      async (req, res, next) => {
        const result = await this.categoriesService.createCategories(req.body);
        sendResponse(res, {
          statusCode: httpStatus3.CREATED,
          success: true,
          message: "Category created successfully",
          data: result
        });
      }
    );
    this.updateCategory = catchAsync(
      async (req, res, next) => {
        const { id } = req.params;
        const result = await this.categoriesService.updateCategories(
          id,
          req.body
        );
        sendResponse(res, {
          statusCode: httpStatus3.OK,
          success: true,
          message: "Category updated successfully",
          data: result
        });
      }
    );
    this.deleteCategory = catchAsync(
      async (req, res, next) => {
        const { id } = req.params;
        const result = await this.categoriesService.deleteCategories(
          id
        );
        sendResponse(res, {
          statusCode: httpStatus3.OK,
          success: true,
          message: "Category deleted successfully",
          data: result
        });
      }
    );
  }
};

// src/module/categories/categories.route.ts
var router2 = express2.Router();
var categoriesController = new CategoriesController();
router2.get(
  "/all",
  authGuard(),
  categoriesController.getAllCategories.bind(categoriesController)
);
router2.get(
  "/:id",
  authGuard(),
  categoriesController.getSingleCategory.bind(categoriesController)
);
router2.post(
  "/",
  authGuard("provider", "admin"),
  categoriesController.createCategory.bind(categoriesController)
);
router2.patch(
  "/:id",
  authGuard("provider", "admin"),
  categoriesController.updateCategory.bind(categoriesController)
);
router2.delete(
  "/:id",
  authGuard("provider", "admin"),
  categoriesController.deleteCategory.bind(categoriesController)
);
var categories_route_default = router2;

// src/module/provider/provider.route.ts
import express3 from "express";

// src/module/provider/provider.controller.ts
import httpStatus4 from "http-status-codes";

// src/module/provider/provider.service.ts
var ProviderService = class {
  constructor() {
    this.db = db;
    this.getProvider = async (req) => {
      const total = await this.db.provider.count();
      const { page, limit, skip } = getPagination(req);
      const total_page = Math.ceil(total / limit);
      const providers = await this.db.provider.findMany({
        take: limit,
        skip,
        orderBy: {
          created_at: "asc"
        }
      });
      return {
        providers,
        meta: {
          total,
          total_page,
          current_page: page,
          limit,
          skip
        }
      };
    };
    this.getProviderme = async (req) => {
      const total = await this.db.provider.count();
      const { page, limit, skip } = getPagination(req);
      const total_page = Math.ceil(total / limit);
      const providers = await this.db.provider.findMany({
        where: {
          user_id: req.user.id
        },
        take: limit,
        skip,
        orderBy: {
          created_at: "asc"
        }
      });
      return {
        providers,
        meta: {
          total,
          total_page,
          current_page: page,
          limit,
          skip
        }
      };
    };
    this.getIdProvider = async (id) => {
      const provider = await this.db.provider.findUnique({
        where: {
          id
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              phone: true,
              address: true
            }
          }
        }
      });
      return provider;
    };
    this.createProvider = async (data, userId) => {
      const result = await this.db.provider.create({
        data: {
          ...data,
          user_id: userId
          //   user: {
          //     connect: {
          //       id: userId
          //     }
          //   }
        }
      });
      return result;
    };
    this.updateProvider = async (id, data, name) => {
      console.log("id=>", id, "data=>", data);
      const providers = await this.db.provider.update({
        where: {
          user_id: id,
          restaurant_name: name
        },
        data
      });
      return providers;
    };
    this.deleteProvider = async (id) => {
      return this.db.$transaction(async (t) => {
        const provider = await t.provider.findUnique({
          where: { id }
        });
        if (!provider) {
          throw new Error("Provider not found");
        }
        await t.provider.delete({
          where: { id }
        });
        return { message: "Successfully deleted" };
      });
    };
  }
};

// src/module/provider/provider.controller.ts
var ProvidersController = class {
  constructor() {
    this.providerService = new ProviderService();
    this.getAllProviders = catchAsync(
      async (req, res, next) => {
        const result = await this.providerService.getProvider(req);
        sendResponse(res, {
          statusCode: httpStatus4.OK,
          success: true,
          message: "Retrieve all providers",
          data: result.providers,
          meta: result.meta
        });
      }
    );
    this.getAllProvidersme = catchAsync(
      async (req, res, next) => {
        const result = await this.providerService.getProviderme(req);
        sendResponse(res, {
          statusCode: httpStatus4.OK,
          success: true,
          message: "Retrieve my all providers",
          data: result.providers,
          meta: result.meta
        });
      }
    );
    this.getSingleProvider = catchAsync(
      async (req, res, next) => {
        const result = await this.providerService.getIdProvider(
          req.params.id
        );
        sendResponse(res, {
          statusCode: httpStatus4.OK,
          success: true,
          message: "Retrieve single provider",
          data: result
        });
      }
    );
    this.createProvider = catchAsync(
      async (req, res, next) => {
        const userId = req.user.id;
        const result = await this.providerService.createProvider(
          req.body,
          userId
        );
        sendResponse(res, {
          statusCode: httpStatus4.CREATED,
          success: true,
          message: "Provider created successfully",
          data: result
        });
      }
    );
    this.updateProvider = catchAsync(
      async (req, res, next) => {
        const result = await this.providerService.updateProvider(
          req.user.id,
          req.body,
          req.query.name
        );
        sendResponse(res, {
          statusCode: httpStatus4.OK,
          success: true,
          message: "Provider updated successfully",
          data: result
        });
      }
    );
    this.deleteProvider = catchAsync(
      async (req, res, next) => {
        const { id } = req.params;
        const result = await this.providerService.deleteProvider(id);
        sendResponse(res, {
          statusCode: httpStatus4.OK,
          success: true,
          message: "Provider deleted successfully",
          data: result
        });
      }
    );
  }
};

// src/module/provider/provider.route.ts
var router3 = express3.Router();
var providerController = new ProvidersController();
router3.get("/", providerController.getAllProviders.bind(providerController));
router3.get(
  "/me",
  authGuard("provider"),
  providerController.getAllProvidersme.bind(providerController)
);
router3.get(
  "/:id",
  providerController.getSingleProvider.bind(providerController)
);
router3.post(
  "/",
  authGuard("provider", "admin"),
  providerController.createProvider.bind(providerController)
);
router3.patch(
  "/",
  authGuard("provider", "admin"),
  providerController.updateProvider.bind(providerController)
);
router3.delete(
  "/:id",
  authGuard("admin"),
  providerController.deleteProvider.bind(providerController)
);
var provider_route_default = router3;

// src/module/meal/meal.route.ts
import express4 from "express";

// src/module/meal/meal.controller.ts
import httpStatus5 from "http-status-codes";

// src/module/meal/meal.service.ts
var MealService = class {
  constructor() {
    this.db = db;
    this.getMeal = async (req) => {
      const search = req.query.search;
      const maxPrice = req.query.maxPrice;
      const minPrice = req.query.minPrice;
      const type = req.query.type;
      const filterWhere = [];
      if (search) {
        filterWhere.push({
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive"
              }
            },
            {
              description: {
                contains: search,
                mode: "insensitive"
              }
            }
          ]
        });
      }
      if (minPrice || maxPrice) {
        filterWhere.push({
          price: {
            ...minPrice && { gte: Number(minPrice) },
            ...maxPrice && { lte: Number(maxPrice) }
          }
        });
      }
      if (type) {
        filterWhere.push({
          dietary_type: {
            in: type.split(",")
          }
        });
      }
      const total = await this.db.meal.count({
        where: {
          AND: filterWhere,
          is_available: true
        }
      });
      const { page, limit, skip } = getPagination(req);
      const total_page = Math.ceil(total / limit);
      const meals = await this.db.meal.findMany({
        where: {
          AND: filterWhere,
          is_available: true
        },
        take: limit,
        skip,
        orderBy: {
          created_at: "asc"
        }
      });
      return {
        meals,
        meta: {
          total,
          total_page,
          current_page: page,
          limit,
          skip
        }
      };
    };
    this.getIdMeal = async (id) => {
      const meal = await this.db.meal.findFirst({
        where: {
          id,
          is_available: true
        },
        include: {
          category: true,
          provider: true,
          reviews: {
            where: {
              is_visible: true
            },
            select: {
              comment: true,
              rating: true,
              created_at: true,
              user: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      });
      return meal;
    };
    this.createMeal = async (data) => {
      const result = await this.db.meal.create({
        data
      });
      return result;
    };
    this.updateMeal = async (id, data) => {
      const meals = await this.db.meal.update({
        where: {
          id
        },
        data
      });
      return meals;
    };
    this.deleteMeal = async (id) => {
      return this.db.$transaction(async (t) => {
        const meal = await t.meal.findUnique({
          where: { id }
        });
        if (!meal) {
          throw new Error("Meal not found");
        }
        await t.meal.delete({
          where: { id }
        });
        return { message: "Successfully deleted" };
      });
    };
  }
};

// src/module/meal/meal.controller.ts
var MealsController = class {
  constructor() {
    this.providerService = new MealService();
    this.getAllMeals = catchAsync(
      async (req, res, next) => {
        const result = await this.providerService.getMeal(req);
        sendResponse(res, {
          statusCode: httpStatus5.OK,
          success: true,
          message: "Retrieve all meals",
          data: result.meals,
          meta: result.meta
        });
      }
    );
    this.getSingleMeal = catchAsync(
      async (req, res, next) => {
        const { id } = req.params;
        const result = await this.providerService.getIdMeal(id);
        sendResponse(res, {
          statusCode: httpStatus5.OK,
          success: true,
          message: "Retrieve single meal",
          data: result
        });
      }
    );
    this.createMeal = catchAsync(
      async (req, res, next) => {
        const result = await this.providerService.createMeal(req.body);
        sendResponse(res, {
          statusCode: httpStatus5.CREATED,
          success: true,
          message: "Meal created successfully",
          data: result
        });
      }
    );
    this.updateMeal = catchAsync(
      async (req, res, next) => {
        const { id } = req.params;
        const result = await this.providerService.updateMeal(id, req.body);
        sendResponse(res, {
          statusCode: httpStatus5.OK,
          success: true,
          message: "Meal updated successfully",
          data: result
        });
      }
    );
    this.deleteMeal = catchAsync(
      async (req, res, next) => {
        const { id } = req.params;
        const result = await this.providerService.deleteMeal(id);
        sendResponse(res, {
          statusCode: httpStatus5.OK,
          success: true,
          message: "Meal deleted successfully",
          data: result
        });
      }
    );
  }
};

// src/module/meal/meal.route.ts
var router4 = express4.Router();
var providerController2 = new MealsController();
router4.get(
  "/",
  providerController2.getAllMeals.bind(providerController2)
);
router4.get(
  "/:id",
  providerController2.getSingleMeal.bind(providerController2)
);
router4.post(
  "/",
  authGuard("provider", "admin"),
  providerController2.createMeal.bind(providerController2)
);
router4.patch(
  "/:id",
  authGuard("provider", "admin"),
  providerController2.updateMeal.bind(providerController2)
);
router4.delete(
  "/:id",
  authGuard("admin"),
  providerController2.deleteMeal.bind(providerController2)
);
var meal_route_default = router4;

// src/module/order/order.route.ts
import express5 from "express";

// src/module/order/order.controller.ts
import httpStatus6 from "http-status-codes";

// src/module/order/order.service.ts
var OrderService = class {
  constructor() {
    this.db = db;
    this.getOrder = async (req) => {
      const status = req.query.status;
      const where = {};
      if (status && Object.values(OrderStatus).includes(status.toLowerCase())) {
        where.status = status.toLowerCase();
      }
      if (req.user.role === "customer") {
        where.user_id = req.user.id;
      }
      if (req.user.role === "provider") {
        where.provider = {
          user_id: req.user.id
        };
      }
      const total = await this.db.order.count({ where });
      const { page, limit, skip } = getPagination(req);
      const total_page = Math.ceil(total / limit);
      const orders = await this.db.order.findMany({
        where,
        take: limit,
        skip,
        orderBy: {
          created_at: "desc"
        },
        include: {
          provider: {
            select: {
              id: true,
              user_id: true,
              restaurant_name: true,
              address: true,
              is_open: true
            }
          },
          orderItems: {
            include: {
              meal: {
                select: {
                  name: true,
                  price: true
                }
              }
            }
          },
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      });
      return {
        orders,
        meta: {
          total,
          total_page,
          current_page: page,
          limit,
          skip
        }
      };
    };
    this.getOrderMeal = async (req) => {
      const orders = await this.db.order_Item.findMany({
        where: {
          order: {
            user_id: req.user.id
          }
        },
        include: {
          order: {
            select: {
              user_id: true
            }
          }
        }
      });
      return {
        orders
      };
    };
    this.getIdOrder = async (id) => {
      const order = await this.db.order.findFirst({
        where: {
          id
        },
        include: {
          provider: true,
          user: true,
          orderItems: true
        }
      });
      return order;
    };
    this.createOrder = async (req) => {
      const userId = req.user.id;
      const {
        provider_id,
        delivery_address,
        payment_method,
        items
      } = req.body;
      const providerExists = await this.db.provider.findUnique({
        where: { id: provider_id }
      });
      if (!providerExists) throw new Error("Provider not found");
      for (const item of items) {
        const mealExists = await this.db.meal.findUnique({
          where: { id: item.meal_id }
        });
        if (!mealExists) throw new Error(`Meal not found: ${item.meal_id}`);
      }
      const total_price = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const result = await this.db.order.create({
        data: {
          user: { connect: { id: userId } },
          provider: { connect: { id: provider_id } },
          delivery_address,
          payment_method,
          total_price,
          status: "placed",
          orderItems: {
            create: items.map((item) => ({
              meal_id: item.meal_id,
              quantity: item.quantity,
              price: item.price
            }))
          }
        },
        include: { orderItems: true }
      });
      return result;
    };
    this.updateOrder = async (id, data, role, userId) => {
      const order = await this.db.order.findUnique({
        where: { id },
        include: {
          provider: {
            select: {
              user_id: true
            }
          }
        }
      });
      if (!order) {
        throw new Error("Order not found");
      }
      if (order.status === "delivered") {
        throw new Error("Order already delivered");
      }
      if (role === "customer") {
        if (data.status !== "cancelled") {
          throw new Error("Customer can only cancel orders");
        }
        if (!["preparing", "ready", "delivered"].includes(order.status)) {
          throw new Error("Order can\u2019t be cancelled at this stage");
        }
        if (order.user_id !== userId) {
          throw new Error("Unauthorized order access");
        }
      }
      if (role === "provider") {
        if (!["ready", "preparing", "delivered", "cancelled"].includes(
          data.status
        )) {
          throw new Error("Invalid status update by provider");
        }
        if (order.provider.user_id !== userId) {
          throw new Error("Unauthorized provider access");
        }
      }
      return this.db.order.update({
        where: { id },
        data: {
          ...data,
          cancelled_by: data.status === "cancelled" ? role : null
        }
      });
    };
    this.deleteOrder = async (id) => {
      return this.db.$transaction(async (t) => {
        const order = await t.order.findUnique({
          where: { id }
        });
        if (!order) {
          throw new Error("Order not found");
        }
        await t.order.delete({
          where: { id }
        });
        return { message: "Successfully deleted" };
      });
    };
  }
};

// src/module/order/order.controller.ts
var OrdersController = class {
  constructor() {
    this.providerService = new OrderService();
    this.getAllOrders = catchAsync(
      async (req, res, next) => {
        const result = await this.providerService.getOrder(req);
        sendResponse(res, {
          statusCode: httpStatus6.OK,
          success: true,
          message: "Retrieve all orders",
          data: result.orders,
          meta: result.meta
        });
      }
    );
    this.getAllOrdersMeal = catchAsync(
      async (req, res, next) => {
        const result = await this.providerService.getOrderMeal(req);
        sendResponse(res, {
          statusCode: httpStatus6.OK,
          success: true,
          message: "Retrieve all orders",
          data: result.orders,
          meta: result.meta
        });
      }
    );
    this.getSingleOrder = catchAsync(
      async (req, res, next) => {
        const { id } = req.params;
        const result = await this.providerService.getIdOrder(id);
        sendResponse(res, {
          statusCode: httpStatus6.OK,
          success: true,
          message: "Retrieve single meal",
          data: result
        });
      }
    );
    this.createOrder = catchAsync(
      async (req, res, next) => {
        const result = await this.providerService.createOrder(req);
        sendResponse(res, {
          statusCode: httpStatus6.CREATED,
          success: true,
          message: "Order created successfully",
          data: result
        });
      }
    );
    this.updateOrder = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await this.providerService.updateOrder(
        id,
        req.body,
        req.user.role,
        req.user.id
      );
      sendResponse(res, {
        statusCode: httpStatus6.OK,
        success: true,
        message: "Order updated successfully",
        data: result
      });
    });
    this.deleteOrder = catchAsync(
      async (req, res, next) => {
        const { id } = req.params;
        const result = await this.providerService.deleteOrder(id);
        sendResponse(res, {
          statusCode: httpStatus6.OK,
          success: true,
          message: "Order deleted successfully",
          data: result
        });
      }
    );
  }
};

// src/module/order/order.route.ts
var router5 = express5.Router();
var providerController3 = new OrdersController();
router5.get(
  "/all",
  authGuard(),
  providerController3.getAllOrders.bind(providerController3)
);
router5.get(
  "/meal",
  authGuard(),
  providerController3.getAllOrdersMeal.bind(providerController3)
);
router5.get(
  "/:id",
  authGuard(),
  providerController3.getSingleOrder.bind(providerController3)
);
router5.post(
  "/",
  authGuard("customer"),
  providerController3.createOrder.bind(providerController3)
);
router5.patch(
  "/:id",
  authGuard("provider", "customer", "admin"),
  providerController3.updateOrder.bind(providerController3)
);
router5.delete(
  "/:id",
  authGuard("admin"),
  providerController3.deleteOrder.bind(providerController3)
);
var order_route_default = router5;

// src/module/review/review.route.ts
import express6 from "express";

// src/module/review/review.controller.ts
import httpStatus7 from "http-status-codes";

// src/module/review/review.service.ts
var ReviewService = class {
  constructor() {
    this.db = db;
    this.getReview = async (req) => {
      const userId = req.user.id;
      const role = req.user.role;
      const { page, limit, skip } = getPagination(req);
      const whereCondition = {
        is_visible: true
      };
      if (role === "customer") {
        whereCondition.user_id = userId;
      }
      const total = await this.db.review.count({
        where: whereCondition
      });
      const total_page = Math.ceil(total / limit);
      const reviews = await this.db.review.findMany({
        where: whereCondition,
        take: limit,
        skip,
        orderBy: {
          created_at: "asc"
        },
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      });
      return {
        reviews,
        meta: {
          total,
          total_page,
          current_page: page,
          limit,
          skip
        }
      };
    };
    this.getIdReview = async (id, userId, role) => {
      const whereCondition = {
        id
      };
      if (role === "customer") {
        whereCondition.user_id = userId;
      }
      const review = await this.db.review.findFirst({
        where: whereCondition,
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      });
      if (!review) {
        throw new Error("Review not found or access denied");
      }
      return review;
    };
    this.createReview = async (userId, mealId, rating, comment) => {
      const orderItem = await this.db.order_Item.findFirst({
        where: {
          meal_id: mealId,
          order: {
            user_id: userId,
            status: "delivered"
          }
        }
      });
      if (!orderItem) {
        throw new Error("You can review only after ordering this meal");
      }
      const alreadyReviewed = await this.db.review.findFirst({
        where: {
          user_id: userId,
          meal_id: mealId
        }
      });
      if (alreadyReviewed) {
        throw new Error("You have already reviewed this meal");
      }
      return this.db.review.create({
        data: {
          user: { connect: { id: userId } },
          meal: { connect: { id: mealId } },
          rating,
          comment: comment ?? null,
          is_visible: true
        }
      });
    };
    this.updateReview = async (reviewId, userId, role, data) => {
      const review = await this.db.review.findUnique({
        where: { id: reviewId }
      });
      if (role !== "admin") {
        delete data.is_visible;
      }
      if (!review) {
        throw new Error("Review not found");
      }
      if (role === "customer" && review.user_id !== userId) {
        throw new Error("You are not allowed to update this review");
      }
      return this.db.review.update({
        where: { id: reviewId },
        data
      });
    };
    this.deleteReview = async (id) => {
      return this.db.$transaction(async (t) => {
        const review = await t.review.findUnique({
          where: { id }
        });
        if (!review) {
          throw new Error("Review not found");
        }
        await t.review.delete({
          where: { id }
        });
        return { message: "Successfully deleted" };
      });
    };
  }
};

// src/module/review/review.controller.ts
var ReviewsController = class {
  constructor() {
    this.reviewService = new ReviewService();
    this.getAllReviews = catchAsync(
      async (req, res, next) => {
        const result = await this.reviewService.getReview(req);
        sendResponse(res, {
          statusCode: httpStatus7.OK,
          success: true,
          message: "Retrieve all reviews",
          data: result.reviews,
          meta: result.meta
        });
      }
    );
    this.getSingleReview = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await this.reviewService.getIdReview(
        id,
        req.user.id,
        req.user.role
      );
      sendResponse(res, {
        statusCode: httpStatus7.OK,
        success: true,
        message: "Retrieve single review",
        data: result
      });
    });
    this.createReview = catchAsync(
      async (req, res, next) => {
        const {
          mealId,
          rating,
          comment
        } = req.body;
        const result = await this.reviewService.createReview(
          req.user.id,
          mealId,
          rating,
          comment
        );
        sendResponse(res, {
          statusCode: httpStatus7.CREATED,
          success: true,
          message: "Review created successfully",
          data: result
        });
      }
    );
    this.updateReview = catchAsync(
      async (req, res, next) => {
        const { id } = req.params;
        const result = await this.reviewService.updateReview(
          id,
          req.user.id,
          req.user.role,
          req.body
        );
        sendResponse(res, {
          statusCode: httpStatus7.OK,
          success: true,
          message: "Review updated successfully",
          data: result
        });
      }
    );
    this.deleteReview = catchAsync(
      async (req, res, next) => {
        const { id } = req.params;
        const result = await this.reviewService.deleteReview(id);
        sendResponse(res, {
          statusCode: httpStatus7.OK,
          success: true,
          message: "Review deleted successfully",
          data: result
        });
      }
    );
  }
};

// src/module/review/review.route.ts
var router6 = express6.Router();
var reviewController = new ReviewsController();
router6.get(
  "/all",
  authGuard("admin", "customer"),
  reviewController.getAllReviews.bind(reviewController)
);
router6.get(
  "/:id",
  authGuard("admin", "customer"),
  reviewController.getSingleReview.bind(reviewController)
);
router6.post(
  "/",
  authGuard("customer"),
  reviewController.createReview.bind(reviewController)
);
router6.patch(
  "/:id",
  authGuard("admin"),
  reviewController.updateReview.bind(reviewController)
);
router6.delete(
  "/:id",
  authGuard("admin"),
  reviewController.deleteReview.bind(reviewController)
);
var review_route_default = router6;

// src/module/dashboard/dashboard.route.ts
import express7 from "express";

// src/module/dashboard/dashboard.service.ts
var DashboardService = class {
  constructor() {
    this.db = db;
    this.getStatic = async (req) => {
      const { role, id } = req.user;
      return this.db.$transaction(async (t) => {
        const userFilter = (status, userRole) => {
          const filter = {};
          if (status) filter.status = status;
          if (userRole) filter.role = userRole;
          if (role !== "admin") filter.id = id;
          return filter;
        };
        const orderFilter = (status) => {
          return role === "admin" ? { status } : { status, provider_id: id };
        };
        const mealFilter = () => {
          return role === "admin" ? {} : { provider_id: id };
        };
        const [
          activeUser,
          suspendUser,
          customer,
          provider,
          completeOrder,
          cancelOrder,
          totalMeals,
          totalCategories
        ] = await Promise.all([
          this.db.user.count({ where: userFilter("activate") }),
          this.db.user.count({ where: userFilter("suspend") }),
          this.db.user.count({ where: userFilter(void 0, "customer") }),
          this.db.user.count({ where: userFilter(void 0, "provider") }),
          this.db.order.count({ where: orderFilter(OrderStatus.delivered) }),
          this.db.order.count({ where: orderFilter(OrderStatus.cancelled) }),
          this.db.meal.count({ where: mealFilter() }),
          this.db.categories.count()
        ]);
        return {
          activeUser,
          suspendUser,
          customer,
          provider,
          completeOrder,
          cancelOrder,
          totalMeals,
          totalCategories
        };
      });
    };
  }
};

// src/module/dashboard/dashboard.controller.ts
import httpStatus8 from "http-status-codes";
var DashboardController = class {
  constructor() {
    this.dashboardService = new DashboardService();
    this.getStatic = catchAsync(async (req, res) => {
      const result = await this.dashboardService.getStatic(req);
      sendResponse(res, {
        statusCode: httpStatus8.OK,
        success: true,
        message: `Retrieve ${req.user.role} Statistics`,
        data: result
      });
    });
  }
};

// src/module/dashboard/dashboard.route.ts
var router7 = express7.Router();
var dashboardController = new DashboardController();
router7.get(
  "/",
  authGuard(),
  dashboardController.getStatic.bind(dashboardController)
);
var dashboard_route_default = router7;

// src/routes/routes.ts
var router8 = express8.Router();
var apiVersion = `/api`;
var moduleRouter = [
  {
    path: `${apiVersion}/admin`,
    route: user_route_default
  },
  {
    path: `${apiVersion}/categories`,
    route: categories_route_default
  },
  {
    path: `${apiVersion}/provider`,
    route: provider_route_default
  },
  {
    path: `${apiVersion}/meal`,
    route: meal_route_default
  },
  {
    path: `${apiVersion}/order`,
    route: order_route_default
  },
  {
    path: `${apiVersion}/review`,
    route: review_route_default
  },
  {
    path: `${apiVersion}/dashboard`,
    route: dashboard_route_default
  }
];
moduleRouter.forEach((route) => router8.use(route.path, route.route));
router8.use((req, res) => {
  res.status(httpStatus9.NOT_FOUND).send({
    error: "Not Found",
    message: `${req.originalUrl} - This route is not found`
  });
});
var routes_default = router8;

// src/index.ts
var userService = new UserServices();
var userController2 = new UserController();
var app = express9();
app.use(express9.json());
app.use(express9.urlencoded());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);
app.patch(
  "/api/users/profile",
  authGuard(),
  userController2.updateProfile.bind(userController2)
);
app.use("/api/auth/me", authGuard(), async (req, res) => {
  const user = await userService.getUserProfile(req.user.email);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus10.OK,
    message: "Profile",
    data: user
  });
});
app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/", (req, res) => {
  res.status(httpStatus10.OK).send({
    success: true,
    message: "Hey Baby Programer !!! What's up ?",
    time: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.use(routes_default);
var index_default = app;
export {
  index_default as default
};
