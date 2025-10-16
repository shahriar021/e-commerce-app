 
 const formatTimeAgo = (ms)=>{
    console.log(ms,"format time")
    const second = Math.floor(ms/1000);

    const min =60;
    const hr = min*60;
    const dy=hr*24;
    const wk=dy*7;
    const mt=dy*30;
    const yr= mt*12;

    if(second<5){
        return "just now"
    }

    if(second>=yr){
        const value=Math.floor(second/yr);
        return `${value} year${value>1?'s':''} ago`;
    }
    if (second >= mt) {
        const value = Math.floor(second / mt);
        return `${value} month${value > 1 ? 's' : ''} ago`;
    }

    // Weeks
    if (second >= wk) {
        const value = Math.floor(second / wk);
        return `${value} week${value > 1 ? 's' : ''} ago`;
    }

    // Days
    if (second >= dy) {
        const value = Math.floor(second / dy);
        return `${value} day${value > 1 ? 's' : ''} ago`;
    }

    // Hours
    if (second >= hr) {
        const value = Math.floor(second / hr);
        return `${value} hour${value > 1 ? 's' : ''} ago`;
    }

    // Minutes
    if (second >= min) {
        const value = Math.floor(second / min);
        return `${value} minute${value > 1 ? 's' : ''} ago`;
    }



    // second
    return `${second} second${second > 1 ? 's' : ''} ago`;
 }
 
 
 export const getTime = (value) => {
    console.log(value,"get time")
        const newValue = new Date();
        const targetDate = new Date(value);

        const differenceInMs = newValue.getTime() - targetDate.getTime();

        return formatTimeAgo(differenceInMs)
    };