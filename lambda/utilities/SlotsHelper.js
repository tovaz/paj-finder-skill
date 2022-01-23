"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeviceNameSlots = void 0;
exports.createDeviceNameSlots = (devices) => {
    return devices.map((d) => {
        return {
            id: d.id,
            name: {
                value: d.name,
                synonyms: [d.id, d.imei]
            }
        };
    });
};
//# sourceMappingURL=SlotsHelper.js.map