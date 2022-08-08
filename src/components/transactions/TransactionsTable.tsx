import './TransactionsTable.css';
import TableRow from "./TableRow";
import { getAllCountries, getAllPayments, getAllPaymentsForCountry, Payment } from '../../data/restFunctions';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PaymentsStoreType, replaceCountries } from '../../store/store';

const TransactionsTable  = () => {

    const [loading, setLoading] = useState(true);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [countries, setCountries] = useState<string[]>([]);
    
    const navigate = useNavigate();
    //const history = useHistory();

    const [searchParams, setSearchParams] = useSearchParams();
    const country = searchParams.get("country");
    const [selectedCountry, setSelectedCountry] = useState(country != null ? country : "");

    const countriesFromRedux : string[] = 
        useSelector<PaymentsStoreType, string[]>(reduxStore => reduxStore.countries  );

    const dispatch = useDispatch();

    useEffect( () =>{
        if(countriesFromRedux.length > 0) {
            console.log("using redux countries")
            setCountries(countriesFromRedux);
            setLoading(false);
        }
        else {
            console.log("getting countries from server")
            const countriesPromise = getAllCountries();
            countriesPromise.then ( result => {
                //should check status is 200 and implement the .error function
                setCountries(result.data);
                dispatch(replaceCountries(result.data));
                setLoading(false);
            });
        }
    } , [] );

    const loadDataForCountry =(country : string) => {
        const paymentsPromise = getAllPaymentsForCountry(country);
        paymentsPromise.then ( result => {
        //should check status is 200 and implement the .error function
        setPayments(result.data);
        setLoading(false);
        });
    }

    useEffect( () => {
        if (country != null) {
            loadDataForCountry(country);
        }
    }, []  )

    const changeCountry = (event: ChangeEvent<HTMLSelectElement>) => {
        const index = event.currentTarget.selectedIndex;
        const country = countries[index-1];
        setSelectedCountry(country);
        //navigate("/find?country=" + country);
        setSearchParams({"country" : country});
        loadDataForCountry(country);
    };
   

    return (
        <Fragment>
            <h1>Find a transaction</h1>
            {!loading && <select onChange={changeCountry} value={selectedCountry}>
                <option value="" >---select---</option>
                {countries.map( country => <option key={country}  value={country}>{country}</option>)}
                )
            </select>}
        <table className="transactionsTable">
            <thead>
            <tr><th>Id</th><th>OrderId</th><th>Date</th><th>Country</th>
            <th>Currency</th><th>Amount</th></tr>
            </thead>
            <tbody>
                {payments.map (payment =>
                    <TableRow key={payment.id} 
                    id={payment.id} date={payment.date} 
                    country={payment.country} orderId={payment.orderId}
                    currency={payment.currency} amount={payment.amount} />
                     )}
            </tbody>
        </table>
        {loading && <p>Please wait... loading</p>}
        </Fragment>
    )
}

export default TransactionsTable;