import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';

const Home = () => {
    const [hands, setHands] = useState([]);
    const [loading, setLoading] = useState([false]);
    useEffect(()=>{
        setLoading(true);
        axios
            .get('http://localhost:3000/handHistory')
            .then((res) =>{
                setHands(res.data.data);
                setLoading(false);
            })
            .catch((error)=>{
                console.log(error);
                setLoading(false);
            });
    },[]);
  return (
    <div className = 'p-4'>
        <div className = 'flex justify-between items-center'>
            <h1 className = 'text-3x1 my-8'>Hand List</h1>  
            <Link to = 'handHistory/addHands'>
                <MdOutlineAddBox className = 'text-sky-800 text-4x1'/>
            </Link>
        </div>
        {loading ? (
            <Spinner/>

        ):(
            <table className='w-full border-separate'>
                <thead>
                    <tr>
                        <th className = 'border border-slate-600 rounded-md'>Dealer Value</th>
                        <th className = 'border border-slate-600 rounded-md'>Player Hand</th>
                        <th className = 'border border-slate-600 rounded-md'>Action</th>
                        <th className = 'border border-slate-600 rounded-md'>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {hands.map((hand, index) => {
                        <tr key={hand._id} className = 'h-8'>
                            <td className = 'border border-slate-700 roudned-md text-center'>
                                {index +1}
                            </td>
                            <td className = 'border border-slate-700 roudned-md text-center'>
                                {hand.dealerHand}
                            </td>
                            <td className = 'border border-slate-700 roudned-md text-center'>
                                {hand.playerHand}
                            </td>
                            <td className = 'border border-slate-700 roudned-md text-center'>
                                {hand.action}
                            </td>
                            <td className = 'border border-slate-700 roudned-md text-center'>
                                {hand.reason}
                            </td>
                            <td className = 'border border-slate-700 roudned-md text-center'>
                                <div className = 'flex justify-center gap-x-4'>
                                    <Link to = {'/handHistory/addHand'}>
                                        <BsInfoCircle className = 'text-2x1 text-green-800'/>
                                    </Link>
                                    <Link to = {'/handHistory/testHands'}>
                                        <AiOutlineEdit className = 'text-2x1 text-yellow-600'/>
                                    </Link>
                                    <Link to = {'/handHistory/testHands'}>
                                        <MdOutlineAddBox className = 'text-2x1 text-red-600'/>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        )} 
    </div>
  )
}

export default Home;