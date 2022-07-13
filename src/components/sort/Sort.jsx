import { useState,Fragment,useEffect } from 'react';
import { NavLink, useLocation, Outlet } from 'react-router-dom';

import './sort.scss';

const Sort = () => {

    const [navToSortPage,setNavToShowPage] = useState(true);
    const sortPaths = [
        { sortPath:'/sort/selection', value: 'Selection'},
        { sortPath: '/sort/insertion', value: 'Insertion'},
        { sortPath: '/sort/bubble', value: 'Bubble'},
        { sortPath: '/sort/merge', value: 'Merge'},
        { sortPath: '/sort/quick', value: 'Quick'},
        { sortPath: '/sort/heap', value: 'Heap'},
        { sortPath: '/sort/counting', value: 'Counting'},
        { sortPath: '/sort/bucket', value: 'Bucket'},
        { sortPath: '/sort/radix', value: 'Radix'}
    ]   
    const {pathname} = useLocation();
    
    const navToSortPageHandler = (event) =>{
        if( event.target.tagName === 'A' )
            setNavToShowPage(false);
    };

    // Upon nested routes removes the 'Choose sort...' text
    useEffect( ()=>{
        if(pathname === '/sort')
            setNavToShowPage(true);
        else
            setNavToShowPage(false);
    },[pathname]);

    const activeLink = ( {isActive} ) =>{
        return isActive ? { color: 'rgb(236, 204, 75)',transform: 'scale(1.05)', textDecoration: 'underline'  } : null
    }

    return (
        <Fragment>
            <div className='sort-nav-container test' onClick={navToSortPageHandler}>
                {sortPaths.map( (sort)=> { return <NavLink to={sort.sortPath} style={activeLink} key={sort.value}>{sort.value}</NavLink> } )}
            </div>
            <Outlet />
            { navToSortPage &&  <div className='sort-welcome-message'>Please choose one of the sorting algorithms above.</div> }
        </Fragment>
    )
}

export default Sort;