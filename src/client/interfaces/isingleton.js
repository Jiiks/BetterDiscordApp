let instance = null;

class ISingleton {
    constructor() {
        this.created_at = new Date();
        return instance || (instance = this);
    }
}

module.exports = ISingleton;