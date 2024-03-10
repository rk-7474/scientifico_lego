import type { Editors, Rooms } from "$lib/types";
import { pool } from "./db";

export const hasPerms = async (room_id: string, user_id: string | undefined) => {
    const [[room]] = await pool.execute<Rooms[]>('select user_id, id from rooms where uuid = ?', [room_id]);  

    if (room && room.user_id !== Number(user_id)) {
        const [editors] = await pool.execute<Editors[]>('select * from editors where room_id = ? AND user_id = ?', [room_id, user_id]);  
        if (editors.length === 0 || !editors.some((e) => e.user_id === user_id))
            return false;
    }

    return true;
}