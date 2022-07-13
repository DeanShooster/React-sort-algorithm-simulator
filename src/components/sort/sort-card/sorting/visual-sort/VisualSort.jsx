import { Fragment, useEffect, useState } from 'react';

import './visual-sort.scss';

import Bars from './bars/Bars';

const VisualSort = ( {sort,array,startSort,endSort} ) => {

    const [arrayToSort,setArrayToSort] = useState(null);
    const [countingArray,setCountingArray] = useState( { arr: [0,0,0,0,0,0,0,0,0,0], i: null} );
    const [bucketArray,setBucketArray] = useState( { arr: [[],[],[],[],[],[],[],[],[],[]], i: null} );

    // Converts input array to float and handles invalid input.
    useEffect( ()=>{
        const tempArray = [];
        for(let i = 0; i < array.length && i < 20; i++){
            const number = parseFloat(array[i]);
            if( sort === 'Bucket' && ( number > 1 || number < 0) ) continue;
            if( number < 0 || (number > 100 && sort !== 'Radix') ) continue;
            tempArray.push( number );
        }
        setArrayToSort(tempArray);
    },[array,sort]);

    const countingSortHandler = ( arr,i,reset ) => {
        if( reset ) return setCountingArray( { arr: [0,0,0,0,0,0,0,0,0,0], i: null} );
        setCountingArray( {arr,i} );
    }

    const bucketSortHandler = (arr,i,reset) => {
        if( reset ) return setBucketArray({ arr: [[],[],[],[],[],[],[],[],[],[]], i: null});
        setBucketArray( {arr,i});
    }

    return (
        <Fragment>
            { arrayToSort != null &&
            <div className='bars-container'>
                <Bars array={arrayToSort} sort={sort} startSort={startSort} endSort={endSort} 
                countingSortHandler={countingSortHandler} bucketSortHandler={bucketSortHandler}/>
            </div>}
            { sort === 'Counting' ? <div className='counting-array'>
                {countingArray?.arr.map( (count,i)=> { 
                    return <div key={'count' + i} style={{backgroundColor: (countingArray.i === i ? 'darkorange' : null) }}>{count}</div>
                } ) }
            </div> : null }
            { sort === 'Bucket' ? <div className='bucket-array'>
                {bucketArray?.arr.map( (bucket,i)=>{
                    return <div key={'bucket'+i} style={{backgroundColor: (bucketArray.i === i ? 'darkorange' : null) }} className='bucket'>
                        {bucket.map( (num)=> { return <div key={'inner bucket'+i+' ' +num+Math.random()}>{num}</div> } )}
                    </div>
                })}
                </div> : null
            }
        </Fragment>
    )
}

export default VisualSort;