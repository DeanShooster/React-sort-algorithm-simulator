

const MovingBox = ( {number,animation} ) => {
    return (
        <div className={`moving-box ${animation}`}>{number}</div>
    )
}

export default MovingBox;