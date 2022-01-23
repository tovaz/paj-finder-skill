
export const createDeviceNameSlots = (devices: any) => {
    return devices.map( (d:any) => {
        return { 
            id: d.id, 
            name: { 
                value: d.name, 
                synonyms: [ d.id, d.imei ] 
            } 
        };
      });
}