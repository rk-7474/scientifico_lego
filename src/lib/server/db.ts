import mysql from "mysql2/promise";

export const pool = mysql.createPool("mysql://root:@localhost:3306/space4art");

export const formatRow = () => {
    
}