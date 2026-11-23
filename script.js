/*
  GANTI dua URL di bawah dengan tautan checkout yang sebenarnya.
  Contoh: https://lynk.id/nama-toko/produk-ebook
*/
const ORDER_LINKS = {
  ebook: "",
  print: ""
};

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const notice = document.querySelector('#pemesanan');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Tutup navigasi' : 'Buka navigasi');
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});


const printModal = document.querySelector('#print-order-modal');
const printForm = document.querySelector('#print-order-form');
const closeModalButton = document.querySelector('.modal-close');
const whatsappNumber = '62895363530720';

function openPrintModal() {
  printModal.hidden = false;
  document.body.classList.add('modal-open');
  printModal.querySelector('input[name="nama"]').focus();
}

function closePrintModal() {
  printModal.hidden = true;
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.order-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    const format = link.dataset.order;
    event.preventDefault();

    if (format === 'print') {
      openPrintModal();
      return;
    }

    const checkoutUrl = ORDER_LINKS[format];
    if (checkoutUrl && /^https:\/\//i.test(checkoutUrl)) {
      window.location.href = checkoutUrl;
      return;
    }

    notice.hidden = false;
    notice.textContent = 'Tautan checkout e-book belum diatur. Isi URL pemesanan pada bagian ORDER_LINKS di file script.js.';
    notice.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

closeModalButton?.addEventListener('click', closePrintModal);
printModal?.addEventListener('click', (event) => {
  if (event.target === printModal) closePrintModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && printModal && !printModal.hidden) closePrintModal();
});

printForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!printForm.reportValidity()) return;

  const data = new FormData(printForm);
  const message = [
    'Halo, saya ingin memesan buku cetak *Mencari Rita*.',
    '',
    '*Data Pemesan*',
    `Nama lengkap: ${data.get('nama').trim()}`,
    '',
    '*Alamat Pengiriman*',
    `Jalan/Kampung/Gg: ${data.get('jalan').trim()}`,
    `Kelurahan: ${data.get('kelurahan').trim()}`,
    `Kecamatan: ${data.get('kecamatan').trim()}`,
    `Kota/Kab: ${data.get('kota').trim()}`,
    `Provinsi: ${data.get('provinsi').trim()}`,
    `Kode pos: ${data.get('kodepos').trim()}`
  ].join('\n');

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.location.href = whatsappUrl;
});

document.querySelector('#year').textContent = new Date().getFullYear();
