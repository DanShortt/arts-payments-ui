import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import TransactionsTable from "./TransactionsTable"


jest.mock("../../data/restFunctions", () => {
    return {
        getAllCountries : () => {
            console.log("mocked verison of getAllCountries has been run")
            return Promise.resolve( { status: 200, data : ["a", "b", "c"]   }) 
        }

    }
});

test("countries are loaded when component is rendered", async ()=>{
    render(<BrowserRouter><TransactionsTable /></BrowserRouter>);
    jest.setTimeout(2000);
    const options = await screen.findAllByRole("option");
    expect(options).toHaveLength(4);
});

test("The word orderId appears on screen" , () => {
    render(<BrowserRouter><TransactionsTable /></BrowserRouter>);
    const tableEntry = screen.queryByText("OrderId");
    expect(tableEntry).toBeInTheDocument();

} )