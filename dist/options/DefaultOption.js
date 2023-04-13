"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultOption = void 0;
var SpawnService_1 = require("../services/SpawnService");
var TemplateService_1 = require("../services/TemplateService");
var fs_1 = require("fs");
var ReadlineService_1 = require("../services/ReadlineService");
var constants_1 = require("../constants");
exports.DefaultOption = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var template, replacements, filledTemplate, ex_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 5, , 6]);
          return [
            4 /*yield*/,
            SpawnService_1.spawnProcess(
              constants_1.CREATE_FILE_CMD +
                constants_1.REPO_PATH +
                constants_1.README_PATH,
              []
            ),
          ];
        case 1:
          _a.sent();
          return [
            4 /*yield*/,
            TemplateService_1.readTemplateFromUrl(
              "https://raw.githubusercontent.com/m3yevn/apprag/master/templates/Default.md"
            ),
          ];
        case 2:
          template = _a.sent();
          return [4 /*yield*/, getReplacements()];
        case 3:
          replacements = _a.sent();
          filledTemplate = TemplateService_1.fillTemplate(
            template,
            replacements
          );
          return [
            4 /*yield*/,
            TemplateService_1.writeTemplate(
              constants_1.REPO_PATH + constants_1.README_PATH,
              filledTemplate
            ),
          ];
        case 4:
          _a.sent();
          return [3 /*break*/, 6];
        case 5:
          ex_1 = _a.sent();
          console.error(ex_1);
          return [3 /*break*/, 6];
        case 6:
          return [2 /*return*/];
      }
    });
  });
};
var getPackage_V1 = function () {
  try {
    return require(process.cwd() + "/package.json");
  } catch (ex) {
    console.error("There is no package.json inside the directory.");
  }
};
var getPackage_V2 = function () {
  try {
    return require(process.cwd() + "/apprag.config.js");
  } catch (ex) {
    console.error(
      'There is no apprag.config.js inside the directory. \n    Run "apprag --config" command to generate the template and fill.'
    );
  }
};
var getPackage = function () {
  try {
    var basicInfo = getPackage_V1();
    var appragInfo = getPackage_V2();
    return __assign(__assign({}, basicInfo), appragInfo);
  } catch (ex) {
    console.error("Error in getting configs for package information.");
  }
};
var getReplacements = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var licenseFile, packageInfo, licenseExists;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __generator(this, function (_o) {
      switch (_o.label) {
        case 0:
          packageInfo = getPackage();
          licenseExists = fs_1.existsSync(process.cwd() + "/LICENSE");
          if (!licenseExists) return [3 /*break*/, 2];
          return [4 /*yield*/, getLicense()];
        case 1:
          licenseFile = _o.sent();
          _o.label = 2;
        case 2:
          if (!packageInfo.name) {
            ReadlineService_1.readLine(
              "There is no name for this project. Please enter the name.\r\n",
              function (answer) {
                packageInfo.name = answer;
                TemplateService_1.writeTemplate(
                  constants_1.REPO_PATH + "/package.json",
                  JSON.stringify(packageInfo, null, "\t")
                );
              }
            );
          }
          if (!packageInfo.version) {
            packageInfo.version =
              (_a = packageInfo.version) !== null && _a !== void 0 ? _a : "1.0";
          }
          if (!packageInfo.author) {
            packageInfo.author = "";
          }
          if (
            !((_b = packageInfo.funFacts) === null || _b === void 0
              ? void 0
              : _b.length)
          ) {
            packageInfo.funFacts = [];
          }
          if (
            !((_c = packageInfo.badges) === null || _c === void 0
              ? void 0
              : _c.length)
          ) {
            packageInfo.badges = [];
          }
          if (
            !((_d = packageInfo.techStacks) === null || _d === void 0
              ? void 0
              : _d.length)
          ) {
            packageInfo.techStacks = [];
          }
          if (!packageInfo.publicUrl) {
            packageInfo.publicUrl = "";
          }
          if (
            !((_e = packageInfo.screenshots) === null || _e === void 0
              ? void 0
              : _e.length)
          ) {
            packageInfo.screenshots = [];
          }
          if (
            !((_f = packageInfo.documentations) === null || _f === void 0
              ? void 0
              : _f.length)
          ) {
            packageInfo.documentations = [];
          }
          return [
            2 /*return*/,
            __assign(__assign({}, packageInfo), {
              name: packageInfo.name
                ? packageInfo.name.charAt(0).toUpperCase() +
                  packageInfo.name.slice(1)
                : "This project name",
              funFacts: (
                (_g = packageInfo.funFacts) === null || _g === void 0
                  ? void 0
                  : _g.length
              )
                ? renderList(packageInfo.funFacts, " - {}")
                : "",
              badges: (
                (_h = packageInfo.badges) === null || _h === void 0
                  ? void 0
                  : _h.length
              )
                ? renderList(packageInfo.badges, "{}")
                : "",
              techStacks: (
                (_j = packageInfo.techStacks) === null || _j === void 0
                  ? void 0
                  : _j.length
              )
                ? renderList(packageInfo.techStacks, " - {}")
                : "N.A",
              publicUrl: packageInfo.publicUrl || "N.A",
              screenshots: (
                (_k = packageInfo.screenshots) === null || _k === void 0
                  ? void 0
                  : _k.length
              )
                ? renderList(packageInfo.screenshots, ' - <img src="{}" />')
                : "N.A",
              scripts:
                packageInfo.scripts &&
                structureScripts(packageInfo.scripts).length
                  ? renderList(structureScripts(packageInfo.scripts), "{}")
                  : "N.A",
              bugUrl:
                packageInfo.bugs && packageInfo.bugs.url
                  ? packageInfo.bugs.url
                  : "Visit the repository to open bug reports and issues",
              license: licenseExists
                ? licenseFile
                : packageInfo.license ||
                  "This project does not have a license.",
              dependencies:
                packageInfo.dependencies &&
                structureDependencies(packageInfo.dependencies).length
                  ? renderList(
                      structureScripts(packageInfo.dependencies),
                      " - {}"
                    )
                  : "This project does not have dependencies",
              devDependencies:
                packageInfo.devDependencies &&
                structureDependencies(packageInfo.devDependencies).length
                  ? renderList(
                      structureScripts(packageInfo.devDependencies),
                      " - {}"
                    )
                  : "This project does not have dev dependencies",
              animations: (
                (_l = packageInfo.animations) === null || _l === void 0
                  ? void 0
                  : _l.length
              )
                ? renderList(packageInfo.animations, '<img src="{}"')
                : '<img src="https://cdn.dribbble.com/users/2401141/screenshots/5487982/developers-gif-showcase.gif"/>',
              footer: packageInfo.footer || "Happy Coding!",
              documentations: (
                (_m = packageInfo.documentations) === null || _m === void 0
                  ? void 0
                  : _m.length
              )
                ? renderList(packageInfo.documentations, " - {}")
                : "This project does not have documentations",
            }),
          ];
      }
    });
  });
};
var getLicense = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var licenseFile, ex_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            TemplateService_1.readTemplateFromFile(process.cwd() + "/LICENSE"),
          ];
        case 1:
          licenseFile = _a.sent();
          return [2 /*return*/, licenseFile];
        case 2:
          ex_2 = _a.sent();
          console.error(ex_2);
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
var structureDependencies = function (deps) {
  var keys = Object.keys(deps);
  var values = Object.values(deps);
  var scriptString = [];
  if (keys && values) {
    for (var i = 0; i < values.length; i++) {
      scriptString.push(keys[i] + " : " + values[i]);
    }
    return scriptString;
  }
  return [];
};
var structureScripts = function (scripts) {
  var keys = Object.keys(scripts);
  var values = Object.values(scripts);
  var scriptString = [];
  if (keys && values) {
    for (var i = 0; i < values.length; i++) {
      scriptString.push(keys[i] + " : $ " + values[i]);
    }
    return scriptString;
  }
  return [];
};
var renderList = function (loops, format) {
  var renderedString = "";
  for (var _i = 0, loops_1 = loops; _i < loops_1.length; _i++) {
    var loop = loops_1[_i];
    renderedString += format.replace("{}", loop) + "\r\n";
  }
  return renderedString;
};
