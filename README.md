# Flow Launcher JWT Decoder Plugin

A Flow Launcher plugin to quickly decode JSON Web Tokens (JWT).

## Features

* Quickly decode JWTs directly from Flow Launcher.
* Displays header and payload information in a readable format.

## Installation

1.  Open Flow Launcher.
2.  Type `pm install jwt-decoder` and press Enter.

Alternatively, you can manually download the latest release from the [releases page](https://github.com/Crakzzy/flow-launcher-jwt-decoder/releases) and place the contents into your Flow Launcher plugins directory (`%APPDATA%\FlowLauncher\Plugins`).

## Usage

1.  Open Flow Launcher.
2.  Type the plugin keyword (default is likely `jwt` or similar, check your Flow Launcher settings if unsure).
3.  Paste your JWT after the keyword.
4.  The decoded header and payload will be displayed in the results.
5.  After clicking `Enter` the desired part is coppied to clipboard.

## Development

This plugin was developed with the help of the [`flow-plugin`](https://www.npmjs.com/package/flow-plugin) npm library, which simplified the development process for Flow Launcher plugins.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
