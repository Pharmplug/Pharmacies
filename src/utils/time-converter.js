export const convertToFormattedDate = (isoString) => {
    const date = new Date(isoString);
  
    // Extract parts
    const day = date.getUTCDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getUTCFullYear();
  
    // Format time
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Optional: Change to false for 24-hour format
    });
  
    // Combine into desired format
    return `${day} ${month} ${year}, ${time}`;
  };