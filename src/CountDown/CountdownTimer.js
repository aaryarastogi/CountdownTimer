import React, { useEffect, useState } from "react";
import './CountDown.css'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const CountdownTimer=()=>{

    const[hours,setHours]=useState(0);
    const[minutes,setMinutes]=useState(0)
    const[seconds,setSeconds]=useState(0)

    const handleInputChange=(e)=>{
        const totalmin=parseInt(e.target.value,10)||0;
        const inputmin=totalmin%60;
        const inputhr=parseInt(totalmin/60 , 10) ||0;
        setHours(inputhr);
        setMinutes(inputmin);
        setSeconds(0);
        setIsPlaying(false);
    }

    const[isPlaying,setIsPlaying]=useState(true)
    const handlePlay = () => {
        if (!isPlaying) {
          setIsPlaying(true);
        }
        else{
            setIsPlaying(false);
        }
    };

    const handleReset=()=>{
        setIsPlaying(false);
        setMinutes(0);
        setHours(0);
        setSeconds(0);
    }

    useEffect(() => {
        let countdownInterval;

        if (isPlaying) {
            countdownInterval = setInterval(() => {
              if (hours > 0 || minutes > 0 || seconds > 0) {
                if (seconds > 0) {
                  setSeconds(seconds - 1);
                } else if (minutes > 0) {
                  setMinutes(minutes - 1);
                  setSeconds(59);
                } else if (hours > 0) {
                  setHours(hours - 1);
                  setMinutes(59);
                  setSeconds(59);
                }
              } else {
                clearInterval(countdownInterval);
                setIsPlaying(false);
              }
            }, 1000);
        }
        return()=>clearInterval(countdownInterval);
    },[isPlaying,minutes,seconds])

    return(
        <div className='whole'>
            <div className="textpart">
                <h1>Enter minutes</h1>
                <input
                    type="number"
                    value={hours*60 + minutes}
                    onChange={handleInputChange}
                    disabled={isPlaying}
                />
                <div style={{display:'flex' , alignItems:'center' , marginRight:'160px' , paddingTop:'10px'}}>
                    {
                        isPlaying ? <StopCircleIcon onClick={handlePlay}/> : <PlayCircleIcon onClick={handlePlay}/>
                    }
                    <p style={{ margin: '0 10px' , fontSize:'32px' , color:'white'}}>
                        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </p>
                    <RestartAltIcon onClick={handleReset}/>
                </div>
            </div>
        </div>
    )
}

export default CountdownTimer;