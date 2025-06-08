  async function submitName() {
    const input = document.getElementById("nameInput");
    const name = input.value.trim();

    if (!name) {
      alert("لطفاً یک نام وارد کنید.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("name", name);

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwTDZZ2n2KyCL0NqNAG26euJcH4TYbsAlMk2dCAUQ5CEmPoCkMi2SWj06yNlYxnPN4e-A/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
      });

      if (!response.ok) throw new Error("مشکل در ارتباط با سرور");

      const text = await response.text(); // مثال: "status=duplicate&email=ali"
      const params = new URLSearchParams(text);
      const status = params.get("status");
      const email = params.get("email");

      window.location.href = `status.html?status=${status}&email=${email}`;
    } catch (error) {
      alert("خطایی رخ داده است. لطفاً بعداً دوباره تلاش کنید.");
      console.error(error);
    }
  }

