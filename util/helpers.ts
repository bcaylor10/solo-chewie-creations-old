const hoursPerWeek = 5;

export const calculateWaitTime = (shipping = false) => {
    const backedHours = 0; // TODO: create function to query all products
	let waitTime = Math.ceil(backedHours / hoursPerWeek);
	
    if (shipping) waitTime += 1;
    
    return waitTime;
}
