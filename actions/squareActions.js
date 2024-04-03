import { Client } from "square";
import mysql from "mysql2/promise";
import { randomUUID } from "crypto";

export const { paymentsApi, customersApi, cardsApi, subscriptionsApi } =
    new Client({
        accessToken: process.env.SQUARE_ACCESS_TOKEN,
        environment: "sandbox",
    });

BigInt.prototype.toJSON = function () {
    return this.toString();
};

export const submitFirstTimePayment = async (sourceId, amount, addCard) => {
    try {
        const { result } = await paymentsApi.createPayment({
            idempotencyKey: randomUUID(),
            sourceId,
            amountMoney: {
                currency: "USD",
                amount: 100 * amount,
            },
        });
        console.log(result.payment.cardDetails.card);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const createSquareCustomer = async (userInfo, customerId) => {
    try {
        const response = await customersApi.createCustomer({
            idempotencyKey: randomUUID(),
            givenName: userInfo.firstName,
            familyName: userInfo.lastName,
            emailAddress: userInfo.email,
            address: {
                addressLine1: userInfo.addressFirst,
                addressLine2: userInfo.addressSecond
                    ? userInfo.addressSecond
                    : null,
                administrativeDistrictLevel1: userInfo.state,
                postalCode: userInfo.zipCode,
                country: "US",
            },
            referenceId: String(customerId),
            note: "New Customer added.",
        });
        console.log("Created square customer : ", response.result);
        const custId = response.result.customer.id;
        const accId = response.result.customer.referenceId;
        const res = await addCustomerToDB(custId, accId);
    } catch (error) {
        console.log(error);
    }
};

export const addCard = async (custId, sourceId, cardInfo) => {
    const { result } = await cardsApi.createCard({
        idempotencyKey: randomUUID(),
        sourceId: sourceId,
        card: { ...cardInfo.card, customerId: custId },
    });
    console.log(result);
};

export const addSubscription = async (plan) => {
    // Check if client has card
    let card = cardsApi.retrieveCard();
    console.log("Plan to be added : ", plan);
};

export const addNewCard = async (sourceId) => {
    try {
        const { result } = await paymentsApi.createPayment({
            idempotencyKey: randomUUID(),
            sourceId,
            amountMoney: {
                currency: "USD",
                amount: 1,
            },
        });
        console.log(result.payment.cardDetails.card);
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const addCustomerToDB = async (custId, accId) => {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOSTNAME,
            database: process.env.DB,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });
        const query =
            "UPDATE Accounts SET customer_Id = '" +
            custId +
            "' where Account_Id = " +
            accId;
        const result = await db.execute(query);
        console.log(" Updated database with customer id.");
    } catch (error) {
        console.log("Error in adding customer to Database", error);
    }
};
