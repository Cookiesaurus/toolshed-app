"use server";

import mysql from "mysql2/promise";
import { v4 } from "uuid";
import { client } from "@/components/Square/Client";

// Different APIs for Square functions
const {
    paymentsApi,
    customersApi,
    cardsApi,
    ordersApi,
    subscriptionsApi,
    catalogApi,
} = client;
BigInt.prototype.toJSON = function () {
    return this.toString();
};

// Function to pay using just a credit card.
// -- Should not be in use as of yet.
// -- params sourceID - tokenized card to use to create payment.
// -- returns the payment if successful, nothing if unsuccessful (as of yet).
export const submitPayment = async (sourceId) => {
    try {
        const { result } = await paymentsApi.createPayment({
            idempotencyKey: v4(),
            sourceId,
            amountMoney: {
                currency: "USD",
                amount: 100,
            },
        });

        return result;
    } catch (error) {
        console.log("Error in submitting payment : ", error);
    }
    /* DEBUG
    console.log("Result payment: ", result.payment);
    console.log(
        "Result payment card details : ",
        result.payment.cardDetails.card
    );
    */
};

// Function to submit payment for the first time.
export const subscribe = async (
    sourceId,
    planName,
    addCardBool,
    custId
) => {
    let amount;
    let cardId;

    // Set amount according to the plan
    if (planName == "tinker") amount = 25;
    else if (planName == "macgyver") amount = 35;
    else if (planName == "builder") amount = 50;
    else if (planName == "contractor") amount = 100;

    try {
        // Create a payment
        const { result } = await paymentsApi.createPayment({
            idempotencyKey: v4(),
            sourceId,
            amountMoney: {
                currency: "USD",
                amount: 100 * amount,
            },
        });

        // Add card to customer file if addCard is true
        if (addCardBool) {
            cardId = await addCard(
                custId,
                result.payment.id,
                result.payment.cardDetails.card
            );
        }
        console.log("Card has been added to account. ");

        let plan = await getItemVariation(planName);
        // Get the plan id from the plan
        let planId = plan.id;
        // Create an order for the subscription
        let orderId = await createOrder(custId, planId);
        // Create a subscription
        let subscription = await addSubscription(
            cardId,
            planId,
            custId,
            orderId
        );

        return subscription.result;
    } catch (error) {
        console.log("Error in submitting payment : ", error);
    }
    // DEBUG
    // console.log("PROPS: amount - ", planName);
    // console.log("Source id is : ", sourceId);
    // console.log("Result payment: ", result.payment);
    // console.log(
    //     "Result payment card details : ",
    //     result.payment.cardDetails.card
    // );
};

// Function to create a new square customer
export const createSquareCustomer = async (userInfo, customerId) => {
    try {
        const response = await customersApi.createCustomer({
            idempotencyKey: v4(),
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
        // console.log("Created square customer : ", response.result);
        const custId = response.result.customer.id;
        const accId = response.result.customer.referenceId;
        await addCustomerToDB(custId, accId);
        return custId;
    } catch (error) {
        console.log("Unable to add square customer: ", error);
    }
};

// Function to add a card to a customer's file on square
export const addCard = async (custId, sourceId, cardInfo) => {
    const { result } = await cardsApi.createCard({
        idempotencyKey: v4(),
        sourceId: sourceId,
        card: { ...cardInfo.card, customerId: custId },
    });
    return result.card.id;

    // DEBUG
    // console.log("Card ", result.card.id, " has been added to account.");
};

// Function to create a new order for the subscription in square
export const createOrder = async (custId, planId) => {
    try {
        const { result } = await client.ordersApi.createOrder({
            order: {
                locationId: process.env.LOCATION_ID,
                customerId: custId,
                lineItems: [
                    {
                        quantity: "1",
                        catalogObjectId: planId,
                        itemType: "ITEM",
                    },
                ],
                state: "DRAFT",
            },
        });

        console.log("created object", response.result.order.id);
        return result.order.id;
    } catch (error) {
        console.log("Could not create order : ", error);
    }
};

// Function to add a subscription to the SEAC website
export const addSubscription = async (cardId, planId, custId, orderId) => {
    try {
        const response = await client.subscriptionsApi.createSubscription({
            idempotencyKey: v4(),
            locationId: process.env.LOCATION_ID,
            planVariationId: planId,
            customerId: custId,
            cardId: cardId,
            phases: [
                {
                    ordinal: 0,
                    orderTemplateId: orderId,
                },
            ],
        });

        console.log(response);
    } catch (error) {
        console.log("Could not add subscription : ", error);
    }

    // DEBUG
    // console.log("Plan to be added : ", plan);
};

// Function to retrieve the item variation for given plan name
export const getItemVariation = async (planName) => {
    let planId;
    try {
        const response = await client.catalogApi.searchCatalogObjects({
            objectTypes: ["ITEM_VARIATION"],
            query: {
                exactQuery: {
                    attributeName: "name",
                    attributeValue: planName,
                },
            },
        });
        planId = response.result.objects[0];
        return planId;
    } catch (error) {
        console.log("Could not retrieve plan variation : ", error);
    }

    // DEBUG
    // console.log("Plan variation object : ", response.result.objects[0])
    // console.log("Plan id for plan name ", planName, " is : ", planId);
};

// Function to add a new card to an account
export const addNewCard = async (sourceId) => {
    try {
        const { result } = await paymentsApi.createPayment({
            idempotencyKey: v4(),
            sourceId,
            amountMoney: {
                currency: "USD",
                amount: 1,
            },
        });
        console.log("Payment card : ", result.payment.cardDetails.card);
        return result;
    } catch (error) {
        console.log(error);
    }
};

// Function to add the square Customer ID to a SEAC Tool Shed database user's Account table
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

        // DEBUG
        // console.log(" Updated database with customer id.");
    } catch (error) {
        console.log("Error in adding customer to Database", error);
    }
};
