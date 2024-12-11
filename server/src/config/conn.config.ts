import mysql, {Pool} from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool: Pool;
try {
	pool = mysql.createPool( {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0
	} );
	console.log( 'Servidor iniciado com sucesso!' );

} catch ( error ) {
	console.error( error );
	process.exit( 1 );
}

export default pool;