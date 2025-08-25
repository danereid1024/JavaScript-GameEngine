import Registry from "./class/Registry.js";

// Get the canvas element from the HTML by its ID
export const canvas = document.getElementById("gameScreen");

// Set the canvas width and height to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Get the 2D drawing context for the canvas
export const ctx = canvas.getContext("2d")

// Define the Game class, which manages the game state and logic
class Game {
    // Constructor initializes the player property
    constructor() {
        // Player will be defined later in initialize()
        this.player = undefined;
        this.registry = new Registry();
    }

    // Method to set up the player and input listeners
    initialize = () => {
        // Create the player object with starting position and size
        this.player = {
            x: 0, // Player's horizontal position
            y: 0, // Player's vertical position
            height: 40, // Player's height in pixels
            width: 40, // Player's width in pixels
        };

        this.registry.addSystem("MovementSystem");

        const dummyPositionComponent = {
            name: "Position",
            value: {
                x: 0,
                y: 0,
                height: 50,
                width: 50
            }
        }

        const dummyMovmementComponent = {
            name: "Movement",
            value: {
                vX: 10,
                vY: 10
            }
        }

        const entity = this.registry.createEntity(dummyMovmementComponent, dummyPositionComponent)

        this.registry.addEntityToSystem(entity);

        console.log(this.registry.systems);

        // Listen for keyup and keydown events to handle movement
        document.addEventListener("keyup", this.handleUserInput);
        document.addEventListener("keydown", this.handleUserInput);
    }

    // Method to update the game state (called every frame)
    update = () => {
        this.registry.getSystem("MovementSystem").update();
        // Schedule the next update using requestAnimationFrame
        requestAnimationFrame(this.update)
    }

    // Method to render the game visuals (called every frame)
    render = () => {
        requestAnimationFrame(this.render);
    }

    // Method to handle user keyboard input
    handleUserInput = (e) => {
        /*
        e: {
            key: string, // The key pressed (e.g., 'w', 'a', 's', 'd')
            type: string // The event type ('keydown' or 'keyup')
        }
        */

        // Extract key and type from the event object
        const {key, type} = e;

        // Only move the player if it exists
        if (this.player) {
            // Only respond to keydown events (not keyup)
            if (type === "keydown") {
                // Move the player based on WASD keys
                switch (key) {
                    case "w": // Move up
                        this.player.y -= 2;
                        break;
                    case "a": // Move left
                        this.player.x -=2;
                        break;
                    case "s": // Move down
                        this.player.y += 2;
                        break;
                    case "d": // Move right
                        this.player.x += 2;
                        break;
                    default:
                        // Ignore other keys
                        break;
                }
            }
        }
    }
}

// Create a new instance of the Game class
const game = new Game();
// Initialize the game (set up player and input)
game.initialize();
// Start the game update loop
game.update();
// Start the game render loop
game.render();