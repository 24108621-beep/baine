
// ===============================
// 1. HIỂN THỊ THÔNG BÁO
// ===============================
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

// ===============================
// 2. MENU ĐIỀU HƯỚNG
// ===============================
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
});

mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.querySelectorAll("a").forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");
        mainNav.classList.remove("open");
    });
});

// ===============================
// 3. LỌC SẢN PHẨM
// ===============================
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        const filter = button.dataset.filter;

        productCards.forEach(card => {
            const tags = card.dataset.tags.split(" ");

            if (tags.includes(filter)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// ===============================
// 4. DỮ LIỆU SẢN PHẨM
// ===============================
const products = {
    iphone: {
        title: "iPhone 16 Pro Max 256GB",
        price: "32.990.000đ",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=85",
        description: "Điện thoại cao cấp với thiết kế sang trọng, màn hình đẹp và hiệu năng mạnh mẽ."
    },

    airpods: {
        title: "Tai nghe Bluetooth AirPods 4",
        price: "4.990.000đ",
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=85",
        description: "Tai nghe không dây nhỏ gọn, tiện lợi khi học tập, làm việc và di chuyển."
    },

    samsung: {
        title: "Samsung Galaxy S25 Ultra 256GB",
        price: "28.990.000đ",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=85",
        description: "Smartphone màn hình lớn, thiết kế hiện đại, phù hợp cho công việc và giải trí."
    },

    powerbank: {
        title: "Sạc dự phòng 20000mAh",
        price: "650.000đ",
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=700&q=85",
        description: "Sạc dự phòng dung lượng lớn, thuận tiện khi đi học, đi làm hoặc du lịch."
    }
};

// ===============================
// 5. HIỂN THỊ CHI TIẾT SẢN PHẨM
// ===============================
const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");

let selectedProduct = null;

document.querySelectorAll("[data-product]").forEach(button => {
    button.addEventListener("click", () => {
        selectedProduct = products[button.dataset.product];

        if (!selectedProduct) return;

        modalImage.src = selectedProduct.image;
        modalImage.alt = selectedProduct.title;
        modalTitle.textContent = selectedProduct.title;
        modalPrice.textContent = selectedProduct.price;
        modalDescription.textContent = selectedProduct.description;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
    });
});

// Đóng cửa sổ chi tiết
function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
}

document.getElementById("modalClose").addEventListener("click", closeModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeModal();
    }
});

// ===============================
// 6. GIỎ HÀNG DEMO
// ===============================
let cartCount = 0;

const cartButton = document.getElementById("cartButton");
const cartCountElement = document.getElementById("cartCount");
const addToCartButton = document.getElementById("addToCart");

addToCartButton.addEventListener("click", () => {
    if (!selectedProduct) return;

    cartCount++;

    cartCountElement.textContent = cartCount;

    showToast(
        `Đã thêm "${selectedProduct.title}" vào giỏ hàng!`
    );

    closeModal();
});

cartButton.addEventListener("click", () => {
    if (cartCount === 0) {
        showToast("Giỏ hàng của bạn đang trống.");
    } else {
        showToast(`Giỏ hàng có ${cartCount} sản phẩm.`);
    }
});

// ===============================
// 7. TÌM KIẾM SẢN PHẨM
// ===============================
document.getElementById("searchButton").addEventListener("click", () => {
    const keyword = prompt("Nhập tên sản phẩm bạn muốn tìm:");

    if (keyword === null || keyword.trim() === "") {
        return;
    }

    const query = keyword.trim().toLocaleLowerCase("vi");
    let found = 0;

    productCards.forEach(card => {
        const productName = card.textContent.toLocaleLowerCase("vi");

        if (productName.includes(query)) {
            card.style.display = "";
            found++;
        } else {
            card.style.display = "none";
        }
    });

    // Bỏ trạng thái chọn bộ lọc cũ
    filterButtons.forEach(button => {
        button.classList.remove("selected");
    });

    document.getElementById("dien-thoai").scrollIntoView({
        behavior: "smooth"
    });

    if (found > 0) {
        showToast(`Tìm thấy ${found} sản phẩm phù hợp.`);
    } else {
        showToast("Không tìm thấy sản phẩm phù hợp.");
    }
});

// ===============================
// 8. TÀI KHOẢN DEMO
// ===============================
document.getElementById("accountButton").addEventListener("click", () => {
    showToast("Tính năng tài khoản đang được cập nhật.");
});

// ===============================
// 9. CÁC LIÊN KẾT DỊCH VỤ
// ===============================
document.querySelectorAll("[data-notice]").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        showToast(link.dataset.notice);
    });
});

// ===============================
// 10. ĐĂNG KÝ NHẬN TIN
// ===============================
const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");
const newsletterMessage = document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit", event => {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (email === "") {
        showToast("Vui lòng nhập địa chỉ email.");
        return;
    }

    newsletterMessage.textContent =
        "Đăng ký thành công! Cảm ơn bạn.";

    showToast("Đăng ký nhận tin thành công!");

    newsletterForm.reset();
});