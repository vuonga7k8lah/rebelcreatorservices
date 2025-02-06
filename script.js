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
            0: { items: 2 },
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
            ytb_url: document.querySelector('input[name="url"]').value.trim(),
            subscribers: document
                .querySelector('input[name="subscribers"]')
                .value.trim(),
            location: document
                .querySelector('input[name="channel-location"]')
                .value.trim(),
        };

        // Kiểm tra input không được rỗng
        for (const key in formData) {
            if (!formData[key]) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Vui lòng nhập đầy đủ thông tin: ${key.replace(
                        "_",
                        " "
                    )}`,
                });

                return;
            }
        }

        // Kiểm tra email hợp lệ
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email không hợp lệ!",
            });

            return;
        }

        // Kiểm tra subscriber phải là số dương
        if (isNaN(formData.subscribers) || formData.subscribers <= 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Số lượng subscriber phải là số dương!",
            });

            return;
        }

        // Kiểm tra reCAPTCHA
        // if (!formData.recaptcha) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "Vui lòng xác minh reCAPTCHA!",
        //     });
        //     return;
        // }
        console.log(formData);
        // Gửi dữ liệu lên server bằng fetch API
        fetch(
            "https://script.google.com/macros/s/AKfycbxVyGIq40ANBNyCP8lkbzc22ysbmVpZ7qyx4ChlEQSRHNVim3mFmSl7beJm_PFCiL5GbA/exec",
            {
                body: JSON.stringify(formData),
                method: "POST",
                mode: "no-cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
            }
        )
            .then((response) => response.json())
            .then((data) => {
                form.reset(); // Reset form sau khi gửi thành công
                grecaptcha.reset(); // Reset reCAPTCHA
                Swal.fire({
                    icon: "success",
                    text: "Thanks for submitting! Keep up the good work. We'll get in touch if we can be of help to you.",
                });
            })
            .catch((error) => {
                form.reset(); // Reset form sau khi gửi thành công
                grecaptcha.reset(); // Reset reCAPTCHA
                Swal.fire({
                    icon: "success",
                    text: "Thanks for submitting! Keep up the good work. We'll get in touch if we can be of help to you.",
                });
            });
    });
});

