const form = document.getElementById('formMecz');
const tabela = document.querySelector('#tabelaMecze tbody');
const wynikiDiv = document.getElementById('wynikiSzukaj');

function odswiezListe() {
  tabela.innerHTML = '';
  const mecze = JSON.parse(localStorage.getItem('mecze') || '[]');
  mecze.forEach((m) => {
    const r = `<tr><td>${m.data}</td><td>${m.przeciwnik}</td><td>${m.ocena}</td><td>${m.najlepszy}</td></tr>`;
    tabela.insertAdjacentHTML('beforeend', r);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const m = Object.fromEntries(new FormData(form).entries());
  const mecze = JSON.parse(localStorage.getItem('mecze') || '[]');
  mecze.push(m);
  localStorage.setItem('mecze', JSON.stringify(mecze));
  form.reset();
  odswiezListe();
  alert('Mecz zapisany!');
});

document.getElementById('szukajInput').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  wynikiDiv.innerHTML = '';
  if (!q) return;
  const mecze = JSON.parse(localStorage.getItem('mecze') || '[]');
  const filtrowane = mecze.filter(
    (m) =>
      m.najlepszy.toLowerCase().includes(q) ||
      m.przeciwnik.toLowerCase().includes(q)
  );
  if (filtrowane.length === 0) {
    wynikiDiv.innerHTML = '<p>Brak wyników</p>';
    return;
  }
  filtrowane.forEach((m) => {
    wynikiDiv.innerHTML += `<div><strong>${m.data}</strong> – <em>${m.najlepszy}</em> vs <em>${m.przeciwnik}</em> (ocena: ${m.ocena})</div>`;
  });
});

odswiezListe();
