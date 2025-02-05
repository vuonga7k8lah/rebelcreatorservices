$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1 },
            600: { items: 3 },
            1000: { items: 5 },
        },
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Ngăn chặn load lại trang khi submit

        // Lấy dữ liệu từ các input
        const formData = {
            name: document.querySelector('input[name="name"]').value.trim(),
            email: document.querySelector('input[name="email"]').value.trim(),
            youtube_channel: document
                .querySelector('input[name="url"]')
                .value.trim(),
            subscribers: document
                .querySelector('input[name="subscribers"]')
                .value.trim(),
            channel_location: document
                .querySelector('input[name="channel-location"]')
                .value.trim(),
            recaptcha: grecaptcha.getResponse(), // Lấy giá trị từ Google reCAPTCHA
        };

        // Kiểm tra input không được rỗng
        for (const key in formData) {
            if (!formData[key]) {
                alert(
                    `Vui lòng nhập đầy đủ thông tin: ${key.replace("_", " ")}`
                );
                return;
            }
        }

        // Kiểm tra email hợp lệ
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Email không hợp lệ!");
            return;
        }

        // Kiểm tra subscriber phải là số dương
        if (isNaN(formData.subscribers) || formData.subscribers <= 0) {
            alert("Số lượng subscriber phải là số dương!");
            return;
        }

        // Kiểm tra reCAPTCHA
        if (!formData.recaptcha) {
            alert("Vui lòng xác minh reCAPTCHA!");
            return;
        }
        console.log(formData);
        // Gửi dữ liệu lên server bằng fetch API
        fetch("https://your-server-endpoint.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert("Gửi thành công!");
                    form.reset(); // Reset form sau khi gửi thành công
                    grecaptcha.reset(); // Reset reCAPTCHA
                } else {
                    alert("Gửi thất bại! Vui lòng thử lại.");
                }
            })
            .catch((error) => {
                console.error("Lỗi:", error);
                alert("Có lỗi xảy ra khi gửi dữ liệu.");
            });
    });
});
