/**
 * @type {jquery} $
 */
import axios from "axios/dist/axios";
import {validate} from "./module/validate";

require("./carousel");
require("@fancyapps/fancybox");
/**
 * Скролл вверх
 */
$(".footer__back_to_top").on("click", () => {
    $("html,body").stop().animate({scrollTop: 0}, 500, "swing");
});

/**
 * Закрытие всех форм фансибокса
 * @param timeout
 */
function closeAllFancy(timeout = 5000) {

    setTimeout(() => {
        $.fancybox.close(true);
    }, timeout);
}

/**
 * Отправка форм
 */
$("form").on("submit", e => {
    e.preventDefault();
    var phone = e.target.querySelector("input[type=tel]");
    if (!phone || validate($(phone))) {
        axios.post("/mail", new FormData(e.target))
            .then(resp => {
                console.log(resp.data);
                if (resp.data.status == true) {
                    $.fancybox.open({
                        src: "#response",
                        type: "inline"
                    });
                }
                closeAllFancy(3000);
            })
            .catch(err => {
                console.log(err.message);
            });
    }
    return false;
});

/**
 * Регулярочка для ввода корректного номера
 */
$("input[type=tel]").on("keyup", function (e) {
    var input = $(this).val();
    var test_regex_1 = /^(\+|8[\d]{0,1}|\+7)$/;
    var test_regex_2 = /^(\+7|8)[\d]{1,20}$/;
    if (input.length > 2) {
        if (!test_regex_2.test(input)) {
            e.preventDefault();
            $(this).val(input.substring(0, input.length - 1));
            return false
        }
    } else {
        if (!test_regex_1.test(input)) {
            e.preventDefault();
            $(this).val(input.substring(0, input.length - 1));
            return false
        } else {
            $(this).val("+7");
        }
    }
    return true;
});
