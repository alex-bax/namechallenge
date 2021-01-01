import './ResultTable.css';

var ResultTable = (props) => {
    return (
        <div className="content" >
            {/* <h2>Accepted cities entered</h2> */}
            <div class="columns">
                <ul className={"table"} >
                    {props.cities.map(city =>
                        <li key={city.id} className="item">
                            {city.replace(city.charAt(0), city.charAt(0).toUpperCase())}  
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default ResultTable;