let instances = [];

class ISingleton {
    constructor(name) {
        this.created_at = new Date();
        return instances[name] || (instances[name] = this);
    }
}

module.exports = ISingleton;