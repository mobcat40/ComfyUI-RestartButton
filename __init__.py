import os
import sys
import threading
import time
from aiohttp import web
from server import PromptServer

NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}
WEB_DIRECTORY = "./js"
__all__ = ['NODE_CLASS_MAPPINGS', 'NODE_DISPLAY_NAME_MAPPINGS', 'WEB_DIRECTORY']

def restart_comfyui():
    """Restart ComfyUI by re-executing the current process."""
    time.sleep(0.5)  # Give time for response to be sent
    os.execv(sys.executable, [sys.executable] + sys.argv)

@PromptServer.instance.routes.post("/restart-button/restart")
async def restart_server(request):
    """API endpoint to restart the server."""
    threading.Thread(target=restart_comfyui, daemon=True).start()
    return web.json_response({"status": "restarting"})
