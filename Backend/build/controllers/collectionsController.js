"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeBookFromCollection = exports.addBookToCollection = exports.deleteCollection = exports.getCollections = exports.createCollection = void 0;
var db_1 = require("../../database/db");
var createCollection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, name, existing, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                name = req.body.name;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.default.execute('SELECT * FROM books_collections WHERE user = ? AND name = ?', [userId, name])];
            case 2:
                existing = (_a.sent())[0];
                if (existing.length > 0) {
                    return [2 /*return*/, res.status(400).json({ message: 'Collection already exists' })];
                }
                return [4 /*yield*/, db_1.default.execute('INSERT INTO books_collections (user, name) VALUES (?, ?)', [userId, name])];
            case 3:
                _a.sent();
                res.status(201).json({ message: 'Collection created' });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                console.error(err_1);
                res.status(500).json({ message: 'Error creating collection' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createCollection = createCollection;
var getCollections = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, rows, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.execute('SELECT * FROM books_collections WHERE user = ?', [userId])];
            case 2:
                rows = (_a.sent())[0];
                res.json(rows);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(500).json({ message: 'Error fetching collections' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getCollections = getCollections;
var deleteCollection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, id, collections, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, db_1.default.execute('SELECT * FROM books_collections WHERE id = ? AND user = ?', [id, userId])];
            case 2:
                collections = (_a.sent())[0];
                if (collections.length === 0) {
                    return [2 /*return*/, res.status(404).json({ message: 'Collection not found or not yours' })];
                }
                return [4 /*yield*/, db_1.default.execute('DELETE FROM books_collections_books WHERE collection_id = ?', [id])];
            case 3:
                _a.sent();
                return [4 /*yield*/, db_1.default.execute('DELETE FROM books_collections WHERE id = ?', [id])];
            case 4:
                _a.sent();
                res.json({ message: 'Collection deleted' });
                return [3 /*break*/, 6];
            case 5:
                err_3 = _a.sent();
                res.status(500).json({ message: 'Error deleting collection' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteCollection = deleteCollection;
var addBookToCollection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, collectionId, bookId, collections, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.user.id;
                _a = req.body, collectionId = _a.collectionId, bookId = _a.bookId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.default.execute('SELECT * FROM books_collections WHERE id = ? AND user = ?', [collectionId, userId])];
            case 2:
                collections = (_b.sent())[0];
                if (collections.length === 0) {
                    return [2 /*return*/, res.status(403).json({ message: 'No access to this collection' })];
                }
                return [4 /*yield*/, db_1.default.execute('INSERT INTO books_collections_books (collection, book) VALUES (?, ?)', [collectionId, bookId])];
            case 3:
                _b.sent();
                res.status(201).json({ message: 'Book added to collection' });
                return [3 /*break*/, 5];
            case 4:
                err_4 = _b.sent();
                res.status(500).json({ message: 'Error adding book to collection' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addBookToCollection = addBookToCollection;
var removeBookFromCollection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, collectionId, bookId, collections, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.user.id;
                _a = req.body, collectionId = _a.collectionId, bookId = _a.bookId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, db_1.default.execute('SELECT * FROM books_collections WHERE id = ? AND user = ?', [collectionId, userId])];
            case 2:
                collections = (_b.sent())[0];
                if (collections.length === 0) {
                    return [2 /*return*/, res.status(403).json({ message: 'No access to this collection' })];
                }
                return [4 /*yield*/, db_1.default.execute('DELETE FROM \`books_collections-books\` WHERE collection = ? AND book = ?', [collectionId, bookId])];
            case 3:
                _b.sent();
                res.json({ message: 'Book removed from collection' });
                return [3 /*break*/, 5];
            case 4:
                err_5 = _b.sent();
                res.status(500).json({ message: 'Error removing book' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeBookFromCollection = removeBookFromCollection;
