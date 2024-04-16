"use server";

import mysql from "mysql2/promise";
import { v4 } from "uuid";
import { client } from "@/components/Square/Client";
import { lateToolPayment, updateMembership } from "./actions";
// import { getCustomerByEmail } from "@/components/Square/Customer";

// Different APIs for Square functions
const {
    paymentsApi,
    customersApi,
    cardsApi,
    ordersApi,
    subscriptionsApi,
    catalogApi,
    refundsApi,
    giftCardsApi,
} = client;
BigInt.prototype.toJSON = function () {
    return this.toString();
};

const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    database: process.env.DB,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

export const addCardToFile = async (sourceId, custId) => {
    try {
        // Make temporary payment
        let uniqueCard = true;
        let payment = await paymentsApi.createPayment({
            idempotencyKey: v4(),
            sourceId,
            amountMoney: {
                amount: 100,
                currency: "USD",
            },
            customerId: custId,
        });
        let cardFingerprint =
            payment.result.payment.cardDetails.card.fingerprint;
        // If payment successful
        if (payment.result.payment.status == "COMPLETED") {
            // Refund payment
            const paymentId = payment.result.payment.id;
            let refund = await refundsApi.refundPayment({
                idempotencyKey: v4(),
                paymentId: paymentId,
                amountMoney: {
                    amount: 100,
                    currency: "USD",
                },
            });
            // console.log("Refund ID : ", refund.result.refund.id);
            // Add card
            let presentCards = await getCards(custId);
            presentCards = JSON.parse(presentCards);
            presentCards = presentCards.cards;
            // Check for duplicates
            if (presentCards) {
                presentCards.map((card) => {
                    if (cardFingerprint == card.fingerprint) {
                        uniqueCard = false;
                    }
                });
            }
            if (uniqueCard) {
                const cardId = await addCard(
                    custId,
                    paymentId,
                    payment.result.payment.cardDetails
                );
                console.log("Card has been added to file");
                return JSON.stringify({ status: 201, message: "Card added." });
            } else {
                console.log("Card is present on file");
                return JSON.stringify({
                    status: 200,
                    message: "Card present on file.",
                });
            }
            // console.log("Card ID : ", cardId);
        }
    } catch (error) {
        console.log("Error in adding card to file : ", error);
    }
};

export const deleteCardFromFile = async (cardId) => {
    try {
        await cardsApi.disableCard(cardId);
        return JSON.stringify({ status: 200 });
    } catch (error) {
        console.log("Error in desabling card : ", error);
    }
};

// Function to pay using just a credit card.
// -- params sourceID - tokenized card to use to create payment.
// -- returns the payment if successful, nothing if unsuccessful (as of yet).
export const submitPayment = async (sourceId, amt) => {
    try {
        const { result } = await paymentsApi.createPayment({
            idempotencyKey: v4(),
            sourceId,
            amountMoney: {
                currency: "USD",
                amount: 100 * amt,
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
export const subscribe = async (sourceId, planName, custId) => {
    let amount;
    let cardId;

    if (planName == "tinker" || planName == "Tinkerer") {
        amount = 25;
        planName = "tinker";
    } else if (planName == "macgyver" || planName == "MacGyver") {
        amount = 35;
        planName = "macgyver";
    } else if (planName == "builder" || planName == "Builder") {
        amount = 50;
        planName = "builder";
    } else if (planName == "contractor" || planName == "Contractor") {
        amount = 100;
        planName = "contractor";
    }

    try {
        // Create a payment
        // console.log("Token from payment source : ", sourceId);
        const { result } = await paymentsApi.createPayment({
            idempotencyKey: v4(),
            sourceId,
            amountMoney: {
                currency: "USD",
                amount: 100 * amount,
            },
        });
        console.log("Created payment");

        // Add card to customer file if addCard is true
        cardId = await addCard(
            custId,
            result.payment.id,
            result.payment.cardDetails.card
        );
        console.log("Card has been added to account. ");

        let plan = await getItemVariation(planName);
        // Get the plan id from the plan
        let planId = plan.id;
        // Create an order for the subscription
        let orderId = await createOrder(custId, planId);
        // Create a subscription
        let subscription = await addSubscription(
            cardId,
            process.env.SUBSCRIPTION_PLAN_ID,
            custId,
            orderId
        );
        // console.log("Subscription added : ", subscription.id);
        // Update membership in db table
        updateMembership(planName, custId);

        return JSON.stringify({ status: 200, subscription });
    } catch (error) {
        console.log("Error in subscribing : ", error);
        // return { error: "400" };
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

        console.log("Order has been created. ", result.order.id);
        return result.order.id;
    } catch (error) {
        console.log("Could not create order : ", error);
    }
};

// Function to add a subscription to the SEAC website
export const addSubscription = async (cardId, subPlanId, custId, orderId) => {
    try {
        const response = await client.subscriptionsApi.createSubscription({
            idempotencyKey: v4(),
            locationId: process.env.LOCATION_ID,
            planVariationId: subPlanId,
            customerId: custId,
            cardId: cardId,
            phases: [
                {
                    ordinal: 0,
                    orderTemplateId: orderId,
                },
            ],
        });

        // FEEDBACK
        console.log("Subscription added.");
        return response.result.subscription;
    } catch (error) {
        console.log("Could not add subscription : ", error);
    }

    // DEBUG
    // console.log(response);
    // console.log("Plan to be added : ", plan);
};

export const getSubPlanVar = async (name) => {
    try {
        // const res = await catalogApi.searchCatalogObjects();
        const attrValue = name + " subscription";
        const res = await client.catalogApi.searchCatalogObjects({
            objectTypes: ["SUBSCRIPTION_PLAN_VARIATION"],
            query: {
                exactQuery: {
                    attributeName: "name",
                    attributeValue: attrValue,
                },
            },
        });
        return res.result.objects[0];
    } catch (error) {
        console.log("Error getting Subscription Plan Variation: ", error);
    }
};

export const getItemVarId = async (name) => {
    try {
        const attrValue = name + " subscription";
        const response = await client.catalogApi.searchCatalogObjects({
            objectTypes: ["ITEM"],
            query: {
                exactQuery: {
                    attributeName: "name",
                    attributeValue: attrValue,
                },
            },
        });
        const itemVarId = response.result.objects[0].itemData.variations[0].id;
        return itemVarId;
    } catch (error) {
        console.log(error);
    }
};

export const swapPlan = async (subId, planVarId, orderId) => {
    try {
        const response = await subscriptionsApi.swapPlan(subId, {
            newPlanVariationId: planVarId,
            phases: [
                {
                    ordinal: 0,
                    orderTemplateId: orderId,
                },
            ],
        });
        console.log("Plan has been swapped");
        return response.result;
    } catch (error) {
        console.error("Could not swap plan : ", error);
    }
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
        console.log("Card added");
        // console.log("Payment card : ", result.payment.cardDetails.card);
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
    } catch (error) {
        console.log("Error in adding customer to Database", error);
    }

    // DEBUG
    // console.log(" Updated database with customer id.");
};

// Function to clean up in case of any error
export const removeCustomer = async () => {
    // Delete customer from database
    // Delete customer from square
    // Delete all orders from customer
    // Delete all subscriptions for user
};

export const retrieveCustomer = async (custId) => {
    try {
        const cust = await customersApi.retrieveCustomer(custId);
        return cust.result;
    } catch (error) {
        console.log("Could not find customer");
        return -1;
    }
};

export const refundLinkedPayment = async (amt, paymentId, custId) => {
    try {
        const { result } = await refundsApi.refundPayment({
            idempotencyKey: v4(),
            amountMoney: {
                amount: amt,
                currency: "USD",
            },
            unlinked: false,
            customerId: custId,
            paymentId: paymentId,
        });
        // console.log("Refunded the customer ", custId, " Amount ", amt);
    } catch (error) {
        console.log("Could not refund amount : ", error);
    }
};

export const getCards = async (custId) => {
    try {
        // Retrieve cards from api
        let cards = await cardsApi.listCards(undefined, custId);
        // console.log("Cards for customer are : ", cards.result);
        cards = cards.result;
        return JSON.stringify(cards);
        // Return in JSON format
    } catch (error) {
        console.log("Cannot get user cards : ", error);
    }
};

export const getSubscription = async (custId) => {
    const cus = custId;
    try {
        let subscription = await subscriptionsApi.searchSubscriptions({
            query: {
                filter: {
                    customerIds: [cus],
                },
            },
            include: ["actions"],
        });
        subscription = subscription.result.subscriptions[0];
        return JSON.stringify(subscription);
    } catch (error) {
        console.log("Error in getting subscription: ", error);
        // return JSON.stringify({ error });
    }
};

export const updateSubscription = async (custId, plan) => {
    console.log("Plan is : ", plan);
    console.log("Customer ID : ", custId);
    console.log(!plan);
    if (!plan) return;
    let res;
    let parse;
    try {
        // Get subscription ID
        let sub = await getSubscription(custId);
        sub = JSON.parse(sub);
        console.log("420sa -> Subscription ID : ", sub.id);
        const subId = sub.id;

        // New plan ID
        let planId = await getSubPlanVar(plan);
        planId = planId.id;
        let itemVarId = await getItemVarId(plan);
        let orderId = await createOrder(custId, itemVarId);
        let res = await swapPlan(subId, planId, orderId);
        // console.log(res.subscription);
        const act = res.actions[0];
        parse = {
            id: act.id,
            effectiveDate: act.effectiveDate,
            newPlanVariationId: act.newPlanVariationId,
        };
    } catch (error) {
        console.log("Could not update membership : ", error);
        // return JSON.stringify({ error });
    }
    console.log(parse);
    return parse;
};

export const cancelSubscription = async (custId) => {
    try {
        // Get subscriptin
        let sub = await getSubscription(custId);
        sub = JSON.parse(sub);
        console.log(sub);
        // Cancel subsctiption
        let res = await subscriptionsApi.cancelSubscription(sub.id);
        return res.result.subscription;
    } catch (error) {
        console.log("Could not cancel subscription: ", error);
    }
};

const changeDBMembership = async (custId, plan) => {
    const db = await mysql.createConnection({
        host: process.env.DB_HOSTNAME,
        database: process.env.DB,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });
    const level = getLevel(plan);
    try {
        const query =
            "UPDATE Accounts SET Membership_Level=" +
            level +
            " WHERE Customer_ID='" +
            custId +
            "';";
        const result = await db.execute(query);
        console.log("Membership updated in DB", result);
        db.commit();
        db.end();
        // return result[0].serverStatus == 2 ? userIdDb : -1;
    } catch (error) {
        console.log("Could not add user to databse : ", error);
    }
};

const getLevel = (plan) => {
    if (plan == "tinker") return 1;
    if (plan == "macgyver") return 2;
    if (plan == "builder") return 3;
    if (plan == "contractor") return 4;
};

// Make a cron job that runs makeLateFeePayment(cust) for all customers
export const cronJobLateFee = async () => {};

// Function to charge user's card for the an amount
export const makeLateFeePayment = async (custId, amt, transId) => {
    //          Get first user card
    let card = await getCards(custId);
    let cardId = JSON.parse(card).cards[0].id;
    let date = new Date();
    const order = await createTransOrder(custId, amt);
    let invoice = await createInvoice(order.id, custId, cardId, new Date());
    // make a late fee payment for that tool
    invoice = await publishInvoice(invoice.id, invoice.version);
    let invoiceNumber = invoice.invoiceNumber;
    // return invoice;
    // NEED SQL QUERY
    let query =
        `UPDATE Transactions INNER JOIN Accounts ON Transactions.Account_ID = Accounts.Account_ID INNER JOIN Tools ON Transactions.Tool_ID = Tools.Tool_ID INNER JOIN Transaction_Types ON Transactions.Transaction_Type = Transaction_Types.Transaction_Type SET Payment_Amount = Payment_Amount + ` +
        amt +
        ` WHERE Transactions.Transaction_ID = ` +
        transId;
    let query2 =
        `INSERT INTO Transaction_Payments VALUES (` +
        transId +
        `, ` +
        invoiceNumber +
        `, "` +
        invoice.publicUrl +
        `");`;

    const db = await pool.getConnection();
    try {
        // add payment amount in the transaction (UPDATE transaction)
        const rows = await db.execute(query);
        // add payment Id in the list of payment IDs for the transaction (UPDATE transaction_payments)
        const rows1 = await db.execute(query2);
        return { message: "Success" };
    } catch (error) {
        // console.error("Error making late fee payment db changes: ", error);
        console.error(error);
    } finally {
        db.release();
    }
};

export const createTransOrder = async (custId, amt) => {
    try {
        const { result } = await client.ordersApi.createOrder({
            order: {
                locationId: process.env.LOCATION_ID,
                customerId: custId,
                lineItems: [
                    {
                        quantity: "1",
                        itemType: "CUSTOM_AMOUNT",
                        basePriceMoney: {
                            amount: amt * 100,
                            currency: "USD",
                        },
                    },
                ],
                state: "OPEN",
            },
            idempotencyKey: v4(),
        });
        return result.order;
    } catch (error) {
        console.log("Could not create order : ", error);
    }
};

export const createInvoice = async (orderId, custId, cardId, date) => {
    let varnow = date;

    let month = varnow.getMonth() + 1;
    let day = varnow.getDate();
    if (month < 10) {
        month = "0" + String(month);
    }
    var date = varnow.getFullYear() + "-" + month + "-" + day;
    try {
        const response = await client.invoicesApi.createInvoice({
            invoice: {
                locationId: process.env.LOCATION_ID,
                orderId: orderId,
                primaryRecipient: {
                    customerId: custId,
                },
                paymentRequests: [
                    {
                        requestType: "BALANCE",
                        dueDate: date,
                        automaticPaymentSource: "CARD_ON_FILE",
                        cardId: cardId,
                    },
                ],
                deliveryMethod: "EMAIL",
                acceptedPaymentMethods: {
                    card: true,
                },
            },
            idempotencyKey: v4(),
        });

        // console.log(response.result);
        return response.result.invoice;
    } catch (error) {
        console.log(error);
    }
};
export const publishInvoice = async (invoiceId, version) => {
    try {
        const response = await client.invoicesApi.publishInvoice(invoiceId, {
            version: version,
            idempotencyKey: v4(),
        });
        const invoice = response.result.invoice;
        if (invoice.status == "PAID") {
            console.log("Amount has been paid ");
        }
        return invoice;
    } catch (error) {
        console.log(error);
    }
};

export const buyGiftCard = async (source, custToGift, amt) => {
    // If card on file,
    // Create gift card
    const gc = await createGiftCard();
    // Create order with custom amount
    const order = await createOrder(custId);
    // Load gift card
    // Create invoice
    // Publish invoice
    // If credit card
    // This should not be called
    // Make payment
};

export const createGiftCard = async () => {
    try {
        const response = await giftCardsApi.createGiftCard({
            idempotencyKey: v4(),
            locationId: process.env.LOCATION_ID,
            giftCard: {
                type: "DIGITAL",
                ganSource: "SQUARE",
            },
        });
        return response.result.giftCard;
        // console.log(response.result.giftCard);
    } catch (error) {
        console.error(error);
    }
};

// Activate gift card
// Source can be card token, or Card ID
export const activateGiftCard = async (gcId, gcGan, amt, source) => {
    try {
        const response =
            await client.giftCardActivitiesApi.createGiftCardActivity({
                idempotencyKey: v4(),
                giftCardActivity: {
                    type: "ACTIVATE",
                    locationId: process.env.LOCATION_ID,
                    giftCardId: gcId,
                    giftCardGan: gcGan,
                    activateActivityDetails: {
                        amountMoney: {
                            amount: amt * 100,
                            currency: "USD",
                        },
                        buyerPaymentInstrumentIds: [source],
                    },
                },
            });

        // console.log(response.result);
        console.log("Gift card activated.");
        return response.result.giftCardActivity;
    } catch (error) {
        console.log(error);
    }
};

export const getCustomerByEmail = async (email) => {
    let customer;
    try {
        const response = await customersApi.searchCustomers({
            query: {
                filter: {
                    emailAddress: {
                        exact: email,
                    },
                },
            },
        });
        if (response.result == {}) console.log("HERE", response.result);
        // console.log("Customer is : ", response.result.customers[0]);
        if (response.result.customers) {
            return response.result.customers[0];
        } else {
            return { error: "No account found" };
        }
    } catch (error) {
        console.log("Error : ", error);
        if (error.statusCode) console.log(error.statusCode);
        return { error: "No account found" };
    }
};

export const linkCustomerToGiftCard = async (gid, custId) => {
    try {
        const response = await giftCardsApi.linkCustomerToGiftCard(gid, {
            customerId: custId,
        });

        // console.log(response.result);
        return response.result.giftCard;
    } catch (error) {
        console.log(error);
    }
};

export const getGiftCards = async (type, state, limit, cursor, custId) => {
    try {
        const response = await giftCardsApi.listGiftCards(
            type,
            state,
            limit,
            cursor,
            custId
        );
        // console.log(response.result)
        return response.result.giftCards;
    } catch (error) {
        console.log(error);
    }
};
