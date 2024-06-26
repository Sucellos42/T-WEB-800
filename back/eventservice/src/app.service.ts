import { Injectable } from "@nestjs/common";
import { EventInterface } from "./interfaces/event.interface";
import * as mariadb from "mariadb";
import {environments} from "eslint-plugin-prettier";
import {ConfigService} from "@nestjs/config";


// const pool: mariadb.Pool = mariadb.createPool(config);
@Injectable()
export class AppService {
  private pool: mariadb.Pool;
  constructor(private readonly configService: ConfigService) {
    const mariaDbConfig: mariadb.PoolConfig = {
      host: this.configService.get<string>('MYSQL_HOST'),
      user: this.configService.get<string>('MYSQL_USER'),
      password: this.configService.get<string>('MYSQL_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DATABASE'),
      port: parseInt(this.configService.get<string>('MYSQL_PORT')),
      connectionLimit: 5,
    }

    this.pool = mariadb.createPool(mariaDbConfig);
  }
  async getEventsByCity(city: string): Promise<EventInterface[]> {
    let eventsByCity: EventInterface[] = [];

    try {
      const connection = await this.pool.getConnection();
      const result = await connection.query(
        "SELECT * FROM events_by_address WHERE city = ? LIMIT 50",
        [city]
      );
      connection.release();

      for (let i = 0; i < result.length; i++) {
        eventsByCity.push({
          id: i,
          identifier: result[i].identifier,
          label: result[i].label,
          description: result[i].description,
          address: result[i].address,
          city: result[i].city,
          longitude: result[i].longitude,
          latitude: result[i].latitude,
          event_type: result[i].event_type,
          photo_url: result[i].photo_url,
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
      const connection = await this.pool.getConnection();

      let query = "SELECT * FROM events_by_address WHERE ";
      const params: string[] = [];
      for (let i = 0; i < type.length; i++) {
        if (i > 0) {
          query += " OR ";
        }
        query += "event_type LIKE ?";
        params.push(`%${type[i]}%`);
      }
      const result = await this.pool.query(query, params);

      for (let i = 0; i < result.length; i++) {
        eventsByType.push({
          id: i,
          identifier: result[i].identifier,
          label: result[i].label,
          description: result[i].description,
          address: result[i].address,
          city: result[i].city,
          longitude: result[i].longitude,
          latitude: result[i].latitude,
          event_type: result[i].event_type,
          photo_url: result[i].photo_url,
        });
      }

      return eventsByType;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getEventsByCoordinates(
    coordinates: Array<string>
  ): Promise<EventInterface[]> {
    let eventsByCoordinates: EventInterface[] = [];

    try {
      const connection = await this.pool.getConnection();
      const result = await connection.query(
        "SELECT * FROM events_by_address WHERE latitude >= ? AND latitude <= ? AND longitude >= ? AND longitude <= ? LIMIT 50",
        coordinates
      );
      console.log(coordinates);
      connection.release();

      for (let i = 0; i < result.length; i++) {
        eventsByCoordinates.push({
          id: i,
          identifier: result[i].identifier,
          label: result[i].label,
          description: result[i].description,
          address: result[i].address,
          city: result[i].city,
          longitude: result[i].longitude,
          latitude: result[i].latitude,
          event_type: result[i].event_type,
          photo_url: result[i].photo_url,
        });
      }

      return eventsByCoordinates;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getEventsByCityAndType(
    city: string,
    types: Array<string>
  ): Promise<EventInterface[]> {
    let eventsByCityAndType: EventInterface[] = [];

    try {
      const connection = await this.pool.getConnection();
      console.log("passage 2");
      let query = "SELECT * FROM events_by_address WHERE city = ? AND ";
      const params: string[] = [city];
      for (let i = 0; i < types.length; i++) {
        if (i > 0) {
          query += " OR ";
        }
        query += "event_type LIKE ?";
        params.push(`%${types[i]}%`);
      }
      const result = await this.pool.query(query, params);

      for (let i = 0; i < result.length; i++) {
        eventsByCityAndType.push({
          id: i,
          identifier: result[i].identifier,
          label: result[i].label,
          description: result[i].description,
          address: result[i].address,
          city: result[i].city,
          longitude: result[i].longitude,
          latitude: result[i].latitude,
          event_type: result[i].event_type,
          photo_url: result[i].photo_url,
        });
      }

      return eventsByCityAndType;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getCity(): Promise<string[]> {
    let cities: string[] = [];

    try {
      const connection = await this.pool.getConnection();
      const result = await connection.query(
        "SELECT DISTINCT city FROM events_by_address order by city ASC;"
      );
      connection.release();

      for (let i = 0; i < result.length; i++) {
        cities.push(result[i].city);
      }

      return cities;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
