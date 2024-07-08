import { useQuery } from '@tanstack/react-query';
import styles from './sidebar.module.css';
import { getCategory } from '../services/admin';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SideBar({setCategory}) {
  const { data, isLoading, error } = useQuery(["getCategory"], getCategory);
const [searchParams,setSearchParams]=useSearchParams();
  return (
    <div className={styles.sidebar}>
    <div>

      {
        data?.data.map(category=>{
           return <p onClick={()=>{setCategory(category._id)}} key={category._id}><img src={`${category.icon}.svg`} alt={category.icon}/>{category.name}</p>
        })
      }
      </div>

    </div>
  )
}

export default SideBar