// ФИО
const nameRegex = /^[А-ЯЁ][а-яё]+(?:-[А-ЯЁ][а-яё]+)?(?:\s[А-ЯЁ][а-яё]+(?:-[А-ЯЁ][а-яё]+)?){1,2}$/;
//телефон
const phoneRegex = /^(?:(?:\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}|\+996[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{3})$/;
//почта
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;
//поля
const fields = [
    { id: "fio",   regex: nameRegex,  error: "Введите ФИО с заглавных букв, например: Хасанова Руфина Равильевна" },
    { id: "phone", regex: phoneRegex, error: "Формат: +996 123 456 789 или +996 123 45 67 89" },
    { id: "email", regex: emailRegex, error: "Введите почту в формате example@example.com" }
];
//проверка одного поля
function validateField(field) {
    const input = document.getElementById(field.id);
    const errorBox = document.getElementById(field.id + "-error");
    const ok = field.regex.test(input.value.trim());

    input.classList.toggle("invalid", !ok);
    input.classList.toggle("valid", ok);
    errorBox.textContent = ok ? "" : field.error;
    return ok;
}
const form = document.getElementById("register-form");
if (form) {
    //проверка прямо во время ввода
    fields.forEach(function (field) {
        document.getElementById(field.id).addEventListener("input", function () {
            validateField(field);
        });
    });
    //проверка при отправке формы
    form.addEventListener("submit", function (event) {
        event.preventDefault(); //не перезагружаем страницу
        const result = document.getElementById("form-result");
        //проверка всех полей
        const allOk = fields.map(validateField).every(Boolean);
        if (allOk) {
            result.textContent = "Готово! Добро пожаловать в Школу Монстров, " +
                                 document.getElementById("fio").value.trim() + "!";
            result.className = "form-result success";
            form.reset();
            fields.forEach(function (f) {
                document.getElementById(f.id).classList.remove("valid");
            });
        } else {
            result.textContent = "Исправьте поля, отмеченные красным.";
            result.className = "form-result fail";
        }
    });
}
