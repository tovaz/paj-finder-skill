"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeviceNameSlots = void 0;
exports.createDeviceNameSlots = (devices) => {
    const slots = devices.map((d) => {
        return {
            id: d.id,
            name: {
                value: d.name,
                synonyms: [d.id + '', d.imei + '', d.name]
            }
        };
    });
    return {
        type: "Dialog.UpdateDynamicEntities",
        updateBehavior: "REPLACE",
        types: [
            {
                name: "DEVICES_NAME",
                values: slots
            }
        ]
    };
};
//# sourceMappingURL=SlotsHelper.js.map