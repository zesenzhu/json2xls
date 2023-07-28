"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveApp = exports.appDirectory = void 0;
exports.appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(exports.appDirectory, relativePath);
exports.resolveApp = resolveApp;
