import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";

const BUTTON_ID = "restart-server-button";

app.registerExtension({
    name: "RestartServerButton",
    async setup() {
        console.log("[RestartServerButton] Setting up...");

        // Check if extensionManager exists
        if (!app.extensionManager) {
            console.log("[RestartServerButton] extensionManager not available");
            return;
        }

        if (!app.extensionManager.registerSidebarTab) {
            console.log("[RestartServerButton] registerSidebarTab not available");
            return;
        }

        console.log("[RestartServerButton] Registering sidebar tab...");

        app.extensionManager.registerSidebarTab({
            id: BUTTON_ID,
            icon: "pi pi-refresh",
            title: "Restart",
            tooltip: "Restart ComfyUI Server",
            type: "custom",
            render: (el) => {}
        });

        // Find the button and move it to the bottom, then set up click handler
        const setupButton = (button) => {
            console.log("[RestartServerButton] Button found, setting up click handler");

            // Move button to the bottom section (mt-auto group with Help/Console/Shortcuts)
            const bottomGroup = document.querySelector(".mt-auto.sidebar-item-group");
            if (bottomGroup) {
                // Insert at the end of the bottom group (after Shortcuts)
                bottomGroup.appendChild(button);
                console.log("[RestartServerButton] Button moved to bottom");
            } else {
                console.log("[RestartServerButton] Bottom group not found, trying alternative selector");
                // Fallback: find sidebar groups and use the last one
                const sidebarGroups = document.querySelectorAll(".sidebar-item-group");
                if (sidebarGroups.length > 1) {
                    sidebarGroups[sidebarGroups.length - 1].appendChild(button);
                    console.log("[RestartServerButton] Button moved to last sidebar group");
                }
            }

            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (
                        mutation.type === "attributes" &&
                        mutation.attributeName === "class" &&
                        button.classList.contains("side-bar-button-selected")
                    ) {
                        button.click();
                        if (confirm("Restart ComfyUI server?")) {
                            api.fetchApi("/manager/reboot").catch(() => {});
                        }
                    }
                }
            });

            observer.observe(button, { attributes: true });
        };

        const button = document.querySelector(`button[class*="${BUTTON_ID}"]`);

        if (button) {
            setupButton(button);
        } else {
            const observer = new MutationObserver(() => {
                const foundButton = document.querySelector(`button[class*="${BUTTON_ID}"]`);
                if (foundButton) {
                    observer.disconnect();
                    setupButton(foundButton);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }

        console.log("[RestartServerButton] Setup complete");
    }
});
