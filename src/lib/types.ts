import type { RowDataPacket } from "mysql2"

export interface Utenti extends RowDataPacket {
    id_utente: number,
    username: string,
    password: string
}
