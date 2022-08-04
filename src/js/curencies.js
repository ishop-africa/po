var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const curencies = () => __awaiter(void 0, void 0, void 0, function* () {
    const sessionAmount = sessionStorage.getItem('poAmmount');
    if (sessionAmount) {
        return sessionAmount;
    }
    else {
        const data = yield fetch('https://api.exchangerate.host/convert?from=USD&to=ZAR&amount=45');
        const f = yield data.json();
        sessionStorage.setItem("poAmmount", f.result);
        return f;
    }
    console.log(sessionAmount);
});
