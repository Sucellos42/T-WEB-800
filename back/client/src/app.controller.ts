import {Body, Controller, Get, Inject, Param, Post} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {Observable} from "rxjs";

@Controller("events")
export class AppController {
  constructor(@Inject("EVENTS_SERVICE") private client: ClientProxy) {}

  @Get("/bycity/:city")
  getAllEvents(@Param("city") city: string): Observable<any> {
    return this.client.send({ cmd: "get_events" }, city);
  }
  @Get("/bytype/:type")
  getAllEventsByType(@Param("type") type: string): Observable<any> {
    let typeArray = type.split(":");
    console.log(typeArray);
    return this.client.send({ cmd: "get_events_by_type" }, typeArray);
  }

  @Get("/bycoordinates/:latitudea/:latitudeb/:longitudea/:longitudeb")
  getAllEventsByCoordinates(
    @Param("latitudea") latitudea: string,
    @Param("latitudeb") latitudeb: string,
    @Param("longitudea") longitudea: string,
    @Param("longitudeb") longitudeb: string
  ): Observable<any> {
    return this.client.send({ cmd: "get_events_by_coordinates" }, [
      latitudea,
      latitudeb,
      longitudea,
      longitudeb,
    ]);
  }
  @Post("/bycityandtype/:city")
  getAllEventsByCityAndType(
    @Param('city') city: string,
    @Body('types') types: string[]
  ): Observable<any> {
    console.log(types); // 'types' est directement un tableau depuis le corps de la requête
    return this.client.send({ cmd: "get_events_by_city_and_type" }, { city, types });
  }

  @Get("/getcity")
  getCity(): Observable<any> {
    return this.client.send({ cmd: "get_city" }, "");
  }
}
