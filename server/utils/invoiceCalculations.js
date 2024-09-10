// exports.calculateInvoice = (invoiceData) => {
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
//       amountInWords: numberToWords(total) // Implement this function or use a library
//     };
//   };
  

// exports.calculateInvoice = (invoiceData) => {
//     const calculatedItems = invoiceData.items.map(item => {
//       const netAmount = item.unitPrice * item.quantity;
//       const taxAmount = netAmount * (item.taxRate / 100);
//       const totalAmount = netAmount + taxAmount;
//       return {
//         ...item,
//         netAmount: Number(netAmount.toFixed(2)),
//         taxAmount: Number(taxAmount.toFixed(2)),
//         totalAmount: Number(totalAmount.toFixed(2))
//       };
//     });
  
//     const total = calculatedItems.reduce((sum, item) => sum + item.totalAmount, 0);
  
//     return {
//       ...invoiceData,
//       items: calculatedItems,
//       total: Number(total.toFixed(2)),
//       amountInWords: numberToWords(total)
//     };
//   };

  
//   function numberToWords(num) {
//     // Implement number to words conversion or use a library
//     return `${num} only`;
//   }



// exports.calculateInvoice = (invoiceData) => {
//     const calculatedItems = invoiceData.items.map(item => {
//       // Default values to prevent undefined errors
//       const unitPrice = item.unitPrice || 0;
//       const quantity = item.quantity || 0;
//       const taxRate = item.taxRate || 0;
  
//       const netAmount = unitPrice * quantity;
//       const taxAmount = netAmount * (taxRate / 100);
//       const totalAmount = netAmount + taxAmount;
  
//       return {
//         ...item,
//         netAmount: Number(netAmount.toFixed(2)),
//         taxAmount: Number(taxAmount.toFixed(2)),
//         totalAmount: Number(totalAmount.toFixed(2))
//       };
//     });
  
//     const total = calculatedItems.reduce((sum, item) => sum + item.totalAmount, 0);
  
//     return {
//       ...invoiceData,
//       items: calculatedItems,
//       total: Number(total.toFixed(2)),
//       amountInWords: numberToWords(total)
//     };
//   };
  

// exports.calculateInvoice = (invoiceData) => {
//     const calculatedItems = invoiceData.items.map(item => {
//       const unitPrice = item.unitPrice || 0;
//       const quantity = item.quantity || 0;
//       const taxRate = item.taxRate || 0;
  
//       const netAmount = unitPrice * quantity;
//       const taxAmount = netAmount * (taxRate / 100);
//       const totalAmount = netAmount + taxAmount;
  
//       return {
//         ...item,
//         netAmount: safeToFixed(netAmount),
//         taxAmount: safeToFixed(taxAmount),
//         totalAmount: safeToFixed(totalAmount),
//       };
//     });
  
//     const total = calculatedItems.reduce((sum, item) => sum + parseFloat(item.totalAmount), 0);
  
//     return {
//       ...invoiceData,
//       items: calculatedItems,
//       total: safeToFixed(total),
//       amountInWords: numberToWords(total),
//     };
//   };
  
//   function numberToWords(num) {
//     // Implement number to words conversion or use a library
//     return `${num} only`;
//   };

  
//   const safeToFixed = (value, decimals = 2) => {
//     return value !== undefined && value !== null ? Number(value).toFixed(decimals) : '0.00';
//   };
  


exports.calculateInvoice = (invoiceData) => {
    const safeNumber = (value) => {
      return isNaN(Number(value)) ? 0 : Number(value); // Fallback to 0 if value is NaN
    };
  
    const calculatedItems = invoiceData.items.map(item => {
      const unitPrice = safeNumber(item.unitPrice);
      const quantity = safeNumber(item.quantity);
      const taxRate = safeNumber(item.taxRate);

      console.log("calculated item",unitPrice,quantity,taxRate);
      
  
      const netAmount = unitPrice * quantity;
      const taxAmount = netAmount * (taxRate / 100);
      const totalAmount = netAmount + taxAmount;
  
      console.log("next calc",netAmount,taxAmount,totalAmount);




      return {
        ...item,
        netAmount: netAmount.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
      };
    });
  
    const total = calculatedItems.reduce((sum, item) => sum + safeNumber(item.totalAmount), 0);
    
    return {
        ...invoiceData,
        items: calculatedItems,
        total: total.toFixed(2),
        amountInWords: numberToWords(total),
    };
    // console.log('Invoice Data:', invoiceData);
  };
  


  function numberToWords(num) {
    // Implement number to words conversion or use a library
    return `${num} only`;
  }
  