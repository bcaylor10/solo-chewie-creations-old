import { createStyles } from "@mantine/core"; 

export const calculateWaitTime = (shipping = false) => {
    const hoursPerWeek = 5;
    const backedHours = 0; // TODO: create function to query all products
	let waitTime = Math.ceil(backedHours / hoursPerWeek);
	
    if (shipping) waitTime += 1;
    
    return waitTime;
}

// run the fetch + 
export const request = (url: string, customOptions?: any) => {
    const options = {
        method: 'GET',
        ...customOptions
    };

    return fetch(url, options).then((res) => res.json());
}

export const menuStyles = createStyles(() => ({
    item: {
        color: '#1a5545',
        transition: 'all .2s ease-in-out',
        '&[data-hovered]': {
            backgroundColor: '#E7F5FF'
        },
    },
}));