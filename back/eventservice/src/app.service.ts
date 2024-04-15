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


}

