"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var getPlatform_exports = {};
__export(getPlatform_exports, {
  computeLibSSLSpecificPaths: () => import_chunk_JZSNWHCJ.computeLibSSLSpecificPaths,
  getArchFromUname: () => import_chunk_JZSNWHCJ.getArchFromUname,
  getBinaryTargetForCurrentPlatform: () => import_chunk_JZSNWHCJ.getBinaryTargetForCurrentPlatform,
  getBinaryTargetForCurrentPlatformInternal: () => import_chunk_JZSNWHCJ.getBinaryTargetForCurrentPlatformInternal,
  getPlatformInfo: () => import_chunk_JZSNWHCJ.getPlatformInfo,
  getPlatformInfoMemoized: () => import_chunk_JZSNWHCJ.getPlatformInfoMemoized,
  getSSLVersion: () => import_chunk_JZSNWHCJ.getSSLVersion,
  getos: () => import_chunk_JZSNWHCJ.getos,
  parseDistro: () => import_chunk_JZSNWHCJ.parseDistro,
  parseLibSSLVersion: () => import_chunk_JZSNWHCJ.parseLibSSLVersion,
  parseOpenSSLVersion: () => import_chunk_JZSNWHCJ.parseOpenSSLVersion,
  resolveDistro: () => import_chunk_JZSNWHCJ.resolveDistro
});
module.exports = __toCommonJS(getPlatform_exports);
var import_chunk_JZSNWHCJ = require("./chunk-JZSNWHCJ.js");
var import_chunk_FWMN4WME = require("./chunk-FWMN4WME.js");
var import_chunk_YVXCXD3A = require("./chunk-YVXCXD3A.js");
var import_chunk_2ESYSVXG = require("./chunk-2ESYSVXG.js");
