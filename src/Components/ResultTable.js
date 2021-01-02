import './ResultTable.css';

var ResultTable = (props) => {
    return (
        <div className="content" >
            <div className="columns">
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