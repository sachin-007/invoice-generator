// export const calculateInvoice = (invoiceData) => {
//     const calculatedItems = invoiceData.items.map(item => {
//       const netAmount = item.unitPrice * item.quantity;
//       const taxAmount = netAmount * (item.taxRate / 100);
//       const totalAmount = netAmount + taxAmount;
//       return {
//         ...item,
//         netAmount: netAmount.toFixed(2),
//         taxAmount: taxAmount.toFixed(2),
//         totalAmount: totalAmount.toFixed(2)
//       };
//     });
  
//     const total = calculatedItems.reduce((sum, item) => sum + parseFloat(item.totalAmount), 0);
  
//     return {
//       ...invoiceData,
//       items: calculatedItems,
//       total: total.toFixed(2),
//       amountInWords: numberToWords(total)
//     };
//   };
  
//   function numberToWords(num) {
//     // Implement number to words conversion or use a library
//     return `${num} only`;
//   }

// export const calculateInvoice = (invoiceData) => {
//     const calculatedItems = invoiceData.items.map(item => {
//       // Default values to handle undefined or missing properties
//       const unitPrice = item.unitPrice || 0;
//       const quantity = item.quantity || 0;
//       const taxRate = item.taxRate || 0;
  
//       const netAmount = unitPrice * quantity;
//       const taxAmount = netAmount * (taxRate / 100);
//       const totalAmount = netAmount + taxAmount;
  
//       return {
//         ...item,
//         netAmount: netAmount.toFixed(2),
//         taxAmount: taxAmount.toFixed(2),
//         totalAmount: totalAmount.toFixed(2)
//       };
//     });
  
//     const total = calculatedItems.reduce((sum, item) => sum + parseFloat(item.totalAmount), 0);
  
//     return {
//       ...invoiceData,
//       items: calculatedItems,
//       total: total.toFixed(2),
//       amountInWords: numberToWords(total)
//     };
//   };
  
//   function numberToWords(num) {
//     // Implement number to words conversion or use a library
//     return `${num} only`;
//   }
  


exports.calculateInvoice = (invoiceData) => {
    const calculatedItems = invoiceData.items.map(item => {
      const unitPrice = item.unitPrice || 0;
      const quantity = item.quantity || 0;
      const taxRate = item.taxRate || 0;
  
      const netAmount = unitPrice * quantity;
      const taxAmount = netAmount * (taxRate / 100);
      const totalAmount = netAmount + taxAmount;
  
      return {
        ...item,
        netAmount: safeToFixed(netAmount),
        taxAmount: safeToFixed(taxAmount),
        totalAmount: safeToFixed(totalAmount),
      };
    });
  
    const total = calculatedItems.reduce((sum, item) => sum + parseFloat(item.totalAmount), 0);
  
    return {
      ...invoiceData,
      items: calculatedItems,
      total: safeToFixed(total),
      amountInWords: numberToWords(total),
    };
  };
  
  function numberToWords(num) {
    // Implement number to words conversion or use a library
    return `${num} only`;
  };

  
  const safeToFixed = (value, decimals = 2) => {
    return value !== undefined && value !== null ? Number(value).toFixed(decimals) : '0.00';
  };