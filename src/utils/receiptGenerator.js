export const generateReceiptId = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `RCP${timestamp}${random}`;
};

const formatIQD = (amount) => {
  return amount.toLocaleString('en-US').replace(/,/g, ',') + ' IQD';
};

export const generateReceipt = (items, total) => {
  const receiptId = generateReceiptId();
  const date = new Date().toLocaleString();
  const storeName = 'Mini Market';

  const receipt = {
    id: receiptId,
    storeName,
    date,
    items: items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.price * item.quantity,
    })),
    total,
  };

  return receipt;
};

export const printReceipt = (receipt) => {
  const receiptWindow = window.open('', '_blank');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Receipt - ${receipt.id}</title>
        <style>
          body { font-family: monospace; padding: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .items { margin: 20px 0; }
          .item { display: flex; justify-content: space-between; margin: 5px 0; }
          .total { text-align: right; margin-top: 20px; }
          .footer { text-align: center; margin-top: 40px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>${receipt.storeName}</h2>
          <p>Receipt ID: ${receipt.id}</p>
          <p>Date: ${receipt.date}</p>
        </div>
        <div class="items">
          ${receipt.items
            .map(
              (item) => `
            <div class="item">
              <span>${item.name} x${item.quantity}</span>
              <span>
                ${formatIQD(item.price)} ea
                ${formatIQD(item.subtotal)}
              </span>
            </div>
          `
            )
            .join('')}
        </div>
        <div class="total">
          <h3>Total: ${formatIQD(receipt.total)}</h3>
        </div>
        <div class="footer">
          <p>Thank you for shopping with us!</p>
        </div>
      </body>
    </html>
  `;

  receiptWindow.document.write(html);
  receiptWindow.document.close();
  receiptWindow.print();
};
