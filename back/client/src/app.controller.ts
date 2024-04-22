import {Controller, Get, Inject, Param} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('events')
export class AppController {
  constructor(@Inject('EVENTS_SERVICE') private client: ClientProxy) {}

  @Get('/bycity/:city')
  getAllEvents(@Param('city') city: string){
    return this.client.send({ cmd: 'get_events' } , city);
  }
  @Get('/bytype/:type')
  getAllEventsByType(@Param('type') type:string){
    let typeArray = type.split(':');
    console.log(typeArray);
    return this.client.send({ cmd: 'get_events_by_type' } , typeArray);
  }

  @Get('/bycoordinates/:longitudea/:latitudea/:longitudeb/:latitudeb')
    getAllEventsByCoordinates(@Param('longitudea') longitudea: string, @Param('latitudea') latitudea: string, @Param('longitudeb') longitudeb: string, @Param('latitudeb') latitudeb: string){
        return this.client.send({ cmd: 'get_events_by_coordinates' } , [longitudea, latitudea, longitudeb, latitudeb]);
    }
    @Get('/bycityandtype/:city/:type')
    getAllEventsByCityAndType(@Param('city') city: string, @Param('type') type:string){
        let typeArray = type.split(':');
        console.log(typeArray);
        return this.client.send({ cmd: 'get_events_by_city_and_type' } , [city, typeArray]);
    }

}
