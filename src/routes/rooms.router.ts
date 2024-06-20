import { Router } from 'express';
import { RoomsController } from '../rooms/rooms.controller';

const roomsRouter = Router();
const roomsController = new RoomsController();

roomsRouter.post('/', (req, res) => roomsController.createRoom(req, res));
roomsRouter.get('/:ownerId', (req, res) => roomsController.getAllRooms(req, res));
roomsRouter.delete('/:id', (req, res) => roomsController.deleteRoom(req, res));
roomsRouter.put('/:id', (req, res) => roomsController.updateRoom(req, res));

export default roomsRouter;
