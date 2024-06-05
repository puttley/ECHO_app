// Bluetooth communication for Pitsco ECHO drone
// Paul W. Uttley
// Pitsco Education
// 06/05/2024

const DEVICE_BT_NAME_PREFIX = 'APEX_UART';

// These are fixed commands I use for test code
let bluetoothDevice;
       let bt_status = 0;
       let services = [];
       let roll_right    = '204,128,128,0,128,255,64,64,0,0,0,255,51';
       let roll_left     = '204,128,128,0,128,0,64,64,0,0,0,0,51';
       let pitch_fwd     = '204,128,128,0,255,128,64,64,0,0,0,255,51';
       let pitch_rev     = '204,128,128,0,0,128,64,64,0,0,0,0,51';
       let yaw_left      = '204,128,0,0,128,128,64,64,0,0,0,0,51';
       let yaw_right     = '204,128,255,0,128,128,64,64,0,0,0,255,51';
       let launch_land   = '204,128,128,0,128,128,64,64,8,0,0,136,51';
       let neutral_hover = '204,128,128,0,128,128,64,64,0,0,0,128,51';
       let throttle_up   = '204,192,128,0,128,128,64,64,0,0,0,192,51';
       let throttle_dwn  = '204,64,128,0,128,128,64,64,0,0,0,64,51';
       let cmd = neutral_hover;


       async function setCommand(data) {
         cmd = data;
    //     writeCommand(cmd);
       }


       async function connect() {
         try {
             bluetoothDevice = await navigator.bluetooth.requestDevice({
          //   acceptAllDevices: true,
             filters:[{namePrefix: [DEVICE_BT_NAME_PREFIX]}],
             optionalServices: ['0000ae00-0000-1000-8000-00805f9b34fb']
           });
             const server = await bluetoothDevice.gatt.connect();
             services = await server.getPrimaryServices();
             document.getElementById('connectionStatus').innerText = 'Bluetooth Status: Connected !';
             console.log('Connected to Bluetooth device:', bluetoothDevice);
             bt_status = 1;
         } catch (error) {
             document.getElementById('connectionStatus').innerText = 'Bluetooth Status: Error connecting, try again.';
             console.error('Error connecting to the Bluetooth device:', error);
             bt_status = 0;
         }
       }

       async function disconnect() {
         try {
           await bluetoothDevice.gatt.disconnect();
           document.getElementById('connectionStatus').innerText = 'Bluetooth Status: Disconnected';
           console.log('Disconnected from Bluetooth device');
           bt_status = 0;
         } catch (error) {
           document.getElementById('connectionStatus').innerText = 'Bluetooth Status: Error attempting to disconnect...';
           console.error('Error disconnecting from the Bluetooth device:', error);
         }
       }

       async function listServices() {
         console.log('Primary services found:');
         services.forEach(service => {
           console.log(service.uuid);
         });
       }

       async function listCharacteristics() {
         try {
           const service = services[0]; // Assuming we want to work with the first service found
           const characteristics = await service.getCharacteristics();
           console.log('Characteristics found:');
           characteristics.forEach(characteristic => {
             console.log(characteristic.uuid);
           });
         } catch (error) {
           console.error('Error listing characteristics:', error);
         }
       }


       async function writeCommand(data) {
         try {
           const service = services[0]; // Assuming we want to work with the first service found
           const characteristic = await service.getCharacteristic('0000ae01-0000-1000-8000-00805f9b34fb');
           const dataArray = new Uint8Array(data.split(',').map(Number)); // Convert comma-separated string to Uint8Array
           await characteristic.writeValue(dataArray);
           //console.log('Data written successfully:', dataArray);
         } catch (error) {
           console.error('Error writing data to the characteristic:', error);
         }
       }


       setInterval(async () => {if (bluetoothDevice) await  writeCommand(cmd); }, 250); // write the current command to the drone every 250ms


       async function writeLaunch(data) {
          try {
            const service = services[0]; // Assuming we want to work with the first service found
            const characteristic = await service.getCharacteristic('0000ae01-0000-1000-8000-00805f9b34fb');
            const dataArray = new Uint8Array(data.split(',').map(Number)); // Convert comma-separated string to Uint8Array
            await characteristic.writeValue(dataArray);
            cmd = neutral_hover;
            //console.log('Data written successfully:', dataArray);
          } catch (error) {
            console.error('Error writing data to the characteristic:', error);
          }
        }


       async function writeValue(value) {
         try {
           const service = services[0]; // Assuming we want to work with the first service found
           const characteristic = await service.getCharacteristic('0000ae01-0000-1000-8000-00805f9b34fb');
           await characteristic.writeValue(new TextEncoder().encode(value));
           console.log('Value written successfully:', value);
         } catch (error) {
           console.error('Error writing value to the characteristic:', error);
         }
       }

       async function readValue() {
         try {
           const service = services[0]; // Assuming we want to work with the first service found
           const characteristic = await service.getCharacteristic('0000ae10-0000-1000-8000-00805f9b34fb');
           const value = await characteristic.readValue();
           console.log('Value read successfully:', new TextDecoder().decode(value));
         } catch (error) {
           console.error('Error reading value from the characteristic:', error);
         }
       }


       function getHighByte(number) {
         return (number >> 8) & 0xFF;
       }

       function getLowByte(number) {
          return number & 0xFF;
       }


       function launch_echo(){
         console.log('take_off block');
         writeLaunch('204,128,128,0,128,128,64,64,8,0,0,136,51');
       }

       function land_echo(){
         console.log('land block');
         writeLaunch('204,128,128,0,128,128,64,64,8,0,0,136,51');
       }

       function hover(){
         console.log('hover block');
         setCommand(neutral_hover);
       }

       function fly(direction,time,power){
         console.log('fly block');
         if (power < 0)   {power = 0;}
         if (power > 100) {power = 100;}

         if (direction == 'forward'){
            power = 128 + (127 * power) / 100;      //scale 0-100 to 128-255
            var sum = 128+128+0+power+128+64+64;    //sum bytes 1-10
            var highB = getHighByte(sum);
            var lowB  = getLowByte(sum);            //checksum is always the low byte
            var checksum = lowB;
            pitch_fwd    = '204,128,128,0,' + power + ',128,64,64,0,0,0,' + checksum + ',51';
            setCommand(pitch_fwd);
         }

         if (direction == 'backward'){
           power = 128 - (128 * power) / 100;      //scale 0-100 to 128-0
           var sum = 128+128+0+power+128+64+64;
           var highB = getHighByte(sum);
           var lowB  = getLowByte(sum);
           var checksum = lowB;
           pitch_rev    = '204,128,128,0,' + power + ',128,64,64,0,0,0,' + checksum + ',51';
           setCommand(pitch_rev);
         }

         if (direction == 'up'){
           power = 128 + (127 * power) / 100;     //scale 0-100 to 128-255
           var sum = power+128+0+128+128+64+64;
           var highB = getHighByte(sum);
           var lowB  = getLowByte(sum);
           var checksum = lowB;
           throttle_up   = '204,' + power + ',128,0,128,128,64,64,0,0,0,' + checksum + ',51';
           setCommand(throttle_up);
         }

         if (direction == 'down'){
           power = 128 - (128 * power) / 100;     //scale 0-100 to 128-0
           var sum = power+128+0+128+128+64+64;
           var highB = getHighByte(sum);
           var lowB  = getLowByte(sum);
           var checksum = lowB;
           throttle_dwn  = '204,' + power + ',128,0,128,128,64,64,0,0,0,' + checksum + ',51';
           setCommand(throttle_dwn);
         }

         if (direction == 'left'){
           power = 128 - (128 * power) / 100;     //scale 0-100 to 128-0
           var sum = 128+128+0+128+power+64+64;
           var highB = getHighByte(sum);
           var lowB  = getLowByte(sum);
           var checksum = lowB;
           roll_left    = '204,128,128,0,128,' + power + ',64,64,0,0,0,' + checksum + ',51';
           setCommand(roll_left);
         }

         if (direction == 'right'){
             power = 128 + (127 * power) / 100;     //scale 0-100 to 128-255
             var sum = 128+128+0+128+power+64+64;
             var highB = getHighByte(sum);
             var lowB  = getLowByte(sum);
             var checksum = lowB;
             roll_right    = '204,128,128,0,128,' + power + ',64,64,0,0,0,' + checksum + ',51';
             setCommand(roll_right);
         }
       }

       function spin(direction,time,power){
         console.log('spin block');
         if (direction == 'left'){
           power = 128 - (128 * power) / 100;     //scale 0-100 to 128-0
           var sum = 128+power+0+128+128+64+64;
           var highB = getHighByte(sum);
           var lowB  = getLowByte(sum);
           var checksum = lowB;
           yaw_left    = '204,128,' + power + ',0,128,128,64,64,0,0,0,' + checksum + ',51';
           setCommand(yaw_left);
         }

         if (direction == 'right'){
           power = 128 + (127 * power) / 100;     //scale 0-100 to 128-255
           var sum = 128+power+0+128+128+64+64;
           var highB = getHighByte(sum);
           var lowB  = getLowByte(sum);
           var checksum = lowB;
           yaw_left    = '204,128,' + power + ',0,128,128,64,64,0,0,0,' + checksum + ',51';
           setCommand(yaw_right);
         }
       }
