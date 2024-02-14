import mysql from "mysql2/promise";
export default async function Page(){
	const dbconnection = await mysql.createConnection({
		host: "ls-f28c4d40b4ecfab703abeee950909fe4e650a19c.c3i8ssyyouhq.us-east-2.rds.amazonaws.com",
		database: "dbmaster",
		port: 3306,
		user: "dbmasteruser",
		password: "Handymen"
	});
	try{
		const query = "SELECT State_Name, State_Code from US_States"
		const value = []
		const [results] = await dbconnection.execute(query, value)
		dbconnection.end();
		return (
			<p>
			{results.map(result => <div>{result.State_Name} | {result.State_Code}</div>)}
			</p>
		)
	} catch (Error){
		return <p>`error: ${Error.message}`</p>
		//return <p>`${Error}`</p>;
	}
	return <h3>`yo`</h3>;
}
