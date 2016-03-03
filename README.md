# BLETester

A BLE (Bluetooth Low Energy) peripherals sample with Node.js and [bleno](https://github.com/sandeepmistry/bleno).

## Prerequisites
### OSX
#### Node
* 0.10.3x or 0.11.x

### Intel Edison
#### Node
* 0.10.33

## Set up

```sh
npm install
```

## Run

```sh
npm start
```

## GATT
### Peripheral
* advertisement uuid: C89E0000-A578-434B-88D2-0771CF635A0E

### Service
* uuid: C89E0000-A578-434B-88D2-0771CF635A0E

### Characteristics
#### Controller
* uuid: C89E0001-A578-434B-88D2-0771CF635A0E
* properties: [read, write, writeWithoutResponse]

#### Receiver
* uuid: C89E0002-A578-434B-88D2-0771CF635A0E
* properties: [notify, indicate]


## Actions

| action type | data | response | notify |
|:------------|:-----|:---------|:-------|
| write | 0x00.. | success | - |
| write | 0x01.. | failure | - |
| writeWithoutResponse | 0x00.. | - | - |
| writeWithoutResponse | 0x01.. | - | - |
| write | 0x02 | success | 0x00 |
| write | 0x0203 | success | 0x00.., 0x01.., 0x02.., 0x03.. |
| read | - | 1024 (LE) | - |

## License

MIT
