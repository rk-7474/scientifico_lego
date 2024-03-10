import mysql from 'mysql2/promise';

const pool = mysql.createPool("mysql://root:@localhost:3306/space4art");
const formatRow = (data) => {
  let string = "set ", array = [];
  for (const [key, value] of Object.entries(data)) {
    string += `\`${key}\` = ?, `;
    array.push(value);
  }
  return [string.slice(0, -2), array];
};

export { formatRow as f, pool as p };
//# sourceMappingURL=db-aQqvt4qL.js.map
