document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Mesajınız başarıyla gönderildi!");
    this.reset();
  });
  