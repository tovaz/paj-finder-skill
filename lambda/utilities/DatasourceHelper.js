"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDevicesDatasource = exports.SourceTypes = exports.createSource = void 0;
exports.createSource = (objectId, title, backgroundImage = null, data = []) => {
    let source = {};
    source = {
        type: 'object',
        objectId,
        backgroundImage,
        title,
        data
    };
    console.log('DSH - Source created');
    console.log('DSH - ', source);
    return source;
};
var SourceTypes;
(function (SourceTypes) {
    SourceTypes["textListData"] = "textListData";
})(SourceTypes = exports.SourceTypes || (exports.SourceTypes = {}));
exports.createDevicesDatasource = (devices) => {
    console.log('DSH - CREATING SOURCE');
    let source = exports.createSource('DevicesSource', 'Please say the name of your device to know the location');
    console.log('DSH - LOOPING DEVICES');
    devices.forEach((d) => {
        const item = {};
        item.primaryText = d.name;
        // item.primaryAction = [
        //     {
        //         type: 'SetValue',
        //         componentId: 'DevicesList',
        //         property: 'headerTitle',
        //         value: "${payload.DevicesSource.data[0].primaryText} is selected"
        //     }
        // ]
        source.data.push(item);
    });
    return source;
};
//# sourceMappingURL=DatasourceHelper.js.map