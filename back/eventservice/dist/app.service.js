"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: '10.18.205.115',
    user: 'user',
    password: 'user',
    database: 'db_web'
});
let AppService = class AppService {
    async getEventsByCity(city) {
        let eventsByCity = [];
        try {
            const connection = await pool.getConnection();
            const result = await connection.query('SELECT * FROM events_by_address WHERE city = ? LIMIT 50', [city]);
            connection.release();
            for (let i = 0; i < result.length; i++) {
                eventsByCity.push({
                    id: result[i].id,
                    identifier: result[i].identifier,
                    label: result[i].label,
                    description: result[i].description,
                    address: result[i].address,
                    city: result[i].city,
                    longitude: result[i].longitude,
                    latitude: result[i].latitude,
                    event_type: result[i].event_type
                });
            }
            return eventsByCity;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map