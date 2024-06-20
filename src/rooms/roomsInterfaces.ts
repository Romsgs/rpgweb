import { Room } from "@prisma/client";
import { Request, Response } from 'express';

export interface IRoomsRepository {
    createNewRoom(
        name: string,
        owner: string,
        type: string,
        password?: string,
        maxPlayers?: number,
        isPublic?: boolean
    ): Promise<Room>;
    getAllRoomsOwnedByOwner(owner: string): Promise<Room[]>;
    deleteRoomById(id: string): Promise<Room>;
    updateRoomById(id: string, data: Partial<Room>): Promise<Room>;
}

export interface IRoomsController {
    createRoom(req: Request, res: Response): Promise<void>;
    getAllRooms(req: Request, res: Response): Promise<void>;
    deleteRoom(req: Request, res: Response): Promise<void>;
    updateRoom(req: Request, res: Response): Promise<void>;
}
