document.getElementById('pickBtn').addEventListener('click', function() {
  let pool = [];
  const manualInput = document.getElementById('manualInput');
  const manualValue = manualInput.value;
  
  // Ambil daftar item manual untuk pengecekan nanti
  let manualItems = [];
  if (manualValue.trim() !== "") {
    manualItems = manualValue.split(',').map(item => item.trim()).filter(item => item !== "");
    pool = pool.concat(manualItems);
  }

  // 2. Definisi data otomatis
  const data = {
    vowels: "AEIOU".split(""),
    consonants: "BCDFGHJKLMNPQRSTVWXYZ".split(""),
    numbers: "0123456789".split(""),
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    lowercase: "abcdefghijklmnopqrstuvwxyz".split("")
  };

  // 3. Cek checkbox mana yang dicentang
  if (document.getElementById('vowels').checked) pool = pool.concat(data.vowels);
  if (document.getElementById('consonants').checked) pool = pool.concat(data.consonants);
  if (document.getElementById('numbers').checked) pool = pool.concat(data.numbers);
  if (document.getElementById('uppercase').checked) pool = pool.concat(data.uppercase);
  if (document.getElementById('lowercase').checked) pool = pool.concat(data.lowercase);

  // 4. Validasi jika pool kosong
  const resultDisplay = document.getElementById('resultDisplay');
  if (pool.length === 0) {
    alert("Please provide manual input or check at least one automatic option!");
    resultDisplay.innerText = "-";
    return;
  }

  // 5. Animasi acak sederhana
  let counter = 0;
  const interval = setInterval(() => {
    const tempRandom = pool[Math.floor(Math.random() * pool.length)];
    resultDisplay.innerText = tempRandom;
    counter++;
    
    if (counter > 10) { // Berhenti setelah 10 kali "kocok"
      clearInterval(interval);
      const finalResult = pool[Math.floor(Math.random() * pool.length)];
      resultDisplay.innerText = finalResult;

      // FITUR BARU: Hapus dari manual input jika checkbox dicentang
      const shouldRemove = document.getElementById('removeSelected').checked;
      
      if (shouldRemove) {
        // Cek apakah item yang terpilih ada di dalam daftar manualItems
        const indexInManual = manualItems.indexOf(finalResult);
        
        if (indexInManual !== -1) {
          // Hapus item dari array manualItems
          manualItems.splice(indexInManual, 1);
          // Update kembali isi textarea dengan sisa item dipisahkan koma
          manualInput.value = manualItems.join(', ');
        }
      }
    }
  }, 50);
});
