import db from "../config/db.mjs";

const neededKeys = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "password",
    "username",
    "addressFirst",
    "addressSecond",
    "city",
    "state",
    "zipCode",
];

// Prepare account addition query
const query_First =
    "INSERT INTO Accounts (First_Name, Last_Name, Email, Phone_Number, Password, Address_Line1, Address_Line2, City, State, Postal_Code, Membership_Level ) VALUES ";

export const addUser = (data) => {
    var query_second = "( ";
    for (const [key, value] of Object.entries(data)) {
        if (neededKeys.includes(key)) {
            // if (key === "password" || key === "zipCode")
            //     query_second += String(value) + ", ";
            // Username not included - Delete code after username implementation in database
            query_second += "'" + String(value) + "', ";
        }
    }
    query_second = query_second.substring(0, query_second.length - 2) + " ,1 )";
    // query_second += " )";
    const query = query_First + query_second;
    return db.execute(query);
};