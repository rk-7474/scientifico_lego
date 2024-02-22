import type { RowDataPacket } from "mysql2"

export interface Utenti extends RowDataPacket {
    id: number,
    username: string,
    password: string
}

export interface Rooms extends RowDataPacket {
    id: number,
    name: string,
    description: string,
    state: 'public' | 'reserved' | 'private',
    user_id: number,
    uuid: string,
}