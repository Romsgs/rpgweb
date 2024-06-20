import { Room } from '@prisma/client';
import { RoomsRepository } from './rooms.repository';

export class RoomsService {
    private roomsRepository: RoomsRepository;

    constructor() {
        this.roomsRepository = new RoomsRepository();
    }

    async createRoom(
        name: string,
        owner: string,
        type: string,
        password: string,
        maxPlayers: number,
        isPublic: boolean
    ): Promise<Room> {
        try {
            return await this.roomsRepository.createNewRoom(name, owner, type, password, maxPlayers, isPublic);
        } catch (error) {
            console.error('Error creating room:', error);
            throw new Error('Could not create room');
        }
    }

    async getAllRoomsOwnedByOwner(ownerId: string): Promise<Room[]> {
        try {
            return await this.roomsRepository.getAllRoomsOwnedByOwner(ownerId);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            throw new Error('Could not fetch rooms');
        }
    }

    async deleteRoomById(id: string): Promise<Room> {
        try {
            return await this.roomsRepository.deleteRoomById(id);
        } catch (error) {
            console.error('Error deleting room:', error);
            throw new Error('Could not delete room');
        }
    }

    async updateRoomById(id: string, data: Partial<Room>): Promise<Room> {
        try {
            return await this.roomsRepository.updateRoomById(id, data);
        } catch (error) {
            console.error('Error updating room:', error);
            throw new Error('Could not update room');
        }
    }
}
