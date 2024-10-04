const performTask = (): Promise<void> => {
    return new Promise((resolve) => {
        console.log('Performing a task...');
        setTimeout(() => {
            console.log('Task completed');
            resolve(); 
        }, 1000); 
    });
};

export const startPolling = (): void => {
    const poll = (): void => {
        performTask().then(() => {
            setTimeout(poll, 300000); 
        });
    };
    poll(); 
};


