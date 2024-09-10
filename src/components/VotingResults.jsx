import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebase/firebaseConfig';

const VotingResults = () =>{
    const [results, setResults] =  useState({
        option1:0,
        option2: 0
    });

    useEffect(()=>{
        const fetchResults = async () =>{
            const querySnapshot = await getDocs(collection(db, 'employees'));
            let option1 = 0;
            let option2 = 0;
            querySnapshot.forEach((doc) =>{
                const vote = doc.data().vote;
                if(vote == 'Opcion 1') option1++;
                if(vote == 'Opcion 2') option2++;
            });
            setResults({ option1, option2});   
        };
        fetchResults();
    }, []);

    const data = {
        label: ['Opcion 1', 'Opcion 2' ],
        datasets: [{
            label: 'Votos',
            data: [results.option1, results.option2],
            backgroundColor: ['rgba(75,192,192,0.2)','rgba(153,102,255,0.2)'],
            borderColor: ['rgba(75,192,192,1)', 'rgba(153,102,255,1)'],
            borderWidth: 1,
        }
        ],
    };
    return <Bar data={data}/>
};

export default VotingResults;

