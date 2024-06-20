import { PrismaClient, Room } from '@prisma/client';
import { IRoomsRepository } from './roomsInterfaces';

const prisma = new PrismaClient();

export class RoomsRepository implements IRoomsRepository {
    async createNewRoom(
        name: string,
        owner: string,
        type: string,
        password: string = '',
        maxPlayers: number = 10,
        isPublic: boolean = true
    ): Promise<Room> {
        try {
            const room = await prisma.room.create({
                data: {
                    name,
                    type,
                    password,
                    maxPlayers,
                    isPublic: isPublic,
                    owner: {
                        connect: { id: owner }
                    }
                }
            });
            return room;
        } catch (error) {
            console.error('Error creating room:', error);
            throw new Error('Could not create room');
        }
    }

    async getAllRoomsOwnedByOwner(ownerId: string): Promise<Room[]> {
        try {
            const roomList = await prisma.room.findMany({
                where: { ownerId }
            });
            return roomList;
        } catch (error) {
            console.error('Error fetching rooms:', error);
            throw new Error('Could not fetch rooms');
        }
    }

    async deleteRoomById(id: string): Promise<Room> {
        try {
            const deletedRoom = await prisma.room.delete({
                where: { id }
            });
            return deletedRoom;
        } catch (error) {
            console.error('Error deleting room:', error);
            throw new Error('Could not delete room');
        }
    }

    async updateRoomById(id: string, data: Partial<Room>): Promise<Room> {
        try {
            const updatedRoom = await prisma.room.update({
                where: { id },
                data
            });
            return updatedRoom;
        } catch (error) {
            console.error('Error updating room:', error);
            throw new Error('Could not update room');
        }
    }
}
