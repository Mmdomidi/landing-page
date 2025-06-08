let email = null;

  const params = new URLSearchParams(window.location.search);
  const status = params.get('status');
  email = params.get('email');

  const titleEl = document.getElementById('title');
  const descEl = document.getElementById('description');
  const messageBox = document.getElementById('messageBox');
  const reserveButton = document.querySelector('.reserve-button');

  const fullEmail = `${email}@mohammad-omidi.ir`;

  if (status === 'reserved') {
    titleEl.textContent = 'ایمیل در دسترس است!';
    descEl.textContent = `${fullEmail} با موفقیت ثبت شد.`;
    messageBox.classList.add('success');
    reserveButton.style.display = 'none';
  } else if (status === 'duplicate' || status === 'already_reserved') {
    titleEl.textContent = 'ایمیل قبلاً ثبت شده است!';
    descEl.textContent = `${fullEmail} قبلاً ثبت شده است. لطفاً نام دیگری امتحان کنید یا آن را رزرو کنید.`;
    messageBox.classList.add('duplicate');
    reserveButton.style.display = 'inline-block';
  } else if (status === 'available') {
    titleEl.textContent = 'ایمیل در دسترس است!';
    descEl.textContent = `آیا می‌خواهید ${fullEmail} را رزرو کنید؟`;
    reserveButton.style.display = 'inline-block';
    messageBox.classList.add('available');
  } else {
    titleEl.textContent = 'خطایی رخ داده است.';
    descEl.textContent = `مشکلی در بررسی ${fullEmail} پیش آمده است. لطفاً مجدداً تلاش کنید.`;
    messageBox.classList.add('error');
    reserveButton.style.display = 'none';
  }

  function goHome() {
    window.location.href = 'index.html';
  }

  async function reserveEmail() {
    if (!email) {
      alert("ایمیل نامعتبر است.");
      return;
    }

    try {
      reserveButton.disabled = true;
      reserveButton.textContent = "در حال ارسال...";

      const formData = new URLSearchParams();
      formData.append("name", email);
      formData.append("reserve", "true");

      const response = await fetch("https://script.google.com/macros/s/AKfycbwTDZZ2n2KyCL0NqNAG26euJcH4TYbsAlMk2dCAUQ5CEmPoCkMi2SWj06yNlYxnPN4e-A/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
      });

      if (!response.ok) throw new Error("خطا در ارتباط با سرور");

      const text = await response.text();
      const params = new URLSearchParams(text);
      const status = params.get("status");

      if (status === "reserved") {
        alert("رزرو نهایی انجام شد.");
        reserveButton.textContent = "رزرو شد ✅";
        reserveButton.disabled = true;
      } else {
        alert("مشکلی در رزرو پیش آمد: " + status);
        reserveButton.disabled = false;
        reserveButton.textContent = "رزرو این ایمیل";
      }

    } catch (error) {
      alert("خطایی در رزرو نهایی رخ داده.");
      console.error(error);
      reserveButton.disabled = false;
      reserveButton.textContent = "رزرو این ایمیل";
    }
  }

