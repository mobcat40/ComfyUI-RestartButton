# ComfyUI-RestartButton

Adds a restart button to the ComfyUI sidebar for quick server reboots.

![restart-button](https://img.shields.io/badge/ComfyUI-Extension-blue)

## Features

- Adds a restart button to the bottom of the sidebar (next to Help, Console, Shortcuts)
- Confirmation dialog before restarting
- Uses ComfyUI-Manager's reboot endpoint

## Requirements

- [ComfyUI](https://github.com/comfyanonymous/ComfyUI)
- [ComfyUI-Manager](https://github.com/ltdrdata/ComfyUI-Manager) (provides the restart API)

## Installation

### Via ComfyUI-Manager
Search for "RestartButton" in the ComfyUI-Manager and install.

### Manual Installation
```bash
cd ComfyUI/custom_nodes
git clone https://github.com/mobcat40/ComfyUI-RestartButton.git
```

Restart ComfyUI after installation.

## Usage

Click the refresh icon at the bottom of the sidebar. Confirm the dialog to restart the server.
