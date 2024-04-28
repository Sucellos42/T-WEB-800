import {Body, Controller, Get, Inject, Param, Post} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {Observable} from "rxjs";
import {
  ApiBody,
  ApiInternalServerErrorResponse, ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";

@ApiTags('Events')
@Controller("events")
export class AppController {
  constructor(@Inject("EVENTS_SERVICE") private client: ClientProxy) {}

  @Get("/bycity/:city")
  @ApiOperation({ description: "This endpoint allows you to retrieve all events for a given city. " +
        "It operates using the GET method. " +
        "You need to provide the city name in the URL.", summary: "Retrieve all events for a given city." })
  @ApiInternalServerErrorResponse({ description: 'Internal error. Please make sure that the microservice and the database are running.' })
  @ApiOkResponse({ description: 'Events retrieval successful.' })
  getAllEvents(@Param("city") city: string): Observable<any> {
    return this.client.send({ cmd: "get_events" }, city);
  }
  @Get("/bytype/:type")
  @ApiOperation({ description: "This endpoint allows you to retrieve all events of a given type. " +
        "It operates using the GET method. " +
        "You need to provide the event type in the URL.", summary: "Retrieve all events of a given type." })
  @ApiOkResponse({ description: 'Events retrieval successful.' })
  @ApiInternalServerErrorResponse({ description: 'Internal error. Please make sure that the microservice and the database are running.' })
  getAllEventsByType(@Param("type") type: string): Observable<any> {
    let typeArray = type.split(":");
    console.log(typeArray);
    return this.client.send({ cmd: "get_events_by_type" }, typeArray);
  }

  @Get("/bycoordinates/:latitudea/:latitudeb/:longitudea/:longitudeb")
  @ApiOperation({ description: "This endpoint allows you to retrieve all events between two pairs of coordinates. " +
            "It operates using the GET method. " +
            "You need to provide both pairs of coordinates in the URL.", summary: "Retrieve all events between two pairs of coordinates." })
  @ApiOkResponse({ description: 'Events retrieval successful..' })
  @ApiInternalServerErrorResponse({ description: 'Internal error. Please make sure that the microservice and the database are running.' })
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
  @ApiOperation({ description: "This endpoint allows you to retrieve all events for a given city and one or more specified types. " +
            "It operates using the POST method. " +
            "You need to provide the city name in the URL and the event type(s) in the request body.", summary: "Retrieve all events for a given city and one or more specified types." })
  @ApiBody({ description: "Event types to retrieve.", type: [String], schema: { example: ["CulturalSite", "Chapel"] } })
  @ApiOkResponse({ description: 'Events retrieval successful.' })
  @ApiInternalServerErrorResponse({ description: 'Internal error. Please make sure that the microservice and the database are running.' })
  getAllEventsByCityAndType(
    @Param('city') city: string,
    @Body('types') types: string[]
  ): Observable<any> {
    console.log(types); // 'types' est directement un tableau depuis le corps de la requête
    return this.client.send({ cmd: "get_events_by_city_and_type" }, { city, types });
  }

  @Get("/getcity")
  @ApiOperation({ description: "This endpoint allows you to retrieve all available cities for event retrieval. " +
                "It operates using the GET method. ", summary: "Retrieve the list of available cities." })
  @ApiOkResponse({ description: 'Events retrieval successful.' })
  @ApiInternalServerErrorResponse({ description: 'Internal error. Please make sure that the microservice and the database are running.' })
  getCity(): Observable<any> {
    return this.client.send({ cmd: "get_city" }, "");
  }
}
