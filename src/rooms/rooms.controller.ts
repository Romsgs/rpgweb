import { Request, Response } from 'express';
import { RoomsService } from './rooms.service';

export class RoomsController {
    private roomsService: RoomsService;

    constructor() {
        this.roomsService = new RoomsService();
    }

    async createRoom(req: Request, res: Response): Promise<void> {
        const { name, owner, type, password, maxPlayers, isPublic } = req.body;
        try {
            const newRoom = await this.roomsService.createRoom(name, owner, type, password, maxPlayers, isPublic);
            res.status(201).json(newRoom);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllRooms(req: Request, res: Response): Promise<void> {
        const { ownerId } = req.params;
        try {
            const rooms = await this.roomsService.getAllRoomsOwnedByOwner(ownerId);
            res.status(200).json(rooms);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteRoom(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const deletedRoom = await this.roomsService.deleteRoomById(id);
            res.status(200).json(deletedRoom);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateRoom(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedRoom = await this.roomsService.updateRoomById(id, data);
            res.status(200).json(updatedRoom);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}
