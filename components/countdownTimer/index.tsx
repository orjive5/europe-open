'use client'

import { useCountdown } from '@/hooks/useCountdown';

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

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
    <div className="flex gap-2 font-semibold text-xl">
        <DateTimeDisplay value={days} type={'d'} isDanger={days <= 3} />
        <DateTimeDisplay value={hours} type={'h'} isDanger={false} />
        <DateTimeDisplay value={minutes} type={'m'} isDanger={false} />
        <DateTimeDisplay value={seconds} type={'s'} isDanger={false} />
    </div>
  );
};

const CountdownTimer = ({ targetDate }: {targetDate: number}) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;