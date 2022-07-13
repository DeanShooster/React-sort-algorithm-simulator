import './sort-animation.scss';

import MovingBox from './moving-box/MovingBox';

const SortAnimation = () => {
    return (
        <div className='moving-box-container'>
            <MovingBox number={7} animation='sort-one'/>
            <MovingBox number={9} animation='sort-second'/>
            <MovingBox number={4} animation='sort-third'/>
            <MovingBox number={1} animation='sort-fourth'/>
        </div>
    )
}

export default SortAnimation;