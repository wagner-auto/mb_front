/**
 * Валидация корректного ввода номера телефона
 * @param {jquery} phone_el
 * @returns {boolean}
 */
function validate (phone_el) {
    var regex=/^(\+7|8)[\d]{10,10}$/;
    if(!regex.test(phone_el.val())){
        if(!phone_el.next().hasClass("error")){
            phone_el.after("<span class='error' style='color: red'>Неверно указан номер телефона, укажите в формате +79998887766</span>")
        }
        return false;
    }
    return true;
}

export {validate};
