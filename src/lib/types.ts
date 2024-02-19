import type { RowDataPacket } from "mysql2"

export interface Utenti extends RowDataPacket {
    id: number,
    username: string,
    password: string
}
