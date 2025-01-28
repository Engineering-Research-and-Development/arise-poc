const { OPCUAServer, standardUnits, DataType, Variant, OPCUACertificateManager, StatusCodes, DataValue } = require("node-opcua");

(async () => {
    // Creazione del server OPC UA
    const server = new OPCUAServer({
        port: 4840,
        resourcePath: "/cartif"
    });

    // Avvio del server
    await server.initialize();

    console.log("Server initialized");

    // Aggiunta di un namespace
    const addressSpace = server.engine.addressSpace;
    //const namespace = addressSpace.getOwnNamespace();
    const namespace1 = addressSpace.registerNamespace("http://examples.freeopcua.github.io/a");
    const namespace2 = addressSpace.registerNamespace("http://examples.freeopcua.github.io/b");
    const namespace = addressSpace.registerNamespace("http://examples.freeopcua.github.io/c");

    console.log(namespace)
    // Creazione dell'oggetto Device
    const device = namespace.addObject({
        organizedBy: addressSpace.rootFolder.objects,
        browseName: "Servidor_1DBRVC",
        nodeId: `ns=4;i=1`
    });

    let values = [-1, -1, -1, 0, 0, false, 0, 0, 0, 0.0, 0, 0, 0, 0, false, false, false, false, false, false, false, false, false, false]

    // Mappings del contesto
    const mappings = [
        //{ ocb_id: "Icon", opcua_id: "ns=3;i=6010" },
        { ocb_id: "StepDataOut", opcua_id: "ns=4;i=3", dataType:"Byte" },
        { ocb_id: "StateBits", opcua_id: "ns=4;i=4", dataType:"Byte" },
        { ocb_id: "ReadyFlag", opcua_id: "ns=4;i=5", dataType:"Boolean" },
        { ocb_id: "CurrentPosition", opcua_id: "ns=4;i=6", dataType:"Float" },
        { ocb_id: "CurrentSpeed", opcua_id: "ns=4;i=7", dataType:"Int16" },
        { ocb_id: "PushingForce", opcua_id: "ns=4;i=8", dataType:"Int16" },
        { ocb_id: "TargetPosition1", opcua_id: "ns=4;i=9", dataType:"Float" },
        { ocb_id: "Alarm1", opcua_id: "ns=4;i=10", dataType:"Byte" },
        { ocb_id: "Alarm2", opcua_id: "ns=4;i=11", dataType:"Byte" },
        { ocb_id: "Alarm3", opcua_id: "ns=4;i=12", dataType:"Byte" },
        { ocb_id: "Alarm4", opcua_id: "ns=4;i=13", dataType:"Byte" },
        { ocb_id: "BUSY", opcua_id: "ns=4;i=14", dataType:"Boolean" },
        { ocb_id: "SVRE", opcua_id: "ns=4;i=15", dataType:"Boolean" },
        { ocb_id: "SETON", opcua_id: "ns=4;i=16", dataType:"Boolean" },
        { ocb_id: "INP", opcua_id: "ns=4;i=17", dataType:"Boolean" },
        { ocb_id: "AREA", opcua_id: "ns=4;i=18", dataType:"Boolean" },
        { ocb_id: "WAREA", opcua_id: "ns=4;i=19", dataType:"Boolean" },
        { ocb_id: "ESTOP", opcua_id: "ns=4;i=20", dataType:"Boolean" },
        { ocb_id: "ALARM", opcua_id: "ns=4;i=21", dataType:"Boolean" },
        { ocb_id: "Search0", opcua_id: "ns=4;i=22", dataType:"Boolean" },
        { ocb_id: "Clock05Hz", opcua_id: "ns=4;i=23", dataType:"Boolean" }
    ];

    // Aggiunta dei nodi al device
    mappings.forEach(mapping => {
        namespace.addVariable({
            componentOf: device,
            nodeId: mapping.opcua_id,
            browseName: mapping.ocb_id,
            dataType: mapping.dataType,
            value: {
                get: () => {
                    var index = mapping.opcua_id.split("i=")[1];
                    return new Variant({ dataType: mapping.dataType, value: values[index] })
                },
                set: (variant) => {
                    var index = mapping.opcua_id.split("i=")[1];
                    if(mapping.dataType == "Boolean"){
                        values[index] = parseInt(variant.value)>0
                    }else if(mapping.dataType == "Float"){
                        values[index] = parseFloat(variant.value)
                    }else{
                        values[index] = parseInt(variant.value)
                    }
                    return StatusCodes.Good;
                }
            }
        });
    });

    // Aggiunta dei metodi al server
    namespace.addMethod(device, {
        browseName: "plc_maestro",
        nodeId: `ns=${namespace.index};i=1005`,
        inputArguments: [],
        outputArguments: [{
            dataType: DataType.String
        }],
        methodDeclarationId: `ns=${namespace.index};i=1005`
    }).bindMethod((inputArguments,context,callback) => {
        console.log("plc_maestro method executed");
        callback(null, {
            statusCode: StatusCodes.Good,
            outputArguments: [{
                dataType: DataType.String,
                value: "plc_maestro method executed"
            }]
        });
    });  

    namespace.addMethod(device, {
        browseName: "DeviceSetplc_maestro",
        nodeId: `ns=${namespace.index};i=1006`,
        inputArguments: [],
        outputArguments: [{
            dataType: DataType.String
        }],
        methodDeclarationId: `ns=${namespace.index};i=1006`
    }).bindMethod((inputArguments,context,callback) => {
        console.log("DeviceSetplc_maestro method executed");
        callback(null, {
            statusCode: StatusCodes.Good,
            outputArguments: [{
                dataType: DataType.String,
                value: "DeviceSetplc_maestro method executed"
            }]
        });
    });  

    namespace.addMethod(device, {
        browseName: "test",
        nodeId: `ns=${namespace.index};i=1007`,
        inputArguments: [],
        outputArguments: [{
            dataType: DataType.String
        }],
        methodDeclarationId: `ns=${namespace.index};i=1007`
    }).bindMethod((inputArguments,context,callback) => {
        console.log("test method executed");
        for(var index=3;index<24;index++){
            var dataType = mappings[index-3].dataType;
            var value = 0;
            if(dataType == "Boolean"){
                value = parseInt(Math.random()*2)==0
            }else if(dataType == "Float"){
                value = parseFloat(Math.random()*50).toFixed(2);
            }else{
                value = parseInt(Math.random()*50)
            }
            values[index] = value
        }
        callback(null, {
            statusCode: StatusCodes.Good,
            outputArguments: [{
                dataType: DataType.String,
                value: "test method executed"
            }]
        });
    });  
    
    await server.start();

    // Start del server
    console.log("Server started at", server.endpoints[0].endpointDescriptions()[0].endpointUrl);

    // Gestione della terminazione
    process.on("SIGINT", async () => {
        console.log("Server stopping...");
        await server.shutdown(1000);
        console.log("Server stopped");
        process.exit(0);
    });
})();
