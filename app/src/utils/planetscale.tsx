import mysql from "mysql2/promise";

const databaseUrl = process.env.DATABASE_URL!;

export const insertABIIntoDB = async (gateId: number, abiString: string) => {
  const dbConnection = await mysql.createConnection(databaseUrl);
  await dbConnection.connect();
  await dbConnection.query("INSERT INTO contract_abi (id, abi) VALUES (?,?)", [
    gateId.toString(),
    abiString,
  ]);
};

export const queryABIFromDB = async (gateId: number) => {
  const dbConnection = await mysql.createConnection(databaseUrl);
  await dbConnection.connect();
  const [row] = await dbConnection.query(
    "SELECT abi FROM contract_abi WHERE id = ?",
    [gateId.toString()]
  );
  return JSON.parse((row as any)[0].abi);
};
