import mysql from "mysql2/promise";

export const pool = mysql.createPool("mysql://root:@localhost:3306/space4art");

export const formatRow = (data: any) => {
    let string = "set ", array = [];
    for (const [key, value] of Object.entries(data)) {
       string += `\`${key}\` = ?, `;
       array.push(value); 
    } 

    return [string.slice(0, -2), array];
}