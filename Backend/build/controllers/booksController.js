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
exports.updateBooks = exports.deleteBooks = exports.createBooks = exports.getBooksById = exports.getBooks = void 0;
var db_1 = require("../../database/db");
//Get Method (all of them)
var getBooks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, author, publisher, genre, sql, conditions, values, rows, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.query, author = _a.author, publisher = _a.publisher, genre = _a.genre;
                sql = "\n                SELECT \n                books.id,\n                books.book_cover,\n                authors.name AS author,\n                books.genre,\n                books.publishing_year,\n                publishers.name AS publisher,\n                books.ISBN,\n                books.description\n            FROM books\n            JOIN authors ON books.author = authors.id\n            LEFT JOIN publishers ON books.publisher = publishers.id\n        ";
                conditions = [];
                values = [];
                if (author) {
                    conditions.push("books.author = ?");
                    values.push(Number(author));
                }
                if (publisher) {
                    conditions.push("books.publisher = ?");
                    values.push(Number(publisher));
                }
                if (genre) {
                    conditions.push("books.genre = ?");
                    values.push(genre.toString());
                }
                if (conditions.length > 0) {
                    sql += " WHERE " + conditions.join(' AND ');
                }
                return [4 /*yield*/, db_1.default.execute(sql, values)];
            case 1:
                rows = (_b.sent())[0];
                res.status(200).json(rows);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.error(err_1);
                res.status(500).send('Error fetching books ' + err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBooks = getBooks;
//Get Method by Id
var getBooksById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, book, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, db_1.default.execute('SELECT * FROM books WHERE id = ?', [id])];
            case 1:
                book = _a.sent();
                res.status(200).json(book);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error(err_2);
                res.status(500).send('Error fetching Books ' + err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBooksById = getBooksById;
//Create Method
var createBooks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, book_cover, author, genre, publishing_year, publisher, ISBN, description, result, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, book_cover = _a.book_cover, author = _a.author, genre = _a.genre, publishing_year = _a.publishing_year, publisher = _a.publisher, ISBN = _a.ISBN, description = _a.description;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.execute("\n                INSERT INTO books (\n                name, \n                book_cover, \n                author, \n                genre, \n                publishing_year,\n                publisher, \n                ISBN, \n                description) \n                VALUES (?,?,?,?,?,?,?,?)", [
                        name,
                        book_cover || null,
                        author,
                        genre || null,
                        publishing_year || null,
                        publisher || null,
                        ISBN || null,
                        description || null
                    ])];
            case 2:
                result = (_b.sent())[0];
                console.log('Added book', result);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                console.error('Error executing query: ' + err_3);
                return [3 /*break*/, 4];
            case 4:
                res.status(200).send();
                return [2 /*return*/];
        }
    });
}); };
exports.createBooks = createBooks;
//Delete Method by id
var deleteBooks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.execute('DELETE FROM books WHERE id = ?', [id])];
            case 2:
                result = (_a.sent())[0];
                console.log('Deleted book', result);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                console.error('Error executing query: ' + err_4);
                return [3 /*break*/, 4];
            case 4:
                res.status(200).send();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteBooks = deleteBooks;
//Put Method by id
var updateBooks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, book_cover, author, genre, publishing_year, publisher, ISBN, description, result, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, book_cover = _a.book_cover, author = _a.author, genre = _a.genre, publishing_year = _a.publishing_year, publisher = _a.publisher, ISBN = _a.ISBN, description = _a.description;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.default.execute("\n                UPDATE books SET \n                name = ?, \n                book_cover = ?, \n                author = ?, \n                genre = ?, \n                publishing_year = ?, \n                publisher = ?, \n                ISBN = ?, \n                description = ? \n                WHERE id = ?", [
                        name,
                        book_cover,
                        author,
                        genre,
                        publishing_year,
                        publisher,
                        ISBN,
                        description,
                        id
                    ])];
            case 2:
                result = (_b.sent())[0];
                console.log('Updated book', result);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _b.sent();
                console.error('Error executing query: ' + err_5);
                return [3 /*break*/, 4];
            case 4:
                res.status(200).send();
                return [2 /*return*/];
        }
    });
}); };
exports.updateBooks = updateBooks;
