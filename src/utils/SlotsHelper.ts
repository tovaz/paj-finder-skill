import { Directive } from "ask-sdk-model";

export const createDeviceNameSlots = (devices: any):Directive => {
    const slots = devices.map( (d:any) => {
        return { 
            id: d.id, 
            name: { 
                value: d.name, 
                synonyms: [ d.id+'', d.imei+'', d.name ] 
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
}