import axios, { AxiosPromise } from "axios"

export type Payment = {
    id : number,
    country: string,
    currency: string,
    date : string,
    orderId : string,
    taxCode: number,
    taxRate : number, 
    type: string,
    amount: number
}

export const getAllCountries = ()  => {
    const countryRequest:AxiosPromise<string[]> = axios({
        url : "http://localhost:8080/api/country",
        method: "GET",
        headers : {"Accept" : "application/json"}
    });

    return countryRequest;
}

export const getAllPayments = () => {
    return axios({
        url : "http://localhost:8080/api/payment",
        method: "GET",
        headers : {"Accept" : "application/json"}
    })
}

export const getAllPaymentsForCountry = (country: string) => {
    return axios({
        url : "http://localhost:8080/api/payment?country=" + country,
        method: "GET",
        headers : {"Accept" : "application/json"}
    })
}

export const addNewPayment = (payment:Payment) => {
    return axios({
        url : "http://localhost:8080/api/payment",
        method: "POST",
        headers : {"Accept" : "application/json", "Content-Type" : "application/json"},
        data: payment
    })
}