
export const createSource = (objectId: string, title: string, backgroundImage:BackgroundImage=null, data: Array<{}> = []) => {
    let source:any = {};
    source = {
        type: 'object',
        objectId,
        backgroundImage,
        title,
        data
    }

    console.log('DSH - Source created')
    console.log('DSH - ', source);
    return  source;
}

export enum SourceTypes {
    textListData = 'textListData'
}

export interface BackgroundImage  {
    contentDescription?: string,
    smallSourceUrl?: string,
    largeSourceUrl?: string,
    sources: [
        {
            'url': string,
            'size': string
        }
    ]
}

export const createDevicesDatasource = (devices: any) => {
    console.log('DSH - CREATING SOURCE');
    let source = createSource('DevicesSource', 'Please say the name of your device to know the location');

    console.log('DSH - LOOPING DEVICES')
    devices.forEach( (d: any) => {
        const item:any = {};
        item.primaryText = d.name;
        // item.primaryAction = [
        //     {
        //         type: 'SetValue',
        //         componentId: 'DevicesList',
        //         property: 'headerTitle',
        //         value: "${payload.data[0].primaryText} is selected"
        //     }
        // ]
        source.data.push(item);
    });

    return source;
}