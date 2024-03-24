import mysql from "mysql2/promise";

export const pool = mysql.createPool("mysql://root:password@db:3306/space4art");

export const formatRow = (data: any) => {
    let string = "set ", array = [];
    for (const [key, value] of Object.entries(data)) {
       string += `\`${key}\` = ?, `;
       array.push(value); 
    } 

    return [string.slice(0, -2), array];
}

export const formatSearch = (query: string) => {

    const words = query.split(" ");

    let names = [], users = [], tags = []; 


    for (const word of words) {
        if (word == "") continue;
        else if (word.startsWith("#")) {
            tags.push(word.slice(1));            
        } else if (word.startsWith("@")) {
            users.push(word.slice(1));
        } else {
            names.push(word);
        }
    }
    
    let string = "", array = [];

    if (tags.length > 0 || names.length > 0) {
        string += "(";
    }

    for (const tag of tags) {
        string += `tags like ? AND `;
        array.push(`% ${tag} %`); 
    }

    for (const name of names) {
        string += `name like ? AND `;
        array.push(`%${name}%`); 
    } 

    if (tags.length > 0 || names.length > 0) {
        string = string.slice(0, -5) + ")";
    }

    if (users.length > 0) {
        string += " AND (";
        for (const user of users) {
            string += `owner like ? OR `;
            array.push(`%${user}%`); 
        } 
        string = string.slice(0, -4) + ")";
    }

    return [string, array];
}