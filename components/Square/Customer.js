import { Client } from "square";
const { customersApi } = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: "sandbox",
});

export const getCustomers = async () => {
    let customers;
    try {
        customers = await customersApi.listCustomers();
        customers = customers.result;
        return customers;
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

        console.log("Customer is : ", response.result.customers[0]);
    } catch (error) {
        console.log(error);
    }
};

