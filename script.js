
document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // 1. ANIMASI TEKS TYPED.JS
    // ========================================
    const typingElement = document.querySelector("#typing");

    if (typingElement && typeof Typed !== "undefined") {
        new Typed("#typing", {
            strings: [
                "Frontend Developer",
                "UI/UX Designer",
                "Web Developer"
            ],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 1500,
            loop: true
        });
    }


    // ========================================
    // 2. SMOOTH SCROLL NAVIGASI
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            // Abaikan link kosong atau href="#"
            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });

// ========================================
// 3. FORM CONTACT - FORMSUBMIT
// ========================================
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const tombol = document.getElementById("send-btn");
        const status = document.getElementById("form-status");

        const nama = contactForm.elements["name"].value.trim();
        const email = contactForm.elements["email"].value.trim();
        const subject = contactForm.elements["subject"].value.trim();
        const pesan = contactForm.elements["message"].value.trim();

        function tampilkanStatus(teks, warna) {
            status.textContent = teks;
            status.style.color = warna;
            status.style.display = "block";
        }

        if (!nama || !email || !subject || !pesan) {
            tampilkanStatus("Mohon lengkapi semua kolom.", "#dc2626");
            return;
        }

        tombol.disabled = true;
        tombol.textContent = "Mengirim...";
        tampilkanStatus("Sedang mengirim pesan...", "#64748b");

        try {
            const data = new FormData(contactForm);

            data.set("_subject", subject);
            data.set("name", nama);
            data.set("email", email);
            data.set("message", pesan);
            data.set("_template", "table");

            const response = await fetch(
                "https://formsubmit.co/ajax/faridiajadeh@gmail.com",
                {
                    method: "POST",
                    body: data,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            const hasil = await response.json();

            if (!response.ok || hasil.success !== true &&
                hasil.success !== "true") {
                throw new Error(
                    hasil.message || "Layanan email menolak permintaan."
                );
            }

            tampilkanStatus(
                "✓ Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.",
                "#16a34a"
            );

            contactForm.reset();

        } catch (error) {
            console.error("Kesalahan pengiriman form:", error);

            tampilkanStatus(
                "✕ Pesan gagal dikirim. Periksa koneksi internet, aktivasi FormSubmit, dan Console browser.",
                "#dc2626"
            );
        } finally {
            tombol.disabled = false;
            tombol.textContent = "Send Message";
        }
    });
}


});