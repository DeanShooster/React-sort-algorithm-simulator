import { Fragment } from "react"
import Sorting from "./sorting/Sorting";

const SortCard = ( {title} ) => {
    return (
        <Fragment>
            <h3 className="sort-title">{title} Sort</h3>
            <div className="sort-card-container">
                <Sorting title={title}/>
            </div>
        </Fragment>
    )
}

export default SortCard;