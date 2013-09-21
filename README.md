#node-startup

Make you'r node apps start with the computer.

## Why node-startup?

When my vps was rebooted occassionally by the hosting provider, my node.js app was not coming back online. This script can be used to restart your app when the machine reboots without your knowledge.

## Installation

    npm install -g cmd-startup

## Usage

	sudo node-startup /path/to/package.json

## OS Support

Right now only Linux is supported.

## License

This program is licensed under the MIT license, see LICENSE for more info.
