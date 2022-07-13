import React, { Fragment,useState,useEffect, useLayoutEffect } from 'react';

const Bars = ( {array,sort,startSort,endSort,countingSortHandler,bucketSortHandler} ) => {

    const [arrayToSort,setArrayToSort] = useState([]);
    const [position,setPosition] = useState(null);
    const [radixDigitPosition,setRadixDigitPosition] = useState(null);

    const iterationDelay = 450;

    // Initialize array.
    useEffect( ()=>{
        setArrayToSort([...array]);
    },[array]);

    // Selection Sort.
    async function SelectionSort(arr) 
    {
        for(let i = 0; i < arr.length; i++){
            let min = i;
            for(let j = i+1; j < arr.length; j++) { // Finding the smallest number in the subarray
                setPosition( {i,j,min});
                await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
                if(arr[j] < arr[min])
                    min = j;
            }
            if (min !== i) { // Swapping the elements
                let temp = arr[i]; 
                arr[i] = arr[min];
                arr[min] = temp;
            }
        }
        setPosition(null); setArrayToSort(arr);
    }

    // Insertion Sort.
    async function InsertionSort(arr) 
    {
        for (let i = 1; i < arr.length; i++) { // Choosing the first element in our unsorted subarray 
            let current = arr[i]; 
            let j = i-1;  // The last element of our sorted subarray
            setPosition( {i,j});
            await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
            while ((j > -1) && (current < arr[j])){
                setPosition( {i,j});
                await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
                arr[j+1] = arr[j];
                j--;
            }
            arr[j+1] = current;
        }
        setPosition(null); setArrayToSort(arr);
    }

    // Bubble Sort.
    async function BubbleSort(arr)
    {
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < ( arr.length - i -1 ); j++){// Last i elements are already in place 
                setPosition( {i,j});
                await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
                if( arr[j] > arr[j+1]){ // Checking if the item at present iteration is greater than the next iteration if true swap.
                    setPosition( {i,j,min:j+1});
                    await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
                    let temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j+1] = temp
                }
          }
        }
        setPosition(null); setArrayToSort(arr);
    }

    // Merge Sort.
    const MergeSort = async (arr) =>{
        if( arr.length <= 1 ) return arr;
        const mid = Math.floor( arr.length / 2 );
        //Recursive calls
        const left = await MergeSort(arr.slice(0,mid));
        const right = await MergeSort(arr.slice(mid));
        return await Merge(left,right);
    }
    // Merge sort supportive sub array merge.
    const Merge = async (left,right) =>{
        const sortedArr = [];
        setPosition( {i: arrayToSort.findIndex(el => el===left[0] ),j: arrayToSort.findIndex(el => el===right[0] ) } );
        await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
        while( await left.length && await right.length ){
            if(left[0] < right[0] ) sortedArr.push(left.shift());
            else sortedArr.push(right.shift());
            setPosition( {i: arrayToSort.findIndex(el => el===left[0] ),j: arrayToSort.findIndex(el => el===right[0] ) } );
            await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
            setArrayToSort([...sortedArr,...left,...right]);
        }
        const combinedArray = [...sortedArr,...left,...right];
        if(combinedArray.length === arrayToSort.length ) setPosition(null); // Resets position on final sorted array.
        return combinedArray;
    }

    // Quick Sort.
    const QuickSort = async (arr,left,right) => {
        let index;
        if(arr.length > 1){
            index = await Partition(arr, left, right);
            setPosition( {i:left,j:right,min: position?.min});
            await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
            if(left < index - 1)
                await QuickSort(arr,left,index-1);
            if(index < right )
                await QuickSort(arr,index,right);
        }
        setPosition(null);
    }

    // Quick sort partition func.
    const Partition = async (arr,left,right)=>{
        let pivot = arr[Math.floor( (left+right) / 2 )], i = left, j = right;
        while( i <= j ){
            setPosition( {i,j,min:Math.floor( (left+right) / 2 )});
            await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
            while( arr[i] < pivot ){
                setPosition( {i,j,min:Math.floor( (left+right) / 2 )});
                await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
                i++;
            }
            while( arr[j] > pivot ){
                setPosition( {i,j,min:Math.floor( (left+right) / 2 )});
                await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
                j--;
            } 
            if( i <= j ){
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                setPosition( {i,j,min:Math.floor( (left+right) / 2 )});
                await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
                i++; j--;
            }
        }
        return i;
    }

    // Counting Sort.
    const CountingSort = async(arr)=> {
        let count = [0,0,0,0,0,0,0,0,0,0], j = 0;
        for(let i = 0; i < arr.length; i++){
            setPosition( {i});
            await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay+100));
            count[arr[i]]++;
            countingSortHandler(count,arr[i],false);
        }
        for(let i = 0; i < arr.length; i++){
            setPosition( {i});
            await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay+100));
            while( count[i] > 0 ){
                arr[j] = i; j++; count[i]--;
                countingSortHandler(count,i,false);
            }
        }
        setPosition(null); countingSortHandler([],0,true);
    }

    // Bucket Sort.
    const BucketSort = async (arr) => {
        let bucket = [];
        for(let i = 0; i < 10; i++) bucket[i] = [];

        for(let i = 0; i < arr.length; i++){
            let bucketIndex = Math.floor(arr[i] * arr.length);
            bucket[bucketIndex].push(arr[i]);
            setPosition( {i});
            await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
            bucketSortHandler(bucket,bucketIndex,false);
        }
        setPosition(null);
        for(let i = 0; i < 10; i++){
            bucket[i].sort();
            bucketSortHandler(bucket,i,false);
            await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
        }
        let index = 0;
        for(let i = 0; i < arr.length; i++)
            for(let j = 0, size=bucket[i].length; j < size; j++){
                arr[index++] = bucket[i][j];
                setPosition( {i});
                await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
                bucketSortHandler(bucket,i,false);
            }
        setPosition(null); bucketSortHandler(bucket,null,true);
    }

    // Radix Sort.
    const RadixSort = async (arr) => {
        const maxDigitCount = 3; // Absolute choice of simulator.
        let digitPosition = ['Units','Tens','Hundreds','Thousands'], pos = 0;
        for(let k = 0; k < maxDigitCount; k++){
            setRadixDigitPosition( digitPosition[pos] ); pos++;
            let digitBuckets = Array.from( {length: 10}, ()=> [] );
            for(let i = 0; i < arr.length; i++){
                let digit = GetDigit(arr[i],k);
                digitBuckets[digit].push(arr[i]);
                setPosition( {i});
                await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
            }
            let index = 0;
            for(let n = 0; n < 10 ; n++)
                for(let m = 0; m < digitBuckets[n].length; m++){
                    arr[index] = digitBuckets[n][m];
                    index++;
                    setPosition( {j:index-1});
                    await new Promise((resolve) => setTimeout(() => { resolve(); }, iterationDelay));
                    setArrayToSort(arr);
                }
        }
        setArrayToSort(arr); setPosition(null); setRadixDigitPosition(null);
    }

    const GetDigit = (num,place) => {
        return Math.floor(Math.abs(num) / Math.pow(10,place)) % 10;
    }

    // Selects which sorting function will be implemented and visually updates.
    useLayoutEffect( ()=>{
        if( startSort && arrayToSort.length > 0 )
            switch(sort){
                case 'Selection': SelectionSort(arrayToSort); break;
                case 'Insertion': InsertionSort(arrayToSort); break;
                case 'Bubble': BubbleSort(arrayToSort); break;
                case 'Merge': MergeSort([...arrayToSort]); break;
                case 'Quick': QuickSort(arrayToSort,0,arrayToSort.length - 1); break;
                // case 'Heap': 
                case 'Counting': CountingSort(arrayToSort); break;
                case 'Bucket': BucketSort(arrayToSort); break;
                case 'Radix': RadixSort(arrayToSort); break;
                default: break;
            }
        endSort();
    }, [startSort,sort,arrayToSort,endSort]);

    return (
        <Fragment>
            {arrayToSort?.map( (value,i)=> { return <div className='bars' key={i}>
                <div style={{height: (sort==='Radix' ? (value/10)+'%' : ((sort==='Counting' ? (value*10)+'%' : ((sort==='Bucket' ? (value*100)+'%' : value+'%'))))) ,
                backgroundColor: (position?.i===i ? 'green' : null) || (position?.j===i ? 'darkorange' : null) ||  (position?.min===i ? 'red' : null)
                }}>{value}</div>
            </div>})}
            {sort === 'Radix' ? <p className='radix-position'>{radixDigitPosition ? 'Sort by:' : null} {radixDigitPosition}</p> : null}
        </Fragment>
    );
};

export default Bars;