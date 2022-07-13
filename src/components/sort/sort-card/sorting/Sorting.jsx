import { useState,useEffect, Fragment } from "react";

import './sorting.scss';
import {BsQuestionOctagon} from 'react-icons/bs';

import VisualSort from "./visual-sort/VisualSort";

const Sorting = ( {title} ) => {

    const [array,setArray] = useState([]);
    const [infoBubble,setInfoBubble] = useState(false);
    const [startSort,setStartSort] = useState(false);
    const arrayLength = 15, arrayRange = 100;

    useEffect( ()=>{
        const randomArray = [];
        switch( title ){
            case 'Bucket':
                for(let i = 0; i < 10; i++ )
                    randomArray.push( parseFloat(Math.random().toFixed(2)) ); break;
            case 'Radix':
                for(let i = 0; i < 10; i++ )
                    randomArray.push( Math.floor(900 * Math.random() + 100) ); break;
            case 'Counting':
                for(let i = 0; i < 10; i++ )
                    randomArray.push( Math.floor( 10 * Math.random() ) ); break;
            default:
                for(let i = 0; i < arrayLength; i ++)
                    randomArray.push( Math.floor(Math.random()*arrayRange)); break;
        }
        setArray(randomArray);
    },[title]);

    /**
     * Takes the input string and builds an array of numbers.
     * @param {Input} event 
     */
    const onUserArrayInputHandler = (event)=>{ 
        const inputArray = event.target.value.split(',');
        for(let i = inputArray.length - 1; i >= 0 ; i--){
            if(inputArray[i] === '' || !/^\d+(\.\d+)?$/.test(inputArray[i])) // Checks if 0-9 or , have been entered.
                inputArray.splice(i,1);
        }
        if( title === 'Counting'){
            for(let i = 0; i < inputArray.length ; i++){
                inputArray[i] = parseInt(inputArray[i]);
                if( parseInt(inputArray[i]) > 10 ){ inputArray.splice(i,1); i=0;}
            }
        }
        if( title === 'Bucket' ){
            for(let i = 0; i < inputArray.length ; i++){
                if( parseFloat(inputArray[i]) > 1 || (inputArray[i] + '').length > 4) {inputArray.splice(i,1); i=0;}
            }
        }
        if( title === 'Radix' ){
            for(let i = 0; i < inputArray.length ; i++){
                inputArray[i] = parseInt(inputArray[i]);
                if( (inputArray[i] + '').length > 3 ) { inputArray.splice(i,1); i=0;}
            }
        }
        setArray(inputArray);
    }

    /**
     * Creates a random array within range of: arrayRange.
     */
    const onRandomArrayHandler = () => {
        if(startSort) return;
        const randomArray = [];
        if( title === 'Radix' ){
            for(let i = 0; i < 10; i++ )
                randomArray.push( Math.floor(900 * Math.random() + 100) );
            return setArray(randomArray);
        }
        if( title === 'Counting' ){
            for(let i = 0; i < 10; i++ )
                randomArray.push( Math.floor( 10 * Math.random() ) );
            return setArray(randomArray);
        }
        if( title === 'Bucket' ){
            for(let i = 0; i < 10; i++ )
                randomArray.push( Math.random().toFixed(2) );
            return setArray(randomArray);
        }
        for(let i = 0; i < arrayLength; i++ )
            randomArray.push( Math.floor(Math.random()*arrayRange + 5) );
        setArray(randomArray);
    }
    
    /**
     * Creates a 75% random sorted array.
     */
    const onAlmostSortedHandler = () => {
        if(startSort) return;
        if( title === 'Radix' ){
            const almostSorted = [200,300,400,500,550,600,650,700,705,800];
            for(let i = 0; i < almostSorted.length/4 ; i++ )
                almostSorted[ Math.floor( Math.random()*10 ) ] = Math.floor(900 * Math.random() + 100);
            return setArray(almostSorted);
        }
        if( title === 'Bucket' ){
            const almostSorted = [0.1,0.2,0.3,0.35,0.45,0.6,0.65,0.7,0.8,0.9];
            for(let i = 0; i < almostSorted.length/4 ; i++ )
                almostSorted[ Math.floor( Math.random()*10 ) ] = Math.random().toFixed(2);
            return setArray( almostSorted );
        }
        if( title === 'Counting' ){
            const almostSorted = [1,1,2,3,4,5,6,7,7,8,9];
            for(let i = 0; i < almostSorted.length/4 ; i++ )
                almostSorted[ Math.floor( Math.random()*10 ) ] = Math.floor( 10 * Math.random() );
            return setArray( almostSorted );
        }
        const almostSorted = [20,30,40,50,55,60,65,70,75,80,85,90,95,99,100];
        for(let i = 0; i < almostSorted.length/4 ; i++ )
            almostSorted[ Math.floor( Math.random()*15 ) ] = Math.floor(Math.random() * 50 + 5 );
        setArray(almostSorted);
    }
    const onSortedHandler = () => { // Sorted array.
        if(startSort) return;
        if( title === 'Radix' )
            return setArray( [100,150,200,250,300,350,400,450,500,550] );
        if( title === 'Bucket' )
            return setArray( [0.1,0.2,0.3,0.35,0.45,0.6,0.65,0.7,0.8,0.9] );
        if( title === 'Counting' )
            return setArray( [1,1,2,3,4,5,6,7,7,8,9] );
        setArray( [20,30,40,50,55,60,65,70,75,80,85,90,95,99,100] );
    }
    const onDuplicateHandler = () => { // Static duplicated array.
        if(startSort) return;
        if( title === 'Radix' )
            return setArray( [500,500,500,500,500,500,500,500,500,500] );
        if( title === 'Bucket' )
            return setArray( [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5] );
        if( title === 'Counting' )
            return setArray( [5,5,5,5,5,5,5,5,5,5] );
        setArray( [75,75,75,75,75,75,75,75,75,75,75,75,75,75] ); 
    }

    const infoBubbleHandler = () => setInfoBubble(true);
    const infoBubbleCloseHandler = () => setInfoBubble(false);

    const startSortHandler = () => setStartSort(true);
    const endSortHandler = () => setStartSort(false);

    return (
        <Fragment>
            <VisualSort sort={title} array={array} startSort={startSort} endSort={endSortHandler}/>
            <div className="sorting-container">
                <div className="input-array-container">
                    <label>Enter Array: </label><input type='text' placeholder="Example: 3,5,8,7,11,13" disabled={startSort} onChange={onUserArrayInputHandler}/>
                    <span><BsQuestionOctagon className="input-info-icon" onMouseOver={infoBubbleHandler} onMouseLeave={infoBubbleCloseHandler}/>
                            {infoBubble && 
                                <div className="info-bubble">
                                    <p>Creates an array of your choice.<br/>
                                    - Limit your array to 20 otherwise only first 20 will be included.<br/>
                                    - Limit your numbers to ( 0 ~ 100 ) otherwise the number will be ignored.<br />
                                    - Upon invalid input the specific input will be removed/ignored.</p>
                                </div> }
                    </span>
                </div>
                <div className="button-container">
                    <button onClick={onRandomArrayHandler}>Random Array</button>
                    <button onClick={onAlmostSortedHandler}>Almost Sorted</button>
                    <button onClick={onSortedHandler}>Sorted</button>
                    <button onClick={onDuplicateHandler}>Duplicated Array</button>
                </div>
                <button className="sort-button" onClick={startSortHandler}>S o r t</button>
            </div>
        </Fragment>
    )
}

export default Sorting;