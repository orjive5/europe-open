'use client'

import { useState, useEffect } from 'react'
import { useCountdown } from '@/hooks/useCountdown';

const DateTimeDisplay = ({ value, type, isDanger }: { value: number, type: string, isDanger: boolean }) => {
    return (
      <div className={`${isDanger && 'text-red-400'} flex`}>
        <p>{value}</p>
        <span>{type}</span>
      </div>
    );
  };

const ShowCounter = ({ days, hours, minutes, seconds }: { days:number, hours:number, minutes:number, seconds:number }) => {
  return (
    <div className="flex gap-2 font-semibold text-lg md:text-xl">
        <DateTimeDisplay value={days} type={'d'} isDanger={days <= 3} />
        <DateTimeDisplay value={hours} type={'h'} isDanger={false} />
        <DateTimeDisplay value={minutes} type={'m'} isDanger={false} />
        <DateTimeDisplay value={seconds} type={'s'} isDanger={false} />
    </div>
  );
};

function calculateNextSeasonDates(year: number) {
  // Season dates for the given year
  const april1st = new Date(year, 3, 1); // April is represented as 3 (0-indexed month)
  const june10th = new Date(year, 5, 10); // June is represented as 5
  const december1st = new Date(year, 11, 1); // December is represented as 11

  return { april1st, june10th, december1st };
}

function getNextSeasonDate() {
  const now = new Date().getTime();
  const year = new Date().getFullYear();

  const { april1st, june10th, december1st } = calculateNextSeasonDates(year);

  if (now < april1st.getTime()) {
    return april1st;
  } else if (now < june10th.getTime()) {
    return june10th;
  } else if (now < december1st.getTime()) {
    return december1st;
  } else {
    // Current date has passed all season dates for this year.
    // Calculate the next season's dates for the following year.
    const nextYear = year + 1;
    const nextSeasonDates = calculateNextSeasonDates(nextYear);
    return nextSeasonDates.april1st;
  }
}

const CountdownTimer = () => {
  // Time to apply until next season
  const nextSeasonDate = getNextSeasonDate();
  const [days, hours, minutes, seconds] = useCountdown(Number(nextSeasonDate));
  // Run on client only to prevent hydration error
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, []);
  return <>
    {isClient
      ? (
          <ShowCounter
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        )
        : <h3 className="flex gap-2 font-semibold text-xl">Loading...</h3>
    }
  </>
};

export default CountdownTimer;