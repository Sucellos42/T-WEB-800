// @ts-ignore

import { Injectable } from '@nestjs/common';
import { EventInterface } from './interfaces/event.interface';
import * as mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: '10.18.205.115',
  user: 'user',
  password: 'user',
  database: 'db_web'
});
@Injectable()
export class AppService {


    async getEventsByCity(city: string): Promise<EventInterface[]> {
        let eventsByCity: EventInterface[] = [];

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
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getEventsByType(type: Array<string>): Promise<EventInterface[]> {
        let eventsByType: EventInterface[] = [];

        try {
            const connection = await pool.getConnection();

            let query = 'SELECT * FROM events_by_address WHERE ';
            const params: string[] = [];
            for (let i = 0; i < type.length; i++) {
                if (i > 0) {
                    query += ' OR ';
                }
                query += 'event_type LIKE ?';
                params.push(`%${type[i]}%`);
            }
            const result = await pool.query(query, params);


            for (let i = 0; i < result.length; i++) {
                eventsByType.push({
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

            return eventsByType;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getEventsByCoordinates(coordinates: Array<string>): Promise<EventInterface[]> {
        let eventsByCoordinates: EventInterface[] = [];

        try {
            const connection = await pool.getConnection();
            const result = await connection.query('SELECT * FROM events_by_address WHERE latitude >= ? AND latitude <= ? AND longitude >= ? AND longitude <= ? LIMIT 50', coordinates);
            console.log(coordinates)
            connection.release();

            for (let i = 0; i < result.length; i++) {
                eventsByCoordinates.push({
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

            return eventsByCoordinates;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getEventsByCityAndType(city: string, type: Array<string>): Promise<EventInterface[]> {
        let eventsByCityAndType: EventInterface[] = [];

        try {
            const connection = await pool.getConnection();
            console.log("passage 2")
            let query = 'SELECT * FROM events_by_address WHERE city = ? AND ';
            const params: string[] = [city];
            for (let i = 0; i < type.length; i++) {
                if (i > 0) {
                    query += ' OR ';
                }
                query += 'event_type LIKE ?';
                params.push(`%${type[i]}%`);
            }
            const result = await pool.query(query, params);

            for (let i = 0; i < result.length; i++) {
                eventsByCityAndType.push({
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

            return eventsByCityAndType;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }




}

