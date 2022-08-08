import { Link } from 'react-router-dom';
import './PageHeader.css';

const PageHeader = () => {

    return(
        <div className="pageHeader">
            <h1><Link to="/"> Payments Application</Link></h1>
            <ul className="nav">
                <li><Link to="/find">Find a transaction</Link></li>
                <li><Link to="/new"> New transaction</Link></li>
            </ul>
        </div>

    );

};

export default PageHeader;