import QiscusSDK from 'qiscus-sdk-core';
import { decorate, observable } from "mobx";

class QiscusStore {
    core = new QiscusSDK();

    get isLogin() {
        return core.isLogin;
    }
    get selected() {
        return core.selected;
    }

    initiateQiscus(AppId, options = {}, credentials) {
        core.init({
            AppId,
            options
        });
        core.setUser(credentials.unique_id, credentials.password, credentials.display_name);
    }
}
decorate(QiscusStore, {
    core: observable,
})

export default new QiscusStore();