import { canvas, ctx } from "../index.js";

class System {
    constructor(systemType) {
        this.systemType = systemType;
        this.entities = []
    }
}

class MovementSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Movement", "Position"];
    }
    update = () => {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];

            let { Movement, Position } = entity.components;

            Position.x += Movement.vX;
            Position.y += Movement.vY;

            console.log(Position.x, Position.y);

        }
    }
}

class RenderSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ["Position"];
    }

    update = () => {
      // Clear the entire canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Start a new drawing path
      ctx.beginPath();
      // Set the fill color for the player
      ctx.fillStyle = "red";
      // Draw the player as a filled rectangle
      ctx.fillRect(0, 0, 50, 50);
      // Outline the current path (not strictly necessary here)
      ctx.stroke();
    }
}

export { MovementSystem, RenderSystem }